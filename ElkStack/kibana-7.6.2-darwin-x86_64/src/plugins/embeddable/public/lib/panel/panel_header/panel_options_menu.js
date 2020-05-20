"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelOptionsMenu = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PanelOptionsMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PanelOptionsMenu, _React$Component);

  _createClass(PanelOptionsMenu, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.closeContextMenu) {
        return _objectSpread({}, state, {
          isPopoverOpen: false
        });
      } else {
        return state;
      }
    }
  }]);

  function PanelOptionsMenu(props) {
    var _this;

    _classCallCheck(this, PanelOptionsMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PanelOptionsMenu).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "mounted", false);

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      if (_this.mounted) {
        _this.setState({
          isPopoverOpen: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleContextMenu", function () {
      if (!_this.mounted) return;

      var after = function after() {
        if (!_this.state.isPopoverOpen) return;

        _this.setState({
          actionContextMenuPanel: undefined
        });

        _this.props.getActionContextMenuPanel().then(function (actionContextMenuPanel) {
          if (!_this.mounted) return;

          _this.setState({
            actionContextMenuPanel: actionContextMenuPanel
          });
        }).catch(function (error) {
          return console.error(error);
        }); // eslint-disable-line no-console

      };

      _this.setState(function (_ref) {
        var isPopoverOpen = _ref.isPopoverOpen;
        return {
          isPopoverOpen: !isPopoverOpen
        };
      }, after);
    });

    _this.state = {
      actionContextMenuPanel: undefined,
      isPopoverOpen: false
    };
    return _this;
  }

  _createClass(PanelOptionsMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var actionContextMenuPanel;
      return regeneratorRuntime.async(function componentDidMount$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.mounted = true;
              this.setState({
                actionContextMenuPanel: undefined
              });
              _context.next = 4;
              return regeneratorRuntime.awrap(this.props.getActionContextMenuPanel());

            case 4:
              actionContextMenuPanel = _context.sent;

              if (this.mounted) {
                this.setState({
                  actionContextMenuPanel: actionContextMenuPanel
                });
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isViewMode = _this$props.isViewMode,
          title = _this$props.title;

      var enhancedAriaLabel = _i18n.i18n.translate('embeddableApi.panel.optionsMenu.panelOptionsButtonEnhancedAriaLabel', {
        defaultMessage: 'Panel options for {title}',
        values: {
          title: title
        }
      });

      var ariaLabelWithoutTitle = _i18n.i18n.translate('embeddableApi.panel.optionsMenu.panelOptionsButtonAriaLabel', {
        defaultMessage: 'Panel options'
      });

      var button = _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: isViewMode ? 'boxesHorizontal' : 'gear',
        color: "text",
        className: "embPanel__optionsMenuButton",
        "aria-label": title ? enhancedAriaLabel : ariaLabelWithoutTitle,
        "data-test-subj": "embeddablePanelToggleMenuIcon",
        onClick: this.toggleContextMenu
      });

      return _react.default.createElement(_eui.EuiPopover, {
        className: "embPanel__optionsMenuPopover",
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        panelPaddingSize: "none",
        anchorPosition: "downRight",
        "data-test-subj": this.state.isPopoverOpen ? 'embeddablePanelContextMenuOpen' : 'embeddablePanelContextMenuClosed',
        withTitle: true
      }, _react.default.createElement(_eui.EuiContextMenu, {
        initialPanelId: "mainMenu",
        panels: this.state.actionContextMenuPanel ? [this.state.actionContextMenuPanel] : []
      }));
    }
  }]);

  return PanelOptionsMenu;
}(_react.default.Component);

exports.PanelOptionsMenu = PanelOptionsMenu;