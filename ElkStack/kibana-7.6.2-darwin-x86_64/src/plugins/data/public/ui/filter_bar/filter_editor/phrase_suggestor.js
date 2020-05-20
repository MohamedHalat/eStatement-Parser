"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhraseSuggestor = exports.PhraseSuggestorUI = void 0;

var _react = require("react");

var _lodash = require("lodash");

var _public = require("../../../../../kibana_react/public");

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

/**
 * Since both "phrase" and "phrases" filter inputs suggest values (if enabled and the field is
 * aggregatable), we pull out the common logic for requesting suggestions into this component
 * which both of them extend.
 */
var PhraseSuggestorUI =
/*#__PURE__*/
function (_Component) {
  _inherits(PhraseSuggestorUI, _Component);

  function PhraseSuggestorUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PhraseSuggestorUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PhraseSuggestorUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "services", _this.props.kibana.services);

    _defineProperty(_assertThisInitialized(_this), "state", {
      suggestions: [],
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchChange", function (value) {
      _this.updateSuggestions("".concat(value));
    });

    _defineProperty(_assertThisInitialized(_this), "updateSuggestions", (0, _lodash.debounce)(function _callee() {
      var value,
          _ref,
          indexPattern,
          field,
          suggestions,
          _args = arguments;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              value = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';
              _ref = _this.props, indexPattern = _ref.indexPattern, field = _ref.field;

              if (!(!field || !_this.isSuggestingValues())) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              _this.setState({
                isLoading: true
              });

              _context.next = 7;
              return regeneratorRuntime.awrap(_this.services.data.getSuggestions(indexPattern.title, field, value));

            case 7:
              suggestions = _context.sent;

              _this.setState({
                suggestions: suggestions,
                isLoading: false
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    }, 500));

    return _this;
  }

  _createClass(PhraseSuggestorUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateSuggestions();
    }
  }, {
    key: "isSuggestingValues",
    value: function isSuggestingValues() {
      var shouldSuggestValues = this.services.uiSettings.get('filterEditor:suggestValues');
      var field = this.props.field;
      return shouldSuggestValues && field && field.aggregatable && field.type === 'string';
    }
  }]);

  return PhraseSuggestorUI;
}(_react.Component);

exports.PhraseSuggestorUI = PhraseSuggestorUI;
var PhraseSuggestor = (0, _public.withKibana)(PhraseSuggestorUI);
exports.PhraseSuggestor = PhraseSuggestor;