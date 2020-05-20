"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FieldFormat", {
  enumerable: true,
  get: function get() {
    return _public.FieldFormat;
  }
});
exports.getTableAggs = exports.getFormat = exports.createFormat = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _new_platform = require("ui/new_platform");

var _public = require("../../../../../../plugins/data/public");

var _get_columns = require("../../../agg_response/tabify/_get_columns");

var _date_range = require("../../../agg_types/buckets/date_range");

var _ip_range = require("../../../agg_types/buckets/ip_range");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isTermsFieldFormat(serializedFieldFormat) {
  return serializedFieldFormat.id === 'terms';
}

var getConfig = function getConfig(key, defaultOverride) {
  return _new_platform.npStart.core.uiSettings.get(key, defaultOverride);
};

var DefaultFieldFormat = _public.FieldFormat.from(_lodash.identity);

var getFieldFormat = function getFieldFormat(id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fieldFormats = _new_platform.npStart.plugins.data.fieldFormats;

  if (id) {
    var Format = fieldFormats.getType(id);

    if (Format) {
      return new Format(params, getConfig);
    }
  }

  return new DefaultFieldFormat();
};

var createFormat = function createFormat(agg) {
  var format = agg.params.field ? agg.params.field.format.toJSON() : {};
  var formats = {
    date_range: function date_range() {
      return {
        id: 'date_range',
        params: format
      };
    },
    ip_range: function ip_range() {
      return {
        id: 'ip_range',
        params: format
      };
    },
    percentile_ranks: function percentile_ranks() {
      return {
        id: 'percent'
      };
    },
    count: function count() {
      return {
        id: 'number'
      };
    },
    cardinality: function cardinality() {
      return {
        id: 'number'
      };
    },
    date_histogram: function date_histogram() {
      return {
        id: 'date',
        params: {
          pattern: agg.buckets.getScaledDateFormat()
        }
      };
    },
    terms: function terms() {
      return {
        id: 'terms',
        params: _objectSpread({
          id: format.id,
          otherBucketLabel: agg.params.otherBucketLabel,
          missingBucketLabel: agg.params.missingBucketLabel
        }, format.params)
      };
    },
    range: function range() {
      return {
        id: 'range',
        params: _objectSpread({
          id: format.id
        }, format.params)
      };
    }
  };
  return formats[agg.type.name] ? formats[agg.type.name]() : format;
};

exports.createFormat = createFormat;

var getFormat = function getFormat(mapping) {
  if (!mapping) {
    return new DefaultFieldFormat();
  }

  var id = mapping.id;

  if (id === 'range') {
    var RangeFormat = _public.FieldFormat.from(function (range) {
      var format = getFieldFormat(id, mapping.params);
      var gte = "\u2265";
      var lt = "<";
      return _i18n.i18n.translate('common.ui.aggTypes.buckets.ranges.rangesFormatMessage', {
        defaultMessage: '{gte} {from} and {lt} {to}',
        values: {
          gte: gte,
          from: format.convert(range.gte),
          lt: lt,
          to: format.convert(range.lt)
        }
      });
    });

    return new RangeFormat();
  } else if (id === 'date_range') {
    var nestedFormatter = mapping.params;

    var DateRangeFormat = _public.FieldFormat.from(function (range) {
      var format = getFieldFormat(nestedFormatter.id, nestedFormatter.params);
      return (0, _date_range.convertDateRangeToString)(range, format.convert.bind(format));
    });

    return new DateRangeFormat();
  } else if (id === 'ip_range') {
    var _nestedFormatter = mapping.params;

    var IpRangeFormat = _public.FieldFormat.from(function (range) {
      var format = getFieldFormat(_nestedFormatter.id, _nestedFormatter.params);
      return (0, _ip_range.convertIPRangeToString)(range, format.convert.bind(format));
    });

    return new IpRangeFormat();
  } else if (isTermsFieldFormat(mapping) && mapping.params) {
    var params = mapping.params;

    var convert = function convert(val, type) {
      var format = getFieldFormat(params.id, mapping.params);

      if (val === '__other__') {
        return params.otherBucketLabel;
      }

      if (val === '__missing__') {
        return params.missingBucketLabel;
      }

      return format.convert(val, type);
    };

    return {
      convert: convert,
      getConverterFor: function getConverterFor(type) {
        return function (val) {
          return convert(val, type);
        };
      }
    };
  } else {
    return getFieldFormat(id, mapping.params);
  }
};

exports.getFormat = getFormat;

var getTableAggs = function getTableAggs(vis) {
  if (!vis.aggs || !vis.aggs.getResponseAggs) {
    return [];
  }

  var columns = (0, _get_columns.tabifyGetColumns)(vis.aggs.getResponseAggs(), !vis.isHierarchical());
  return columns.map(function (c) {
    return c.aggConfig;
  });
};

exports.getTableAggs = getTableAggs;