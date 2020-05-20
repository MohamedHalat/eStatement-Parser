"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBar = void 0;

var _lodash = require("lodash");

var _react = require("@kbn/i18n/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireWildcard(require("react"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _public = require("../../../../kibana_react/public");

var _ = require("../..");

var _query_bar_top_row = require("../query_string_input/query_bar_top_row");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchBarUI =
/*#__PURE__*/
function (_Component) {
  _inherits(SearchBarUI, _Component);

  function SearchBarUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SearchBarUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SearchBarUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "services", _this.props.kibana.services);

    _defineProperty(_assertThisInitialized(_this), "savedQueryService", _this.services.data.query.savedQueries);

    _defineProperty(_assertThisInitialized(_this), "filterBarRef", null);

    _defineProperty(_assertThisInitialized(_this), "filterBarWrapperRef", null);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFiltersVisible: true,
      showSaveQueryModal: false,
      showSaveNewQueryModal: false,
      showSavedQueryPopover: false,
      currentProps: _this.props,
      query: _this.props.query ? _objectSpread({}, _this.props.query) : undefined,
      dateRangeFrom: (0, _lodash.get)(_this.props, 'dateRangeFrom', 'now-15m'),
      dateRangeTo: (0, _lodash.get)(_this.props, 'dateRangeTo', 'now')
    });

    _defineProperty(_assertThisInitialized(_this), "isDirty", function () {
      if (!_this.props.showDatePicker && _this.state.query && _this.props.query) {
        return _this.state.query.query !== _this.props.query.query;
      }

      return _this.state.query && _this.props.query && _this.state.query.query !== _this.props.query.query || _this.state.dateRangeFrom !== _this.props.dateRangeFrom || _this.state.dateRangeTo !== _this.props.dateRangeTo;
    });

    _defineProperty(_assertThisInitialized(_this), "setFilterBarHeight", function () {
      requestAnimationFrame(function () {
        var height = _this.filterBarRef && _this.state.isFiltersVisible ? _this.filterBarRef.clientHeight : 0;

        if (_this.filterBarWrapperRef) {
          _this.filterBarWrapperRef.setAttribute('style', "height: ".concat(height, "px"));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "ro", new _resizeObserverPolyfill.default(_this.setFilterBarHeight));

    _defineProperty(_assertThisInitialized(_this), "onSave", function _callee(savedQueryMeta) {
      var saveAsNew,
          savedQueryAttributes,
          response,
          _args = arguments;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              saveAsNew = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

              if (_this.state.query) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              savedQueryAttributes = {
                title: savedQueryMeta.title,
                description: savedQueryMeta.description,
                query: _this.state.query
              };

              if (savedQueryMeta.shouldIncludeFilters) {
                savedQueryAttributes.filters = _this.props.filters;
              }

              if (savedQueryMeta.shouldIncludeTimefilter && _this.state.dateRangeTo !== undefined && _this.state.dateRangeFrom !== undefined && _this.props.refreshInterval !== undefined && _this.props.isRefreshPaused !== undefined) {
                savedQueryAttributes.timefilter = {
                  from: _this.state.dateRangeFrom,
                  to: _this.state.dateRangeTo,
                  refreshInterval: {
                    value: _this.props.refreshInterval,
                    pause: _this.props.isRefreshPaused
                  }
                };
              }

              _context.prev = 6;

              if (!(_this.props.savedQuery && !saveAsNew)) {
                _context.next = 13;
                break;
              }

              _context.next = 10;
              return regeneratorRuntime.awrap(_this.savedQueryService.saveQuery(savedQueryAttributes, {
                overwrite: true
              }));

            case 10:
              response = _context.sent;
              _context.next = 16;
              break;

            case 13:
              _context.next = 15;
              return regeneratorRuntime.awrap(_this.savedQueryService.saveQuery(savedQueryAttributes));

            case 15:
              response = _context.sent;

            case 16:
              _this.services.notifications.toasts.addSuccess("Your query \"".concat(response.attributes.title, "\" was saved"));

              _this.setState({
                showSaveQueryModal: false,
                showSaveNewQueryModal: false
              });

              if (_this.props.onSaved) {
                _this.props.onSaved(response);
              }

              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](6);

              _this.services.notifications.toasts.addDanger("An error occured while saving your query: ".concat(_context.t0.message));

              throw _context.t0;

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[6, 21]]);
    });

    _defineProperty(_assertThisInitialized(_this), "onInitiateSave", function () {
      _this.setState({
        showSaveQueryModal: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInitiateSaveNew", function () {
      _this.setState({
        showSaveNewQueryModal: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onQueryBarChange", function (queryAndDateRange) {
      _this.setState({
        query: queryAndDateRange.query,
        dateRangeFrom: queryAndDateRange.dateRange.from,
        dateRangeTo: queryAndDateRange.dateRange.to
      });

      if (_this.props.onQueryChange) {
        _this.props.onQueryChange(queryAndDateRange);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onQueryBarSubmit", function (queryAndDateRange) {
      _this.setState({
        query: queryAndDateRange.query,
        dateRangeFrom: queryAndDateRange.dateRange && queryAndDateRange.dateRange.from || _this.state.dateRangeFrom,
        dateRangeTo: queryAndDateRange.dateRange && queryAndDateRange.dateRange.to || _this.state.dateRangeTo
      }, function () {
        if (_this.props.onQuerySubmit) {
          _this.props.onQuerySubmit({
            query: _this.state.query,
            dateRange: {
              from: _this.state.dateRangeFrom,
              to: _this.state.dateRangeTo
            }
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onLoadSavedQuery", function (savedQuery) {
      var dateRangeFrom = (0, _lodash.get)(savedQuery, 'attributes.timefilter.from', _this.state.dateRangeFrom);
      var dateRangeTo = (0, _lodash.get)(savedQuery, 'attributes.timefilter.to', _this.state.dateRangeTo);

      _this.setState({
        query: savedQuery.attributes.query,
        dateRangeFrom: dateRangeFrom,
        dateRangeTo: dateRangeTo
      });

      if (_this.props.onSavedQueryUpdated) {
        _this.props.onSavedQueryUpdated(savedQuery);
      }
    });

    return _this;
  }

  _createClass(SearchBarUI, [{
    key: "shouldRenderQueryBar",
    value: function shouldRenderQueryBar() {
      var showDatePicker = this.props.showDatePicker || this.props.showAutoRefreshOnly;
      var showQueryInput = this.props.showQueryInput && this.props.indexPatterns && this.state.query;
      return this.props.showQueryBar && (showDatePicker || showQueryInput);
    }
  }, {
    key: "shouldRenderFilterBar",
    value: function shouldRenderFilterBar() {
      return this.props.showFilterBar && this.props.filters && this.props.indexPatterns && (0, _lodash.compact)(this.props.indexPatterns).length > 0;
    }
    /*
     * This Function is here to show the toggle in saved query form
     * in case you the date range (from/to)
     */

  }, {
    key: "shouldRenderTimeFilterInSavedQueryForm",
    value: function shouldRenderTimeFilterInSavedQueryForm() {
      var _this$props = this.props,
          dateRangeFrom = _this$props.dateRangeFrom,
          dateRangeTo = _this$props.dateRangeTo,
          showDatePicker = _this$props.showDatePicker;
      return showDatePicker || !showDatePicker && dateRangeFrom !== undefined && dateRangeTo !== undefined;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.filterBarRef) {
        this.setFilterBarHeight();
        this.ro.observe(this.filterBarRef);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.filterBarRef) {
        this.setFilterBarHeight();
        this.ro.unobserve(this.filterBarRef);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var savedQueryManagement = this.state.query && this.props.onClearSavedQuery && _react2.default.createElement(_.SavedQueryManagementComponent, {
        showSaveQuery: this.props.showSaveQuery,
        loadedSavedQuery: this.props.savedQuery,
        onSave: this.onInitiateSave,
        onSaveAsNew: this.onInitiateSaveNew,
        onLoad: this.onLoadSavedQuery,
        savedQueryService: this.savedQueryService,
        onClearSavedQuery: this.props.onClearSavedQuery
      });

      var queryBar;

      if (this.shouldRenderQueryBar()) {
        queryBar = _react2.default.createElement(_query_bar_top_row.QueryBarTopRow, {
          timeHistory: this.props.timeHistory,
          query: this.state.query,
          screenTitle: this.props.screenTitle,
          onSubmit: this.onQueryBarSubmit,
          indexPatterns: this.props.indexPatterns,
          isLoading: this.props.isLoading,
          prepend: this.props.showFilterBar ? savedQueryManagement : undefined,
          showDatePicker: this.props.showDatePicker,
          dateRangeFrom: this.state.dateRangeFrom,
          dateRangeTo: this.state.dateRangeTo,
          isRefreshPaused: this.props.isRefreshPaused,
          refreshInterval: this.props.refreshInterval,
          showAutoRefreshOnly: this.props.showAutoRefreshOnly,
          showQueryInput: this.props.showQueryInput,
          onRefresh: this.props.onRefresh,
          onRefreshChange: this.props.onRefreshChange,
          onChange: this.onQueryBarChange,
          isDirty: this.isDirty(),
          customSubmitButton: this.props.customSubmitButton ? this.props.customSubmitButton : undefined,
          dataTestSubj: this.props.dataTestSubj
        });
      }

      var filterBar;

      if (this.shouldRenderFilterBar()) {
        var filterGroupClasses = (0, _classnames.default)('globalFilterGroup__wrapper', {
          'globalFilterGroup__wrapper-isVisible': this.state.isFiltersVisible
        });
        filterBar = _react2.default.createElement("div", {
          id: "GlobalFilterGroup",
          ref: function ref(node) {
            _this2.filterBarWrapperRef = node;
          },
          className: filterGroupClasses
        }, _react2.default.createElement("div", {
          ref: function ref(node) {
            _this2.filterBarRef = node;
          }
        }, _react2.default.createElement(_.FilterBar, {
          className: "globalFilterGroup__filterBar",
          filters: this.props.filters,
          onFiltersUpdated: this.props.onFiltersUpdated,
          indexPatterns: this.props.indexPatterns
        })));
      }

      return _react2.default.createElement("div", {
        className: "globalQueryBar"
      }, queryBar, filterBar, this.state.showSaveQueryModal ? _react2.default.createElement(_.SaveQueryForm, {
        savedQuery: this.props.savedQuery ? this.props.savedQuery.attributes : undefined,
        savedQueryService: this.savedQueryService,
        onSave: this.onSave,
        onClose: function onClose() {
          return _this2.setState({
            showSaveQueryModal: false
          });
        },
        showFilterOption: this.props.showFilterBar,
        showTimeFilterOption: this.shouldRenderTimeFilterInSavedQueryForm()
      }) : null, this.state.showSaveNewQueryModal ? _react2.default.createElement(_.SaveQueryForm, {
        savedQueryService: this.savedQueryService,
        onSave: function onSave(savedQueryMeta) {
          return _this2.onSave(savedQueryMeta, true);
        },
        onClose: function onClose() {
          return _this2.setState({
            showSaveNewQueryModal: false
          });
        },
        showFilterOption: this.props.showFilterBar,
        showTimeFilterOption: this.shouldRenderTimeFilterInSavedQueryForm()
      }) : null);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if ((0, _lodash.isEqual)(prevState.currentProps, nextProps)) {
        return null;
      }

      var nextQuery = null;

      if (nextProps.query && nextProps.query.query !== (0, _lodash.get)(prevState, 'currentProps.query.query')) {
        nextQuery = {
          query: nextProps.query.query,
          language: nextProps.query.language
        };
      } else if (nextProps.query && prevState.query && nextProps.query.language !== prevState.query.language) {
        nextQuery = {
          query: '',
          language: nextProps.query.language
        };
      }

      var nextDateRange = null;

      if (nextProps.dateRangeFrom !== (0, _lodash.get)(prevState, 'currentProps.dateRangeFrom') || nextProps.dateRangeTo !== (0, _lodash.get)(prevState, 'currentProps.dateRangeTo')) {
        nextDateRange = {
          dateRangeFrom: nextProps.dateRangeFrom,
          dateRangeTo: nextProps.dateRangeTo
        };
      }

      var nextState = {
        currentProps: nextProps
      };

      if (nextQuery) {
        nextState.query = nextQuery;
      }

      if (nextDateRange) {
        nextState.dateRangeFrom = nextDateRange.dateRangeFrom;
        nextState.dateRangeTo = nextDateRange.dateRangeTo;
      }

      return nextState;
    }
    /*
     Keep the "draft" value in local state until the user actually submits the query. There are a couple advantages:
       1. Each app doesn't have to maintain its own "draft" value if it wants to put off updating the query in app state
      until the user manually submits their changes. Most apps have watches on the query value in app state so we don't
      want to trigger those on every keypress. Also, some apps (e.g. dashboard) already juggle multiple query values,
      each with slightly different semantics and I'd rather not add yet another variable to the mix.
       2. Changes to the local component state won't trigger an Angular digest cycle. Triggering digest cycles on every
      keypress has been a major source of performance issues for us in previous implementations of the query bar.
      See https://github.com/elastic/kibana/issues/14086
    */

  }]);

  return SearchBarUI;
}(_react2.Component);

_defineProperty(SearchBarUI, "defaultProps", {
  showQueryBar: true,
  showFilterBar: true,
  showDatePicker: true,
  showAutoRefreshOnly: false
});

var SearchBar = (0, _react.injectI18n)((0, _public.withKibana)(SearchBarUI));
exports.SearchBar = SearchBar;