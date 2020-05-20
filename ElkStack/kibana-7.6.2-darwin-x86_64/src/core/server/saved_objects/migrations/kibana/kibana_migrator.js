"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeProperties = mergeProperties;
exports.KibanaMigrator = void 0;

var _serialization = require("../../serialization");

var _validation = require("../../validation");

var _core = require("../core");

var _document_migrator = require("../core/document_migrator");

var _build_index_map = require("../core/build_index_map");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Manages the shape of mappings and documents in the Kibana index.
 */
class KibanaMigrator {
  /**
   * Creates an instance of KibanaMigrator.
   */
  constructor({
    callCluster,
    config,
    kibanaConfig,
    savedObjectsConfig,
    kibanaVersion,
    logger,
    savedObjectMappings,
    savedObjectMigrations,
    savedObjectSchemas,
    savedObjectValidations
  }) {
    _defineProperty(this, "callCluster", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "savedObjectsConfig", void 0);

    _defineProperty(this, "documentMigrator", void 0);

    _defineProperty(this, "kibanaConfig", void 0);

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "mappingProperties", void 0);

    _defineProperty(this, "schema", void 0);

    _defineProperty(this, "serializer", void 0);

    _defineProperty(this, "migrationResult", void 0);

    this.config = config;
    this.callCluster = callCluster;
    this.kibanaConfig = kibanaConfig;
    this.savedObjectsConfig = savedObjectsConfig;
    this.schema = savedObjectSchemas;
    this.serializer = new _serialization.SavedObjectsSerializer(this.schema);
    this.mappingProperties = mergeProperties(savedObjectMappings || []);
    this.log = logger;
    this.documentMigrator = new _document_migrator.DocumentMigrator({
      kibanaVersion,
      migrations: savedObjectMigrations || {},
      validateDoc: (0, _validation.docValidator)(savedObjectValidations || {}),
      log: this.log
    });
  }
  /**
   * Migrates the mappings and documents in the Kibana index. This will run only
   * once and subsequent calls will return the result of the original call.
   *
   * @returns - A promise which resolves once all migrations have been applied.
   *    The promise resolves with an array of migration statuses, one for each
   *    elasticsearch index which was migrated.
   */


  runMigrations() {
    if (this.migrationResult === undefined) {
      this.migrationResult = this.runMigrationsInternal();
    }

    return this.migrationResult;
  }

  runMigrationsInternal() {
    const kibanaIndexName = this.kibanaConfig.index;
    const indexMap = (0, _build_index_map.createIndexMap)({
      config: this.config,
      kibanaIndexName,
      indexMap: this.mappingProperties,
      schema: this.schema
    });
    const migrators = Object.keys(indexMap).map(index => {
      return new _core.IndexMigrator({
        batchSize: this.savedObjectsConfig.batchSize,
        callCluster: this.callCluster,
        documentMigrator: this.documentMigrator,
        index,
        log: this.log,
        mappingProperties: indexMap[index].typeMappings,
        pollInterval: this.savedObjectsConfig.pollInterval,
        scrollDuration: this.savedObjectsConfig.scrollDuration,
        serializer: this.serializer,
        // Only necessary for the migrator of the kibana index.
        obsoleteIndexTemplatePattern: index === kibanaIndexName ? 'kibana_index_template*' : undefined,
        convertToAliasScript: indexMap[index].script
      });
    });
    return Promise.all(migrators.map(migrator => migrator.migrate()));
  }
  /**
   * Gets all the index mappings defined by Kibana's enabled plugins.
   *
   */


  getActiveMappings() {
    return (0, _core.buildActiveMappings)({
      properties: this.mappingProperties
    });
  }
  /**
   * Migrates an individual doc to the latest version, as defined by the plugin migrations.
   *
   * @param doc - The saved object to migrate
   * @returns `doc` with all registered migrations applied.
   */


  migrateDocument(doc) {
    return this.documentMigrator.migrate(doc);
  }

}
/**
 * Merges savedObjectMappings properties into a single object, verifying that
 * no mappings are redefined.
 */


exports.KibanaMigrator = KibanaMigrator;

function mergeProperties(mappings) {
  return mappings.reduce((acc, {
    pluginId,
    properties
  }) => {
    const duplicate = Object.keys(properties).find(k => acc.hasOwnProperty(k));

    if (duplicate) {
      throw new Error(`Plugin ${pluginId} is attempting to redefine mapping "${duplicate}".`);
    }

    return Object.assign(acc, properties);
  }, {});
}