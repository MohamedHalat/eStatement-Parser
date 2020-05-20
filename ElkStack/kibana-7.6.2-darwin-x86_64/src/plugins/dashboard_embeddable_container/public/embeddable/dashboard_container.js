"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@kbn/i18n/react");

var _embeddable_plugin = require("../embeddable_plugin");

var _dashboard_constants = require("./dashboard_constants");

var _panel = require("./panel");

var _dashboard_viewport = require("./viewport/dashboard_viewport");

var _public = require("../../../kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DashboardContainer =
/*#__PURE__*/
function (_Container) {
  _inherits(DashboardContainer, _Container);

  function DashboardContainer(initialInput, options, parent) {
    var _this;

    _classCallCheck(this, DashboardContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardContainer).call(this, _objectSpread({
      panels: {},
      isFullScreenMode: false,
      filters: [],
      useMargins: true
    }, initialInput), {
      embeddableLoaded: {}
    }, options.embeddable.getEmbeddableFactory, parent));
    _this.options = options;

    _defineProperty(_assertThisInitialized(_this), "type", _dashboard_constants.DASHBOARD_CONTAINER_TYPE);

    _defineProperty(_assertThisInitialized(_this), "renderEmpty", void 0);

    return _this;
  }

  _createClass(DashboardContainer, [{
    key: "createNewPanelState",
    value: function createNewPanelState(factory) {
      var partial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var panelState = _get(_getPrototypeOf(DashboardContainer.prototype), "createNewPanelState", this).call(this, factory, partial);

      return (0, _panel.createPanelState)(panelState, Object.values(this.input.panels));
    }
  }, {
    key: "render",
    value: function render(dom) {
      _reactDom.default.render(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_public.KibanaContextProvider, {
        services: this.options
      }, _react.default.createElement(_dashboard_viewport.DashboardViewport, {
        renderEmpty: this.renderEmpty,
        container: this
      }))), dom);
    }
  }, {
    key: "getInheritedInput",
    value: function getInheritedInput(id) {
      var _this$input = this.input,
          viewMode = _this$input.viewMode,
          refreshConfig = _this$input.refreshConfig,
          timeRange = _this$input.timeRange,
          query = _this$input.query,
          hidePanelTitles = _this$input.hidePanelTitles,
          filters = _this$input.filters;
      return {
        filters: filters,
        hidePanelTitles: hidePanelTitles,
        query: query,
        timeRange: timeRange,
        refreshConfig: refreshConfig,
        viewMode: viewMode,
        id: id
      };
    }
  }]);

  return DashboardContainer;
}(_embeddable_plugin.Container);

exports.DashboardContainer = DashboardContainer;