"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBucketAggType = isBucketAggType;
exports.BucketAggType = void 0;

var _agg_type = require("../agg_type");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bucketType = 'buckets';

var BucketAggType =
/*#__PURE__*/
function (_AggType) {
  _inherits(BucketAggType, _AggType);

  function BucketAggType(config) {
    var _this;

    _classCallCheck(this, BucketAggType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BucketAggType).call(this, config));

    _defineProperty(_assertThisInitialized(_this), "getKey", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", bucketType);

    _this.getKey = config.getKey || function (bucket, key) {
      return key || bucket.key;
    };

    return _this;
  }

  return BucketAggType;
}(_agg_type.AggType);

exports.BucketAggType = BucketAggType;

function isBucketAggType(aggConfig) {
  return aggConfig && aggConfig.type === bucketType;
}