"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _string = require("../../../static/validators/string");

var _use_json = require("./use_json");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var JsonEditor = _react.default.memo(function (_ref) {
  var label = _ref.label,
      helpText = _ref.helpText,
      onUpdate = _ref.onUpdate,
      value = _ref.value,
      defaultValue = _ref.defaultValue,
      euiCodeEditorProps = _ref.euiCodeEditorProps,
      propsError = _ref.error;
  var isControlled = value !== undefined;

  var _useJson = (0, _use_json.useJson)({
    defaultValue: defaultValue,
    onUpdate: onUpdate,
    isControlled: isControlled
  }),
      content = _useJson.content,
      setContent = _useJson.setContent,
      internalError = _useJson.error;

  var debouncedSetContent = (0, _react.useCallback)((0, _lodash.debounce)(setContent, 300), [setContent]); // We let the consumer control the validation and the error message.

  var error = isControlled ? propsError : internalError;
  var onEuiCodeEditorChange = (0, _react.useCallback)(function (updated) {
    if (isControlled) {
      onUpdate({
        data: {
          raw: updated,
          format: function format() {
            return JSON.parse(updated);
          }
        },
        validate: function validate() {
          return (0, _string.isJSON)(updated);
        },
        isValid: undefined
      });
    } else {
      debouncedSetContent(updated);
    }
  }, [isControlled]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    helpText: helpText,
    isInvalid: typeof error === 'string',
    error: error,
    fullWidth: true
  }, _react.default.createElement(_eui.EuiCodeEditor, _extends({
    mode: "json",
    theme: "textmate",
    width: "100%",
    height: "500px",
    setOptions: {
      showLineNumbers: false,
      tabSize: 2
    },
    editorProps: {
      $blockScrolling: Infinity
    },
    showGutter: false,
    minLines: 6,
    value: isControlled ? value : content,
    onChange: onEuiCodeEditorChange
  }, euiCodeEditorProps)));
});

exports.JsonEditor = JsonEditor;