"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissingBucketParamEditor = MissingBucketParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _switch = require("./switch");

var _migrate_include_exclude_format = require("../../../../agg_types/buckets/migrate_include_exclude_format");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function MissingBucketParamEditor(props) {
  var fieldTypeIsNotString = !(0, _migrate_include_exclude_format.isStringType)(props.agg);
  (0, _react.useEffect)(function () {
    if (fieldTypeIsNotString) {
      props.setValue(false);
    }
  }, [fieldTypeIsNotString]);
  return _react.default.createElement(_switch.SwitchParamEditor, _extends({
    dataTestSubj: "missingBucketSwitch",
    displayLabel: _i18n.i18n.translate('common.ui.aggTypes.otherBucket.showMissingValuesLabel', {
      defaultMessage: 'Show missing values'
    }),
    displayToolTip: _i18n.i18n.translate('common.ui.aggTypes.otherBucket.showMissingValuesTooltip', {
      defaultMessage: 'Only works for fields of type "string". When enabled, include documents with missing ' + 'values in the search. If this bucket is in the top N, it appears in the chart. ' + 'If not in the top N, and you enable "Group other values in separate bucket", ' + 'Elasticsearch adds the missing values to the "other" bucket.'
    }),
    disabled: fieldTypeIsNotString
  }, props));
}