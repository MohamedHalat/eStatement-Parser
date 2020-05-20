"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.termsBucketAgg = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _courier = require("../../courier");

var _bucket_agg_type = require("./_bucket_agg_type");

var _bucket_agg_types = require("./bucket_agg_types");

var _terms = require("./create_filter/terms");

var _inline_comp_wrapper = require("./inline_comp_wrapper");

var _migrate_include_exclude_format = require("./migrate_include_exclude_format");

var _order_agg = require("../../vis/editors/default/controls/order_agg");

var _order = require("../../vis/editors/default/controls/order");

var _order_by = require("../../vis/editors/default/controls/order_by");

var _size = require("../../vis/editors/default/controls/size");

var _missing_bucket = require("../../vis/editors/default/controls/missing_bucket");

var _other_bucket = require("../../vis/editors/default/controls/other_bucket");

var _public = require("../../../../../plugins/data/public");

var _schemas = require("../../vis/editors/default/schemas");

var _terms_other_bucket_helper = require("./_terms_other_bucket_helper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _all = _slicedToArray(new _schemas.Schemas([{
  group: 'none',
  name: 'orderAgg',
  // This string is never visible to the user so it doesn't need to be translated
  title: 'Order Agg',
  hideCustomLabel: true,
  aggFilter: _order_by.aggFilter
}]).all, 1),
    orderAggSchema = _all[0];

var termsTitle = _i18n.i18n.translate('common.ui.aggTypes.buckets.termsTitle', {
  defaultMessage: 'Terms'
});

var termsBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.TERMS,
  title: termsTitle,
  makeLabel: function makeLabel(agg) {
    var params = agg.params;
    return agg.getFieldDisplayName() + ': ' + params.order.text;
  },
  getFormat: function getFormat(bucket) {
    return {
      getConverterFor: function getConverterFor(type) {
        return function (val) {
          if (val === '__other__') {
            return bucket.params.otherBucketLabel;
          }

          if (val === '__missing__') {
            return bucket.params.missingBucketLabel;
          }

          return bucket.params.field.format.convert(val, type);
        };
      }
    };
  },
  createFilter: _terms.createFilterTerms,
  postFlightRequest: function postFlightRequest(resp, aggConfigs, aggConfig, searchSource, inspectorAdapters, abortSignal) {
    var nestedSearchSource, filterAgg, request, response;
    return regeneratorRuntime.async(function postFlightRequest$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (resp.aggregations) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", resp);

          case 2:
            nestedSearchSource = searchSource.createChild();

            if (!aggConfig.params.otherBucket) {
              _context.next = 16;
              break;
            }

            filterAgg = (0, _terms_other_bucket_helper.buildOtherBucketAgg)(aggConfigs, aggConfig, resp);

            if (filterAgg) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", resp);

          case 7:
            nestedSearchSource.setField('aggs', filterAgg);
            request = inspectorAdapters.requests.start(_i18n.i18n.translate('common.ui.aggTypes.buckets.terms.otherBucketTitle', {
              defaultMessage: 'Other bucket'
            }), {
              description: _i18n.i18n.translate('common.ui.aggTypes.buckets.terms.otherBucketDescription', {
                defaultMessage: 'This request counts the number of documents that fall ' + 'outside the criterion of the data buckets.'
              })
            });
            nestedSearchSource.getSearchRequestBody().then(function (body) {
              request.json(body);
            });
            request.stats((0, _courier.getRequestInspectorStats)(nestedSearchSource));
            _context.next = 13;
            return regeneratorRuntime.awrap(nestedSearchSource.fetch({
              abortSignal: abortSignal
            }));

          case 13:
            response = _context.sent;
            request.stats((0, _courier.getResponseInspectorStats)(nestedSearchSource, response)).ok({
              json: response
            });
            resp = (0, _terms_other_bucket_helper.mergeOtherBucketAggResponse)(aggConfigs, resp, response, aggConfig, filterAgg());

          case 16:
            if (aggConfig.params.missingBucket) {
              resp = (0, _terms_other_bucket_helper.updateMissingBucket)(resp, aggConfigs, aggConfig);
            }

            return _context.abrupt("return", resp);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: [_public.KBN_FIELD_TYPES.NUMBER, _public.KBN_FIELD_TYPES.BOOLEAN, _public.KBN_FIELD_TYPES.DATE, _public.KBN_FIELD_TYPES.IP, _public.KBN_FIELD_TYPES.STRING]
  }, {
    name: 'orderBy',
    editorComponent: _order_by.OrderByParamEditor,
    write: _lodash.noop // prevent default write, it's handled by orderAgg

  }, {
    name: 'orderAgg',
    type: 'agg',
    default: null,
    editorComponent: _order_agg.OrderAggParamEditor,
    makeAgg: function makeAgg(termsAgg, state) {
      state = state || {};
      state.schema = orderAggSchema;
      var orderAgg = termsAgg.aggConfigs.createAggConfig(state, {
        addToAggConfigs: false
      });
      orderAgg.id = termsAgg.id + '-orderAgg';
      return orderAgg;
    },
    write: function write(agg, output, aggs) {
      var dir = agg.params.order.value;
      var order = output.params.order = {};
      var orderAgg = agg.params.orderAgg || aggs.getResponseAggById(agg.params.orderBy); // TODO: This works around an Elasticsearch bug the always casts terms agg scripts to strings
      // thus causing issues with filtering. This probably causes other issues since float might not
      // be able to contain the number on the elasticsearch side

      if (output.params.script) {
        output.params.value_type = agg.getField().type === 'number' ? 'float' : agg.getField().type;
      }

      if (agg.params.missingBucket && agg.params.field.type === 'string') {
        output.params.missing = '__missing__';
      }

      if (!orderAgg) {
        order[agg.params.orderBy || '_count'] = dir;
        return;
      }

      if (orderAgg.type.name === 'count') {
        order._count = dir;
        return;
      }

      var orderAggId = orderAgg.id;

      if (orderAgg.parentId && aggs) {
        orderAgg = aggs.byId(orderAgg.parentId);
      }

      output.subAggs = (output.subAggs || []).concat(orderAgg);
      order[orderAggId] = dir;
    }
  }, {
    name: 'order',
    type: 'optioned',
    default: 'desc',
    editorComponent: (0, _inline_comp_wrapper.wrapWithInlineComp)(_order.OrderParamEditor),
    options: [{
      text: _i18n.i18n.translate('common.ui.aggTypes.buckets.terms.orderDescendingTitle', {
        defaultMessage: 'Descending'
      }),
      value: 'desc'
    }, {
      text: _i18n.i18n.translate('common.ui.aggTypes.buckets.terms.orderAscendingTitle', {
        defaultMessage: 'Ascending'
      }),
      value: 'asc'
    }],
    write: _lodash.noop // prevent default write, it's handled by orderAgg

  }, {
    name: 'size',
    editorComponent: (0, _inline_comp_wrapper.wrapWithInlineComp)(_size.SizeParamEditor),
    default: 5
  }, {
    name: 'otherBucket',
    default: false,
    editorComponent: _other_bucket.OtherBucketParamEditor,
    write: _lodash.noop
  }, {
    name: 'otherBucketLabel',
    type: 'string',
    default: _i18n.i18n.translate('common.ui.aggTypes.buckets.terms.otherBucketLabel', {
      defaultMessage: 'Other'
    }),
    displayName: _i18n.i18n.translate('common.ui.aggTypes.otherBucket.labelForOtherBucketLabel', {
      defaultMessage: 'Label for other bucket'
    }),
    shouldShow: function shouldShow(agg) {
      return agg.getParam('otherBucket');
    },
    write: _lodash.noop
  }, {
    name: 'missingBucket',
    default: false,
    editorComponent: _missing_bucket.MissingBucketParamEditor,
    write: _lodash.noop
  }, {
    name: 'missingBucketLabel',
    default: _i18n.i18n.translate('common.ui.aggTypes.buckets.terms.missingBucketLabel', {
      defaultMessage: 'Missing',
      description: "Default label used in charts when documents are missing a field.\n          Visible when you create a chart with a terms aggregation and enable \"Show missing values\""
    }),
    type: 'string',
    displayName: _i18n.i18n.translate('common.ui.aggTypes.otherBucket.labelForMissingValuesLabel', {
      defaultMessage: 'Label for missing values'
    }),
    shouldShow: function shouldShow(agg) {
      return agg.getParam('missingBucket');
    },
    write: _lodash.noop
  }, _objectSpread({
    name: 'exclude',
    displayName: _i18n.i18n.translate('common.ui.aggTypes.buckets.terms.excludeLabel', {
      defaultMessage: 'Exclude'
    }),
    type: 'string',
    advanced: true,
    shouldShow: _migrate_include_exclude_format.isStringType
  }, _migrate_include_exclude_format.migrateIncludeExcludeFormat), _objectSpread({
    name: 'include',
    displayName: _i18n.i18n.translate('common.ui.aggTypes.buckets.terms.includeLabel', {
      defaultMessage: 'Include'
    }),
    type: 'string',
    advanced: true,
    shouldShow: _migrate_include_exclude_format.isStringType
  }, _migrate_include_exclude_format.migrateIncludeExcludeFormat)]
});
exports.termsBucketAgg = termsBucketAgg;