"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listControlFactory = listControlFactory;
exports.ListControl = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _control = require("./control");

var _phrase_filter_manager = require("./filter_manager/phrase_filter_manager");

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

function getEscapedQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html#_standard_operators
  return query.replace(/[.?+*|{}[\]()"\\#@&<>~]/g, function (match) {
    return "\\".concat(match);
  });
}

var termsAgg = function termsAgg(_ref) {
  var field = _ref.field,
      size = _ref.size,
      direction = _ref.direction,
      query = _ref.query;
  var terms = {
    order: {
      _count: direction
    }
  };

  if (size) {
    terms.size = size < 1 ? 1 : size;
  }

  if (field === null || field === void 0 ? void 0 : field.scripted) {
    terms.script = {
      source: field.script,
      lang: field.lang
    };
    terms.value_type = field.type === 'number' ? 'float' : field.type;
  } else {
    terms.field = field === null || field === void 0 ? void 0 : field.name;
  }

  if (query) {
    terms.include = ".*".concat(getEscapedQuery(query), ".*");
  }

  return {
    termsAgg: {
      terms: terms
    }
  };
};

var ListControl =
/*#__PURE__*/
function (_Control) {
  _inherits(ListControl, _Control);

  function ListControl(controlParams, filterManager, useTimeFilter, SearchSource, deps) {
    var _this;

    _classCallCheck(this, ListControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListControl).call(this, controlParams, filterManager, useTimeFilter, SearchSource));

    _defineProperty(_assertThisInitialized(_this), "getInjectedVar", void 0);

    _defineProperty(_assertThisInitialized(_this), "timefilter", void 0);

    _defineProperty(_assertThisInitialized(_this), "abortController", void 0);

    _defineProperty(_assertThisInitialized(_this), "lastAncestorValues", void 0);

    _defineProperty(_assertThisInitialized(_this), "lastQuery", void 0);

    _defineProperty(_assertThisInitialized(_this), "partialResults", void 0);

    _defineProperty(_assertThisInitialized(_this), "selectOptions", void 0);

    _defineProperty(_assertThisInitialized(_this), "fetch", function _callee(query) {
      var indexPattern, ancestorFilters, ancestorValues, fieldName, initialSearchSourceState, aggs, searchSource, abortSignal, resp, selectOptions;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Abort any in-progress fetch
              if (_this.abortController) {
                _this.abortController.abort();
              }

              _this.abortController = new AbortController();
              indexPattern = _this.filterManager.getIndexPattern();

              if (indexPattern) {
                _context.next = 6;
                break;
              }

              _this.disable((0, _control.noIndexPatternMsg)(_this.controlParams.indexPattern));

              return _context.abrupt("return");

            case 6:
              if (!_this.hasAncestors()) {
                _context.next = 17;
                break;
              }

              if (!_this.hasUnsetAncestor()) {
                _context.next = 11;
                break;
              }

              _this.disable(_i18n.i18n.translate('inputControl.listControl.disableTooltip', {
                defaultMessage: "Disabled until '{label}' is set.",
                values: {
                  label: _this.ancestors[0].label
                }
              }));

              _this.lastAncestorValues = undefined;
              return _context.abrupt("return");

            case 11:
              ancestorValues = _this.getAncestorValues();

              if (!(_lodash.default.isEqual(ancestorValues, _this.lastAncestorValues) && _lodash.default.isEqual(query, _this.lastQuery))) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return");

            case 14:
              _this.lastAncestorValues = ancestorValues;
              _this.lastQuery = query;
              ancestorFilters = _this.getAncestorFilters();

            case 17:
              fieldName = _this.filterManager.fieldName;
              initialSearchSourceState = {
                timeout: "".concat(_this.getInjectedVar('autocompleteTimeout'), "ms"),
                terminate_after: Number(_this.getInjectedVar('autocompleteTerminateAfter'))
              };
              aggs = termsAgg({
                field: indexPattern.fields.getByName(fieldName),
                size: _this.options.dynamicOptions ? null : _lodash.default.get(_this.options, 'size', 5),
                direction: 'desc',
                query: query
              });
              searchSource = (0, _create_search_source.createSearchSource)(_this.SearchSource, initialSearchSourceState, indexPattern, aggs, _this.useTimeFilter, ancestorFilters, _this.timefilter);
              abortSignal = _this.abortController.signal;
              _this.lastQuery = query;
              _context.prev = 23;
              _context.next = 26;
              return regeneratorRuntime.awrap(searchSource.fetch({
                abortSignal: abortSignal
              }));

            case 26:
              resp = _context.sent;
              _context.next = 35;
              break;

            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](23);

              if (!(_context.t0.name === 'AbortError')) {
                _context.next = 33;
                break;
              }

              return _context.abrupt("return");

            case 33:
              _this.disable(_i18n.i18n.translate('inputControl.listControl.unableToFetchTooltip', {
                defaultMessage: 'Unable to fetch terms, error: {errorMessage}',
                values: {
                  errorMessage: _context.t0.message
                }
              }));

              return _context.abrupt("return");

            case 35:
              if (!(query && _this.lastQuery !== query)) {
                _context.next = 37;
                break;
              }

              return _context.abrupt("return");

            case 37:
              selectOptions = _lodash.default.get(resp, 'aggregations.termsAgg.buckets', []).map(function (bucket) {
                return bucket === null || bucket === void 0 ? void 0 : bucket.key;
              });

              if (!(selectOptions.length === 0 && !query)) {
                _context.next = 41;
                break;
              }

              _this.disable((0, _control.noValuesDisableMsg)(fieldName, indexPattern.title));

              return _context.abrupt("return");

            case 41:
              _this.partialResults = resp.terminated_early || resp.timed_out;
              _this.selectOptions = selectOptions;
              _this.enable = true;
              _this.disabledReason = '';

            case 45:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[23, 29]]);
    });

    _this.getInjectedVar = deps.core.injectedMetadata.getInjectedVar;
    _this.timefilter = deps.data.query.timefilter.timefilter;
    return _this;
  }

  _createClass(ListControl, [{
    key: "destroy",
    value: function destroy() {
      if (this.abortController) this.abortController.abort();
    }
  }, {
    key: "hasValue",
    value: function hasValue() {
      return typeof this.value !== 'undefined' && this.value.length > 0;
    }
  }]);

  return ListControl;
}(_control.Control);

