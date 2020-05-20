"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggConfig = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _agg_groups = require("../vis/editors/default/agg_groups");

var _agg_params = require("./agg_params");

var _public = require("../../../../plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var unknownSchema = {
  name: 'unknown',
  title: 'Unknown',
  hideCustomLabel: true,
  aggFilter: [],
  min: 1,
  max: 1,
  params: [],
  defaults: {},
  editor: false,
  group: _agg_groups.AggGroupNames.Metrics
};

var getTypeFromRegistry = function getTypeFromRegistry(type) {
  // We need to inline require here, since we're having a cyclic dependency
  // from somewhere inside agg_types back to AggConfig.
  var aggTypes = require('../agg_types').aggTypes;

  var registeredType = aggTypes.metrics.find(function (agg) {
    return agg.name === type;
  }) || aggTypes.buckets.find(function (agg) {
    return agg.name === type;
  });

  if (!registeredType) {
    throw new Error('unknown type');
  }

  return registeredType;
};

var getSchemaFromRegistry = function getSchemaFromRegistry(schemas, schema) {
  var registeredSchema = schemas ? schemas.byName[schema] : null;

  if (!registeredSchema) {
    registeredSchema = Object.assign({}, unknownSchema);
    registeredSchema.name = schema;
  }

  return registeredSchema;
};

