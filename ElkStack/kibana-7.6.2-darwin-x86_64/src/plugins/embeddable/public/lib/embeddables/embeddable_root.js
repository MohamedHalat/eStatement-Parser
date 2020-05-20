"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddableRoot = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

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

var EmbeddableRoot =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EmbeddableRoot, _React$Component);

  function EmbeddableRoot(props) {
    var _this;

    _classCallCheck(this, EmbeddableRoot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EmbeddableRoot).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "root", void 0);

    _defineProperty(_assertThisInitialized(_this), "alreadyMounted", false);

    _this.root = _react.default.createRef();
    return _this;
  }

  _createClass(EmbeddableRoot, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.root && this.root.current && this.props.embeddable) {
        this.alreadyMounted = true;
        this.props.embeddable.render(this.root.current);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.root && this.root.current && this.props.embeddable && !this.alreadyMounted) {
        this.alreadyMounted = true;
        this.props.embeddable.render(this.root.current);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps) {
      return Boolean(newProps.error !== this.props.error || newProps.loading !== this.props.loading || newProps.embeddable !== this.props.embeddable || this.root && this.root.current && newProps.embeddable && !this.alreadyMounted);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        ref: this.root
      }), this.props.loading && _react.default.createElement(_eui.EuiLoadingSpinner, {
        "data-test-subj": "embedSpinner"
      }), this.props.error && _react.default.createElement(_eui.EuiText, {
        "data-test-subj": "embedError"
      }, this.props.error));
    }
  }]);

  return EmbeddableRoot;
}(_react.default.Component);

exports.EmbeddableRoot = EmbeddableRoot;