"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PercentileRanksEditor = PercentileRanksEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _number_list = require("./components/number_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function PercentileRanksEditor(_ref) {
  var agg = _ref.agg,
      showValidation = _ref.showValidation,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? [] : _ref$value,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity,
      setValue = _ref.setValue;

  var label = _i18n.i18n.translate('common.ui.aggTypes.percentileRanks.valuesLabel', {
    defaultMessage: 'Values'
  });

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isValid = _useState2[0],
      setIsValid = _useState2[1];

  var setModelValidity = function setModelValidity(isListValid) {
    setIsValid(isListValid);
    setValidity(isListValid);
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    labelType: "legend",
    fullWidth: true,
    id: "visEditorPercentileRanksLabel".concat(agg.id),
    isInvalid: showValidation ? !isValid : false,
    compressed: true,
    "data-test-subj": "visEditorPercentileRanks"
  }, _react.default.createElement(_number_list.NumberList, {
    labelledbyId: "visEditorPercentileRanksLabel".concat(agg.id, "-legend"),
    numberArray: value,
    range: "[-Infinity,Infinity]",
    unitName: _i18n.i18n.translate('common.ui.aggTypes.percentileRanks.valueUnitNameText', {
      defaultMessage: 'value'
    }),
    showValidation: showValidation,
    onChange: setValue,
    setTouched: setTouched,
    setValidity: setModelValidity
  }));
}