exports.ListControl = ListControl;

function listControlFactory(controlParams, useTimeFilter, SearchSource, deps) {
  var _ref2, _ref3, dataPluginStart, indexPattern, field, listControl;

  return regeneratorRuntime.async(function listControlFactory$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(deps.core.getStartServices());

        case 2:
          _ref2 = _context2.sent;
          _ref3 = _slicedToArray(_ref2, 2);
          dataPluginStart = _ref3[1].data;
          _context2.next = 7;
          return regeneratorRuntime.awrap(dataPluginStart.indexPatterns.get(controlParams.indexPattern));

        case 7:
          indexPattern = _context2.sent;
          // dynamic options are only allowed on String fields but the setting defaults to true so it could
          // be enabled for non-string fields (since UI input is hidden for non-string fields).
          // If field is not string, then disable dynamic options.
          field = indexPattern.fields.find(function (_ref4) {
            var name = _ref4.name;
            return name === controlParams.fieldName;
          });

          if (field && field.type !== 'string') {
            controlParams.options.dynamicOptions = false;
          }

          listControl = new ListControl(controlParams, new _phrase_filter_manager.PhraseFilterManager(controlParams.id, controlParams.fieldName, indexPattern, deps.data.query.filterManager), useTimeFilter, SearchSource, deps);
          return _context2.abrupt("return", listControl);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}