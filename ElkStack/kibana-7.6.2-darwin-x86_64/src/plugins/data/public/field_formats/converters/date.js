"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateFormat = void 0;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _common = require("../../../common");

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

var DateFormat =
/*#__PURE__*/
function (_FieldFormat) {
  _inherits(DateFormat, _FieldFormat);

  function DateFormat() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DateFormat);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DateFormat)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "memoizedConverter", _lodash.noop);

    _defineProperty(_assertThisInitialized(_this), "memoizedPattern", '');

    _defineProperty(_assertThisInitialized(_this), "timeZone", '');

    _defineProperty(_assertThisInitialized(_this), "textConvert", function (val) {
      // don't give away our ref to converter so
      // we can hot-swap when config changes
      var pattern = _this.param('pattern');

      var timezone = _this.param('timezone');

      var timezoneChanged = _this.timeZone !== timezone;
      var datePatternChanged = _this.memoizedPattern !== pattern;

      if (timezoneChanged || datePatternChanged) {
        _this.timeZone = timezone;
        _this.memoizedPattern = pattern;
        _this.memoizedConverter = (0, _lodash.memoize)(function converter(value) {
          if (value === null || value === undefined) {
            return '-';
          }

          var date = (0, _moment.default)(value);

          if (date.isValid()) {
            return date.format(pattern);
          } else {
            return value;
          }
        });
      }

      return _this.memoizedConverter(val);
    });

    return _this;
  }

  _createClass(DateFormat, [{
    key: "getParamDefaults",
    value: function getParamDefaults() {
      return {
        pattern: this.getConfig('dateFormat'),
        timezone: this.getConfig('dateFormat:tz')
      };
    }
  }]);

  return DateFormat;
}(_common.FieldFormat);

exports.DateFormat = DateFormat;

_defineProperty(DateFormat, "id", _common.FIELD_FORMAT_IDS.DATE);

_defineProperty(DateFormat, "title", 'Date');

_defineProperty(DateFormat, "fieldType", _common.KBN_FIELD_TYPES.DATE);