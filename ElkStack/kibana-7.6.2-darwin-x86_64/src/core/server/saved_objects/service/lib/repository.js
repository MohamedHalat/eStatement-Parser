"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsRepository = void 0;

var _lodash = require("lodash");

var _retry_call_cluster = require("../../../elasticsearch/retry_call_cluster");

var _mappings = require("../../mappings");

var _search_dsl = require("./search_dsl");

var _included_fields = require("./included_fields");

var _decorate_es_error = require("./decorate_es_error");

var _errors = require("./errors");

var _version = require("../../version");

var _serialization = require("../../serialization");

var _filter_utils = require("./filter_utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const isLeft = either => {
  return either.tag === 'Left';
};

const DEFAULT_REFRESH_SETTING = 'wait_for';
/**
 * See {@link SavedObjectsRepository}
 *
 * @public
 */

/**
 * @public
 */
class SavedObjectsRepository {
  /**
   * A factory function for creating SavedObjectRepository instances.
   *
   * @internalRemarks
   * Tests are located in ./repository_create_repository.test.ts
   *
   * @internal
   */
  static createRepository(migrator, schema, config, indexName, callCluster, extraTypes = [], injectedConstructor = SavedObjectsRepository) {
    const mappings = migrator.getActiveMappings();
    const allTypes = Object.keys((0, _mappings.getRootPropertiesObjects)(mappings));
    const serializer = new _serialization.SavedObjectsSerializer(schema);
    const visibleTypes = allTypes.filter(type => !schema.isHiddenType(type));
    const missingTypeMappings = extraTypes.filter(type => !allTypes.includes(type));

    if (missingTypeMappings.length > 0) {
      throw new Error(`Missing mappings for saved objects types: '${missingTypeMappings.join(', ')}'`);
    }

    const allowedTypes = [...new Set(visibleTypes.concat(extraTypes))];
    return new injectedConstructor({
      index: indexName,
      config,
      migrator,
      mappings,
      schema,
      serializer,
      allowedTypes,
      callCluster: (0, _retry_call_cluster.retryCallCluster)(callCluster)
    });
  }

  constructor(options) {
    _defineProperty(this, "_migrator", void 0);

    _defineProperty(this, "_index", void 0);

    _defineProperty(this, "_config", void 0);

    _defineProperty(this, "_mappings", void 0);

    _defineProperty(this, "_schema", void 0);

    _defineProperty(this, "_allowedTypes", void 0);

    _defineProperty(this, "_unwrappedCallCluster", void 0);

    _defineProperty(this, "_serializer", void 0);

    const {
      index,
      config,
      mappings,
      callCluster,
      schema,
      serializer,
      migrator,
      allowedTypes = []
    } = options; // It's important that we migrate documents / mark them as up-to-date
    // prior to writing them to the index. Otherwise, we'll cause unnecessary
    // index migrations to run at Kibana startup, and those will probably fail
    // due to invalidly versioned documents in the index.
    //
    // The migrator performs double-duty, and validates the documents prior
    // to returning them.

    this._migrator = migrator;
    this._index = index;
    this._config = config;
    this._mappings = mappings;
    this._schema = schema;

    if (allowedTypes.length === 0) {
      throw new Error('Empty or missing types for saved object repository!');
    }

    this._allowedTypes = allowedTypes;

    this._unwrappedCallCluster = async (...args) => {
      await migrator.runMigrations();
      return callCluster(...args);
    };

    this._schema = schema;
    this._serializer = serializer;
  }
  /**
   * Persists an object
   *
   * @param {string} type
   * @param {object} attributes
   * @param {object} [options={}]
   * @property {string} [options.id] - force id on creation, not recommended
   * @property {boolean} [options.overwrite=false]
   * @property {object} [options.migrationVersion=undefined]
   * @property {string} [options.namespace]
   * @property {array} [options.references=[]] - [{ name, type, id }]
   * @returns {promise} - { id, type, version, attributes }
   */


