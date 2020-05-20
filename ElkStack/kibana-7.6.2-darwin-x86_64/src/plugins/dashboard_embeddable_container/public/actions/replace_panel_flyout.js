"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplacePanelFlyout = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReplacePanelFlyout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReplacePanelFlyout, _React$Component);

  function ReplacePanelFlyout(props) {
    var _this;

    _classCallCheck(this, ReplacePanelFlyout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReplacePanelFlyout).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "lastToast", {
      id: 'panelReplaceToast'
    });

    _defineProperty(_assertThisInitialized(_this), "showToast", function (name) {
      // To avoid the clutter of having toast messages cover flyout
      // close previous toast message before creating a new one
      if (_this.lastToast) {
        _this.props.notifications.toasts.remove(_this.lastToast);
      }

      _this.lastToast = _this.props.notifications.toasts.addSuccess({
        title: _i18n.i18n.translate('dashboardEmbeddableContainer.addPanel.savedObjectAddedToContainerSuccessMessageTitle', {
          defaultMessage: '{savedObjectName} was added',
          values: {
            savedObjectName: name
          }
        }),
        'data-test-subj': 'addObjectToContainerSuccess'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onReplacePanel", function _callee(id, type, name) {
      var originalPanels, filteredPanels, nnw, nnh, nnx, nny, newObj, finalPanels;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              originalPanels = _this.props.container.getInput().panels;
              filteredPanels = _objectSpread({}, originalPanels);
              nnw = filteredPanels[_this.props.panelToRemove.id].gridData.w;
              nnh = filteredPanels[_this.props.panelToRemove.id].gridData.h;
              nnx = filteredPanels[_this.props.panelToRemove.id].gridData.x;
              nny = filteredPanels[_this.props.panelToRemove.id].gridData.y; // add the new view

              _context.next = 8;
              return regeneratorRuntime.awrap(_this.props.container.addSavedObjectEmbeddable(type, id));

            case 8:
              newObj = _context.sent;
              finalPanels = _this.props.container.getInput().panels;
              finalPanels[newObj.id].gridData.w = nnw;
              finalPanels[newObj.id].gridData.h = nnh;
              finalPanels[newObj.id].gridData.x = nnx;
              finalPanels[newObj.id].gridData.y = nny; // delete the old view

              delete finalPanels[_this.props.panelToRemove.id]; // apply changes

              _this.props.container.updateInput(finalPanels);

              _this.props.container.reload();

              _this.showToast(name);

              _this.props.onClose();

            case 19:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    return _this;
  }

  _createClass(ReplacePanelFlyout, [{
    key: "render",
    value: function render() {
      var SavedObjectFinder = this.props.savedObjectsFinder;

      var savedObjectsFinder = _react.default.createElement(SavedObjectFinder, {
        noItemsMessage: _i18n.i18n.translate('dashboardEmbeddableContainer.addPanel.noMatchingObjectsMessage', {
          defaultMessage: 'No matching objects found.'
        }),
        savedObjectMetaData: _toConsumableArray(this.props.getEmbeddableFactories()).filter(function (embeddableFactory) {
          return Boolean(embeddableFactory.savedObjectMetaData) && !embeddableFactory.isContainerType;
        }).map(function (_ref) {
          var savedObjectMetaData = _ref.savedObjectMetaData;
          return savedObjectMetaData;
        }),
        showFilter: true,
        onChoose: this.onReplacePanel
      });

      var panelToReplace = 'Replace panel ' + this.props.panelToRemove.getTitle() + ' with:';
      return _react.default.createElement(_eui.EuiFlyout, {
        ownFocus: true,
        onClose: this.props.onClose,
        "data-test-subj": "dashboardReplacePanel"
      }, _react.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react.default.createElement("h2", null, _react.default.createElement("span", null, panelToReplace)))), _react.default.createElement(_eui.EuiFlyoutBody, null, savedObjectsFinder));
    }
  }]);

  return ReplacePanelFlyout;
}(_react.default.Component);

exports.ReplacePanelFlyout = ReplacePanelFlyout;