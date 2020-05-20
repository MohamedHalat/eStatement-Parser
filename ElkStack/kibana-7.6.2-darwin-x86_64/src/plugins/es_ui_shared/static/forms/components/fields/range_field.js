"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _hook_form_lib = require("../../hook_form_lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const RangeField = ({
  field,
  euiFieldProps = {},
  ...rest
}) => {
  const {
    isInvalid,
    errorMessage
  } = (0, _hook_form_lib.getFieldValidityAndErrorMessage)(field);
  const onChange = (0, _react.useCallback)(e => {
    const event = { ...e,
      value: `${e.currentTarget.value}`
    };
    field.onChange(event);
  }, [field.onChange]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: field.label,
    helpText: typeof field.helpText === 'function' ? field.helpText() : field.helpText,
    error: errorMessage,
    isInvalid: isInvalid,
    fullWidth: true,
    "data-test-subj": rest['data-test-subj'],
    describedByIds: rest.idAria ? [rest.idAria] : undefined
  }, _react.default.createElement(_eui.EuiRange, _extends({
    value: field.value,
    onChange: onChange,
    max: 10,
    min: 0,
    showRange: true,
    showInput: true,
    fullWidth: true,
    "data-test-subj": "range"
  }, euiFieldProps)));
};

exports.RangeField = RangeField;