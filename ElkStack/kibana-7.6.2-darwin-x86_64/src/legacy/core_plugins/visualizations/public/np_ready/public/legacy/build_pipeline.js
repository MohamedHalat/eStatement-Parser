"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPipeline = exports.getVisParams = exports.buildVislibDimensions = exports.buildPipelineVisFunction = exports.prepareDimension = exports.prepareValue = exports.prepareString = exports.escapeString = exports.prepareJson = exports.getSchemas = void 0;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _legacy_imports = require("../../../legacy_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var vislibCharts = ['area', 'gauge', 'goal', 'heatmap', 'histogram', 'horizontal_bar', 'line'];

var getSchemas = function getSchemas(vis, timeRange) {
  var createSchemaConfig = function createSchemaConfig(accessor, agg) {
    if ((0, _legacy_imports.isDateHistogramBucketAggConfig)(agg)) {
      agg.params.timeRange = timeRange;
      (0, _legacy_imports.setBounds)(agg, true);
    }

    var hasSubAgg = ['derivative', 'moving_avg', 'serial_diff', 'cumulative_sum', 'sum_bucket', 'avg_bucket', 'min_bucket', 'max_bucket'].includes(agg.type.name);
    var format = (0, _legacy_imports.createFormat)(hasSubAgg ? agg.params.customMetric || agg.aggConfigs.getRequestAggById(agg.params.metricAgg) : agg);
    var params = {};

    if (agg.type.name === 'geohash_grid') {
      params.precision = agg.params.precision;
      params.useGeocentroid = agg.params.useGeocentroid;
    }

    var label = agg.makeLabel && agg.makeLabel();
    return {
      accessor: accessor,
      format: format,
      params: params,
      label: label,
      aggType: agg.type.name
    };
  };

  var cnt = 0;
  var schemas = {
    metric: []
  };
  var responseAggs = vis.aggs.getResponseAggs().filter(function (agg) {
    return agg.enabled;
  });
  var isHierarchical = vis.isHierarchical();
  var metrics = responseAggs.filter(function (agg) {
    return agg.type.type === 'metrics';
  });
  responseAggs.forEach(function (agg) {
    var skipMetrics = false;
    var schemaName = agg.schema ? agg.schema.name || agg.schema : null;

    if (_typeof(schemaName) === 'object') {
      schemaName = null;
    }

    if (!schemaName) {
      if (agg.type.name === 'geo_centroid') {
        schemaName = 'geo_centroid';
      } else {
        cnt++;
        return;
      }
    }

    if (schemaName === 'split') {
      schemaName = "split_".concat(agg.params.row ? 'row' : 'column');
      skipMetrics = responseAggs.length - metrics.length > 1;
    }

    if (!schemas[schemaName]) {
      schemas[schemaName] = [];
    }

    if (!isHierarchical || agg.type.type !== 'metrics') {
      schemas[schemaName].push(createSchemaConfig(cnt++, agg));
    }

    if (isHierarchical && (agg.type.type !== 'metrics' || metrics.length === responseAggs.length)) {
      metrics.forEach(function (metric) {
        var schemaConfig = createSchemaConfig(cnt++, metric);

        if (!skipMetrics) {
          schemas.metric.push(schemaConfig);
        }
      });
    }
  });
  return schemas;
};

exports.getSchemas = getSchemas;