  async create(type, attributes, options = {}) {
    const {
      id,
      migrationVersion,
      overwrite = false,
      namespace,
      references = [],
      refresh = DEFAULT_REFRESH_SETTING
    } = options;

    if (!this._allowedTypes.includes(type)) {
      throw _errors.SavedObjectsErrorHelpers.createUnsupportedTypeError(type);
    }

    const method = id && !overwrite ? 'create' : 'index';

    const time = this._getCurrentTime();

    try {
      const migrated = this._migrator.migrateDocument({
        id,
        type,
        namespace,
        attributes,
        migrationVersion,
        updated_at: time,
        references
      });

      const raw = this._serializer.savedObjectToRaw(migrated);

      const response = await this._writeToCluster(method, {
        id: raw._id,
        index: this.getIndexForType(type),
        refresh,
        body: raw._source
      });
      return this._rawToSavedObject({ ...raw,
        ...response
      });
    } catch (error) {
      if (_errors.SavedObjectsErrorHelpers.isNotFoundError(error)) {
        // See "503s from missing index" above
        throw _errors.SavedObjectsErrorHelpers.createEsAutoCreateIndexError();
      }

      throw error;
    }
  }
  /**
   * Creates multiple documents at once
   *
   * @param {array} objects - [{ type, id, attributes, references, migrationVersion }]
   * @param {object} [options={}]
   * @property {boolean} [options.overwrite=false] - overwrites existing documents
   * @property {string} [options.namespace]
   * @returns {promise} -  {saved_objects: [[{ id, type, version, references, attributes, error: { message } }]}
   */


  async bulkCreate(objects, options = {}) {
    const {
      namespace,
      overwrite = false,
      refresh = DEFAULT_REFRESH_SETTING
    } = options;

    const time = this._getCurrentTime();

    const bulkCreateParams = [];
    let requestIndexCounter = 0;
    const expectedResults = objects.map(object => {
      if (!this._allowedTypes.includes(object.type)) {
        return {
          tag: 'Left',
          error: {
            id: object.id,
            type: object.type,
            error: _errors.SavedObjectsErrorHelpers.createUnsupportedTypeError(object.type).output.payload
          }
        };
      }

      const method = object.id && !overwrite ? 'create' : 'index';
      const expectedResult = {
        esRequestIndex: requestIndexCounter++,
        requestedId: object.id,
        rawMigratedDoc: this._serializer.savedObjectToRaw(this._migrator.migrateDocument({
          id: object.id,
          type: object.type,
          attributes: object.attributes,
          migrationVersion: object.migrationVersion,
          namespace,
          updated_at: time,
          references: object.references || []
        }))
      };
      bulkCreateParams.push({
        [method]: {
          _id: expectedResult.rawMigratedDoc._id,
          _index: this.getIndexForType(object.type)
        }
      }, expectedResult.rawMigratedDoc._source);
      return {
        tag: 'Right',
        value: expectedResult
      };
    });
    const esResponse = await this._writeToCluster('bulk', {
      refresh,
      body: bulkCreateParams
    });
    return {
      saved_objects: expectedResults.map(expectedResult => {
        if (isLeft(expectedResult)) {
          return expectedResult.error;
        }

        const {
          requestedId,
          rawMigratedDoc,
          esRequestIndex
        } = expectedResult.value;
        const response = esResponse.items[esRequestIndex];
        const {
          error,
          _id: responseId,
          _seq_no: seqNo,
          _primary_term: primaryTerm
        } = Object.values(response)[0];
        const {
          _source: {
            type,
            [type]: attributes,
            references = []
          }
        } = rawMigratedDoc;
        const id = requestedId || responseId;

        if (error) {
          return {
            id,
            type,
            error: getBulkOperationError(error, type, id)
          };
        }

        return {
          id,
          type,
          updated_at: time,
          version: (0, _version.encodeVersion)(seqNo, primaryTerm),
          attributes,
          references
        };
      })
    };
  }
  /**
   * Deletes an object
   *
   * @param {string} type
   * @param {string} id
   * @param {object} [options={}]
   * @property {string} [options.namespace]
   * @returns {promise}
   */


