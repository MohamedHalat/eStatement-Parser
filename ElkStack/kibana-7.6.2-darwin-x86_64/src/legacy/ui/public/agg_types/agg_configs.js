"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggConfigs = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _agg_config = require("./agg_config");

var _agg_groups = require("../vis/editors/default/agg_groups");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function removeParentAggs(obj) {
  for (var prop in obj) {
    if (prop === 'parentAggs') delete obj[prop];else if (_typeof(obj[prop]) === 'object') removeParentAggs(obj[prop]);
  }
}

function parseParentAggs(dslLvlCursor, dsl) {
  if (dsl.parentAggs) {
    _lodash.default.each(dsl.parentAggs, function (agg, key) {
      dslLvlCursor[key] = agg;
      parseParentAggs(dslLvlCursor, agg);
    });
  }
}

var AggConfigs =
/*#__PURE__*/
function () {
  function AggConfigs(indexPattern) {
    var _this = this;

    var configStates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var schemas = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, AggConfigs);

    _defineProperty(this, "indexPattern", void 0);

    _defineProperty(this, "schemas", void 0);

    _defineProperty(this, "timeRange", void 0);

    _defineProperty(this, "aggs", void 0);

    configStates = _agg_config.AggConfig.ensureIds(configStates);
    this.aggs = [];
    this.indexPattern = indexPattern;
    this.schemas = schemas;
    configStates.forEach(function (params) {
      return _this.createAggConfig(params);
    });

    if (this.schemas) {
      this.initializeDefaultsFromSchemas(schemas);
    }
  }

  _createClass(AggConfigs, [{
    key: "initializeDefaultsFromSchemas",
    value: function initializeDefaultsFromSchemas(schemas) {
      var _this2 = this;

      // Set the defaults for any schema which has them. If the defaults
      // for some reason has more then the max only set the max number
      // of defaults (not sure why a someone define more...
      // but whatever). Also if a schema.name is already set then don't
      // set anything.
      (0, _lodash.default)(schemas).filter(function (schema) {
        return Array.isArray(schema.defaults) && schema.defaults.length > 0;
      }).each(function (schema) {
        if (!_this2.aggs.find(function (agg) {
          return agg.schema && agg.schema.name === schema.name;
        })) {
          var defaults = schema.defaults.slice(0, schema.max);

          _lodash.default.each(defaults, function (defaultState) {
            var state = _lodash.default.defaults({
              id: _agg_config.AggConfig.nextId(_this2.aggs)
            }, defaultState);

            _this2.aggs.push(new _agg_config.AggConfig(_this2, state));
          });
        }
      }).commit();
    }
  }, {
    key: "setTimeRange",
    value: function setTimeRange(timeRange) {
      this.timeRange = timeRange;

      var updateAggTimeRange = function updateAggTimeRange(agg) {
        _lodash.default.each(agg.params, function (param) {
          if (param instanceof _agg_config.AggConfig) {
            updateAggTimeRange(param);
          }
        });

        if (_lodash.default.get(agg, 'type.name') === 'date_histogram') {
          agg.params.timeRange = timeRange;
        }
      };

      this.aggs.forEach(updateAggTimeRange);
    } // clone method will reuse existing AggConfig in the list (will not create new instances)

  }, {
    key: "clone",
    value: function clone() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$enabledOnly = _ref.enabledOnly,
          enabledOnly = _ref$enabledOnly === void 0 ? true : _ref$enabledOnly;

      var filterAggs = function filterAggs(agg) {
        if (!enabledOnly) return true;
        return agg.enabled;
      };

      var aggConfigs = new AggConfigs(this.indexPattern, this.aggs.filter(filterAggs), this.schemas);
      return aggConfigs;
    }
  }, {
    key: "createAggConfig",
    value: function createAggConfig(params) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$addToAggConfigs = _ref2.addToAggConfigs,
          addToAggConfigs = _ref2$addToAggConfigs === void 0 ? true : _ref2$addToAggConfigs;

      var aggConfig;

      if (params instanceof _agg_config.AggConfig) {
        aggConfig = params;
        params.parent = this;
      } else {
        aggConfig = new _agg_config.AggConfig(this, params);
      }

      if (addToAggConfigs) {
        this.aggs.push(aggConfig);
      }

      return aggConfig;
    }
    /**
     * Data-by-data comparison of this Aggregation
     * Ignores the non-array indexes
     * @param aggConfigs an AggConfigs instance
     */

  }, {
    key: "jsonDataEquals",
    value: function jsonDataEquals(aggConfigs) {
      if (aggConfigs.length !== this.aggs.length) {
        return false;
      }

      for (var i = 0; i < this.aggs.length; i += 1) {
        if (!_lodash.default.isEqual(aggConfigs[i].toJSON(), this.aggs[i].toJSON())) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "toDsl",
    value: function toDsl() {
      var _this3 = this;

      var hierarchical = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var dslTopLvl = {};
      var dslLvlCursor;
      var nestedMetrics;

      if (hierarchical) {
        // collect all metrics, and filter out the ones that we won't be copying
        nestedMetrics = this.aggs.filter(function (agg) {
          return agg.type.type === 'metrics' && agg.type.name !== 'count';
        }).map(function (agg) {
          return {
            config: agg,
            dsl: agg.toDsl(_this3)
          };
        });
      }

      this.getRequestAggs().filter(function (config) {
        return !config.type.hasNoDsl;
      }).forEach(function (config, i, list) {
        if (!dslLvlCursor) {
          // start at the top level
          dslLvlCursor = dslTopLvl;
        } else {
          var prevConfig = list[i - 1];
          var prevDsl = dslLvlCursor[prevConfig.id]; // advance the cursor and nest under the previous agg, or
          // put it on the same level if the previous agg doesn't accept
          // sub aggs

          dslLvlCursor = prevDsl.aggs || dslLvlCursor;
        }

        var dsl = dslLvlCursor[config.id] = config.toDsl(_this3);
        var subAggs;
        parseParentAggs(dslLvlCursor, dsl);

        if (config.type.type === _agg_groups.AggGroupNames.Buckets && i < list.length - 1) {
          // buckets that are not the last item in the list accept sub-aggs
          subAggs = dsl.aggs || (dsl.aggs = {});
        }

        if (subAggs && nestedMetrics) {
          nestedMetrics.forEach(function (agg) {
            subAggs[agg.config.id] = agg.dsl; // if a nested metric agg has parent aggs, we have to add them to every level of the tree
            // to make sure "bucket_path" references in the nested metric agg itself are still working

            if (agg.dsl.parentAggs) {
              Object.entries(agg.dsl.parentAggs).forEach(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    parentAggId = _ref4[0],
                    parentAgg = _ref4[1];

                subAggs[parentAggId] = parentAgg;
              });
            }
          });
        }
      });
      removeParentAggs(dslTopLvl);
      return dslTopLvl;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return _toConsumableArray(this.aggs);
    }
  }, {
    key: "byIndex",
    value: function byIndex(index) {
      return this.aggs[index];
    }
  }, {
    key: "byId",
    value: function byId(id) {
      return this.aggs.find(function (agg) {
        return agg.id === id;
      });
    }
  }, {
    key: "byName",
    value: function byName(name) {
      return this.aggs.filter(function (agg) {
        return agg.type.name === name;
      });
    }
  }, {
    key: "byType",
    value: function byType(type) {
      return this.aggs.filter(function (agg) {
        return agg.type.type === type;
      });
    }
  }, {
    key: "byTypeName",
    value: function byTypeName(type) {
      return this.aggs.filter(function (agg) {
        return agg.type.name === type;
      });
    }
  }, {
    key: "bySchemaName",
    value: function bySchemaName(schema) {
      return this.aggs.filter(function (agg) {
        return agg.schema && agg.schema.name === schema;
      });
    }
  }, {
    key: "bySchemaGroup",
    value: function bySchemaGroup(group) {
      return this.aggs.filter(function (agg) {
        return agg.schema && agg.schema.group === group;
      });
    }
  }, {
    key: "getRequestAggs",
    value: function getRequestAggs() {
      // collect all the aggregations
      var aggregations = this.aggs.filter(function (agg) {
        return agg.enabled && agg.type;
      }).reduce(function (requestValuesAggs, agg) {
        var aggs = agg.getRequestAggs();
        return aggs ? requestValuesAggs.concat(aggs) : requestValuesAggs;
      }, []); // move metrics to the end

      return _lodash.default.sortBy(aggregations, function (agg) {
        return agg.type.type === _agg_groups.AggGroupNames.Metrics ? 1 : 0;
      });
    }
  }, {
    key: "getRequestAggById",
    value: function getRequestAggById(id) {
      return this.aggs.find(function (agg) {
        return agg.id === id;
      });
    }
    /**
     * Gets the AggConfigs (and possibly ResponseAggConfigs) that
     * represent the values that will be produced when all aggs
     * are run.
     *
     * With multi-value metric aggs it is possible for a single agg
     * request to result in multiple agg values, which is why the length
     * of a vis' responseValuesAggs may be different than the vis' aggs
     *
     * @return {array[AggConfig]}
     */

  }, {
    key: "getResponseAggs",
    value: function getResponseAggs() {
      return this.getRequestAggs().reduce(function (responseValuesAggs, agg) {
        var aggs = agg.getResponseAggs();
        return aggs ? responseValuesAggs.concat(aggs) : responseValuesAggs;
      }, []);
    }
    /**
     * Find a response agg by it's id. This may be an agg in the aggConfigs, or one
     * created specifically for a response value
     *
     * @param  {string} id - the id of the agg to find
     * @return {AggConfig}
     */

  }, {
    key: "getResponseAggById",
    value: function getResponseAggById(id) {
      id = String(id);

      var reqAgg = _lodash.default.find(this.getRequestAggs(), function (agg) {
        return id.substr(0, String(agg.id).length) === agg.id;
      });

      if (!reqAgg) return;
      return _lodash.default.find(reqAgg.getResponseAggs(), {
        id: id
      });
    }
  }, {
    key: "onSearchRequestStart",
    value: function onSearchRequestStart(searchSource, options) {
      return Promise.all( // @ts-ignore
      this.getRequestAggs().map(function (agg) {
        return agg.onSearchRequestStart(searchSource, options);
      }));
    }
  }]);

  return AggConfigs;
}();

exports.AggConfigs = AggConfigs;