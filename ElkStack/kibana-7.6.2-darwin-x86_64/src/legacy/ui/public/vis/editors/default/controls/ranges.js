"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangesParamEditor = RangesParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FROM_PLACEHOLDER = "\u2212\u221E";
var TO_PLACEHOLDER = "+\u221E";
var generateId = (0, _eui.htmlIdGenerator)();

var isEmpty = function isEmpty(value) {
  return value === undefined || value === null;
};

function RangesParamEditor(_ref) {
  var _ref$dataTestSubj = _ref['data-test-subj'],
      dataTestSubj = _ref$dataTestSubj === void 0 ? 'range' : _ref$dataTestSubj,
      addRangeValues = _ref.addRangeValues,
      error = _ref.error,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? [] : _ref$value,
      hidePlaceholders = _ref.hidePlaceholders,
      setValue = _ref.setValue,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity,
      validateRange = _ref.validateRange;

  var _useState = (0, _react.useState)(function () {
    return value.map(function (range) {
      return _objectSpread({}, range, {
        id: generateId()
      });
    });
  }),
      _useState2 = _slicedToArray(_useState, 2),
      ranges = _useState2[0],
      setRanges = _useState2[1]; // set up an initial range when there is no default range


  (0, _react.useEffect)(function () {
    if (!value.length) {
      onAddRange();
    }
  }, []);
  (0, _react.useEffect)(function () {
    // responsible for discarding changes
    if (value.length !== ranges.length || value.some(function (range, index) {
      return !(0, _lodash.isEqual)(range, (0, _lodash.omit)(ranges[index], 'id'));
    })) {
      setRanges(value.map(function (range) {
        return _objectSpread({}, range, {
          id: generateId()
        });
      }));
    }
  }, [value]);

  var updateRanges = function updateRanges(rangeValues) {
    // do not set internal id parameter into saved object
    setValue(rangeValues.map(function (range) {
      return (0, _lodash.omit)(range, 'id');
    }));
    setRanges(rangeValues);

    if (setTouched) {
      setTouched(true);
    }
  };

  var onAddRange = function onAddRange() {
    return addRangeValues ? updateRanges([].concat(_toConsumableArray(ranges), [_objectSpread({}, addRangeValues(), {
      id: generateId()
    })])) : updateRanges([].concat(_toConsumableArray(ranges), [{
      id: generateId()
    }]));
  };

  var onRemoveRange = function onRemoveRange(id) {
    return updateRanges(ranges.filter(function (range) {
      return range.id !== id;
    }));
  };

  var onChangeRange = function onChangeRange(id, key, newValue) {
    return updateRanges(ranges.map(function (range) {
      return range.id === id ? _objectSpread({}, range, _defineProperty({}, key, newValue === '' ? undefined : parseFloat(newValue))) : range;
    }));
  };

  var hasInvalidRange = validateRange && ranges.some(function (_ref2, index) {
    var from = _ref2.from,
        to = _ref2.to,
        id = _ref2.id;

    var _validateRange = validateRange({
      from: from,
      to: to
    }, index),
        _validateRange2 = _slicedToArray(_validateRange, 2),
        isFromValid = _validateRange2[0],
        isToValid = _validateRange2[1];

    return !isFromValid || !isToValid;
  });
  (0, _react.useEffect)(function () {
    if (setValidity) {
      setValidity(!hasInvalidRange);
    }
  }, [hasInvalidRange, setValidity]);
  return _react.default.createElement(_eui.EuiFormRow, {
    compressed: true,
    fullWidth: true
  }, _react.default.createElement(_react.default.Fragment, null, ranges.map(function (_ref3, index) {
    var from = _ref3.from,
        to = _ref3.to,
        id = _ref3.id;

    var deleteBtnTitle = _i18n.i18n.translate('common.ui.aggTypes.ranges.removeRangeButtonAriaLabel', {
      defaultMessage: 'Remove the range of {from} to {to}',
      values: {
        from: isEmpty(from) ? FROM_PLACEHOLDER : from,
        to: isEmpty(to) ? TO_PLACEHOLDER : to
      }
    });

    var isFromValid = true;
    var isToValid = true;

    if (validateRange) {
      var _validateRange3 = validateRange({
        from: from,
        to: to
      }, index);

      var _validateRange4 = _slicedToArray(_validateRange3, 2);

      isFromValid = _validateRange4[0];
      isToValid = _validateRange4[1];
    }

    var gtePrependLabel = _i18n.i18n.translate('common.ui.aggTypes.ranges.greaterThanOrEqualPrepend', {
      defaultMessage: "\u2265"
    });

    var gteTooltipContent = _i18n.i18n.translate('common.ui.aggTypes.ranges.greaterThanOrEqualTooltip', {
      defaultMessage: 'Greater than or equal to'
    });

    var ltPrependLabel = _i18n.i18n.translate('common.ui.aggTypes.ranges.lessThanPrepend', {
      defaultMessage: "<"
    });

    var ltTooltipContent = _i18n.i18n.translate('common.ui.aggTypes.ranges.lessThanTooltip', {
      defaultMessage: 'Less than'
    });

    return _react.default.createElement(_react.Fragment, {
      key: id
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      alignItems: "center",
      responsive: false
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
      "aria-label": _i18n.i18n.translate('common.ui.aggTypes.ranges.fromLabel', {
        defaultMessage: 'From'
      }),
      "data-test-subj": "".concat(dataTestSubj).concat(index, "__from"),
      value: isEmpty(from) ? '' : from,
      placeholder: hidePlaceholders ? undefined : FROM_PLACEHOLDER,
      onChange: function onChange(ev) {
        return onChangeRange(id, 'from', ev.target.value);
      },
      fullWidth: true,
      compressed: true,
      isInvalid: !isFromValid,
      prepend: _react.default.createElement(_eui.EuiToolTip, {
        content: gteTooltipContent
      }, _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, gtePrependLabel))
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "sortRight",
      color: "subdued"
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
      "aria-label": _i18n.i18n.translate('common.ui.aggTypes.ranges.toLabel', {
        defaultMessage: 'To'
      }),
      "data-test-subj": "".concat(dataTestSubj).concat(index, "__to"),
      value: isEmpty(to) ? '' : to,
      placeholder: hidePlaceholders ? undefined : TO_PLACEHOLDER,
      onChange: function onChange(ev) {
        return onChangeRange(id, 'to', ev.target.value);
      },
      fullWidth: true,
      compressed: true,
      isInvalid: !isToValid,
      prepend: _react.default.createElement(_eui.EuiToolTip, {
        content: ltTooltipContent
      }, _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, ltPrependLabel))
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      title: deleteBtnTitle,
      "aria-label": deleteBtnTitle,
      disabled: value.length === 1,
      color: "danger",
      iconType: "trash",
      onClick: function onClick() {
        return onRemoveRange(id);
      }
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "xs"
    }));
  }), hasInvalidRange && error && _react.default.createElement(_eui.EuiFormErrorText, null, error), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "".concat(dataTestSubj, "__addRangeButton"),
    iconType: "plusInCircleFilled",
    onClick: onAddRange,
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.ranges.addRangeButtonLabel",
    defaultMessage: "Add range"
  })))));
}