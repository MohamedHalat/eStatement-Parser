"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggParamType = void 0;

var _agg_config = require("../agg_config");

var _base = require("./base");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AggParamType =
/*#__PURE__*/
function (_BaseParamType) {
  _inherits(AggParamType, _BaseParamType);

  function AggParamType(config) {
    var _this;

    _classCallCheck(this, AggParamType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AggParamType).call(this, config));

    _defineProperty(_assertThisInitialized(_this), "makeAgg", void 0);

    if (!config.write) {
      _this.write = function (aggConfig, output) {
        if (aggConfig.params[_this.name] && aggConfig.params[_this.name].length) {
          output.params[_this.name] = aggConfig.params[_this.name];
        }
      };
    }

    if (!config.serialize) {
      _this.serialize = function (agg) {
        return agg.toJSON();
      };
    }

    if (!config.deserialize) {
      _this.deserialize = function (state, agg) {
        if (!agg) {
          throw new Error('aggConfig was not provided to AggParamType deserialize function');
        }

        return _this.makeAgg(agg, state);
      };
    }

    if (!config.editorComponent) {
      _this.editorComponent = require('../../vis/editors/default/controls/sub_agg');
    }

    _this.makeAgg = config.makeAgg;
    _this.valueType = _agg_config.AggConfig;
    return _this;
  }

  return AggParamType;
}(_base.BaseParamType);

exports.AggParamType = AggParamType;