"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardViewport = void 0;

var _react = _interopRequireDefault(require("react"));

var _grid = require("../grid");

var _public = require("../../../../kibana_react/public");

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

var DashboardViewport =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DashboardViewport, _React$Component);

  function DashboardViewport(props) {
    var _this;

    _classCallCheck(this, DashboardViewport);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardViewport).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "context", void 0);

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "mounted", false);

    _defineProperty(_assertThisInitialized(_this), "onExitFullScreenMode", function () {
      _this.props.container.updateInput({
        isFullScreenMode: false
      });
    });

    var _this$props$container = _this.props.container.getInput(),
        isFullScreenMode = _this$props$container.isFullScreenMode,
        panels = _this$props$container.panels,
        useMargins = _this$props$container.useMargins,
        title = _this$props$container.title,
        isEmptyState = _this$props$container.isEmptyState;

    _this.state = {
      isFullScreenMode: isFullScreenMode,
      panels: panels,
      useMargins: useMargins,
      title: title,
      isEmptyState: isEmptyState
    };
    return _this;
  }

  _createClass(DashboardViewport, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      this.subscription = this.props.container.getInput$().subscribe(function () {
        var _this2$props$containe = _this2.props.container.getInput(),
            isFullScreenMode = _this2$props$containe.isFullScreenMode,
            useMargins = _this2$props$containe.useMargins,
            title = _this2$props$containe.title,
            description = _this2$props$containe.description,
            isEmptyState = _this2$props$containe.isEmptyState;

        if (_this2.mounted) {
          _this2.setState({
            isFullScreenMode: isFullScreenMode,
            description: description,
            useMargins: useMargins,
            title: title,
            isEmptyState: isEmptyState
          });
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;

      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }, {
    key: "renderEmptyScreen",
    value: function renderEmptyScreen() {
      var renderEmpty = this.props.renderEmpty;
      var isFullScreenMode = this.state.isFullScreenMode;
      return _react.default.createElement("div", {
        className: "dshDashboardEmptyScreen"
      }, isFullScreenMode && _react.default.createElement(this.context.services.ExitFullScreenButton, {
        onExitFullScreenMode: this.onExitFullScreenMode
      }), renderEmpty && renderEmpty());
    }
  }, {
    key: "renderContainerScreen",
    value: function renderContainerScreen() {
      var container = this.props.container;
      var _this$state = this.state,
          isFullScreenMode = _this$state.isFullScreenMode,
          panels = _this$state.panels,
          title = _this$state.title,
          description = _this$state.description,
          useMargins = _this$state.useMargins;
      return _react.default.createElement("div", {
        "data-shared-items-count": Object.values(panels).length,
        "data-shared-items-container": true,
        "data-title": title,
        "data-description": description,
        className: useMargins ? 'dshDashboardViewport-withMargins' : 'dshDashboardViewport'
      }, isFullScreenMode && _react.default.createElement(this.context.services.ExitFullScreenButton, {
        onExitFullScreenMode: this.onExitFullScreenMode
      }), _react.default.createElement(_grid.DashboardGrid, {
        container: container
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, this.state.isEmptyState ? this.renderEmptyScreen() : null, this.renderContainerScreen());
    }
  }]);

  return DashboardViewport;
}(_react.default.Component);

exports.DashboardViewport = DashboardViewport;

_defineProperty(DashboardViewport, "contextType", _public.context);