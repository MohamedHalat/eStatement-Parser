"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topHitMetricAgg = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _metric_agg_type = require("./metric_agg_type");

var _top_sort_field = require("../../vis/editors/default/controls/top_sort_field");

var _order = require("../../vis/editors/default/controls/order");

var _top_field = require("../../vis/editors/default/controls/top_field");

var _top_size = require("../../vis/editors/default/controls/top_size");

var _top_aggregate = require("../../vis/editors/default/controls/top_aggregate");

var _filter = require("../param_types/filter");

var _metric_agg_types = require("./metric_agg_types");

var _public = require("../../../../../plugins/data/public");

var _inline_comp_wrapper = require("../buckets/inline_comp_wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isNumericFieldSelected = function isNumericFieldSelected(agg) {
  var field = agg.getParam('field');
  return field && field.type && field.type === _public.KBN_FIELD_TYPES.NUMBER;
};

_filter.aggTypeFieldFilters.addFilter(function (field, aggConfig) {
  if (aggConfig.type.name !== _metric_agg_types.METRIC_TYPES.TOP_HITS || _lodash.default.get(aggConfig.schema, 'aggSettings.top_hits.allowStrings', false)) {
    return true;
  }

  return field.type === _public.KBN_FIELD_TYPES.NUMBER;
});

var topHitMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.TOP_HITS,
  title: _i18n.i18n.translate('common.ui.aggTypes.metrics.topHitTitle', {
    defaultMessage: 'Top Hit'
  }),
  makeLabel: function makeLabel(aggConfig) {
    var lastPrefixLabel = _i18n.i18n.translate('common.ui.aggTypes.metrics.topHit.lastPrefixLabel', {
      defaultMessage: 'Last'
    });

    var firstPrefixLabel = _i18n.i18n.translate('common.ui.aggTypes.metrics.topHit.firstPrefixLabel', {
      defaultMessage: 'First'
    });

    var prefix = aggConfig.getParam('sortOrder').value === 'desc' ? lastPrefixLabel : firstPrefixLabel;
    var size = aggConfig.getParam('size');

    if (size !== 1) {
      prefix += " ".concat(size);
    }

    var field = aggConfig.getParam('field');
    return "".concat(prefix, " ").concat(field ? field.displayName : '');
  },
  params: [{
    name: 'field',
    type: 'field',
    editorComponent: _top_field.TopFieldParamEditor,
    onlyAggregatable: false,
    filterFieldTypes: '*',
    write: function write(agg, output) {
      var field = agg.getParam('field');
      output.params = {};

      if (field.scripted) {
        output.params.script_fields = _defineProperty({}, field.name, {
          script: {
            source: field.script,
            lang: field.lang
          }
        });
      } else {
        if (field.readFromDocValues) {
          // always format date fields as date_time to avoid
          // displaying unformatted dates like epoch_millis
          // or other not-accepted momentjs formats
          var format = field.type === _public.KBN_FIELD_TYPES.DATE ? 'date_time' : 'use_field_mapping';
          output.params.docvalue_fields = [{
            field: field.name,
            format: format
          }];
        }

        output.params._source = field.name === '_source' ? true : field.name;
      }
    }
  }, {
    name: 'aggregate',
    type: 'optioned',
    editorComponent: (0, _inline_comp_wrapper.wrapWithInlineComp)(_top_aggregate.TopAggregateParamEditor),
    options: [{
      text: _i18n.i18n.translate('common.ui.aggTypes.metrics.topHit.minLabel', {
        defaultMessage: 'Min'
      }),
      isCompatible: isNumericFieldSelected,
      disabled: true,
      value: 'min'
    }, {
      text: _i18n.i18n.translate('common.ui.aggTypes.metrics.topHit.maxLabel', {
        defaultMessage: 'Max'
      }),
      isCompatible: isNumericFieldSelected,
      disabled: true,
      value: 'max'
    }, {
      text: _i18n.i18n.translate('common.ui.aggTypes.metrics.topHit.sumLabel', {
        defaultMessage: 'Sum'
      }),
      isCompatible: isNumericFieldSelected,
      disabled: true,
      value: 'sum'
    }, {
      text: _i18n.i18n.translate('common.ui.aggTypes.metrics.topHit.averageLabel', {
        defaultMessage: 'Average'
      }),
      isCompatible: isNumericFieldSelected,
      disabled: true,
      value: 'average'
    }, {
      text: _i18n.i18n.translate('common.ui.aggTypes.metrics.topHit.concatenateLabel', {
        defaultMessage: 'Concatenate'
      }),
      isCompatible: function isCompatible(aggConfig) {
        return _lodash.default.get(aggConfig.schema, 'aggSettings.top_hits.allowStrings', false);
      },
      disabled: true,
      value: 'concat'
    }],
    write: _lodash.default.noop
  }, {
    name: 'size',
    editorComponent: (0, _inline_comp_wrapper.wrapWithInlineComp)(_top_size.TopSizeParamEditor),
    default: 1
  }, {
    name: 'sortField',
    type: 'field',
    editorComponent: _top_sort_field.TopSortFieldParamEditor,
    filterFieldTypes: [_public.KBN_FIELD_TYPES.NUMBER, _public.KBN_FIELD_TYPES.DATE, _public.KBN_FIELD_TYPES.IP, _public.KBN_FIELD_TYPES.STRING],
    default: function _default(agg) {
      return agg.getIndexPattern().timeFieldName;
    },
    write: _lodash.default.noop // prevent default write, it is handled below

  }, {
    name: 'sortOrder',
    type: 'optioned',
    default: 'desc',
    editorComponent: _order.OrderParamEditor,
    options: [{
      text: _i18n.i18n.translate('common.ui.aggTypes.metrics.topHit.descendingLabel', {
        defaultMessage: 'Descending'
      }),
      value: 'desc'
    }, {
      text: _i18n.i18n.translate('common.ui.aggTypes.metrics.topHit.ascendingLabel', {
        defaultMessage: 'Ascending'
      }),
      value: 'asc'
    }],
    write: function write(agg, output) {
      var sortField = agg.params.sortField;
      var sortOrder = agg.params.sortOrder;

      if (sortField.scripted) {
        output.params.sort = [{
          _script: {
            script: {
              source: sortField.script,
              lang: sortField.lang
            },
            type: sortField.type,
            order: sortOrder.value
          }
        }];
      } else {
        output.params.sort = [_defineProperty({}, sortField.name, {
          order: sortOrder.value
        })];
      }
    }
  }],
  getValue: function getValue(agg, bucket) {
    var hits = _lodash.default.get(bucket, "".concat(agg.id, ".hits.hits"));

    if (!hits || !hits.length) {
      return null;
    }

    var path = agg.getParam('field').name;

    var values = _lodash.default.flatten(hits.map(function (hit) {
      return path === '_source' ? hit._source : agg.getIndexPattern().flattenHit(hit, true)[path];
    }));

    if (values.length === 1) {
      values = values[0];
    }

    if (Array.isArray(values)) {
      if (!_lodash.default.compact(values).length) {
        return null;
      }

      var aggregate = agg.getParam('aggregate');

      switch (aggregate.value) {
        case 'max':
          return _lodash.default.max(values);

        case 'min':
          return _lodash.default.min(values);

        case 'sum':
          return _lodash.default.sum(values);

        case 'average':
          return _lodash.default.sum(values) / values.length;
      }
    }

    return values;
  }
});
exports.topHitMetricAgg = topHitMetricAgg;