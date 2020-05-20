"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InspectorPanel = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _inspector_view_chooser = require("./inspector_view_chooser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function hasAdaptersChanged(oldAdapters, newAdapters) {
  return Object.keys(oldAdapters).length !== Object.keys(newAdapters).length || Object.keys(oldAdapters).some(function (key) {
    return oldAdapters[key] !== newAdapters[key];
  });
}

var inspectorTitle = _i18n.i18n.translate('inspector.title', {
  defaultMessage: 'Inspector'
});

var InspectorPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(InspectorPanel, _Component);

  function InspectorPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InspectorPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InspectorPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedView: _this.props.views[0],
      views: _this.props.views,
      // Clone adapters array so we can validate that this prop never change
      adapters: _objectSpread({}, _this.props.adapters)
    });

    _defineProperty(_assertThisInitialized(_this), "onViewSelected", function (view) {
      if (view !== _this.state.selectedView) {
        _this.setState({
          selectedView: view
        });
      }
    });

    return _this;
  }

  _createClass(InspectorPanel, [{
    key: "renderSelectedPanel",
    value: function renderSelectedPanel() {
      return _react.default.createElement(this.state.selectedView.component, {
        adapters: this.props.adapters,
        title: this.props.title || ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          views = _this$props.views,
          title = _this$props.title;
      var selectedView = this.state.selectedView;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h1", null, title))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_inspector_view_chooser.InspectorViewChooser, {
        views: views,
        onViewSelected: this.onViewSelected,
        selectedView: selectedView
      })))), _react.default.createElement(_eui.EuiFlyoutBody, null, this.renderSelectedPanel()));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (hasAdaptersChanged(prevState.adapters, nextProps.adapters)) {
        throw new Error('Adapters are not allowed to be changed on an open InspectorPanel.');
      }

      var selectedViewMustChange = nextProps.views !== prevState.views && !nextProps.views.includes(prevState.selectedView);
      return {
        views: nextProps.views,
        selectedView: selectedViewMustChange ? nextProps.views[0] : prevState.selectedView
      };
    }
  }]);

  return InspectorPanel;
}(_react.Component);

exports.InspectorPanel = InspectorPanel;

_defineProperty(InspectorPanel, "defaultProps", {
  title: inspectorTitle
});

_defineProperty(InspectorPanel, "propTypes", {
  adapters: _propTypes.default.object.isRequired,
  views: function views(props, propName, componentName) {
    if (!Array.isArray(props.views) || props.views.length < 1) {
      throw new Error("".concat(propName, " prop must be an array of at least one element in ").concat(componentName, "."));
    }
  },
  title: _propTypes.default.string
});