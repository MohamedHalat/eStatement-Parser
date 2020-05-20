"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangesParamEditor = DateRangesParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _documentation_links = require("../../../../documentation_links");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var validateDateMath = function validateDateMath() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (!value) {
    return true;
  }

  var moment = _datemath.default.parse(value);

  return moment && moment.isValid();
};

function DateRangesParamEditor(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? [] : _ref$value,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity;

  var _useState = (0, _react.useState)(function () {
    return value.map(function (range) {
      return _objectSpread({}, range, {
        id: generateId()
      });
    });
  }),
      _useState2 = _slicedToArray(_useState, 2),
      ranges = _useState2[0],
      setRanges = _useState2[1];

  var hasInvalidRange = value.some(function (_ref2) {
    var from = _ref2.from,
        to = _ref2.to;
    return !from && !to || !validateDateMath(from) || !validateDateMath(to);
  }); // set up an initial range when there is no default range

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
  (0, _react.useEffect)(function () {
    setValidity(!hasInvalidRange);
  }, [hasInvalidRange]);

  var updateRanges = function updateRanges(rangeValues) {
    // do not set internal id parameter into saved object
    setValue(rangeValues.map(function (range) {
      return (0, _lodash.omit)(range, 'id');
    }));
    setRanges(rangeValues);
  };

  var onAddRange = function onAddRange() {
    return updateRanges([].concat(_toConsumableArray(ranges), [{
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
      return range.id === id ? _objectSpread({}, range, _defineProperty({}, key, newValue === '' ? undefined : newValue)) : range;
    }));
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    compressed: true,
    fullWidth: true
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_eui.EuiLink, {
    href: (0, _documentation_links.getDocLink)('date.dateMath'),
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.dateRanges.acceptedDateFormatsLinkText",
    defaultMessage: "Acceptable date formats"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), ranges.map(function (_ref3) {
    var from = _ref3.from,
        to = _ref3.to,
        id = _ref3.id;

    var deleteBtnTitle = _i18n.i18n.translate('common.ui.aggTypes.dateRanges.removeRangeButtonAriaLabel', {
      defaultMessage: 'Remove the range of {from} to {to}',
      values: {
        from: from || FROM_PLACEHOLDER,
        to: to || TO_PLACEHOLDER
      }
    });

    var areBothEmpty = !from && !to;
    return _react.default.createElement(_react.Fragment, {
      key: id
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      responsive: false,
      gutterSize: "s",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldText, {
      "aria-label": _i18n.i18n.translate('common.ui.aggTypes.dateRanges.fromColumnLabel', {
        defaultMessage: 'From',
        description: 'Beginning of a date range, e.g. *From* 2018-02-26 To 2018-02-28'
      }),
      compressed: true,
      fullWidth: true,
      isInvalid: areBothEmpty || !validateDateMath(from),
      placeholder: FROM_PLACEHOLDER,
      value: from || '',
      onChange: function onChange(ev) {
        return onChangeRange(id, 'from', ev.target.value);
      }
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "sortRight",
      color: "subdued"
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldText, {
      "aria-label": _i18n.i18n.translate('common.ui.aggTypes.dateRanges.toColumnLabel', {
        defaultMessage: 'To',
        description: 'End of a date range, e.g. From 2018-02-26 *To* 2018-02-28'
      }),
      compressed: true,
      fullWidth: true,
      isInvalid: areBothEmpty || !validateDateMath(to),
      placeholder: TO_PLACEHOLDER,
      value: to || '',
      onChange: function onChange(ev) {
        return onChangeRange(id, 'to', ev.target.value);
      }
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
  }), hasInvalidRange && _react.default.createElement(_eui.EuiFormErrorText, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.dateRanges.errorMessage",
    defaultMessage: "Each range should have at least one valid date."
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "plusInCircleFilled",
    onClick: onAddRange,
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.dateRanges.addRangeButtonLabel",
    defaultMessage: "Add range"
  })))));
}