"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeEditor = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactResizeDetector = _interopRequireDefault(require("react-resize-detector"));

var _reactMonacoEditor = _interopRequireDefault(require("react-monaco-editor"));

require("monaco-editor/esm/vs/base/common/worker/simpleWorker");

require("monaco-editor/esm/vs/base/worker/defaultWorkerFactory");

require("monaco-editor/esm/vs/editor/browser/controller/coreCommands.js");

require("monaco-editor/esm/vs/editor/browser/widget/codeEditorWidget.js");

require("monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js");

require("monaco-editor/esm/vs/editor/contrib/hover/hover.js");

require("monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.js");

var _editor_theme = require("./editor_theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CodeEditor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CodeEditor, _React$Component);

  function CodeEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CodeEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CodeEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_editor", null);

    _defineProperty(_assertThisInitialized(_this), "_editorWillMount", function (monaco) {
      if (_this.props.overrideEditorWillMount) {
        _this.props.overrideEditorWillMount(monaco);

        return;
      }

      if (_this.props.editorWillMount) {
        _this.props.editorWillMount(monaco);
      }

      monaco.languages.onLanguage(_this.props.languageId, function () {
        if (_this.props.suggestionProvider) {
          monaco.languages.registerCompletionItemProvider(_this.props.languageId, _this.props.suggestionProvider);
        }

        if (_this.props.signatureProvider) {
          monaco.languages.registerSignatureHelpProvider(_this.props.languageId, _this.props.signatureProvider);
        }

        if (_this.props.hoverProvider) {
          monaco.languages.registerHoverProvider(_this.props.languageId, _this.props.hoverProvider);
        }

        if (_this.props.languageConfiguration) {
          monaco.languages.setLanguageConfiguration(_this.props.languageId, _this.props.languageConfiguration);
        }
      }); // Register the theme

      monaco.editor.defineTheme('euiColors', _this.props.useDarkTheme ? _editor_theme.DARK_THEME : _editor_theme.LIGHT_THEME);
    });

    _defineProperty(_assertThisInitialized(_this), "_editorDidMount", function (editor, monaco) {
      _this._editor = editor;

      if (_this.props.editorDidMount) {
        _this.props.editorDidMount(editor, monaco);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_updateDimensions", function () {
      if (_this._editor) {
        _this._editor.layout();
      }
    });

    return _this;
  }

  _createClass(CodeEditor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          languageId = _this$props.languageId,
          value = _this$props.value,
          onChange = _this$props.onChange,
          width = _this$props.width,
          height = _this$props.height,
          options = _this$props.options;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactMonacoEditor.default, {
        theme: "euiColors",
        language: languageId,
        value: value,
        onChange: onChange,
        editorWillMount: this._editorWillMount,
        editorDidMount: this._editorDidMount,
        width: width,
        height: height,
        options: options
      }), _react.default.createElement(_reactResizeDetector.default, {
        handleWidth: true,
        handleHeight: true,
        onResize: this._updateDimensions
      }));
    }
  }]);

  return CodeEditor;
}(_react.default.Component);

exports.CodeEditor = CodeEditor;