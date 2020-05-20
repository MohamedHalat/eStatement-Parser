"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterableEmbeddableFactory = void 0;

var _i18n = require("@kbn/i18n");

var _filterable_embeddable = require("./filterable_embeddable");

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

var FilterableEmbeddableFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(FilterableEmbeddableFactory, _EmbeddableFactory);

  function FilterableEmbeddableFactory() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FilterableEmbeddableFactory);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FilterableEmbeddableFactory)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "type", _filterable_embeddable.FILTERABLE_EMBEDDABLE);

    return _this;
  }

  _createClass(FilterableEmbeddableFactory, [{
    key: "isEditable",
    value: function isEditable() {
      return true;
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.samples.filterableEmbeddable.displayName', {
        defaultMessage: 'filterable'
      });
    }
  }, {
    key: "create",
    value: function create(initialInput, parent) {
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new _filterable_embeddable.FilterableEmbeddable(initialInput, parent));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return FilterableEmbeddableFactory;
}(_embeddables.EmbeddableFactory);

exports.FilterableEmbeddableFactory = FilterableEmbeddableFactory;