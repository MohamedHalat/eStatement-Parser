"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizeEmbeddable = void 0;

var _lodash = _interopRequireWildcard(require("lodash"));

var _persisted_state = require("ui/persisted_state");

var Rx = _interopRequireWildcard(require("rxjs"));

var _pipeline_helpers = require("ui/visualize/loader/pipeline_helpers");

var _utils = require("ui/visualize/loader/utils");

var _utilities = require("ui/visualize/loader/pipeline_helpers/utilities");

var _new_platform = require("ui/new_platform");

var _constants = require("./constants");

var _public = require("../../../../../plugins/data/public");

var _public2 = require("../../../../../plugins/embeddable/public");

var _public3 = require("../../../../../plugins/kibana_utils/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var getKeys = function getKeys(o) {
  return Object.keys(o);
};

var VisualizeEmbeddable =
/*#__PURE__*/
function (_Embeddable) {
  _inherits(VisualizeEmbeddable, _Embeddable);

  function VisualizeEmbeddable(timefilter, _ref, initialInput, parent) {
    var _this;

    var savedVisualization = _ref.savedVisualization,
        editUrl = _ref.editUrl,
        indexPatterns = _ref.indexPatterns,
        editable = _ref.editable,
        appState = _ref.appState,
        uiState = _ref.uiState;

    _classCallCheck(this, VisualizeEmbeddable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisualizeEmbeddable).call(this, initialInput, {
      defaultTitle: savedVisualization.title,
      editUrl: editUrl,
      indexPatterns: indexPatterns,
      editable: editable,
      savedObjectId: savedVisualization.id,
      visTypeName: savedVisualization.vis.type.name
    }, parent));

    _defineProperty(_assertThisInitialized(_this), "handler", void 0);

    _defineProperty(_assertThisInitialized(_this), "savedVisualization", void 0);

    _defineProperty(_assertThisInitialized(_this), "appState", void 0);

    _defineProperty(_assertThisInitialized(_this), "uiState", void 0);

    _defineProperty(_assertThisInitialized(_this), "timeRange", void 0);

    _defineProperty(_assertThisInitialized(_this), "query", void 0);

    _defineProperty(_assertThisInitialized(_this), "title", void 0);

    _defineProperty(_assertThisInitialized(_this), "filters", void 0);

    _defineProperty(_assertThisInitialized(_this), "visCustomizations", void 0);

    _defineProperty(_assertThisInitialized(_this), "subscriptions", []);

    _defineProperty(_assertThisInitialized(_this), "expression", '');

    _defineProperty(_assertThisInitialized(_this), "actions", {});

    _defineProperty(_assertThisInitialized(_this), "vis", void 0);

    _defineProperty(_assertThisInitialized(_this), "domNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", _constants.VISUALIZE_EMBEDDABLE_TYPE);

    _defineProperty(_assertThisInitialized(_this), "autoRefreshFetchSubscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "getInspectorAdapters", function () {
      if (!_this.handler) {
        return undefined;
      }

      return _this.handler.inspect();
    });

    _defineProperty(_assertThisInitialized(_this), "openInspector", function () {
      if (_this.handler) {
        return _this.handler.openInspector(_this.getTitle() || '');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "reload", function () {
      _this.handleVisUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "handleVisUpdate", function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.appState) {
                _this.appState.vis = _this.savedVisualization.vis.getState();

                _this.appState.save();
              }

              _this.updateHandler();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "uiStateChangeHandler", function () {
      _this.updateInput(_objectSpread({}, _this.uiState.toJSON()));
    });

    _this.appState = appState;
    _this.savedVisualization = savedVisualization;
    _this.vis = _this.savedVisualization.vis;

    _this.vis.on('update', _this.handleVisUpdate);

    _this.vis.on('reload', _this.reload);

    if (uiState) {
      _this.uiState = uiState;
    } else {
      var parsedUiState = savedVisualization.uiStateJSON ? JSON.parse(savedVisualization.uiStateJSON) : {};
      _this.uiState = new _persisted_state.PersistedState(parsedUiState);

      _this.uiState.on('change', _this.uiStateChangeHandler);
    }

    _this.vis._setUiState(_this.uiState);

    _this.autoRefreshFetchSubscription = timefilter.getAutoRefreshFetch$().subscribe(_this.updateHandler.bind(_assertThisInitialized(_this)));

    _this.subscriptions.push(Rx.merge(_this.getOutput$(), _this.getInput$()).subscribe(function () {
      _this.handleChanges();
    }));

    return _this;
  }

  _createClass(VisualizeEmbeddable, [{
    key: "getVisualizationDescription",
    value: function getVisualizationDescription() {
      return this.savedVisualization.description;
    }
  }, {
    key: "transferCustomizationsToUiState",

    /**
     * Transfers all changes in the containerState.customization into
     * the uiState of this visualization.
     */
    value: function transferCustomizationsToUiState() {
      var _this2 = this;

      // Check for changes that need to be forwarded to the uiState
      // Since the vis has an own listener on the uiState we don't need to
      // pass anything from here to the handler.update method
      var visCustomizations = this.input.vis;

      if (visCustomizations) {
        if (!_lodash.default.isEqual(visCustomizations, this.visCustomizations)) {
          this.visCustomizations = visCustomizations; // Turn this off or the uiStateChangeHandler will fire for every modification.

          this.uiState.off('change', this.uiStateChangeHandler);
          this.uiState.clearAllKeys();
          this.uiState.set('vis', visCustomizations);
          getKeys(visCustomizations).forEach(function (key) {
            _this2.uiState.set(key, visCustomizations[key]);
          });
          this.uiState.on('change', this.uiStateChangeHandler);
        }
      } else if (!this.appState) {
        this.uiState.clearAllKeys();
      }
    }
  }, {
    key: "handleChanges",
    value: function handleChanges() {
      var dirty;
      return regeneratorRuntime.async(function handleChanges$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.transferCustomizationsToUiState();
              dirty = false; // Check if timerange has changed

              if (!_lodash.default.isEqual(this.input.timeRange, this.timeRange)) {
                this.timeRange = _lodash.default.cloneDeep(this.input.timeRange);
                dirty = true;
              } // Check if filters has changed


              if (!(0, _public.onlyDisabledFiltersChanged)(this.input.filters, this.filters)) {
                this.filters = this.input.filters;
                dirty = true;
              } // Check if query has changed


              if (!_lodash.default.isEqual(this.input.query, this.query)) {
                this.query = this.input.query;
                dirty = true;
              }

              if (this.output.title !== this.title) {
                this.title = this.output.title;

                if (this.domNode) {
                  this.domNode.setAttribute('data-title', this.title || '');
                }
              }

              if (this.savedVisualization.description && this.domNode) {
                this.domNode.setAttribute('data-description', this.savedVisualization.description);
              }

              if (this.handler && dirty) {
                this.updateHandler();
              }

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /**
     *
     * @param {Element} domNode
     */

  }, {
    key: "render",
    value: function render(domNode) {
      var _this3 = this;

      var div;
      return regeneratorRuntime.async(function render$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.timeRange = _lodash.default.cloneDeep(this.input.timeRange);
              this.transferCustomizationsToUiState();

              this.savedVisualization.vis._setUiState(this.uiState);

              this.uiState = this.savedVisualization.vis.getUiState(); // init default actions

              (0, _lodash.forEach)(this.vis.type.events, function (event, eventName) {
                if (event.disabled || !eventName) {
                  return;
                } else {
                  _this3.actions[eventName] = event.defaultAction;
                }
              }); // This is a hack to give maps visualizations access to data in the
              // globalState, since they can no longer access it via searchSource.
              // TODO: Remove this as a part of elastic/kibana#30593

              this.vis.API.getGeohashBounds = function () {
                return (0, _utils.queryGeohashBounds)(_this3.savedVisualization.vis, {
                  filters: _this3.filters,
                  query: _this3.query,
                  searchSource: _this3.savedVisualization.searchSource
                });
              }; // this is a hack to make editor still work, will be removed once we clean up editor


              this.vis.hasInspector = function () {
                var visTypesWithoutInspector = ['markdown', 'input_control_vis', 'metrics', 'vega', 'timelion'];

                if (visTypesWithoutInspector.includes(_this3.vis.type.name)) {
                  return false;
                }

                return _this3.getInspectorAdapters();
              };

              this.vis.openInspector = this.openInspector;
              div = document.createElement('div');
              div.className = "visualize panel-content panel-content--fullWidth";
              domNode.appendChild(div);
              this.domNode = div;
              this.handler = new _new_platform.npStart.plugins.expressions.ExpressionLoader(this.domNode);
              this.subscriptions.push(this.handler.events$.subscribe(function _callee2(event) {
                var filters, mappedFilters, timeFieldName;
                return regeneratorRuntime.async(function _callee2$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (_this3.actions[event.name]) {
                          event.data.aggConfigs = (0, _utilities.getTableAggs)(_this3.vis);
                          filters = _this3.actions[event.name](event.data) || [];
                          mappedFilters = (0, _public.mapAndFlattenFilters)(filters);
                          timeFieldName = _this3.vis.indexPattern.timeFieldName;

                          _new_platform.npStart.plugins.uiActions.executeTriggerActions(_public2.APPLY_FILTER_TRIGGER, {
                            embeddable: _this3,
                            filters: mappedFilters,
                            timeFieldName: timeFieldName
                          });
                        }

                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }
                });
              }));
              div.setAttribute('data-title', this.output.title || '');

              if (this.savedVisualization.description) {
                div.setAttribute('data-description', this.savedVisualization.description);
              }

              div.setAttribute('data-test-subj', 'visualizationLoader');
              div.setAttribute('data-shared-item', '');
              div.setAttribute('data-rendering-count', '0');
              div.setAttribute('data-render-complete', 'false');
              this.subscriptions.push(this.handler.loading$.subscribe(function () {
                div.setAttribute('data-render-complete', 'false');
                div.setAttribute('data-loading', '');
              }));
              this.subscriptions.push(this.handler.render$.subscribe(function (count) {
                div.removeAttribute('data-loading');
                div.setAttribute('data-render-complete', 'true');
                div.setAttribute('data-rendering-count', count.toString());
                (0, _public3.dispatchRenderComplete)(div);
              }));
              this.updateHandler();

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(VisualizeEmbeddable.prototype), "destroy", this).call(this);

      this.subscriptions.forEach(function (s) {
        return s.unsubscribe();
      });
      this.uiState.off('change', this.uiStateChangeHandler);
      this.savedVisualization.vis.removeListener('reload', this.reload);
      this.savedVisualization.vis.removeListener('update', this.handleVisUpdate);
      this.savedVisualization.destroy();

      if (this.handler) {
        this.handler.destroy();
        this.handler.getElement().remove();
      }

      this.autoRefreshFetchSubscription.unsubscribe();
    }
  }, {
    key: "updateHandler",
    value: function updateHandler() {
      var expressionParams;
      return regeneratorRuntime.async(function updateHandler$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              expressionParams = {
                searchContext: {
                  type: 'kibana_context',
                  timeRange: this.timeRange,
                  query: this.input.query,
                  filters: this.input.filters
                },
                extraHandlers: {
                  vis: this.vis,
                  uiState: this.uiState
                }
              };
              _context5.next = 3;
              return regeneratorRuntime.awrap((0, _pipeline_helpers.buildPipeline)(this.vis, {
                searchSource: this.savedVisualization.searchSource,
                timeRange: this.timeRange,
                savedObjectId: this.savedVisualization.id
              }));

            case 3:
              this.expression = _context5.sent;
              this.vis.filters = {
                timeRange: this.timeRange
              };

              if (this.handler) {
                this.handler.update(this.expression, expressionParams);
              }

              this.vis.emit('apply');

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }]);

  return VisualizeEmbeddable;
}(_public2.Embeddable);

exports.VisualizeEmbeddable = VisualizeEmbeddable;