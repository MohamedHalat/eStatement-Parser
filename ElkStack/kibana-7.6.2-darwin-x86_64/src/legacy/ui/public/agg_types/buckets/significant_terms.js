"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.significantTermsBucketAgg = void 0;

var _i18n = require("@kbn/i18n");

var _size = require("../../vis/editors/default/controls/size");

var _bucket_agg_type = require("./_bucket_agg_type");

var _terms = require("./create_filter/terms");

var _migrate_include_exclude_format = require("./migrate_include_exclude_format");

var _bucket_agg_types = require("./bucket_agg_types");

var _public = require("../../../../../plugins/data/public");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var significantTermsTitle = _i18n.i18n.translate('common.ui.aggTypes.buckets.significantTermsTitle', {
  defaultMessage: 'Significant Terms'
});

var significantTermsBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.SIGNIFICANT_TERMS,
  title: significantTermsTitle,
  makeLabel: function makeLabel(aggConfig) {
    return _i18n.i18n.translate('common.ui.aggTypes.buckets.significantTermsLabel', {
      defaultMessage: 'Top {size} unusual terms in {fieldName}',
      values: {
        size: aggConfig.params.size,
        fieldName: aggConfig.getFieldDisplayName()
      }
    });
  },
  createFilter: _terms.createFilterTerms,
  params: [{
    name: 'field',
    type: 'field',
    scriptable: false,
    filterFieldTypes: _public.KBN_FIELD_TYPES.STRING
  }, {
    name: 'size',
    editorComponent: _size.SizeParamEditor,
    default: ''
  }, _objectSpread({
    name: 'exclude',
    displayName: _i18n.i18n.translate('common.ui.aggTypes.buckets.significantTerms.excludeLabel', {
      defaultMessage: 'Exclude'
    }),
    type: 'string',
    advanced: true,
    shouldShow: _migrate_include_exclude_format.isStringType
  }, _migrate_include_exclude_format.migrateIncludeExcludeFormat), _objectSpread({
    name: 'include',
    displayName: _i18n.i18n.translate('common.ui.aggTypes.buckets.significantTerms.includeLabel', {
      defaultMessage: 'Include'
    }),
    type: 'string',
    advanced: true,
    shouldShow: _migrate_include_exclude_format.isStringType
  }, _migrate_include_exclude_format.migrateIncludeExcludeFormat)]
});
exports.significantTermsBucketAgg = significantTermsBucketAgg;