var AggConfig =
/*#__PURE__*/
function () {
  _createClass(AggConfig, null, [{
    key: "ensureIds",

    /**
     * Ensure that all of the objects in the list have ids, the objects
     * and list are modified by reference.
     *
     * @param  {array[object]} list - a list of objects, objects can be anything really
     * @return {array} - the list that was passed in
     */
    value: function ensureIds(list) {
      var have = [];
      var haveNot = [];
      list.forEach(function (obj) {
        (obj.id ? have : haveNot).push(obj);
      });
      var nextId = AggConfig.nextId(have);
      haveNot.forEach(function (obj) {
        obj.id = String(nextId++);
      });
      return list;
    }
    /**
     * Calculate the next id based on the ids in this list
     *
     * @return {array} list - a list of objects with id properties
     */

  }, {
    key: "nextId",
    value: function nextId(list) {
      return 1 + list.reduce(function (max, obj) {
        return Math.max(max, +obj.id || 0);
      }, 0);
    }
  }]);

  function AggConfig(aggConfigs, opts) {
    _classCallCheck(this, AggConfig);

    _defineProperty(this, "aggConfigs", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "enabled", void 0);

    _defineProperty(this, "params", void 0);

    _defineProperty(this, "parent", void 0);

    _defineProperty(this, "__schema", void 0);

    _defineProperty(this, "__type", void 0);

    _defineProperty(this, "__typeDecorations", void 0);

    _defineProperty(this, "subAggs", []);

    this.aggConfigs = aggConfigs;
    this.id = String(opts.id || AggConfig.nextId(aggConfigs.aggs));
    this.enabled = typeof opts.enabled === 'boolean' ? opts.enabled : true; // start with empty params so that checks in type/schema setters don't freak
    // because this.params is undefined

    this.params = {}; // setters

    this.setType(opts.type);

    if (opts.schema) {
      this.setSchema(opts.schema);
    } // set the params to the values from opts, or just to the defaults


    this.setParams(opts.params || {}); // @ts-ignore

    this.__type = this.__type; // @ts-ignore

    this.__schema = this.__schema;
  }
  /**
   * Write the current values to this.params, filling in the defaults as we go
   *
   * @param  {object} [from] - optional object to read values from,
   *                         used when initializing
   * @return {undefined}
   */


  _createClass(AggConfig, [{
    key: "setParams",
    value: function setParams(from) {
      var _this = this;

      from = from || this.params || {};
      var to = this.params = {};
      this.getAggParams().forEach(function (aggParam) {
        var val = from[aggParam.name];

        if (val == null) {
          if (aggParam.default == null) return;

          if (!_lodash.default.isFunction(aggParam.default)) {
            val = aggParam.default;
          } else {
            val = aggParam.default(_this);
            if (val == null) return;
          }
        }

        if (aggParam.deserialize) {
          var isTyped = _lodash.default.isFunction(aggParam.valueType);

          var isType = isTyped && val instanceof aggParam.valueType;

          var isObject = !isTyped && _lodash.default.isObject(val);

          var isDeserialized = isType || isObject;

          if (!isDeserialized) {
            val = aggParam.deserialize(val, _this);
          }

          to[aggParam.name] = val;
          return;
        }

        to[aggParam.name] = _lodash.default.cloneDeep(val);
      });
    }
  }, {
    key: "getParam",
    value: function getParam(key) {
      return _lodash.default.get(this.params, key);
    }
  }, {
    key: "write",
    value: function write(aggs) {
      return (0, _agg_params.writeParams)(this.type.params, this, aggs);
    }
  }, {
    key: "isFilterable",
    value: function isFilterable() {
      return _lodash.default.isFunction(this.type.createFilter);
    }
  }, {
    key: "createFilter",
    value: function createFilter(key) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var createFilter = this.type.createFilter;

      if (!createFilter) {
        throw new TypeError("The \"".concat(this.type.title, "\" aggregation does not support filtering."));
      }

      var field = this.getField();
      var label = this.getFieldDisplayName();

      if (field && !field.filterable) {
        var message = "The \"".concat(label, "\" field can not be used for filtering.");

        if (field.scripted) {
          message = "The \"".concat(label, "\" field is scripted and can not be used for filtering.");
        }

        throw new TypeError(message);
      }

      return createFilter(this, key, params);
    }
    /**
     *  Hook for pre-flight logic, see AggType#onSearchRequestStart
     *  @param {Courier.SearchSource} searchSource
     *  @param {Courier.FetchOptions} options
     *  @return {Promise<undefined>}
     */

  }, {
    key: "onSearchRequestStart",
    value: function onSearchRequestStart(searchSource, options) {
      var _this2 = this;

      if (!this.type) {
        return Promise.resolve();
      }

      return Promise.all(this.type.params.map(function (param) {
        return param.modifyAggConfigOnSearchRequestStart(_this2, searchSource, options);
      }));
    }
    /**
     * Convert this aggConfig to its dsl syntax.
     *
     * Adds params and adhoc subaggs to a pojo, then returns it
     *
     * @param  {AggConfigs} aggConfigs - the config object to convert
     * @return {void|Object} - if the config has a dsl representation, it is
     *                         returned, else undefined is returned
     */

  }, {
    key: "toDsl",
    value: function toDsl(aggConfigs) {
      if (this.type.hasNoDsl) return;
      var output = this.write(aggConfigs);
      var configDsl = {};
      configDsl[this.type.dslName || this.type.name] = output.params; // if the config requires subAggs, write them to the dsl as well

      if (this.subAggs.length && !output.subAggs) output.subAggs = this.subAggs;

      if (output.subAggs) {
        var subDslLvl = configDsl.aggs || (configDsl.aggs = {});
        output.subAggs.forEach(function nestAdhocSubAggs(subAggConfig) {
          subDslLvl[subAggConfig.id] = subAggConfig.toDsl(aggConfigs);
        });
      }

      if (output.parentAggs) {
        var _subDslLvl = configDsl.parentAggs || (configDsl.parentAggs = {});

        output.parentAggs.forEach(function nestAdhocSubAggs(subAggConfig) {
          _subDslLvl[subAggConfig.id] = subAggConfig.toDsl(aggConfigs);
        });
      }

      return configDsl;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var _this3 = this;

      var params = this.params;

      var outParams = _lodash.default.transform(this.getAggParams(), function (out, aggParam) {
        var val = params[aggParam.name]; // don't serialize undefined/null values

        if (val == null) return;
        if (aggParam.serialize) val = aggParam.serialize(val, _this3);
        if (val == null) return; // to prevent accidental leaking, we will clone all complex values

        out[aggParam.name] = _lodash.default.cloneDeep(val);
      }, {});

      return {
        id: this.id,
        enabled: this.enabled,
        type: this.type && this.type.name,
        schema: _lodash.default.get(this, 'schema.name', this.schema),
        params: outParams
      };
    }
  }, {
    key: "getAggParams",
    value: function getAggParams() {
      return [].concat(_toConsumableArray(_lodash.default.has(this, 'type.params') ? this.type.params : []), _toConsumableArray(_lodash.default.has(this, 'schema.params') ? this.schema.params : []));
    }
  }, {
    key: "getRequestAggs",
    value: function getRequestAggs() {
      return this.type && this.type.getRequestAggs(this) || [this];
    }
  }, {
    key: "getResponseAggs",
    value: function getResponseAggs() {
      return this.type && this.type.getResponseAggs(this) || [this];
    }
  }, {
    key: "getValue",
    value: function getValue(bucket) {
      return this.type.getValue(this, bucket);
    }
  }, {
    key: "getKey",
    value: function getKey(bucket, key) {
      if (this.type.getKey) {
        return this.type.getKey(bucket, key, this);
      } else {
        return '';
      }
    }
  }, {
    key: "getFieldDisplayName",
    value: function getFieldDisplayName() {
      var field = this.getField();
      return field ? field.displayName || this.fieldName() : '';
    }
  }, {
    key: "getField",
    value: function getField() {
      return this.params.field;
    }
  }, {
    key: "makeLabel",
    value: function makeLabel() {
      var percentageMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.params.customLabel) {
        return this.params.customLabel;
      }

      if (!this.type) return '';
      return percentageMode ? _i18n.i18n.translate('common.ui.vis.aggConfig.percentageOfLabel', {
        defaultMessage: 'Percentage of {label}',
        values: {
          label: this.type.makeLabel(this)
        }
      }) : "".concat(this.type.makeLabel(this));
    }
  }, {
    key: "getIndexPattern",
    value: function getIndexPattern() {
      return this.aggConfigs.indexPattern;
    }
  }, {
    key: "getTimeRange",
    value: function getTimeRange() {
      return this.aggConfigs.timeRange;
    }
  }, {
    key: "fieldFormatter",
    value: function fieldFormatter(contentType, defaultFormat) {
      var format = this.type && this.type.getFormat(this);

      if (format) {
        return format.getConverterFor(contentType);
      }

      return this.fieldOwnFormatter(contentType, defaultFormat);
    }
  }, {
    key: "fieldOwnFormatter",
    value: function fieldOwnFormatter(contentType, defaultFormat) {
      var fieldFormats = _new_platform.npStart.plugins.data.fieldFormats;
      var field = this.getField();
      var format = field && field.format;
      if (!format) format = defaultFormat;
      if (!format) format = fieldFormats.getDefaultInstance(_public.KBN_FIELD_TYPES.STRING);
      return format.getConverterFor(contentType);
    }
  }, {
    key: "fieldName",
    value: function fieldName() {
      var field = this.getField();
      return field ? field.name : '';
    }
  }, {
    key: "fieldIsTimeField",
    value: function fieldIsTimeField() {
      var indexPattern = this.getIndexPattern();
      if (!indexPattern) return false; // @ts-ignore

      var timeFieldName = indexPattern.timeFieldName;
      return timeFieldName && this.fieldName() === timeFieldName;
    }
  }, {
    key: "setType",
    value: function setType(type) {
      this.type = typeof type === 'string' ? getTypeFromRegistry(type) : type;
    }
  }, {
    key: "setSchema",
    value: function setSchema(schema) {
      this.schema = typeof schema === 'string' ? getSchemaFromRegistry(this.aggConfigs.schemas, schema) : schema;
    }
  }, {
    key: "type",
    get: function get() {
      return this.__type;
    },
    set: function set(type) {
      var _this4 = this;

      if (this.__typeDecorations) {
        _lodash.default.forOwn(this.__typeDecorations, function (prop, name) {
          // @ts-ignore
          delete this[name];
        }, this);
      }

      if (type && _lodash.default.isFunction(type.decorateAggConfig)) {
        this.__typeDecorations = type.decorateAggConfig();
        Object.defineProperties(this, this.__typeDecorations);
      }

      this.__type = type;
      var availableFields = [];
      var fieldParam = this.type && this.type.params.find(function (p) {
        return p.type === 'field';
      });

      if (fieldParam) {
        // @ts-ignore
        availableFields = fieldParam.getAvailableFields(this.getIndexPattern().fields);
      } // clear out the previous params except for a few special ones


      this.setParams({
        // split row/columns is "outside" of the agg, so don't reset it
        row: this.params.row,
        // almost every agg has fields, so we try to persist that when type changes
        field: availableFields.find(function (field) {
          return field.name === _this4.getField();
        })
      });
    }
  }, {
    key: "schema",
    get: function get() {
      return this.__schema;
    },
    set: function set(schema) {
      this.__schema = schema;
    }
  }]);

  return AggConfig;
}();

exports.AggConfig = AggConfig;