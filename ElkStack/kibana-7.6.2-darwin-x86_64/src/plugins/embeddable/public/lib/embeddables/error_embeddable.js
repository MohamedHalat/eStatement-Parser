"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isErrorEmbeddable = isErrorEmbeddable;
exports.ErrorEmbeddable = exports.ERROR_EMBEDDABLE_TYPE = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _embeddable = require("./embeddable");

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

var ERROR_EMBEDDABLE_TYPE = 'error';
exports.ERROR_EMBEDDABLE_TYPE = ERROR_EMBEDDABLE_TYPE;

function isErrorEmbeddable(embeddable) {
  return embeddable.error !== undefined;
}

var ErrorEmbeddable =
/*#__PURE__*/
function (_Embeddable) {
  _inherits(ErrorEmbeddable, _Embeddable);

  function ErrorEmbeddable(error, input, parent) {
    var _this;

    _classCallCheck(this, ErrorEmbeddable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ErrorEmbeddable).call(this, input, {}, parent));

    _defineProperty(_assertThisInitialized(_this), "type", ERROR_EMBEDDABLE_TYPE);

    _defineProperty(_assertThisInitialized(_this), "error", void 0);

    _defineProperty(_assertThisInitialized(_this), "dom", void 0);

    _this.error = error;
    return _this;
  }

  _createClass(ErrorEmbeddable, [{
    key: "reload",
    value: function reload() {}
  }, {
    key: "render",
    value: function render(dom) {
      var title = typeof this.error === 'string' ? this.error : this.error.message;
      this.dom = dom;

      _reactDom.default.render( // @ts-ignore
      _react.default.createElement("div", {
        className: "embPanel__error embPanel__content",
        "data-test-subj": "embeddableStackError"
      }, _react.default.createElement(_eui.EuiText, {
        color: "subdued",
        size: "xs"
      }, _react.default.createElement(_eui.EuiIcon, {
        type: "alert",
        color: "danger"
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), title)), dom);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.dom) {
        _reactDom.default.unmountComponentAtNode(this.dom);
      }
    }
  }]);

  return ErrorEmbeddable;
}(_embeddable.Embeddable);

exports.ErrorEmbeddable = ErrorEmbeddable;