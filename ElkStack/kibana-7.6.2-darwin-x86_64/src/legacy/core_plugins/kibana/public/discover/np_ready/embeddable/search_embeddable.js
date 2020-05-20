"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchEmbeddable = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../plugins/data/public");

var _public2 = require("../../../../../embeddable_api/public/np_ready/public");

var columnActions = _interopRequireWildcard(require("../angular/doc_table/actions/columns"));

var _search_template = _interopRequireDefault(require("./search_template.html"));

var _get_sort_for_search_source = require("../angular/doc_table/lib/get_sort_for_search_source");

var _kibana_services = require("../../kibana_services");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchEmbeddable =
/*#__PURE__*/
function (_Embeddable) {
  _inherits(SearchEmbeddable, _Embeddable);

  function SearchEmbeddable(_ref, initialInput, executeTriggerActions, parent) {
    var _this;

    var $rootScope = _ref.$rootScope,
        $compile = _ref.$compile,
        savedSearch = _ref.savedSearch,
        editUrl = _ref.editUrl,
        indexPatterns = _ref.indexPatterns,
        editable = _ref.editable,
        filterManager = _ref.filterManager;

    _classCallCheck(this, SearchEmbeddable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchEmbeddable).call(this, initialInput, {
      defaultTitle: savedSearch.title,
      editUrl: editUrl,
      indexPatterns: indexPatterns,
      editable: editable
    }, parent));
    _this.executeTriggerActions = executeTriggerActions;

    _defineProperty(_assertThisInitialized(_this), "savedSearch", void 0);

    _defineProperty(_assertThisInitialized(_this), "$rootScope", void 0);

    _defineProperty(_assertThisInitialized(_this), "$compile", void 0);

    _defineProperty(_assertThisInitialized(_this), "inspectorAdaptors", void 0);

    _defineProperty(_assertThisInitialized(_this), "searchScope", void 0);

    _defineProperty(_assertThisInitialized(_this), "panelTitle", '');

    _defineProperty(_assertThisInitialized(_this), "filtersSearchSource", void 0);

    _defineProperty(_assertThisInitialized(_this), "searchInstance", void 0);

    _defineProperty(_assertThisInitialized(_this), "autoRefreshFetchSubscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", _constants.SEARCH_EMBEDDABLE_TYPE);

    _defineProperty(_assertThisInitialized(_this), "filterManager", void 0);

    _defineProperty(_assertThisInitialized(_this), "abortController", void 0);

    _defineProperty(_assertThisInitialized(_this), "prevTimeRange", void 0);

    _defineProperty(_assertThisInitialized(_this), "prevFilters", void 0);

    _defineProperty(_assertThisInitialized(_this), "prevQuery", void 0);

    _defineProperty(_assertThisInitialized(_this), "fetch", function _callee() {
      var searchSource, title, description, inspectorRequest, resp;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.searchScope) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              searchSource = _this.savedSearch.searchSource; // Abort any in-progress requests

              if (_this.abortController) _this.abortController.abort();
              _this.abortController = new AbortController();
              searchSource.setField('size', (0, _kibana_services.getServices)().uiSettings.get('discover:sampleSize'));
              searchSource.setField('sort', (0, _get_sort_for_search_source.getSortForSearchSource)(_this.searchScope.sort, _this.searchScope.indexPattern)); // Log request to inspector

              _this.inspectorAdaptors.requests.reset();

              title = _i18n.i18n.translate('kbn.embeddable.inspectorRequestDataTitle', {
                defaultMessage: 'Data'
              });
              description = _i18n.i18n.translate('kbn.embeddable.inspectorRequestDescription', {
                defaultMessage: 'This request queries Elasticsearch to fetch the data for the search.'
              });
              inspectorRequest = _this.inspectorAdaptors.requests.start(title, {
                description: description
              });
              inspectorRequest.stats((0, _kibana_services.getRequestInspectorStats)(searchSource));
              searchSource.getSearchRequestBody().then(function (body) {
                inspectorRequest.json(body);
              });
              _this.searchScope.isLoading = true;
              _context.prev = 14;
              _context.next = 17;
              return regeneratorRuntime.awrap(searchSource.fetch({
                abortSignal: _this.abortController.signal
              }));

            case 17:
              resp = _context.sent;
              _this.searchScope.isLoading = false; // Log response to inspector

              inspectorRequest.stats((0, _kibana_services.getResponseInspectorStats)(searchSource, resp)).ok({
                json: resp
              }); // Apply the changes to the angular scope

              _this.searchScope.$apply(function () {
                _this.searchScope.hits = resp.hits.hits;
                _this.searchScope.totalHitCount = resp.hits.total;
              });

              _context.next = 28;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](14);

              if (!(_context.t0.name === 'AbortError')) {
                _context.next = 27;
                break;
              }

              return _context.abrupt("return");

            case 27:
              (0, _kibana_services.getServices)().toastNotifications.addError(_context.t0, {
                title: _i18n.i18n.translate('kbn.embeddable.errorTitle', {
                  defaultMessage: 'Error fetching data'
                })
              });

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[14, 23]]);
    });

    _this.filterManager = filterManager;
    _this.savedSearch = savedSearch;
    _this.$rootScope = $rootScope;
    _this.$compile = $compile;
    _this.inspectorAdaptors = {
      requests: new _kibana_services.RequestAdapter()
    };

    _this.initializeSearchScope();

    _this.autoRefreshFetchSubscription = (0, _kibana_services.getServices)().timefilter.getAutoRefreshFetch$().subscribe(_this.fetch);
    _this.subscription = Rx.merge(_this.getOutput$(), _this.getInput$()).subscribe(function () {
      _this.panelTitle = _this.output.title || '';

      if (_this.searchScope) {
        _this.pushContainerStateParamsToScope(_this.searchScope);
      }
    });
    return _this;
  }

  _createClass(SearchEmbeddable, [{
    key: "getInspectorAdapters",
    value: function getInspectorAdapters() {
      return this.inspectorAdaptors;
    }
  }, {
    key: "getSavedSearch",
    value: function getSavedSearch() {
      return this.savedSearch;
    }
    /**
     *
     * @param {Element} domNode
     */

  }, {
    key: "render",
    value: function render(domNode) {
      if (!this.searchScope) {
        throw new Error('Search scope not defined');
      }

      this.searchInstance = this.$compile(_search_template.default)(this.searchScope);

      var rootNode = _kibana_services.angular.element(domNode);

      rootNode.append(this.searchInstance);
      this.pushContainerStateParamsToScope(this.searchScope);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(SearchEmbeddable.prototype), "destroy", this).call(this);

      this.savedSearch.destroy();

      if (this.searchInstance) {
        this.searchInstance.remove();
      }

      if (this.searchScope) {
        this.searchScope.$destroy();
        delete this.searchScope;
      }

      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      if (this.autoRefreshFetchSubscription) {
        this.autoRefreshFetchSubscription.unsubscribe();
      }

      if (this.abortController) this.abortController.abort();
    }
  }, {
    key: "initializeSearchScope",
    value: function initializeSearchScope() {
      var _this2 = this;

      var searchScope = this.searchScope = this.$rootScope.$new();
      searchScope.description = this.savedSearch.description;
      searchScope.inspectorAdapters = this.inspectorAdaptors;
      var searchSource = this.savedSearch.searchSource;
      var indexPattern = searchScope.indexPattern = searchSource.getField('index');
      var timeRangeSearchSource = searchSource.create();
      timeRangeSearchSource.setField('filter', function () {
        if (!_this2.searchScope || !_this2.input.timeRange) return;
        return (0, _public.getTime)(indexPattern, _this2.input.timeRange);
      });
      this.filtersSearchSource = searchSource.create();
      this.filtersSearchSource.setParent(timeRangeSearchSource);
      searchSource.setParent(this.filtersSearchSource);
      this.pushContainerStateParamsToScope(searchScope);

      searchScope.setSortOrder = function (sort) {
        _this2.updateInput({
          sort: sort
        });
      };

      searchScope.addColumn = function (columnName) {
        if (!searchScope.columns) {
          return;
        }

        indexPattern.popularizeField(columnName, 1);
        columnActions.addColumn(searchScope.columns, columnName);

        _this2.updateInput({
          columns: searchScope.columns
        });
      };

      searchScope.removeColumn = function (columnName) {
        if (!searchScope.columns) {
          return;
        }

        columnActions.removeColumn(searchScope.columns, columnName);

        _this2.updateInput({
          columns: searchScope.columns
        });
      };

      searchScope.moveColumn = function (columnName, newIndex) {
        if (!searchScope.columns) {
          return;
        }

        columnActions.moveColumn(searchScope.columns, columnName, newIndex);

        _this2.updateInput({
          columns: searchScope.columns
        });
      };

      searchScope.filter = function _callee2(field, value, operator) {
        var filters;
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filters = (0, _public.generateFilters)(_this2.filterManager, field, value, operator, indexPattern.id);
                filters = filters.map(function (filter) {
                  return _objectSpread({}, filter, {
                    $state: {
                      store: _public.esFilters.FilterStateStore.APP_STATE
                    }
                  });
                });
                _context2.next = 4;
                return regeneratorRuntime.awrap(_this2.executeTriggerActions(_public2.APPLY_FILTER_TRIGGER, {
                  embeddable: _this2,
                  filters: filters
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        });
      };
    }
  }, {
    key: "reload",
    value: function reload() {
      this.fetch();
    }
  }, {
    key: "pushContainerStateParamsToScope",
    value: function pushContainerStateParamsToScope(searchScope) {
      var isFetchRequired = !(0, _public.onlyDisabledFiltersChanged)(this.input.filters, this.prevFilters) || !_lodash.default.isEqual(this.prevQuery, this.input.query) || !_lodash.default.isEqual(this.prevTimeRange, this.input.timeRange) || !_lodash.default.isEqual(searchScope.sort, this.input.sort || this.savedSearch.sort); // If there is column or sort data on the panel, that means the original columns or sort settings have
      // been overridden in a dashboard.

      searchScope.columns = this.input.columns || this.savedSearch.columns;
      searchScope.sort = this.input.sort || this.savedSearch.sort;
      searchScope.sharedItemTitle = this.panelTitle;

      if (isFetchRequired) {
        this.filtersSearchSource.setField('filter', this.input.filters);
        this.filtersSearchSource.setField('query', this.input.query);
        this.fetch();
        this.prevFilters = this.input.filters;
        this.prevQuery = this.input.query;
        this.prevTimeRange = this.input.timeRange;
      }
    }
  }]);

  return SearchEmbeddable;
}(_public2.Embeddable);

exports.SearchEmbeddable = SearchEmbeddable;