  async delete(type, id, options = {}) {
    if (!this._allowedTypes.includes(type)) {
      throw _errors.SavedObjectsErrorHelpers.createGenericNotFoundError();
    }

    const {
      namespace,
      refresh = DEFAULT_REFRESH_SETTING
    } = options;
    const response = await this._writeToCluster('delete', {
      id: this._serializer.generateRawId(namespace, type, id),
      index: this.getIndexForType(type),
      refresh,
      ignore: [404]
    });
    const deleted = response.result === 'deleted';

    if (deleted) {
      return {};
    }

    const docNotFound = response.result === 'not_found';
    const indexNotFound = response.error && response.error.type === 'index_not_found_exception';

    if (docNotFound || indexNotFound) {
      // see "404s from missing index" above
      throw _errors.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
    }

    throw new Error(`Unexpected Elasticsearch DELETE response: ${JSON.stringify({
      type,
      id,
      response
    })}`);
  }
  /**
   * Deletes all objects from the provided namespace.
   *
   * @param {string} namespace
   * @returns {promise} - { took, timed_out, total, deleted, batches, version_conflicts, noops, retries, failures }
   */


  async deleteByNamespace(namespace, options = {}) {
    if (!namespace || typeof namespace !== 'string') {
      throw new TypeError(`namespace is required, and must be a string`);
    }

    const {
      refresh = DEFAULT_REFRESH_SETTING
    } = options;
    const allTypes = Object.keys((0, _mappings.getRootPropertiesObjects)(this._mappings));
    const typesToDelete = allTypes.filter(type => !this._schema.isNamespaceAgnostic(type));
    const esOptions = {
      index: this.getIndicesForTypes(typesToDelete),
      ignore: [404],
      refresh,
      body: {
        conflicts: 'proceed',
        ...(0, _search_dsl.getSearchDsl)(this._mappings, this._schema, {
          namespace,
          type: typesToDelete
        })
      }
    };
    return await this._writeToCluster('deleteByQuery', esOptions);
  }
  /**
   * @param {object} [options={}]
   * @property {(string|Array<string>)} [options.type]
   * @property {string} [options.search]
   * @property {string} [options.defaultSearchOperator]
   * @property {Array<string>} [options.searchFields] - see Elasticsearch Simple Query String
   *                                        Query field argument for more information
   * @property {integer} [options.page=1]
   * @property {integer} [options.perPage=20]
   * @property {string} [options.sortField]
   * @property {string} [options.sortOrder]
   * @property {Array<string>} [options.fields]
   * @property {string} [options.namespace]
   * @property {object} [options.hasReference] - { type, id }
   * @returns {promise} - { saved_objects: [{ id, type, version, attributes }], total, per_page, page }
   */


