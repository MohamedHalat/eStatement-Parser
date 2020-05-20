"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompatibleAggs = getCompatibleAggs;
exports.TopAggregateParamEditor = TopAggregateParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getCompatibleAggs(agg) {
  var _ref = agg.getAggParams().find(function (_ref2) {
    var name = _ref2.name;
    return name === 'aggregate';
  }),
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options;

  return options.filter(function (option) {
    return option.isCompatible(agg);
  });
}

function TopAggregateParamEditor(_ref3) {
  var agg = _ref3.agg,
      aggParam = _ref3.aggParam,
      value = _ref3.value,
      showValidation = _ref3.showValidation,
      setValue = _ref3.setValue,
      setValidity = _ref3.setValidity,
      setTouched = _ref3.setTouched;
  var isFirstRun = (0, _react.useRef)(true);
  var fieldType = agg.params.field && agg.params.field.type;
  var emptyValue = {
    text: '',
    value: 'EMPTY_VALUE',
    disabled: true,
    hidden: true
  };
  var filteredOptions = getCompatibleAggs(agg).map(function (_ref4) {
    var text = _ref4.text,
        val = _ref4.value;
    return {
      text: text,
      value: val
    };
  }).sort(function (a, b) {
    return a.text.toLowerCase().localeCompare(b.text.toLowerCase());
  });
  var options = [emptyValue].concat(_toConsumableArray(filteredOptions));
  var disabled = fieldType && !filteredOptions.length;
  var isValid = disabled || !!value;

  var label = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.aggregateWithLabel",
    defaultMessage: "Aggregate with"
  }), ' ', _react.default.createElement(_eui.EuiIconTip, {
    position: "right",
    type: "questionInCircle",
    content: _i18n.i18n.translate('common.ui.aggTypes.aggregateWithTooltip', {
      defaultMessage: 'Choose a strategy for combining multiple hits or a multi-valued field into a single metric.'
    })
  }));

  (0, _react.useEffect)(function () {
    setValidity(isValid);
  }, [isValid]);
  (0, _react.useEffect)(function () {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (value) {
      if (aggParam.options.find(function (opt) {
        return opt.value === value.value;
      })) {
        return;
      }

      setValue();
    }

    if (filteredOptions.length === 1) {
      setValue(aggParam.options.find(function (opt) {
        return opt.value === filteredOptions[0].value;
      }));
    }
  }, [fieldType]);

  var handleChange = function handleChange(event) {
    if (event.target.value === emptyValue.value) {
      setValue();
    } else {
      setValue(aggParam.options.find(function (opt) {
        return opt.value === event.target.value;
      }));
    }
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    compressed: true
  }, _react.default.createElement(_eui.EuiSelect, {
    options: options,
    value: value ? value.value : emptyValue.value,
    onChange: handleChange,
    fullWidth: true,
    compressed: true,
    isInvalid: showValidation ? !isValid : false,
    disabled: disabled,
    onBlur: setTouched,
    "data-test-subj": "visDefaultEditorAggregateWith"
  }));
}