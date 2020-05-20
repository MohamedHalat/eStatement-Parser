"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _range_control_editor = require("./range_control_editor");

var _list_control_editor = require("./list_control_editor");

var _editor_utils = require("../../editor_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var ControlEditorUi =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ControlEditorUi, _PureComponent);

  function ControlEditorUi() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ControlEditorUi);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ControlEditorUi)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "changeLabel", function (event) {
      _this.props.handleLabelChange(_this.props.controlIndex, event);
    });

    _defineProperty(_assertThisInitialized(_this), "removeControl", function () {
      _this.props.handleRemoveControl(_this.props.controlIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "moveUpControl", function () {
      _this.props.moveControl(_this.props.controlIndex, -1);
    });

    _defineProperty(_assertThisInitialized(_this), "moveDownControl", function () {
      _this.props.moveControl(_this.props.controlIndex, 1);
    });

    _defineProperty(_assertThisInitialized(_this), "changeIndexPattern", function (indexPatternId) {
      _this.props.handleIndexPatternChange(_this.props.controlIndex, indexPatternId);
    });

    _defineProperty(_assertThisInitialized(_this), "changeFieldName", function (fieldName) {
      _this.props.handleFieldNameChange(_this.props.controlIndex, fieldName);
    });

    return _this;
  }

  _createClass(ControlEditorUi, [{
    key: "renderEditor",
    value: function renderEditor() {
      var controlEditor = null;

      switch (this.props.controlParams.type) {
        case _editor_utils.CONTROL_TYPES.LIST:
          controlEditor = _react.default.createElement(_list_control_editor.ListControlEditor, {
            controlIndex: this.props.controlIndex,
            controlParams: this.props.controlParams,
            handleIndexPatternChange: this.changeIndexPattern,
            handleFieldNameChange: this.changeFieldName,
            getIndexPattern: this.props.getIndexPattern,
            handleNumberOptionChange: this.props.handleNumberOptionChange,
            handleCheckboxOptionChange: this.props.handleCheckboxOptionChange,
            parentCandidates: this.props.parentCandidates,
            handleParentChange: this.props.handleParentChange,
            deps: this.props.deps
          });
          break;

        case _editor_utils.CONTROL_TYPES.RANGE:
          controlEditor = _react.default.createElement(_range_control_editor.RangeControlEditor, {
            controlIndex: this.props.controlIndex,
            controlParams: this.props.controlParams,
            handleIndexPatternChange: this.changeIndexPattern,
            handleFieldNameChange: this.changeFieldName,
            getIndexPattern: this.props.getIndexPattern,
            handleNumberOptionChange: this.props.handleNumberOptionChange,
            deps: this.props.deps
          });
          break;

        default:
          throw new Error("Unhandled control editor type ".concat(this.props.controlParams.type));
      }

      var labelId = "controlLabel".concat(this.props.controlIndex);
      return _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
        id: labelId,
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "inputControl.editor.controlEditor.controlLabel",
          defaultMessage: "Control Label"
        })
      }, _react.default.createElement(_eui.EuiFieldText, {
        value: this.props.controlParams.label,
        onChange: this.changeLabel
      })), controlEditor);
    }
  }, {
    key: "renderEditorButtons",
    value: function renderEditorButtons() {
      return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiButtonIcon, {
        "aria-label": this.props.intl.formatMessage({
          id: 'inputControl.editor.controlEditor.moveControlUpAriaLabel',
          defaultMessage: 'Move control up'
        }),
        color: "primary",
        onClick: this.moveUpControl,
        iconType: "sortUp",
        "data-test-subj": "inputControlEditorMoveUpControl".concat(this.props.controlIndex)
      }), _react.default.createElement(_eui.EuiButtonIcon, {
        "aria-label": this.props.intl.formatMessage({
          id: 'inputControl.editor.controlEditor.moveControlDownAriaLabel',
          defaultMessage: 'Move control down'
        }),
        color: "primary",
        onClick: this.moveDownControl,
        iconType: "sortDown",
        "data-test-subj": "inputControlEditorMoveDownControl".concat(this.props.controlIndex)
      }), _react.default.createElement(_eui.EuiButtonIcon, {
        "aria-label": this.props.intl.formatMessage({
          id: 'inputControl.editor.controlEditor.removeControlAriaLabel',
          defaultMessage: 'Remove control'
        }),
        color: "danger",
        onClick: this.removeControl,
        iconType: "cross",
        "data-test-subj": "inputControlEditorRemoveControl".concat(this.props.controlIndex)
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_eui.EuiPanel, {
        grow: false,
        className: "icvControlEditor__panel"
      }, _react.default.createElement(_eui.EuiAccordion, {
        id: "controlEditorAccordion",
        buttonContent: (0, _editor_utils.getTitle)(this.props.controlParams, this.props.controlIndex),
        extraAction: this.renderEditorButtons(),
        initialIsOpen: true
      }, _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), this.renderEditor()));
    }
  }]);

  return ControlEditorUi;
}(_react.PureComponent);

var ControlEditor = (0, _react2.injectI18n)(ControlEditorUi);
exports.ControlEditor = ControlEditor;