"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhraseFilterManager = void 0;

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

var PhraseFilterManager =
/*#__PURE__*/
function (_FilterManager) {
  _inherits(PhraseFilterManager, _FilterManager);

  function PhraseFilterManager(controlId, fieldName, indexPattern, queryFilter) {
    _classCallCheck(this, PhraseFilterManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(PhraseFilterManager).call(this, controlId, fieldName, indexPattern, queryFilter));
  }

  _createClass(PhraseFilterManager, [{
    key: "createFilter",
    value: function createFilter(phrases) {
      var newFilter;
      var value = this.indexPattern.fields.getByName(this.fieldName);

      if (!value) {
        throw new Error("Unable to find field with name: ".concat(this.fieldName, " on indexPattern"));
      }

      if (phrases.length === 1) {
        newFilter = _public.esFilters.buildPhraseFilter(value, phrases[0], this.indexPattern);
      } else {
        newFilter = _public.esFilters.buildPhrasesFilter(value, phrases, this.indexPattern);
      }

      newFilter.meta.key = this.fieldName;
      newFilter.meta.controlledBy = this.controlId;
      return newFilter;
    }
  }, {
    key: "getValueFromFilterBar",
    value: function getValueFromFilterBar() {
      var _this = this;

      var kbnFilters = this.findFilters();

      if (kbnFilters.length === 0) {
        return;
      }

      var values = kbnFilters.map(function (kbnFilter) {
        return _this.getValueFromFilter(kbnFilter);
      }).filter(function (value) {
        return value != null;
      });

      if (values.length === 0) {
        return;
      }

      return values.reduce(function (accumulator, currentValue) {
        return accumulator.concat(currentValue);
      }, []);
    }
    /**
     * Extract filtering value from kibana filters
     *
     * @param  {esFilters.PhraseFilter} kbnFilter
     * @return {Array.<string>} array of values pulled from filter
     */

  }, {
    key: "getValueFromFilter",
    value: function getValueFromFilter(kbnFilter) {
      var _this2 = this;

      // bool filter - multiple phrase filters
      if (_lodash.default.has(kbnFilter, 'query.bool.should')) {
        return _lodash.default.get(kbnFilter, 'query.bool.should').map(function (kbnQueryFilter) {
          return _this2.getValueFromFilter(kbnQueryFilter);
        }).filter(function (value) {
          if (value) {
            return true;
          }

          return false;
        });
      } // scripted field filter


      if (_lodash.default.has(kbnFilter, 'script')) {
        return _lodash.default.get(kbnFilter, 'script.script.params.value');
      } // single phrase filter


      if (_public.esFilters.isPhraseFilter(kbnFilter)) {
        if (_public.esFilters.getPhraseFilterField(kbnFilter) !== this.fieldName) {
          return;
        }

        return _public.esFilters.getPhraseFilterValue(kbnFilter);
      } // single phrase filter from bool filter


      if (_lodash.default.has(kbnFilter, ['match_phrase', this.fieldName])) {
        return _lodash.default.get(kbnFilter, ['match_phrase', this.fieldName]);
      }
    }
  }]);

  return PhraseFilterManager;
}(_filter_manager.FilterManager);

exports.PhraseFilterManager = PhraseFilterManager;