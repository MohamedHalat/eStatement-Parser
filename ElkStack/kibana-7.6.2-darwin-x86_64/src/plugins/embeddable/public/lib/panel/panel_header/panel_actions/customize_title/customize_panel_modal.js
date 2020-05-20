"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizePanelModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

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

var CustomizePanelModal =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomizePanelModal, _Component);

  function CustomizePanelModal(props) {
    var _this;

    _classCallCheck(this, CustomizePanelModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomizePanelModal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "updateTitle", function (title) {
      // An empty string will mean "use the default value", which is represented by setting
      // title to undefined (where as an empty string is actually used to indicate "hide title").
      _this.setState({
        title: title === '' ? undefined : title
      });
    });

    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      _this.setState({
        title: undefined
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onHideTitleToggle", function () {
      _this.setState(function (prevState) {
        return {
          hideTitle: !prevState.hideTitle
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "save", function () {
      if (_this.state.hideTitle) {
        _this.props.updateTitle('');
      } else {
        var _newTitle = _this.state.title === '' ? undefined : _this.state.title;

        _this.props.updateTitle(_newTitle);
      }
    });

    _this.state = {
      hideTitle: props.embeddable.getOutput().title === '',
      title: props.embeddable.getInput().title
    };
    return _this;
  }

  _createClass(CustomizePanelModal, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, {
        "data-test-subj": "customizePanelTitle"
      }, "Customize panel")), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
        checked: !this.state.hideTitle,
        "data-test-subj": "customizePanelHideTitle",
        id: "hideTitle",
        label: _react.default.createElement(_react2.FormattedMessage, {
          defaultMessage: "Show panel title",
          id: "embeddableApi.customizePanel.modal.showTitle"
        }),
        onChange: this.onHideTitleToggle
      })), _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('embeddableApi.customizePanel.modal.optionsMenuForm.panelTitleFormRowLabel', {
          defaultMessage: 'Panel title'
        })
      }, _react.default.createElement(_eui.EuiFieldText, {
        id: "panelTitleInput",
        "data-test-subj": "customEmbeddablePanelTitleInput",
        name: "min",
        type: "text",
        disabled: this.state.hideTitle,
        placeholder: this.props.embeddable.getOutput().defaultTitle,
        value: this.state.title || '',
        onChange: function onChange(e) {
          return _this2.updateTitle(e.target.value);
        },
        "aria-label": _i18n.i18n.translate('embeddableApi.customizePanel.modal.optionsMenuForm.panelTitleInputAriaLabel', {
          defaultMessage: 'Enter a custom title for your panel'
        }),
        append: _react.default.createElement(_eui.EuiButtonEmpty, {
          "data-test-subj": "resetCustomEmbeddablePanelTitle",
          onClick: this.reset,
          disabled: this.state.hideTitle
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "embeddableApi.customizePanel.modal.optionsMenuForm.resetCustomDashboardButtonLabel",
          defaultMessage: "Reset"
        }))
      }))), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: function onClick() {
          return _this2.props.updateTitle(_this2.props.embeddable.getOutput().title);
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "embeddableApi.customizePanel.modal.cancel",
        defaultMessage: "Cancel"
      })), _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "saveNewTitleButton",
        onClick: this.save,
        fill: true
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "embeddableApi.customizePanel.modal.saveButtonTitle",
        defaultMessage: "Save"
      }))));
    }
  }]);

  return CustomizePanelModal;
}(_react.Component);

exports.CustomizePanelModal = CustomizePanelModal;