"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardStateManager = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = _interopRequireDefault(require("lodash"));

var _public = require("../../../../../../plugins/embeddable/public");

var _legacy_imports = require("../legacy_imports");

var _lib = require("./lib");

var _embeddable_saved_object_converters = require("./lib/embeddable_saved_object_converters");

var _filter_utils = require("./lib/filter_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Dashboard state manager handles connecting angular and redux state between the angular and react portions of the
 * app. There are two "sources of truth" that need to stay in sync - AppState (aka the `_a` portion of the url) and
 * the Store. They aren't complete duplicates of each other as AppState has state that the Store doesn't, and vice
 * versa. They should be as decoupled as possible so updating the store won't affect bwc of urls.
 */
var DashboardStateManager =
/*#__PURE__*/
function () {
  /**
   *
   * @param savedDashboard
   * @param AppState The AppState class to use when instantiating a new AppState instance.
   * @param hideWriteControls true if write controls should be hidden.
   */
  function DashboardStateManager(_ref) {
    var _this = this;

    var savedDashboard = _ref.savedDashboard,
        AppStateClass = _ref.AppStateClass,
        hideWriteControls = _ref.hideWriteControls,
        kibanaVersion = _ref.kibanaVersion;

    _classCallCheck(this, DashboardStateManager);

    _defineProperty(this, "savedDashboard", void 0);

    _defineProperty(this, "appState", void 0);

    _defineProperty(this, "lastSavedDashboardFilters", void 0);

    _defineProperty(this, "stateDefaults", void 0);

    _defineProperty(this, "hideWriteControls", void 0);

    _defineProperty(this, "kibanaVersion", void 0);

    _defineProperty(this, "isDirty", void 0);

    _defineProperty(this, "changeListeners", void 0);

    _defineProperty(this, "stateMonitor", void 0);

    this.kibanaVersion = kibanaVersion;
    this.savedDashboard = savedDashboard;
    this.hideWriteControls = hideWriteControls;
    this.stateDefaults = (0, _lib.getAppStateDefaults)(this.savedDashboard, this.hideWriteControls);
    this.appState = new AppStateClass(this.stateDefaults); // Initializing appState does two things - first it translates the defaults into AppState, second it updates
    // appState based on the URL (the url trumps the defaults). This means if we update the state format at all and
    // want to handle BWC, we must not only migrate the data stored with saved Dashboard, but also any old state in the
    // url.

    (0, _lib.migrateAppState)(this.appState, kibanaVersion);
    this.isDirty = false; // We can't compare the filters stored on this.appState to this.savedDashboard because in order to apply
    // the filters to the visualizations, we need to save it on the dashboard. We keep track of the original
    // filter state in order to let the user know if their filters changed and provide this specific information
    // in the 'lose changes' warning message.

    this.lastSavedDashboardFilters = this.getFilterState();
    /**
     * Creates a state monitor and saves it to this.stateMonitor. Used to track unsaved changes made to appState.
     */

    this.stateMonitor = _legacy_imports.stateMonitorFactory.create(this.appState, this.stateDefaults);
    this.stateMonitor.ignoreProps('viewMode'); // Filters need to be compared manually because they sometimes have a $$hashkey stored on the object.

    this.stateMonitor.ignoreProps('filters'); // Query needs to be compared manually because saved legacy queries get migrated in app state automatically

    this.stateMonitor.ignoreProps('query');
    this.stateMonitor.onChange(function (status) {
      _this.isDirty = status.dirty;
    });
    this.changeListeners = [];
    this.stateMonitor.onChange(function (status) {
      _this.changeListeners.forEach(function (listener) {
        return listener(status);
      });
    });
  }

  _createClass(DashboardStateManager, [{
    key: "registerChangeListener",
    value: function registerChangeListener(callback) {
      this.changeListeners.push(callback);
    }
  }, {
    key: "handleDashboardContainerChanges",
    value: function handleDashboardContainerChanges(dashboardContainer) {
      var _this2 = this;

      var dirty = false;
      var savedDashboardPanelMap = {};
      var input = dashboardContainer.getInput();
      this.getPanels().forEach(function (savedDashboardPanel) {
        if (input.panels[savedDashboardPanel.panelIndex] !== undefined) {
          savedDashboardPanelMap[savedDashboardPanel.panelIndex] = savedDashboardPanel;
        } else {
          // A panel was deleted.
          dirty = true;
        }
      });
      var convertedPanelStateMap = {};
      Object.values(input.panels).forEach(function (panelState) {
        if (savedDashboardPanelMap[panelState.explicitInput.id] === undefined) {
          dirty = true;
        }

        convertedPanelStateMap[panelState.explicitInput.id] = (0, _embeddable_saved_object_converters.convertPanelStateToSavedDashboardPanel)(panelState, _this2.kibanaVersion);

        if (!_lodash.default.isEqual(convertedPanelStateMap[panelState.explicitInput.id], savedDashboardPanelMap[panelState.explicitInput.id])) {
          // A panel was changed
          dirty = true;
        }
      });

      if (dirty) {
        this.appState.panels = Object.values(convertedPanelStateMap);
      }

      if (input.isFullScreenMode !== this.getFullScreenMode()) {
        this.setFullScreenMode(input.isFullScreenMode);
      }

      if (!_lodash.default.isEqual(input.query, this.getQuery())) {
        this.setQuery(input.query);
      }

      this.changeListeners.forEach(function (listener) {
        return listener({
          dirty: dirty
        });
      });
      this.saveState();
    }
  }, {
    key: "getFullScreenMode",
    value: function getFullScreenMode() {
      return this.appState.fullScreenMode;
    }
  }, {
    key: "setFullScreenMode",
    value: function setFullScreenMode(fullScreenMode) {
      this.appState.fullScreenMode = fullScreenMode;
      this.saveState();
    }
    /**
     * Resets the state back to the last saved version of the dashboard.
     */

  }, {
    key: "resetState",
    value: function resetState() {
      // In order to show the correct warning, we have to store the unsaved
      // title on the dashboard object. We should fix this at some point, but this is how all the other object
      // save panels work at the moment.
      this.savedDashboard.title = this.savedDashboard.lastSavedTitle; // appState.reset uses the internal defaults to reset the state, but some of the default settings (e.g. the panels
      // array) point to the same object that is stored on appState and is getting modified.
      // The right way to fix this might be to ensure the defaults object stored on state is a deep
      // clone, but given how much code uses the state object, I determined that to be too risky of a change for
      // now.  TODO: revisit this!

      this.stateDefaults = (0, _lib.getAppStateDefaults)(this.savedDashboard, this.hideWriteControls); // The original query won't be restored by the above because the query on this.savedDashboard is applied
      // in place in order for it to affect the visualizations.

      this.stateDefaults.query = this.lastSavedDashboardFilters.query; // Need to make a copy to ensure they are not overwritten.

      this.stateDefaults.filters = _toConsumableArray(this.getLastSavedFilterBars());
      this.isDirty = false;
      this.appState.setDefaults(this.stateDefaults);
      this.appState.reset();
      this.stateMonitor.setInitialState(this.appState.toJSON());
    }
    /**
     * Returns an object which contains the current filter state of this.savedDashboard.
     */

  }, {
    key: "getFilterState",
    value: function getFilterState() {
      return {
        timeTo: this.savedDashboard.timeTo,
        timeFrom: this.savedDashboard.timeFrom,
        filterBars: this.savedDashboard.getFilters(),
        query: this.savedDashboard.getQuery()
      };
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.appState.title;
    }
  }, {
    key: "isSaved",
    value: function isSaved() {
      return !!this.savedDashboard.id;
    }
  }, {
    key: "isNew",
    value: function isNew() {
      return !this.isSaved();
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.appState.description;
    }
  }, {
    key: "setDescription",
    value: function setDescription(description) {
      this.appState.description = description;
      this.saveState();
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.appState.title = title;
      this.savedDashboard.title = title;
      this.saveState();
    }
  }, {
    key: "getAppState",
    value: function getAppState() {
      return this.appState;
    }
  }, {
    key: "getQuery",
    value: function getQuery() {
      return (0, _legacy_imports.migrateLegacyQuery)(this.appState.query);
    }
  }, {
    key: "getSavedQueryId",
    value: function getSavedQueryId() {
      return this.appState.savedQuery;
    }
  }, {
    key: "setSavedQueryId",
    value: function setSavedQueryId(id) {
      this.appState.savedQuery = id;
      this.saveState();
    }
  }, {
    key: "getUseMargins",
    value: function getUseMargins() {
      // Existing dashboards that don't define this should default to false.
      return this.appState.options.useMargins === undefined ? false : this.appState.options.useMargins;
    }
  }, {
    key: "setUseMargins",
    value: function setUseMargins(useMargins) {
      this.appState.options.useMargins = useMargins;
      this.saveState();
    }
  }, {
    key: "getHidePanelTitles",
    value: function getHidePanelTitles() {
      return this.appState.options.hidePanelTitles;
    }
  }, {
    key: "setHidePanelTitles",
    value: function setHidePanelTitles(hidePanelTitles) {
      this.appState.options.hidePanelTitles = hidePanelTitles;
      this.saveState();
    }
  }, {
    key: "getTimeRestore",
    value: function getTimeRestore() {
      return this.appState.timeRestore;
    }
  }, {
    key: "setTimeRestore",
    value: function setTimeRestore(timeRestore) {
      this.appState.timeRestore = timeRestore;
      this.saveState();
    }
  }, {
    key: "getIsTimeSavedWithDashboard",
    value: function getIsTimeSavedWithDashboard() {
      return this.savedDashboard.timeRestore;
    }
  }, {
    key: "getLastSavedFilterBars",
    value: function getLastSavedFilterBars() {
      return this.lastSavedDashboardFilters.filterBars;
    }
  }, {
    key: "getLastSavedQuery",
    value: function getLastSavedQuery() {
      return this.lastSavedDashboardFilters.query;
    }
    /**
     * @returns True if the query changed since the last time the dashboard was saved, or if it's a
     * new dashboard, if the query differs from the default.
     */

  }, {
    key: "getQueryChanged",
    value: function getQueryChanged() {
      var currentQuery = this.appState.query;
      var lastSavedQuery = this.getLastSavedQuery();
      var query = (0, _legacy_imports.migrateLegacyQuery)(currentQuery);

      var isLegacyStringQuery = _lodash.default.isString(lastSavedQuery) && _lodash.default.isPlainObject(currentQuery) && _lodash.default.has(currentQuery, 'query');

      if (isLegacyStringQuery) {
        return lastSavedQuery !== query.query;
      }

      return !_lodash.default.isEqual(currentQuery, lastSavedQuery);
    }
    /**
     * @returns True if the filter bar state has changed since the last time the dashboard was saved,
     * or if it's a new dashboard, if the query differs from the default.
     */

  }, {
    key: "getFilterBarChanged",
    value: function getFilterBarChanged() {
      return !_lodash.default.isEqual(_filter_utils.FilterUtils.cleanFiltersForComparison(this.appState.filters), _filter_utils.FilterUtils.cleanFiltersForComparison(this.getLastSavedFilterBars()));
    }
    /**
     * @param timeFilter
     * @returns True if the time state has changed since the time saved with the dashboard.
     */

  }, {
    key: "getTimeChanged",
    value: function getTimeChanged(timeFilter) {
      return !_filter_utils.FilterUtils.areTimesEqual(this.lastSavedDashboardFilters.timeFrom, timeFilter.getTime().from) || !_filter_utils.FilterUtils.areTimesEqual(this.lastSavedDashboardFilters.timeTo, timeFilter.getTime().to);
    }
  }, {
    key: "getViewMode",
    value: function getViewMode() {
      return this.hideWriteControls ? _public.ViewMode.VIEW : this.appState.viewMode;
    }
  }, {
    key: "getIsViewMode",
    value: function getIsViewMode() {
      return this.getViewMode() === _public.ViewMode.VIEW;
    }
  }, {
    key: "getIsEditMode",
    value: function getIsEditMode() {
      return this.getViewMode() === _public.ViewMode.EDIT;
    }
    /**
     *
     * @returns True if the dashboard has changed since the last save (or, is new).
     */

  }, {
    key: "getIsDirty",
    value: function getIsDirty(timeFilter) {
      // Filter bar comparison is done manually (see cleanFiltersForComparison for the reason) and time picker
      // changes are not tracked by the state monitor.
      var hasTimeFilterChanged = timeFilter ? this.getFiltersChanged(timeFilter) : false;
      return this.getIsEditMode() && (this.isDirty || hasTimeFilterChanged);
    }
  }, {
    key: "getPanels",
    value: function getPanels() {
      return this.appState.panels;
    }
  }, {
    key: "updatePanel",
    value: function updatePanel(panelIndex, panelAttributes) {
      var foundPanel = this.getPanels().find(function (panel) {
        return panel.panelIndex === panelIndex;
      });
      Object.assign(foundPanel, panelAttributes);
      this.saveState();
      return foundPanel;
    }
    /**
     * @param timeFilter
     * @returns An array of user friendly strings indicating the filter types that have changed.
     */

  }, {
    key: "getChangedFilterTypes",
    value: function getChangedFilterTypes(timeFilter) {
      var changedFilters = [];

      if (this.getFilterBarChanged()) {
        changedFilters.push('filter');
      }

      if (this.getQueryChanged()) {
        changedFilters.push('query');
      }

      if (this.savedDashboard.timeRestore && this.getTimeChanged(timeFilter)) {
        changedFilters.push('time range');
      }

      return changedFilters;
    }
    /**
     * @returns True if filters (query, filter bar filters, and time picker if time is stored
     * with the dashboard) have changed since the last saved state (or if the dashboard hasn't been saved,
     * the default state).
     */

  }, {
    key: "getFiltersChanged",
    value: function getFiltersChanged(timeFilter) {
      return this.getChangedFilterTypes(timeFilter).length > 0;
    }
    /**
     * Updates timeFilter to match the time saved with the dashboard.
     * @param timeFilter
     * @param timeFilter.setTime
     * @param timeFilter.setRefreshInterval
     */

  }, {
    key: "syncTimefilterWithDashboard",
    value: function syncTimefilterWithDashboard(timeFilter) {
      if (!this.getIsTimeSavedWithDashboard()) {
        throw new Error(_i18n.i18n.translate('kbn.dashboard.stateManager.timeNotSavedWithDashboardErrorMessage', {
          defaultMessage: 'The time is not saved with this dashboard so should not be synced.'
        }));
      }

      if (this.savedDashboard.timeFrom && this.savedDashboard.timeTo) {
        timeFilter.setTime({
          from: this.savedDashboard.timeFrom,
          to: this.savedDashboard.timeTo
        });
      }

      if (this.savedDashboard.refreshInterval) {
        timeFilter.setRefreshInterval(this.savedDashboard.refreshInterval);
      }
    }
    /**
     * Saves the current application state to the URL.
     */

  }, {
    key: "saveState",
    value: function saveState() {
      this.appState.save();
    }
  }, {
    key: "setQuery",
    value: function setQuery(query) {
      this.appState.query = query;
      this.saveState();
    }
    /**
     * Applies the current filter state to the dashboard.
     * @param filter An array of filter bar filters.
     */

  }, {
    key: "applyFilters",
    value: function applyFilters(query, filters) {
      this.appState.query = query;
      this.savedDashboard.searchSource.setField('query', query);
      this.savedDashboard.searchSource.setField('filter', filters);
      this.saveState();
    }
  }, {
    key: "switchViewMode",
    value: function switchViewMode(newMode) {
      this.appState.viewMode = newMode;
      this.saveState();
    }
    /**
     * Destroys and cleans up this object when it's no longer used.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this.stateMonitor) {
        this.stateMonitor.destroy();
      }

      this.savedDashboard.destroy();
    }
  }]);

  return DashboardStateManager;
}();

exports.DashboardStateManager = DashboardStateManager;