  async find({
    search,
    defaultSearchOperator = 'OR',
    searchFields,
    hasReference,
    page = 1,
    perPage = 20,
    sortField,
    sortOrder,
    fields,
    namespace,
    type,
    filter
  }) {
    if (!type) {
      throw _errors.SavedObjectsErrorHelpers.createBadRequestError('options.type must be a string or an array of strings');
    }

    const types = Array.isArray(type) ? type : [type];
    const allowedTypes = types.filter(t => this._allowedTypes.includes(t));

    if (allowedTypes.length === 0) {
      return {
        page,
        per_page: perPage,
        total: 0,
        saved_objects: []
      };
    }

    if (searchFields && !Array.isArray(searchFields)) {
      throw _errors.SavedObjectsErrorHelpers.createBadRequestError('options.searchFields must be an array');
    }

    if (fields && !Array.isArray(fields)) {
      throw _errors.SavedObjectsErrorHelpers.createBadRequestError('options.fields must be an array');
    }

    let kueryNode;

    try {
      if (filter) {
        kueryNode = (0, _filter_utils.validateConvertFilterToKueryNode)(allowedTypes, filter, this._mappings);
      }
    } catch (e) {
      if (e.name === 'KQLSyntaxError') {
        throw _errors.SavedObjectsErrorHelpers.createBadRequestError('KQLSyntaxError: ' + e.message);
      } else {
        throw e;
      }
    }

    const esOptions = {
      index: this.getIndicesForTypes(allowedTypes),
      size: perPage,
      from: perPage * (page - 1),
      _source: (0, _included_fields.includedFields)(type, fields),
      ignore: [404],
      rest_total_hits_as_int: true,
      body: {
        seq_no_primary_term: true,
        ...(0, _search_dsl.getSearchDsl)(this._mappings, this._schema, {
          search,
          defaultSearchOperator,
          searchFields,
          type: allowedTypes,
          sortField,
          sortOrder,
          namespace,
          hasReference,
          kueryNode
        })
      }
    };
    const response = await this._callCluster('search', esOptions);

    if (response.status === 404) {
      // 404 is only possible here if the index is missing, which
      // we don't want to leak, see "404s from missing index" above
      return {
        page,
        per_page: perPage,
        total: 0,
        saved_objects: []
      };
    }

    return {
      page,
      per_page: perPage,
      total: response.hits.total,
      saved_objects: response.hits.hits.map(hit => this._rawToSavedObject(hit))
    };
  }
  /**
   * Returns an array of objects by id
   *
   * @param {array} objects - an array of objects containing id, type and optionally fields
   * @param {object} [options={}]
   * @property {string} [options.namespace]
   * @returns {promise} - { saved_objects: [{ id, type, version, attributes }] }
   * @example
   *
   * bulkGet([
   *   { id: 'one', type: 'config' },
   *   { id: 'foo', type: 'index-pattern' }
   * ])
   */


  async bulkGet(objects = [], options = {}) {
    const {
      namespace
    } = options;

    if (objects.length === 0) {
      return {
        saved_objects: []
      };
    }

    const unsupportedTypeObjects = objects.filter(o => !this._allowedTypes.includes(o.type)).map(({
      type,
      id
    }) => {
      return {
        id,
        type,
        error: _errors.SavedObjectsErrorHelpers.createUnsupportedTypeError(type).output.payload
      };
    });
    const supportedTypeObjects = objects.filter(o => this._allowedTypes.includes(o.type));
    const response = await this._callCluster('mget', {
      body: {
        docs: supportedTypeObjects.map(({
          type,
          id,
          fields
        }) => {
          return {
            _id: this._serializer.generateRawId(namespace, type, id),
            _index: this.getIndexForType(type),
            _source: (0, _included_fields.includedFields)(type, fields)
          };
        })
      }
    });
    return {
      saved_objects: response.docs.map((doc, i) => {
        const {
          id,
          type
        } = supportedTypeObjects[i];

        if (!doc.found) {
          return {
            id,
            type,
            error: {
              statusCode: 404,
              message: 'Not found'
            }
          };
        }

        const time = doc._source.updated_at;
        return {
          id,
          type,
          ...(time && {
            updated_at: time
          }),
          version: (0, _version.encodeHitVersion)(doc),
          attributes: doc._source[type],
          references: doc._source.references || [],
          migrationVersion: doc._source.migrationVersion
        };
      }).concat(unsupportedTypeObjects)
    };
  }
  /**
   * Gets a single object
   *
   * @param {string} type
   * @param {string} id
   * @param {object} [options={}]
   * @property {string} [options.namespace]
   * @returns {promise} - { id, type, version, attributes }
   */


