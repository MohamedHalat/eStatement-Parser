"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeEditor = void 0;

var _react = _interopRequireDefault(require("react"));

var _ui_settings = require("../ui_settings");

var _code_editor = require("./code_editor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var CodeEditor = function CodeEditor(props) {
  var darkMode = (0, _ui_settings.useUiSetting)('theme:darkMode');
  return _react.default.createElement(_code_editor.CodeEditor, _extends({}, props, {
    useDarkTheme: darkMode
  }));
};

exports.CodeEditor = CodeEditor;