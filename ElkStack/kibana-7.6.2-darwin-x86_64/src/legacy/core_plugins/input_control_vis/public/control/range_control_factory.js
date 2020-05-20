"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rangeControlFactory = rangeControlFactory;
exports.RangeControl = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _control = require("./control");

var _range_filter_manager = require("./filter_manager/range_filter_manager");

var _create_search_source = require("./create_search_source");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var minMaxAgg = function minMaxAgg(field) {
  var aggBody = {};

  if (field) {
    if (field.scripted) {
      aggBody.script = {
        source: field.script,
        lang: field.lang
      };
    } else {
      aggBody.field = field.name;
    }
  }

  return {
    maxAgg: {
      max: aggBody
    },
    minAgg: {
      min: aggBody
    }
  };
};

var RangeControl =
/*#__PURE__*/
function (_Control) {
  _inherits(RangeControl, _Control);

  function RangeControl(controlParams, filterManager, useTimeFilter, SearchSource, deps) {
    var _this;

    _classCallCheck(this, RangeControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RangeControl).call(this, controlParams, filterManager, useTimeFilter, SearchSource));

    _defineProperty(_assertThisInitialized(_this), "timefilter", void 0);

    _defineProperty(_assertThisInitialized(_this), "abortController", void 0);

    _defineProperty(_assertThisInitialized(_this), "min", void 0);

    _defineProperty(_assertThisInitialized(_this), "max", void 0);

    _this.timefilter = deps.data.query.timefilter.timefilter;
    return _this;
  }

  _createClass(RangeControl, [{
    key: "fetch",
    value: function fetch() {
      var indexPattern, fieldName, aggs, searchSource, abortSignal, resp, min, max;
      return regeneratorRuntime.async(function fetch$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Abort any in-progress fetch
              if (this.abortController) {
                this.abortController.abort();
              }

              this.abortController = new AbortController();
              indexPattern = this.filterManager.getIndexPattern();

              if (indexPattern) {
                _context.next = 6;
                break;
              }

              this.disable((0, _control.noIndexPatternMsg)(this.controlParams.indexPattern));
              return _context.abrupt("return");

            case 6:
              fieldName = this.filterManager.fieldName;
              aggs = minMaxAgg(indexPattern.fields.getByName(fieldName));
              searchSource = (0, _create_search_source.createSearchSource)(this.SearchSource, null, indexPattern, aggs, this.useTimeFilter, [], this.timefilter);
              abortSignal = this.abortController.signal;
              _context.prev = 10;
              _context.next = 13;
              return regeneratorRuntime.awrap(searchSource.fetch({
                abortSignal: abortSignal
              }));

            case 13:
              resp = _context.sent;
              _context.next = 22;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](10);

              if (!(_context.t0.name === 'AbortError')) {
                _context.next = 20;
                break;
              }

              return _context.abrupt("return");

            case 20:
              this.disable(_i18n.i18n.translate('inputControl.rangeControl.unableToFetchTooltip', {
                defaultMessage: 'Unable to fetch range min and max, error: {errorMessage}',
                values: {
                  errorMessage: _context.t0.message
                }
              }));
              return _context.abrupt("return");

            case 22:
              min = _lodash.default.get(resp, 'aggregations.minAgg.value', null);
              max = _lodash.default.get(resp, 'aggregations.maxAgg.value', null);

              if (!(min === null || max === null)) {
                _context.next = 27;
                break;
              }

              this.disable((0, _control.noValuesDisableMsg)(fieldName, indexPattern.title));
              return _context.abrupt("return");

            case 27:
              this.min = min;
              this.max = max;
              this.enable = true;

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[10, 16]]);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.abortController) this.abortController.abort();
    }
  }]);

  return RangeControl;
}(_control.Control);

exports.RangeControl = RangeControl;

function rangeControlFactory(controlParams, useTimeFilter, SearchSource, deps) {
  var _ref, _ref2, dataPluginStart, indexPattern;

  return regeneratorRuntime.async(function rangeControlFactory$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(deps.core.getStartServices());

        case 2:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 2);
          dataPluginStart = _ref2[1].data;
          _context2.next = 7;
          return regeneratorRuntime.awrap(dataPluginStart.indexPatterns.get(controlParams.indexPattern));

        case 7:
          indexPattern = _context2.sent;
          return _context2.abrupt("return", new RangeControl(controlParams, new _range_filter_manager.RangeFilterManager(controlParams.id, controlParams.fieldName, indexPattern, deps.data.query.filterManager), useTimeFilter, SearchSource, deps));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}