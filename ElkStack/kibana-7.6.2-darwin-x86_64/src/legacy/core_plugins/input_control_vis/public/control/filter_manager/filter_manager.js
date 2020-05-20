"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterManager = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FilterManager =
/*#__PURE__*/
function () {
  function FilterManager(controlId, fieldName, indexPattern, queryFilter) {
    _classCallCheck(this, FilterManager);

    this.controlId = controlId;
    this.fieldName = fieldName;
    this.indexPattern = indexPattern;
    this.queryFilter = queryFilter;
  }
  /**
   * Convert phrases into filter
   *
   * @param  {any[]} phrases
   * @returns PhraseFilter
   *   single phrase: match query
   *   multiple phrases: bool query with should containing list of match_phrase queries
   */


  _createClass(FilterManager, [{
    key: "getIndexPattern",
    value: function getIndexPattern() {
      return this.indexPattern;
    }
  }, {
    key: "getField",
    value: function getField() {
      return this.indexPattern.fields.getByName(this.fieldName);
    }
  }, {
    key: "findFilters",
    value: function findFilters() {
      var _this = this;

      var kbnFilters = _lodash.default.flatten([this.queryFilter.getAppFilters(), this.queryFilter.getGlobalFilters()]);

      return kbnFilters.filter(function (kbnFilter) {
        return _lodash.default.get(kbnFilter, 'meta.controlledBy') === _this.controlId;
      });
    }
  }]);

  return FilterManager;
}();

exports.FilterManager = FilterManager;