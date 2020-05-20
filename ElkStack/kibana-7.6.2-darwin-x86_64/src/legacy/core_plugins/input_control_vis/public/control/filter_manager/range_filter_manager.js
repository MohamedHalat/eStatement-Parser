"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeFilterManager = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _filter_manager = require("./filter_manager");

var _public = require("../../../../../../plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Convert slider value into ES range filter
function toRange(sliderValue) {
  return {
    gte: sliderValue.min,
    lte: sliderValue.max
  };
} // Convert ES range filter into slider value


function fromRange(range) {
  var sliderValue = {};

  if (_lodash.default.has(range, 'gte')) {
    sliderValue.min = _lodash.default.get(range, 'gte');
  }

  if (_lodash.default.has(range, 'gt')) {
    sliderValue.min = _lodash.default.get(range, 'gt');
  }

  if (_lodash.default.has(range, 'lte')) {
    sliderValue.max = _lodash.default.get(range, 'lte');
  }

  if (_lodash.default.has(range, 'lt')) {
    sliderValue.max = _lodash.default.get(range, 'lt');
  }

  return sliderValue;
}

var RangeFilterManager =
/*#__PURE__*/
function (_FilterManager) {
  _inherits(RangeFilterManager, _FilterManager);

  function RangeFilterManager() {
    _classCallCheck(this, RangeFilterManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(RangeFilterManager).apply(this, arguments));
  }

  _createClass(RangeFilterManager, [{
    key: "createFilter",

    /**
     * Convert slider value into filter
     *
     * @param {object} react-input-range value - POJO with `min` and `max` properties
     * @return {object} range filter
     */
    value: function createFilter(value) {
      var newFilter = _public.esFilters.buildRangeFilter( // TODO: Fix type to be required
      this.indexPattern.fields.getByName(this.fieldName), toRange(value), this.indexPattern);

      newFilter.meta.key = this.fieldName;
      newFilter.meta.controlledBy = this.controlId;
      return newFilter;
    }
  }, {
    key: "getValueFromFilterBar",
    value: function getValueFromFilterBar() {
      var kbnFilters = this.findFilters();

      if (kbnFilters.length === 0) {
        return;
      }

      var range;

      if (_lodash.default.has(kbnFilters[0], 'script')) {
        range = _lodash.default.get(kbnFilters[0], 'script.script.params');
      } else {
        range = _lodash.default.get(kbnFilters[0], ['range', this.fieldName]);
      }

      if (!range) {
        return;
      }

      return fromRange(range);
    }
  }]);

  return RangeFilterManager;
}(_filter_manager.FilterManager);

exports.RangeFilterManager = RangeFilterManager;