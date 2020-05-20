"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableOptions = TableOptions;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _legacy_imports = require("../legacy_imports");

var _common = require("../../../kbn_vislib_vis_types/public/components/common");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function TableOptions(_ref) {
  var aggs = _ref.aggs,
      aggsLabels = _ref.aggsLabels,
      stateParams = _ref.stateParams,
      setValidity = _ref.setValidity,
      setValue = _ref.setValue;
  var percentageColumns = (0, _react.useMemo)(function () {
    return [{
      value: '',
      text: _i18n.i18n.translate('visTypeTable.params.defaultPercentageCol', {
        defaultMessage: 'Don’t show'
      })
    }].concat(_toConsumableArray((0, _legacy_imports.tabifyGetColumns)(aggs.getResponseAggs(), true).filter(function (col) {
      return (0, _utils.isAggConfigNumeric)((0, _lodash.get)(col, 'aggConfig.type.name'), stateParams.dimensions);
    }).map(function (_ref2) {
      var name = _ref2.name;
      return {
        value: name,
        text: name
      };
    })));
  }, [aggs, aggsLabels, stateParams.percentageCol, stateParams.dimensions]);
  var isPerPageValid = stateParams.perPage === '' || stateParams.perPage > 0;
  (0, _react.useEffect)(function () {
    setValidity(isPerPageValid);
  }, [isPerPageValid]);
  (0, _react.useEffect)(function () {
    if (!percentageColumns.find(function (_ref3) {
      var value = _ref3.value;
      return value === stateParams.percentageCol;
    }) && percentageColumns[0] && percentageColumns[0].value !== stateParams.percentageCol) {
      setValue('percentageCol', percentageColumns[0].value);
    }
  }, [percentageColumns, stateParams.percentageCol]);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_common.NumberInputOption, {
    label: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "visTypeTable.params.perPageLabel",
      defaultMessage: "Max rows per page"
    }), ' ', _react.default.createElement(_eui.EuiIconTip, {
      content: "Leaving this field empty means it will use number of buckets from the response.",
      position: "right"
    })),
    isInvalid: !isPerPageValid,
    min: 1,
    paramName: "perPage",
    value: stateParams.perPage,
    setValue: setValue
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('visTypeTable.params.showMetricsLabel', {
      defaultMessage: 'Show metrics for every bucket/level'
    }),
    paramName: "showMetricsAtAllLevels",
    value: stateParams.showMetricsAtAllLevels,
    setValue: setValue,
    "data-test-subj": "showMetricsAtAllLevels"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('visTypeTable.params.showPartialRowsLabel', {
      defaultMessage: 'Show partial rows'
    }),
    tooltip: _i18n.i18n.translate('visTypeTable.params.showPartialRowsTip', {
      defaultMessage: 'Show rows that have partial data. This will still calculate metrics for every bucket/level, even if they are not displayed.'
    }),
    paramName: "showPartialRows",
    value: stateParams.showPartialRows,
    setValue: setValue,
    "data-test-subj": "showPartialRows"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('visTypeTable.params.showTotalLabel', {
      defaultMessage: 'Show total'
    }),
    paramName: "showTotal",
    value: stateParams.showTotal,
    setValue: setValue
  }), _react.default.createElement(_common.SelectOption, {
    label: _i18n.i18n.translate('visTypeTable.params.totalFunctionLabel', {
      defaultMessage: 'Total function'
    }),
    disabled: !stateParams.showTotal,
    options: _utils.totalAggregations,
    paramName: "totalFunc",
    value: stateParams.totalFunc,
    setValue: setValue
  }), _react.default.createElement(_common.SelectOption, {
    label: _i18n.i18n.translate('visTypeTable.params.PercentageColLabel', {
      defaultMessage: 'Percentage column'
    }),
    options: percentageColumns,
    paramName: "percentageCol",
    value: stateParams.percentageCol,
    setValue: setValue,
    id: "datatableVisualizationPercentageCol"
  }));
}