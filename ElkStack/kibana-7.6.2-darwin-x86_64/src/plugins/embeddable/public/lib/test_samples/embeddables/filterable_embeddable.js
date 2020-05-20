"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterableEmbeddable = exports.FILTERABLE_EMBEDDABLE = void 0;

var _embeddables = require("../../embeddables");

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

var FILTERABLE_EMBEDDABLE = 'FILTERABLE_EMBEDDABLE';
exports.FILTERABLE_EMBEDDABLE = FILTERABLE_EMBEDDABLE;

var FilterableEmbeddable =
/*#__PURE__*/
function (_Embeddable) {
  _inherits(FilterableEmbeddable, _Embeddable);

  function FilterableEmbeddable(initialInput, parent) {
    var _this;

    _classCallCheck(this, FilterableEmbeddable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterableEmbeddable).call(this, initialInput, {}, parent));

    _defineProperty(_assertThisInitialized(_this), "type", FILTERABLE_EMBEDDABLE);

    return _this;
  }

  _createClass(FilterableEmbeddable, [{
    key: "getInspectorAdapters",
    value: function getInspectorAdapters() {
      var inspectorAdapters = {
        filters: "My filters are ".concat(JSON.stringify(this.input.filters))
      };
      return inspectorAdapters;
    }
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "reload",
    value: function reload() {}
  }]);

  return FilterableEmbeddable;
}(_embeddables.Embeddable);

exports.FilterableEmbeddable = FilterableEmbeddable;