  async get(type, id, options = {}) {
    if (!this._allowedTypes.includes(type)) {
      throw _errors.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
    }

    const {
      namespace
    } = options;
    const response = await this._callCluster('get', {
      id: this._serializer.generateRawId(namespace, type, id),
      index: this.getIndexForType(type),
      ignore: [404]
    });
    const docNotFound = response.found === false;
    const indexNotFound = response.status === 404;

    if (docNotFound || indexNotFound) {
      // see "404s from missing index" above
      throw _errors.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
    }

    const {
      updated_at: updatedAt
    } = response._source;
    return {
      id,
      type,
      ...(updatedAt && {
        updated_at: updatedAt
      }),
      version: (0, _version.encodeHitVersion)(response),
      attributes: response._source[type],
      references: response._source.references || [],
      migrationVersion: response._source.migrationVersion
    };
  }
  /**
   * Updates an object
   *
   * @param {string} type
   * @param {string} id
   * @param {object} [options={}]
   * @property {string} options.version - ensures version matches that of persisted object
   * @property {string} [options.namespace]
   * @property {array} [options.references] - [{ name, type, id }]
   * @returns {promise}
   */


  async update(type, id, attributes, options = {}) {
    if (!this._allowedTypes.includes(type)) {
      throw _errors.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
    }

    const {
      version,
      namespace,
      references,
      refresh = DEFAULT_REFRESH_SETTING
    } = options;

    const time = this._getCurrentTime();

    const doc = {
      [type]: attributes,
      updated_at: time,
      references
    };

    if (!Array.isArray(doc.references)) {
      delete doc.references;
    }

    const response = await this._writeToCluster('update', {
      id: this._serializer.generateRawId(namespace, type, id),
      index: this.getIndexForType(type),
      ...(version && (0, _version.decodeRequestVersion)(version)),
      refresh,
      ignore: [404],
      body: {
        doc
      }
    });

    if (response.status === 404) {
      // see "404s from missing index" above
      throw _errors.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
    }

    return {
      id,
      type,
      updated_at: time,
      version: (0, _version.encodeHitVersion)(response),
      references,
      attributes
    };
  }
  /**
   * Updates multiple objects in bulk
   *
   * @param {array} objects - [{ type, id, attributes, options: { version, namespace } references }]
   * @property {string} options.version - ensures version matches that of persisted object
   * @property {string} [options.namespace]
   * @returns {promise} -  {saved_objects: [[{ id, type, version, references, attributes, error: { message } }]}
   */


