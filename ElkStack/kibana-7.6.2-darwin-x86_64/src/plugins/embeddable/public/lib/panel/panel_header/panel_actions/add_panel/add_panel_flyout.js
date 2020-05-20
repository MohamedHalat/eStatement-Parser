"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddPanelFlyout = void 0;

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _errors = require("../../../../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function capitalize(_ref) {
  var _ref2 = _toArray(_ref),
      first = _ref2[0],
      letters = _ref2.slice(1);

  return "".concat(first.toUpperCase()).concat(letters.join(''));
}

var AddPanelFlyout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddPanelFlyout, _React$Component);

  function AddPanelFlyout(props) {
    var _this;

    _classCallCheck(this, AddPanelFlyout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddPanelFlyout).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "lastToast", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isCreateMenuOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "showToast", function (name) {
      // To avoid the clutter of having toast messages cover flyout
      // close previous toast message before creating a new one
      if (_this.lastToast) {
        _this.props.notifications.toasts.remove(_this.lastToast);
      }

      _this.lastToast = _this.props.notifications.toasts.addSuccess({
        title: _i18n.i18n.translate('embeddableApi.addPanel.savedObjectAddedToContainerSuccessMessageTitle', {
          defaultMessage: '{savedObjectName} was added',
          values: {
            savedObjectName: name
          }
        }),
        'data-test-subj': 'addObjectToContainerSuccess'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createNewEmbeddable", function _callee(type) {
      var factory, explicitInput, embeddable;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.props.onClose();

              factory = _this.props.getFactory(type);

              if (factory) {
                _context.next = 4;
                break;
              }

              throw new _errors.EmbeddableFactoryNotFoundError(type);

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(factory.getExplicitInput());

            case 6:
              explicitInput = _context.sent;
              _context.next = 9;
              return regeneratorRuntime.awrap(_this.props.container.addNewEmbeddable(type, explicitInput));

            case 9:
              embeddable = _context.sent;

              if (embeddable) {
                _this.showToast(embeddable.getInput().title || '');
              }

            case 11:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddPanel", function _callee2(id, type, name) {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.props.container.addSavedObjectEmbeddable(type, id);

              _this.showToast(name);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleCreateMenu", function () {
      _this.setState(function (prevState) {
        return {
          isCreateMenuOpen: !prevState.isCreateMenuOpen
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeCreateMenu", function () {
      _this.setState({
        isCreateMenuOpen: false
      });
    });

    return _this;
  }

  _createClass(AddPanelFlyout, [{
    key: "getCreateMenuItems",
    value: function getCreateMenuItems() {
      var _this2 = this;

      return _toConsumableArray(this.props.getAllFactories()).filter(function (factory) {
        return factory.isEditable() && !factory.isContainerType && factory.canCreateNew();
      }).map(function (factory) {
        return _react2.default.createElement(_eui.EuiContextMenuItem, {
          key: factory.type,
          "data-test-subj": "createNew-".concat(factory.type),
          onClick: function onClick() {
            return _this2.createNewEmbeddable(factory.type);
          },
          className: "embPanel__addItem"
        }, capitalize(factory.getDisplayName()));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var SavedObjectFinder = this.props.SavedObjectFinder;

      var savedObjectsFinder = _react2.default.createElement(SavedObjectFinder, {
        onChoose: this.onAddPanel,
        savedObjectMetaData: _toConsumableArray(this.props.getAllFactories()).filter(function (embeddableFactory) {
          return Boolean(embeddableFactory.savedObjectMetaData) && !embeddableFactory.isContainerType;
        }).map(function (_ref3) {
          var savedObjectMetaData = _ref3.savedObjectMetaData;
          return savedObjectMetaData;
        }),
        showFilter: true,
        noItemsMessage: _i18n.i18n.translate('embeddableApi.addPanel.noMatchingObjectsMessage', {
          defaultMessage: 'No matching objects found.'
        })
      });

      return _react2.default.createElement(_eui.EuiFlyout, {
        ownFocus: true,
        onClose: this.props.onClose,
        "data-test-subj": "dashboardAddPanel"
      }, _react2.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react2.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "embeddableApi.addPanel.Title",
        defaultMessage: "Add panels"
      })))), _react2.default.createElement(_eui.EuiFlyoutBody, null, savedObjectsFinder), _react2.default.createElement(_eui.EuiFlyoutFooter, null, _react2.default.createElement(_eui.EuiPopover, {
        id: "createNew",
        button: _react2.default.createElement(_eui.EuiButton, {
          "data-test-subj": "createNew",
          iconType: "arrowDown",
          iconSide: "right",
          onClick: this.toggleCreateMenu
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "embeddableApi.addPanel.createNewDefaultOption",
          defaultMessage: "Create new"
        })),
        isOpen: this.state.isCreateMenuOpen,
        closePopover: this.closeCreateMenu,
        panelPaddingSize: "none",
        anchorPosition: "upLeft"
      }, _react2.default.createElement(_eui.EuiContextMenuPanel, {
        items: this.getCreateMenuItems()
      }))));
    }
  }]);

  return AddPanelFlyout;
}(_react2.default.Component);

exports.AddPanelFlyout = AddPanelFlyout;