var prepareJson = function prepareJson(variable, data) {
  if (data === undefined) {
    return '';
  }

  return "".concat(variable, "='").concat(JSON.stringify(data).replace(/\\/g, "\\\\").replace(/'/g, "\\'"), "' ");
};

exports.prepareJson = prepareJson;

var escapeString = function escapeString(data) {
  return data.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
};

exports.escapeString = escapeString;

var prepareString = function prepareString(variable, data) {
  if (data === undefined) {
    return '';
  }

  return "".concat(variable, "='").concat(escapeString(data), "' ");
};

exports.prepareString = prepareString;

var prepareValue = function prepareValue(variable, data) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (data === undefined) {
    return '';
  }

  if (raw) {
    return "".concat(variable, "=").concat(data, " ");
  }

  switch (_typeof(data)) {
    case 'string':
      return prepareString(variable, data);

    case 'object':
      return prepareJson(variable, data);

    default:
      return "".concat(variable, "=").concat(data, " ");
  }
};

exports.prepareValue = prepareValue;

var prepareDimension = function prepareDimension(variable, data) {
  if (data === undefined) {
    return '';
  }

  var expr = "".concat(variable, "={visdimension ").concat(data.accessor, " ");

  if (data.format) {
    expr += prepareValue('format', data.format.id);
    expr += prepareJson('formatParams', data.format.params);
  }

  expr += '} ';
  return expr;
};

exports.prepareDimension = prepareDimension;

var adjustVislibDimensionFormmaters = function adjustVislibDimensionFormmaters(vis, dimensions) {
  var visState = vis.getCurrentState();
  var visConfig = visState.params;
  var responseAggs = vis.aggs.getResponseAggs().filter(function (agg) {
    return agg.enabled;
  });
  (dimensions.y || []).forEach(function (yDimension) {
    var yAgg = responseAggs[yDimension.accessor];
    var seriesParam = (visConfig.seriesParams || []).find(function (param) {
      return param.data.id === yAgg.id;
    });

    if (seriesParam) {
      var usedValueAxis = (visConfig.valueAxes || []).find(function (valueAxis) {
        return valueAxis.id === seriesParam.valueAxis;
      });

      if ((0, _lodash.get)(usedValueAxis, 'scale.mode') === 'percentage') {
        yDimension.format = {
          id: 'percent'
        };
      }
    }

    if ((0, _lodash.get)(visConfig, 'gauge.percentageMode') === true) {
      yDimension.format = {
        id: 'percent'
      };
    }
  });
};

var buildPipelineVisFunction = {
  vega: function vega(visState) {
    return "vega ".concat(prepareString('spec', visState.params.spec));
  },
  input_control_vis: function input_control_vis(visState) {
    return "input_control_vis ".concat(prepareJson('visConfig', visState.params));
  },
  metrics: function metrics(visState, schemas) {
    var uiState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var meta = arguments.length > 3 ? arguments[3] : undefined;
    var paramsJson = prepareJson('params', visState.params);
    var uiStateJson = prepareJson('uiState', uiState);
    var savedObjectIdParam = prepareString('savedObjectId', meta === null || meta === void 0 ? void 0 : meta.savedObjectId);
    var params = [paramsJson, uiStateJson, savedObjectIdParam].filter(function (param) {
      return Boolean(param);
    });
    return "tsvb ".concat(params.join(' '));
  },
  timelion: function timelion(visState) {
    var expression = prepareString('expression', visState.params.expression);
    var interval = prepareString('interval', visState.params.interval);
    return "timelion_vis ".concat(expression).concat(interval);
  },
  markdown: function markdown(visState) {
    var _visState$params = visState.params,
        markdown = _visState$params.markdown,
        fontSize = _visState$params.fontSize,
        openLinksInNewTab = _visState$params.openLinksInNewTab;
    var escapedMarkdown = '';

    if (typeof markdown === 'string' || markdown instanceof String) {
      escapedMarkdown = escapeString(markdown.toString());
    }

    var expr = "markdownvis '".concat(escapedMarkdown, "' ");
    expr += prepareValue('font', "{font size=".concat(fontSize, "}"), true);
    expr += prepareValue('openLinksInNewTab', openLinksInNewTab);
    return expr;
  },
  table: function table(visState, schemas) {
    var visConfig = _objectSpread({}, visState.params, {}, buildVisConfig.table(schemas, visState.params));

    return "kibana_table ".concat(prepareJson('visConfig', visConfig));
  },
  metric: function metric(visState, schemas) {
    var _visState$params$metr = visState.params.metric,
        percentageMode = _visState$params$metr.percentageMode,
        useRanges = _visState$params$metr.useRanges,
        colorSchema = _visState$params$metr.colorSchema,
        metricColorMode = _visState$params$metr.metricColorMode,
        colorsRange = _visState$params$metr.colorsRange,
        labels = _visState$params$metr.labels,
        invertColors = _visState$params$metr.invertColors,
        style = _visState$params$metr.style;
    var _buildVisConfig$metri = buildVisConfig.metric(schemas).dimensions,
        metrics = _buildVisConfig$metri.metrics,
        bucket = _buildVisConfig$metri.bucket; // fix formatter for percentage mode

    if ((0, _lodash.get)(visState.params, 'metric.percentageMode') === true) {
      metrics.forEach(function (metric) {
        metric.format = {
          id: 'percent'
        };
      });
    }

    var expr = "metricvis ";
    expr += prepareValue('percentage', percentageMode);
    expr += prepareValue('colorScheme', colorSchema);
    expr += prepareValue('colorMode', metricColorMode);
    expr += prepareValue('useRanges', useRanges);
    expr += prepareValue('invertColors', invertColors);
    expr += prepareValue('showLabels', labels && labels.show);

    if (style) {
      expr += prepareValue('bgFill', style.bgFill);
      expr += prepareValue('font', "{font size=".concat(style.fontSize, "}"), true);
      expr += prepareValue('subText', style.subText);
      expr += prepareDimension('bucket', bucket);
    }

    if (colorsRange) {
      colorsRange.forEach(function (range) {
        expr += prepareValue('colorRange', "{range from=".concat(range.from, " to=").concat(range.to, "}"), true);
      });
    }

    metrics.forEach(function (metric) {
      expr += prepareDimension('metric', metric);
    });
    return expr;
  },
  tagcloud: function tagcloud(visState, schemas) {
    var _visState$params2 = visState.params,
        scale = _visState$params2.scale,
        orientation = _visState$params2.orientation,
        minFontSize = _visState$params2.minFontSize,
        maxFontSize = _visState$params2.maxFontSize,
        showLabel = _visState$params2.showLabel;

    var _buildVisConfig$tagcl = buildVisConfig.tagcloud(schemas),
        metric = _buildVisConfig$tagcl.metric,
        bucket = _buildVisConfig$tagcl.bucket;

    var expr = "tagcloud metric={visdimension ".concat(metric.accessor, "} ");
    expr += prepareValue('scale', scale);
    expr += prepareValue('orientation', orientation);
    expr += prepareValue('minFontSize', minFontSize);
    expr += prepareValue('maxFontSize', maxFontSize);
    expr += prepareValue('showLabel', showLabel);
    expr += prepareDimension('bucket', bucket);
    return expr;
  },
  region_map: function region_map(visState, schemas) {
    var visConfig = _objectSpread({}, visState.params, {}, buildVisConfig.region_map(schemas));

    return "regionmap ".concat(prepareJson('visConfig', visConfig));
  },
  tile_map: function tile_map(visState, schemas) {
    var visConfig = _objectSpread({}, visState.params, {}, buildVisConfig.tile_map(schemas));

    return "tilemap ".concat(prepareJson('visConfig', visConfig));
  },
  pie: function pie(visState, schemas) {
    var visConfig = _objectSpread({}, visState.params, {}, buildVisConfig.pie(schemas));

    return "kibana_pie ".concat(prepareJson('visConfig', visConfig));
  }
};
exports.buildPipelineVisFunction = buildPipelineVisFunction;
var buildVisConfig = {
  table: function table(schemas) {
    var visParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var visConfig = {};
    var metrics = schemas.metric;
    var buckets = schemas.bucket || [];
    visConfig.dimensions = {
      metrics: metrics,
      buckets: buckets,
      splitRow: schemas.split_row,
      splitColumn: schemas.split_column
    };

    if (visParams.showMetricsAtAllLevels === false && visParams.showPartialRows === true) {
      // Handle case where user wants to see partial rows but not metrics at all levels.
      // This requires calculating how many metrics will come back in the tabified response,
      // and removing all metrics from the dimensions except the last set.
      var metricsPerBucket = metrics.length / buckets.length;
      visConfig.dimensions.metrics.splice(0, metricsPerBucket * buckets.length - metricsPerBucket);
    }

    return visConfig;
  },
  metric: function metric(schemas) {
    var visConfig = {
      dimensions: {}
    };
    visConfig.dimensions.metrics = schemas.metric;

    if (schemas.group) {
      visConfig.dimensions.bucket = schemas.group[0];
    }

    return visConfig;
  },
  tagcloud: function tagcloud(schemas) {
    var visConfig = {};
    visConfig.metric = schemas.metric[0];

    if (schemas.segment) {
      visConfig.bucket = schemas.segment[0];
    }

    return visConfig;
  },
  region_map: function region_map(schemas) {
    var visConfig = {};
    visConfig.metric = schemas.metric[0];

    if (schemas.segment) {
      visConfig.bucket = schemas.segment[0];
    }

    return visConfig;
  },
  tile_map: function tile_map(schemas) {
    var visConfig = {};
    visConfig.dimensions = {
      metric: schemas.metric[0],
      geohash: schemas.segment ? schemas.segment[0] : null,
      geocentroid: schemas.geo_centroid ? schemas.geo_centroid[0] : null
    };
    return visConfig;
  },
  pie: function pie(schemas) {
    var visConfig = {};
    visConfig.dimensions = {
      metric: schemas.metric[0],
      buckets: schemas.segment,
      splitRow: schemas.split_row,
      splitColumn: schemas.split_column
    };
    return visConfig;
  }
};

var buildVislibDimensions = function buildVislibDimensions(vis, params) {
  var schemas, dimensions, xAgg, _xAgg$buckets$getInte, esUnit, esValue, intervalParam, output;

  return regeneratorRuntime.async(function buildVislibDimensions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          schemas = getSchemas(vis, params.timeRange);
          dimensions = {
            x: schemas.segment ? schemas.segment[0] : null,
            y: schemas.metric,
            z: schemas.radius,
            width: schemas.width,
            series: schemas.group,
            splitRow: schemas.split_row,
            splitColumn: schemas.split_column
          };

          if (!schemas.segment) {
            _context.next = 21;
            break;
          }

          xAgg = vis.aggs.getResponseAggs()[dimensions.x.accessor];

          if (!(xAgg.type.name === 'date_histogram')) {
            _context.next = 14;
            break;
          }

          dimensions.x.params.date = true;
          _xAgg$buckets$getInte = xAgg.buckets.getInterval(), esUnit = _xAgg$buckets$getInte.esUnit, esValue = _xAgg$buckets$getInte.esValue;
          dimensions.x.params.interval = _moment.default.duration(esValue, esUnit);
          dimensions.x.params.intervalESValue = esValue;
          dimensions.x.params.intervalESUnit = esUnit;
          dimensions.x.params.format = xAgg.buckets.getScaledDateFormat();
          dimensions.x.params.bounds = xAgg.buckets.getBounds();
          _context.next = 21;
          break;

        case 14:
          if (!(xAgg.type.name === 'histogram')) {
            _context.next = 21;
            break;
          }

          intervalParam = xAgg.type.paramByName('interval');
          output = {
            params: {}
          };
          _context.next = 19;
          return regeneratorRuntime.awrap(intervalParam.modifyAggConfigOnSearchRequestStart(xAgg, params.searchSource, {
            abortSignal: params.abortSignal
          }));

        case 19:
          intervalParam.write(xAgg, output);
          dimensions.x.params.interval = output.params.interval;

        case 21:
          adjustVislibDimensionFormmaters(vis, dimensions);
          return _context.abrupt("return", dimensions);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  });
}; // If not using the expression pipeline (i.e. visualize_data_loader), we need a mechanism to
// take a Vis object and decorate it with the necessary params (dimensions, bucket, metric, etc)


