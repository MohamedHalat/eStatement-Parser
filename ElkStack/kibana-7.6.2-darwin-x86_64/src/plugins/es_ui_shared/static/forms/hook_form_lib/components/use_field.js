"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUseField = exports.UseField = void 0;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../hooks");

var _form_context = require("../form_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const UseField = _react.default.memo(({
  path,
  config,
  defaultValue,
  component,
  componentProps,
  readDefaultValueOnForm = true,
  onChange,
  children
}) => {
  const form = (0, _form_context.useFormContext)();
  component = component === undefined ? 'input' : component;
  componentProps = componentProps === undefined ? {} : componentProps;

  if (typeof defaultValue === 'undefined' && readDefaultValueOnForm) {
    defaultValue = form.getFieldDefaultValue(path);
  }

  if (!config) {
    config = form.__readFieldConfigFromSchema(path);
  } // Don't modify the config object


  const configCopy = typeof defaultValue !== 'undefined' ? { ...config,
    defaultValue
  } : { ...config
  };

  if (!configCopy.path) {
    configCopy.path = path;
  } else {
    if (configCopy.path !== path) {
      throw new Error(`Field path mismatch. Got "${path}" but field config has "${configCopy.path}".`);
    }
  }

  const field = (0, _hooks.useField)(form, path, configCopy, onChange); // Children prevails over anything else provided.

  if (children) {
    return children(field);
  }

  if (component === 'input') {
    return _react.default.createElement("input", _extends({
      type: field.type,
      onChange: field.onChange,
      value: field.value
    }, componentProps));
  }

  return component({
    field,
    ...componentProps
  });
});
/**
 * Get a <UseField /> component providing some common props for all instances.
 * @param partialProps Partial props to apply to all <UseField /> instances
 */


exports.UseField = UseField;

const getUseField = partialProps => props => {
  const componentProps = { ...partialProps,
    ...props
  };
  return _react.default.createElement(UseField, componentProps);
};

exports.getUseField = getUseField;