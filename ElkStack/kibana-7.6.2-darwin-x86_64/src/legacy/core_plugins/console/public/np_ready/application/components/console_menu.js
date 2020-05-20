"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleMenu = void 0;

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

var ConsoleMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(ConsoleMenu, _Component);

  function ConsoleMenu(props) {
    var _this;

    _classCallCheck(this, ConsoleMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConsoleMenu).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "mouseEnter", function () {
      if (_this.state.isPopoverOpen) return;

      _this.props.getCurl().then(function (text) {
        _this.setState({
          curlCode: text
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onButtonClick", function () {
      _this.setState(function (prevState) {
        return {
          isPopoverOpen: !prevState.isPopoverOpen
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "openDocs", function _callee() {
      var documentation;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.closePopover();

              _context.next = 3;
              return regeneratorRuntime.awrap(_this.props.getDocumentation());

            case 3:
              documentation = _context.sent;

              if (documentation) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:
              window.open(documentation, '_blank');

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "autoIndent", function (event) {
      _this.closePopover();

      _this.props.autoIndent(event);
    });

    _this.state = {
      curlCode: '',
      isPopoverOpen: false
    };
    return _this;
  }

  _createClass(ConsoleMenu, [{
    key: "copyAsCurl",
    value: function copyAsCurl() {
      this.copyText(this.state.curlCode);
      var addNotification = this.props.addNotification;

      if (addNotification) {
        addNotification({
          title: _i18n.i18n.translate('console.consoleMenu.copyAsCurlMessage', {
            defaultMessage: 'Request copied as cURL'
          })
        });
      }
    }
  }, {
    key: "copyText",
    value: function copyText(text) {
      var textField = document.createElement('textarea');
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var button = _react.default.createElement("button", {
        className: "euiButtonIcon--primary",
        onClick: this.onButtonClick,
        "data-test-subj": "toggleConsoleMenu",
        "aria-label": _i18n.i18n.translate('console.requestOptionsButtonAriaLabel', {
          defaultMessage: 'Request options'
        })
      }, _react.default.createElement(_eui.EuiIcon, {
        type: "wrench"
      }));

      var items = [_react.default.createElement(_eui.EuiContextMenuItem, {
        key: "Copy as cURL",
        id: "ConCopyAsCurl",
        disabled: !document.queryCommandSupported('copy'),
        onClick: function onClick() {
          _this2.closePopover();

          _this2.copyAsCurl();
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "console.requestOptions.copyAsUrlButtonLabel",
        defaultMessage: "Copy as cURL"
      })), _react.default.createElement(_eui.EuiContextMenuItem, {
        key: "Open documentation",
        "data-test-subj": "consoleMenuOpenDocs",
        onClick: function onClick() {
          _this2.openDocs();
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "console.requestOptions.openDocumentationButtonLabel",
        defaultMessage: "Open documentation"
      })), _react.default.createElement(_eui.EuiContextMenuItem, {
        "data-test-subj": "consoleMenuAutoIndent",
        key: "Auto indent",
        onClick: this.autoIndent
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "console.requestOptions.autoIndentButtonLabel",
        defaultMessage: "Auto indent"
      }))];
      return _react.default.createElement("span", {
        onMouseEnter: this.mouseEnter
      }, _react.default.createElement(_eui.EuiPopover, {
        id: "contextMenu",
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        panelPaddingSize: "none",
        anchorPosition: "downLeft"
      }, _react.default.createElement(_eui.EuiContextMenuPanel, {
        items: items
      })));
    }
  }]);

  return ConsoleMenu;
}(_react.Component);

exports.ConsoleMenu = ConsoleMenu;