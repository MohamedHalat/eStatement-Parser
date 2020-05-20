"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonParamType = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _raw_json = require("../../vis/editors/default/controls/raw_json");

var _base = require("./base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JsonParamType =
/*#__PURE__*/
function (_BaseParamType) {
  _inherits(JsonParamType, _BaseParamType);

  function JsonParamType(config) {
    var _this;

    _classCallCheck(this, JsonParamType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JsonParamType).call(this, config));

    _defineProperty(_assertThisInitialized(_this), "editorComponent", _raw_json.RawJsonParamEditor);

    _this.name = config.name || 'json';

    if (!config.write) {
      _this.write = function (aggConfig, output) {
        var paramJson;
        var param = aggConfig.params[_this.name];

        if (!param) {
          return;
        } // handle invalid Json input


        try {
          paramJson = JSON.parse(param);
        } catch (err) {
          return;
        }

        function filteredCombine(srcA, srcB) {
          function mergeObjs(a, b) {
            return (0, _lodash.default)(a).keys().union(_lodash.default.keys(b)).transform(function (dest, key) {
              var val = compare(a[key], b[key]);
              if (val !== undefined) dest[key] = val;
            }, {}).value();
          }

          function mergeArrays(a, b) {
            // attempt to merge each value
            return _lodash.default.times(Math.max(a.length, b.length), function (i) {
              return compare(a[i], b[i]);
            });
          }

          function compare(a, b) {
            if (_lodash.default.isPlainObject(a) && _lodash.default.isPlainObject(b)) return mergeObjs(a, b);
            if (Array.isArray(a) && Array.isArray(b)) return mergeArrays(a, b);
            if (b === null) return undefined;
            if (b !== undefined) return b;
            return a;
          }

          return compare(srcA, srcB);
        }

        output.params = filteredCombine(output.params, paramJson);
        return;
      };
    }

    return _this;
  }

  return JsonParamType;
}(_base.BaseParamType);

exports.JsonParamType = JsonParamType;