  async bulkUpdate(objects, options = {}) {
    const time = this._getCurrentTime();

    const bulkUpdateParams = [];
    let requestIndexCounter = 0;
    const expectedResults = objects.map(object => {
      const {
        type,
        id
      } = object;

      if (!this._allowedTypes.includes(type)) {
        return {
          tag: 'Left',
          error: {
            id,
            type,
            error: _errors.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id).output.payload
          }
        };
      }

      const {
        attributes,
        references,
        version
      } = object;
      const {
        namespace
      } = options;
      const documentToSave = {
        [type]: attributes,
        updated_at: time,
        references
      };

      if (!Array.isArray(documentToSave.references)) {
        delete documentToSave.references;
      }

      const expectedResult = {
        type,
        id,
        esRequestIndex: requestIndexCounter++,
        documentToSave
      };
      bulkUpdateParams.push({
        update: {
          _id: this._serializer.generateRawId(namespace, type, id),
          _index: this.getIndexForType(type),
          ...(version && (0, _version.decodeRequestVersion)(version))
        }
      }, {
        doc: documentToSave
      });
      return {
        tag: 'Right',
        value: expectedResult
      };
    });
    const {
      refresh = DEFAULT_REFRESH_SETTING
    } = options;
    const esResponse = bulkUpdateParams.length ? await this._writeToCluster('bulk', {
      refresh,
      body: bulkUpdateParams
    }) : {};
    return {
      saved_objects: expectedResults.map(expectedResult => {
        if (isLeft(expectedResult)) {
          return expectedResult.error;
        }

        const {
          type,
          id,
          documentToSave,
          esRequestIndex
        } = expectedResult.value;
        const response = esResponse.items[esRequestIndex];
        const {
          error,
          _seq_no: seqNo,
          _primary_term: primaryTerm
        } = Object.values(response)[0];
        const {
          [type]: attributes,
          references,
          updated_at
        } = documentToSave;

        if (error) {
          return {
            id,
            type,
            error: getBulkOperationError(error, type, id)
          };
        }

        return {
          id,
          type,
          updated_at,
          version: (0, _version.encodeVersion)(seqNo, primaryTerm),
          attributes,
          references
        };
      })
    };
  }
  /**
   * Increases a counter field by one. Creates the document if one doesn't exist for the given id.
   *
   * @param {string} type
   * @param {string} id
   * @param {string} counterFieldName
   * @param {object} [options={}]
   * @property {object} [options.migrationVersion=undefined]
   * @returns {promise}
   */


  async incrementCounter(type, id, counterFieldName, options = {}) {
    if (typeof type !== 'string') {
      throw new Error('"type" argument must be a string');
    }

    if (typeof counterFieldName !== 'string') {
      throw new Error('"counterFieldName" argument must be a string');
    }

    if (!this._allowedTypes.includes(type)) {
      throw _errors.SavedObjectsErrorHelpers.createUnsupportedTypeError(type);
    }

    const {
      migrationVersion,
      namespace,
      refresh = DEFAULT_REFRESH_SETTING
    } = options;

    const time = this._getCurrentTime();

    const migrated = this._migrator.migrateDocument({
      id,
      type,
      attributes: {
        [counterFieldName]: 1
      },
      migrationVersion,
      updated_at: time
    });

    const raw = this._serializer.savedObjectToRaw(migrated);

    const response = await this._writeToCluster('update', {
      id: this._serializer.generateRawId(namespace, type, id),
      index: this.getIndexForType(type),
      refresh,
      _source: true,
      body: {
        script: {
          source: `
              if (ctx._source[params.type][params.counterFieldName] == null) {
                ctx._source[params.type][params.counterFieldName] = params.count;
              }
              else {
                ctx._source[params.type][params.counterFieldName] += params.count;
              }
              ctx._source.updated_at = params.time;
            `,
          lang: 'painless',
          params: {
            count: 1,
            time,
            type,
            counterFieldName
          }
        },
        upsert: raw._source
      }
    });
    return {
      id,
      type,
      updated_at: time,
      references: response.get._source.references,
      version: (0, _version.encodeHitVersion)(response),
      attributes: response.get._source[type]
    };
  }

  async _writeToCluster(...args) {
    try {
      return await this._callCluster(...args);
    } catch (err) {
      throw (0, _decorate_es_error.decorateEsError)(err);
    }
  }

  async _callCluster(...args) {
    try {
      return await this._unwrappedCallCluster(...args);
    } catch (err) {
      throw (0, _decorate_es_error.decorateEsError)(err);
    }
  }
  /**
   * Returns index specified by the given type or the default index
   *
   * @param type - the type
   */


  getIndexForType(type) {
    return this._schema.getIndexForType(this._config, type) || this._index;
  }
  /**
   * Returns an array of indices as specified in `this._schema` for each of the
   * given `types`. If any of the types don't have an associated index, the
   * default index `this._index` will be included.
   *
   * @param types The types whose indices should be retrieved
   */


  getIndicesForTypes(types) {
    const unique = array => [...new Set(array)];

    return unique(types.map(t => this._schema.getIndexForType(this._config, t) || this._index));
  }

  _getCurrentTime() {
    return new Date().toISOString();
  } // The internal representation of the saved object that the serializer returns
  // includes the namespace, and we use this for migrating documents. However, we don't
  // want the namespace to be returned from the repository, as the repository scopes each
  // method transparently to the specified namespace.


  _rawToSavedObject(raw) {
    const savedObject = this._serializer.rawToSavedObject(raw);

    return (0, _lodash.omit)(savedObject, 'namespace');
  }

}

exports.SavedObjectsRepository = SavedObjectsRepository;

function getBulkOperationError(error, type, id) {
  switch (error.type) {
    case 'version_conflict_engine_exception':
      return {
        statusCode: 409,
        message: 'version conflict, document already exists'
      };

    case 'document_missing_exception':
      return _errors.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id).output.payload;

    default:
      return {
        message: error.reason || JSON.stringify(error)
      };
  }
}