exports.buildVislibDimensions = buildVislibDimensions;

var getVisParams = function getVisParams(vis, params) {
  var schemas, visConfig;
  return regeneratorRuntime.async(function getVisParams$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          schemas = getSchemas(vis, params.timeRange);
          visConfig = (0, _lodash.cloneDeep)(vis.params);

          if (!buildVisConfig[vis.type.name]) {
            _context2.next = 6;
            break;
          }

          visConfig = _objectSpread({}, visConfig, {}, buildVisConfig[vis.type.name](schemas, visConfig));
          _context2.next = 10;
          break;

        case 6:
          if (!vislibCharts.includes(vis.type.name)) {
            _context2.next = 10;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(buildVislibDimensions(vis, params));

        case 9:
          visConfig.dimensions = _context2.sent;

        case 10:
          return _context2.abrupt("return", visConfig);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getVisParams = getVisParams;

var buildPipeline = function buildPipeline(vis, params) {
  var searchSource, indexPattern, query, filters, visState, uiState, pipeline, schemas, _visConfig, _visConfig2;

  return regeneratorRuntime.async(function buildPipeline$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          searchSource = params.searchSource;
          indexPattern = vis.indexPattern;
          query = searchSource.getField('query');
          filters = searchSource.getField('filter');
          visState = vis.getCurrentState();
          uiState = vis.getUiState(); // context

          pipeline = "kibana | kibana_context ";

          if (query) {
            pipeline += prepareJson('query', query);
          }

          if (filters) {
            pipeline += prepareJson('filters', filters);
          }

          if (vis.savedSearchId) {
            pipeline += prepareString('savedSearchId', vis.savedSearchId);
          }

          pipeline += '| '; // request handler

          if (vis.type.requestHandler === 'courier') {
            pipeline += "esaggs\n    ".concat(prepareString('index', indexPattern.id), "\n    metricsAtAllLevels=").concat(vis.isHierarchical(), "\n    partialRows=").concat(vis.type.requiresPartialRows || vis.params.showPartialRows || false, "\n    ").concat(prepareJson('aggConfigs', visState.aggs), " | ");
          }

          schemas = getSchemas(vis, params.timeRange);

          if (!buildPipelineVisFunction[vis.type.name]) {
            _context3.next = 17;
            break;
          }

          pipeline += buildPipelineVisFunction[vis.type.name](visState, schemas, uiState, {
            savedObjectId: params.savedObjectId
          });
          _context3.next = 36;
          break;

        case 17:
          if (!vislibCharts.includes(vis.type.name)) {
            _context3.next = 25;
            break;
          }

          _visConfig = visState.params;
          _context3.next = 21;
          return regeneratorRuntime.awrap(buildVislibDimensions(vis, params));

        case 21:
          _visConfig.dimensions = _context3.sent;
          pipeline += "vislib type='".concat(vis.type.name, "' ").concat(prepareJson('visConfig', visState.params));
          _context3.next = 36;
          break;

        case 25:
          if (!vis.type.toExpression) {
            _context3.next = 32;
            break;
          }

          _context3.t0 = pipeline;
          _context3.next = 29;
          return regeneratorRuntime.awrap(vis.type.toExpression(vis, params));

        case 29:
          pipeline = _context3.t0 += _context3.sent;
          _context3.next = 36;
          break;

        case 32:
          _visConfig2 = visState.params;
          _visConfig2.dimensions = schemas;
          pipeline += "visualization type='".concat(vis.type.name, "'\n    ").concat(prepareJson('visConfig', _visConfig2), "\n    metricsAtAllLevels=").concat(vis.isHierarchical(), "\n    partialRows=").concat(vis.type.requiresPartialRows || vis.params.showPartialRows || false, " ");

          if (indexPattern) {
            pipeline += "".concat(prepareString('index', indexPattern.id));
          }

        case 36:
          return _context3.abrupt("return", pipeline);

        case 37:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.buildPipeline = buildPipeline;