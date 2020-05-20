"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardGrid = void 0;

require("react-grid-layout/css/styles.css");

require("react-resizable/css/styles.css");

var _reactSizeme = _interopRequireDefault(require("react-sizeme"));

var _react = require("@kbn/i18n/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react2 = _interopRequireDefault(require("react"));

var _reactGridLayout = _interopRequireDefault(require("react-grid-layout"));

var _embeddable_plugin = require("../../embeddable_plugin");

var _dashboard_constants = require("../dashboard_constants");

var _public = require("../../../../kibana_react/public");

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

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var lastValidGridSize = 0;
/**
 * This is a fix for a bug that stopped the browser window from automatically scrolling down when panels were made
 * taller than the current grid.
 * see https://github.com/elastic/kibana/issues/14710.
 */

function ensureWindowScrollsToBottom(event) {
  // The buffer is to handle the case where the browser is maximized and it's impossible for the mouse to move below
  // the screen, out of the window.  see https://github.com/elastic/kibana/issues/14737
  var WINDOW_BUFFER = 10;

  if (event.clientY > window.innerHeight - WINDOW_BUFFER) {
    window.scrollTo(0, event.pageY + WINDOW_BUFFER - window.innerHeight);
  }
}

function ResponsiveGrid(_ref) {
  var size = _ref.size,
      isViewMode = _ref.isViewMode,
      layout = _ref.layout,
      onLayoutChange = _ref.onLayoutChange,
      children = _ref.children,
      maximizedPanelId = _ref.maximizedPanelId,
      useMargins = _ref.useMargins;
  // This is to prevent a bug where view mode changes when the panel is expanded.  View mode changes will trigger
  // the grid to re-render, but when a panel is expanded, the size will be 0. Minimizing the panel won't cause the
  // grid to re-render so it'll show a grid with a width of 0.
  lastValidGridSize = size.width > 0 ? size.width : lastValidGridSize;
  var classes = (0, _classnames.default)({
    'dshLayout--viewing': isViewMode,
    'dshLayout--editing': !isViewMode,
    'dshLayout-isMaximizedPanel': maximizedPanelId !== undefined,
    'dshLayout-withoutMargins': !useMargins
  });
  var MARGINS = useMargins ? 8 : 0; // We can't take advantage of isDraggable or isResizable due to performance concerns:
  // https://github.com/STRML/react-grid-layout/issues/240

  return _react2.default.createElement(_reactGridLayout.default, {
    width: lastValidGridSize,
    className: classes,
    isDraggable: true,
    isResizable: true // There is a bug with d3 + firefox + elements using transforms.
    // See https://github.com/elastic/kibana/issues/16870 for more context.
    ,
    useCSSTransforms: false,
    margin: [MARGINS, MARGINS],
    cols: _dashboard_constants.DASHBOARD_GRID_COLUMN_COUNT,
    rowHeight: _dashboard_constants.DASHBOARD_GRID_HEIGHT // Pass the named classes of what should get the dragging handle
    // (.doesnt-exist literally doesnt exist)
    ,
    draggableHandle: isViewMode ? '.doesnt-exist' : '.embPanel__dragger',
    layout: layout,
    onLayoutChange: onLayoutChange,
    onResize: function onResize(_ref2, _ref3, _ref4, _ref5, event) {
      _objectDestructuringEmpty(_ref2);

      _objectDestructuringEmpty(_ref3);

      _objectDestructuringEmpty(_ref4);

      _objectDestructuringEmpty(_ref5);

      return ensureWindowScrollsToBottom(event);
    }
  }, children);
} // Using sizeMe sets up the grid to be re-rendered automatically not only when the window size changes, but also
// when the container size changes, so it works for Full Screen mode switches.


var config = {
  monitorWidth: true
};
var ResponsiveSizedGrid = (0, _reactSizeme.default)(config)(ResponsiveGrid);

var DashboardGridUi =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DashboardGridUi, _React$Component);

  // A mapping of panelIndexes to grid items so we can set the zIndex appropriately on the last focused
  // item.
  function DashboardGridUi(props) {
    var _this;

    _classCallCheck(this, DashboardGridUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardGridUi).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "mounted", false);

    _defineProperty(_assertThisInitialized(_this), "gridItems", {});

    _defineProperty(_assertThisInitialized(_this), "buildLayoutFromPanels", function () {
      return _lodash.default.map(_this.state.panels, function (panel) {
        return panel.gridData;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onLayoutChange", function (layout) {
      var panels = _this.state.panels;
      var updatedPanels = layout.reduce(function (updatedPanelsAcc, panelLayout) {
        updatedPanelsAcc[panelLayout.i] = _objectSpread({}, panels[panelLayout.i], {
          gridData: _lodash.default.pick(panelLayout, ['x', 'y', 'w', 'h', 'i'])
        });
        return updatedPanelsAcc;
      }, {});

      _this.onPanelsUpdated(updatedPanels);
    });

    _defineProperty(_assertThisInitialized(_this), "onPanelsUpdated", function (panels) {
      _this.props.container.updateInput({
        panels: panels
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPanelFocused", function (focusedPanelIndex) {
      _this.setState({
        focusedPanelIndex: focusedPanelIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPanelBlurred", function (blurredPanelIndex) {
      if (_this.state.focusedPanelIndex === blurredPanelIndex) {
        _this.setState({
          focusedPanelIndex: undefined
        });
      }
    });

    _this.state = {
      layout: [],
      isLayoutInvalid: false,
      focusedPanelIndex: undefined,
      panels: _this.props.container.getInput().panels,
      viewMode: _this.props.container.getInput().viewMode,
      useMargins: _this.props.container.getInput().useMargins,
      expandedPanelId: _this.props.container.getInput().expandedPanelId
    };
    return _this;
  }

  _createClass(DashboardGridUi, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      var isLayoutInvalid = false;
      var layout;

      try {
        layout = this.buildLayoutFromPanels();
      } catch (error) {
        console.error(error); // eslint-disable-line no-console

        isLayoutInvalid = true;
        this.props.kibana.notifications.toasts.danger({
          title: this.props.intl.formatMessage({
            id: 'dashboardEmbeddableContainer.dashboardGrid.toast.unableToLoadDashboardDangerMessage',
            defaultMessage: 'Unable to load dashboard.'
          }),
          body: error.message,
          toastLifeTimeMs: 5000
        });
      }

      this.setState({
        layout: layout,
        isLayoutInvalid: isLayoutInvalid
      });
      this.subscription = this.props.container.getInput$().subscribe(function (input) {
        if (_this2.mounted) {
          _this2.setState({
            panels: input.panels,
            viewMode: input.viewMode,
            useMargins: input.useMargins,
            expandedPanelId: input.expandedPanelId
          });
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;

      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }, {
    key: "renderPanels",
    value: function renderPanels() {
      var _this3 = this;

      var _this$state = this.state,
          focusedPanelIndex = _this$state.focusedPanelIndex,
          panels = _this$state.panels,
          expandedPanelId = _this$state.expandedPanelId; // Part of our unofficial API - need to render in a consistent order for plugins.

      var panelsInOrder = Object.keys(panels).map(function (key) {
        return panels[key];
      });
      panelsInOrder.sort(function (panelA, panelB) {
        if (panelA.gridData.y === panelB.gridData.y) {
          return panelA.gridData.x - panelB.gridData.x;
        } else {
          return panelA.gridData.y - panelB.gridData.y;
        }
      });
      return _lodash.default.map(panelsInOrder, function (panel) {
        var expandPanel = expandedPanelId !== undefined && expandedPanelId === panel.explicitInput.id;
        var hidePanel = expandedPanelId !== undefined && expandedPanelId !== panel.explicitInput.id;
        var classes = (0, _classnames.default)({
          'dshDashboardGrid__item--expanded': expandPanel,
          'dshDashboardGrid__item--hidden': hidePanel
        });
        return _react2.default.createElement("div", {
          style: {
            zIndex: focusedPanelIndex === panel.explicitInput.id ? 2 : 'auto'
          },
          className: classes,
          key: panel.explicitInput.id,
          "data-test-subj": "dashboardPanel",
          ref: function ref(reactGridItem) {
            _this3.gridItems[panel.explicitInput.id] = reactGridItem;
          }
        }, _react2.default.createElement(_embeddable_plugin.EmbeddableChildPanel, {
          embeddableId: panel.explicitInput.id,
          container: _this3.props.container,
          getActions: _this3.props.kibana.services.uiActions.getTriggerCompatibleActions,
          getEmbeddableFactory: _this3.props.kibana.services.embeddable.getEmbeddableFactory,
          getAllEmbeddableFactories: _this3.props.kibana.services.embeddable.getEmbeddableFactories,
          overlays: _this3.props.kibana.services.overlays,
          notifications: _this3.props.kibana.services.notifications,
          inspector: _this3.props.kibana.services.inspector,
          SavedObjectFinder: _this3.props.kibana.services.SavedObjectFinder
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.isLayoutInvalid) {
        return null;
      }

      var viewMode = this.state.viewMode;
      var isViewMode = viewMode === _embeddable_plugin.ViewMode.VIEW;
      return _react2.default.createElement(ResponsiveSizedGrid, {
        isViewMode: isViewMode,
        layout: this.buildLayoutFromPanels(),
        onLayoutChange: this.onLayoutChange,
        maximizedPanelId: this.state.expandedPanelId,
        useMargins: this.state.useMargins
      }, this.renderPanels());
    }
  }]);

  return DashboardGridUi;
}(_react2.default.Component);

var DashboardGrid = (0, _react.injectI18n)((0, _public.withKibana)(DashboardGridUi));
exports.DashboardGrid = DashboardGrid;