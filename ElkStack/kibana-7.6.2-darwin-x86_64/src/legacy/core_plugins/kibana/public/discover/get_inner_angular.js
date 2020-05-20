"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInnerAngularModule = getInnerAngularModule;
exports.getInnerAngularModuleEmbeddable = getInnerAngularModuleEmbeddable;
exports.initializeInnerAngularModule = initializeInnerAngularModule;
exports.createLocalGlobalStateModule = createLocalGlobalStateModule;

var _angular = _interopRequireDefault(require("angular"));

require("ui/angular-bootstrap");

var _eui = require("@elastic/eui");

var _state = require("ui/state_management/state");

var _events = require("ui/events");

var _persisted_state = require("ui/persisted_state");

var _promises = require("ui/promises/promises");

var _es = require("ui/es");

var _angular2 = require("@kbn/i18n/angular");

var _private = require("ui/private/private");

var _watch_multi = require("ui/directives/watch_multi/watch_multi");

var _listen = require("ui/directives/listen/listen");

var _kbn_accessible_click = require("ui/accessibility/kbn_accessible_click");

var _field_name = require("ui/directives/field_name");

var _collapsible_sidebar = require("ui/collapsible_sidebar/collapsible_sidebar");

var _css_truncate = require("ui/directives/css_truncate");

var _fixed_scroll = require("ui/fixed_scroll");

var _debounce = require("ui/directives/debounce/debounce");

var _app_state = require("ui/state_management/app_state");

var _global_state = require("ui/state_management/global_state");

var _directive = require("ui/render_complete/directive");

var _config_provider = require("ui/state_management/config_provider");

var _url = require("ui/url");

var _kbn_top_nav = require("ui/kbn_top_nav/kbn_top_nav");

var _legacy_compat = require("ui/legacy_compat");

var _public = require("../../../../../plugins/data/public");

var _public2 = require("../../../../../plugins/kibana_utils/public");

var _doc_table = require("./np_ready/angular/doc_table/doc_table");

var _table_header = require("./np_ready/angular/doc_table/components/table_header");

var _pager = require("./np_ready/angular/doc_table/components/pager");

var _table_row = require("./np_ready/angular/doc_table/components/table_row");

var _pager_factory = require("./np_ready/angular/doc_table/lib/pager/pager_factory");

var _infinite_scroll = require("./np_ready/angular/doc_table/infinite_scroll");

var _doc_viewer = require("./np_ready/angular/doc_viewer");

var _discover_field_search_directive = require("./np_ready/components/field_chooser/discover_field_search_directive");

var _discover_index_pattern_directive = require("./np_ready/components/field_chooser/discover_index_pattern_directive");

var _string_progress_bar = require("./np_ready/components/field_chooser/string_progress_bar");

var _field_chooser = require("./np_ready/components/field_chooser/field_chooser");

var _discover_field = require("./np_ready/components/field_chooser/discover_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * returns the main inner angular module, it contains all the parts of Angular Discover
 * needs to render, so in the end the current 'kibana' angular module is no longer necessary
 */
function getInnerAngularModule(name, core, deps) {
  var module = initializeInnerAngularModule(name, core, deps.navigation);
  (0, _legacy_compat.configureAppAngularModule)(module, core, true);
  return module;
}
/**
 * returns a slimmer inner angular module for embeddable rendering
 */


function getInnerAngularModuleEmbeddable(name, core, deps) {
  var module = initializeInnerAngularModule(name, core, deps.navigation, true);
  (0, _legacy_compat.configureAppAngularModule)(module, core, true);
  return module;
}

var initialized = false;

function initializeInnerAngularModule() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'app/discover';
  var core = arguments.length > 1 ? arguments[1] : undefined;
  var navigation = arguments.length > 2 ? arguments[2] : undefined;
  var embeddable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!initialized) {
    createLocalI18nModule();
    createLocalPrivateModule();
    createLocalPromiseModule();
    createLocalConfigModule(core.uiSettings);
    createLocalKbnUrlModule();
    createLocalPersistedStateModule();
    createLocalTopNavModule(navigation);
    createLocalGlobalStateModule();
    createLocalAppStateModule();
    createLocalStorageModule();
    createElasticSearchModule();
    createIndexPatternsModule();
    createPagerFactoryModule();
    createDocTableModule();
    initialized = true;
  }

  if (embeddable) {
    return _angular.default.module(name, ['ngSanitize', 'react', 'ui.bootstrap', 'discoverI18n', 'discoverPrivate', 'discoverDocTable', 'discoverPagerFactory', 'discoverPersistedState']).config(_watch_multi.watchMultiDecorator).directive('icon', function (reactDirective) {
      return reactDirective(_eui.EuiIcon);
    }).directive('fieldName', _field_name.FieldNameDirectiveProvider).directive('renderComplete', _directive.createRenderCompleteDirective).service('debounce', ['$timeout', _debounce.DebounceProviderTimeout]);
  }

  return _angular.default.module(name, ['ngSanitize', 'ngRoute', 'react', 'ui.bootstrap', 'elasticsearch', 'discoverConfig', 'discoverI18n', 'discoverPrivate', 'discoverPersistedState', 'discoverTopNav', 'discoverGlobalState', 'discoverAppState', 'discoverLocalStorageProvider', 'discoverIndexPatterns', 'discoverEs', 'discoverDocTable', 'discoverPagerFactory']).config(_watch_multi.watchMultiDecorator).run(_listen.registerListenEventListener).directive('icon', function (reactDirective) {
    return reactDirective(_eui.EuiIcon);
  }).directive('kbnAccessibleClick', _kbn_accessible_click.KbnAccessibleClickProvider).directive('fieldName', _field_name.FieldNameDirectiveProvider).directive('collapsibleSidebar', _collapsible_sidebar.CollapsibleSidebarProvider).directive('cssTruncate', _css_truncate.CssTruncateProvide).directive('fixedScroll', _fixed_scroll.FixedScrollProvider).directive('renderComplete', _directive.createRenderCompleteDirective).directive('discoverFieldSearch', _discover_field_search_directive.createFieldSearchDirective).directive('discoverIndexPatternSelect', _discover_index_pattern_directive.createIndexPatternSelectDirective).directive('stringFieldProgressBar', _string_progress_bar.createStringFieldProgressBarDirective).directive('discoverField', _discover_field.createDiscoverFieldDirective).directive('discFieldChooser', _field_chooser.createFieldChooserDirective).service('debounce', ['$timeout', _debounce.DebounceProviderTimeout]);
}

function createLocalGlobalStateModule() {
  _angular.default.module('discoverGlobalState', ['discoverPrivate', 'discoverConfig', 'discoverKbnUrl', 'discoverPromise']).service('globalState', function (Private) {
    return Private(_global_state.GlobalStateProvider);
  });
}

function createLocalPersistedStateModule() {
  _angular.default.module('discoverPersistedState', ['discoverPrivate', 'discoverPromise']).factory('PersistedState', function (Private) {
    var Events = Private(_events.EventsProvider);
    return (
      /*#__PURE__*/
      function (_PersistedState) {
        _inherits(AngularPersistedState, _PersistedState);

        function AngularPersistedState(value, path) {
          _classCallCheck(this, AngularPersistedState);

          return _possibleConstructorReturn(this, _getPrototypeOf(AngularPersistedState).call(this, value, path, Events));
        }

        return AngularPersistedState;
      }(_persisted_state.PersistedState)
    );
  });
}

function createLocalKbnUrlModule() {
  _angular.default.module('discoverKbnUrl', ['discoverPrivate', 'ngRoute']).service('kbnUrl', function (Private) {
    return Private(_url.KbnUrlProvider);
  }).service('redirectWhenMissing', function (Private) {
    return Private(_url.RedirectWhenMissingProvider);
  });
}

function createLocalConfigModule(uiSettings) {
  _angular.default.module('discoverConfig', ['discoverPrivate']).provider('stateManagementConfig', _config_provider.StateManagementConfigProvider).provider('config', function () {
    return {
      $get: function $get() {
        return {
          get: function get(value) {
            return uiSettings ? uiSettings.get(value) : undefined;
          }
        };
      }
    };
  });
}

function createLocalPromiseModule() {
  _angular.default.module('discoverPromise', []).service('Promise', _promises.PromiseServiceCreator);
}

function createLocalPrivateModule() {
  _angular.default.module('discoverPrivate', []).provider('Private', _private.PrivateProvider);
}

function createLocalTopNavModule(navigation) {
  _angular.default.module('discoverTopNav', ['react']).directive('kbnTopNav', _kbn_top_nav.createTopNavDirective).directive('kbnTopNavHelper', (0, _kbn_top_nav.createTopNavHelper)(navigation.ui));
}

function createLocalI18nModule() {
  _angular.default.module('discoverI18n', []).provider('i18n', _angular2.I18nProvider).filter('i18n', _angular2.i18nFilter).directive('i18nId', _angular2.i18nDirective);
}

function createLocalAppStateModule() {
  _angular.default.module('discoverAppState', ['discoverGlobalState', 'discoverPrivate', 'discoverConfig', 'discoverKbnUrl', 'discoverPromise']).service('AppState', function (Private) {
    return Private(_app_state.AppStateProvider);
  }).service('getAppState', function (Private) {
    return Private(_app_state.AppStateProvider).getAppState;
  }).service('State', function (Private) {
    return Private(_state.StateProvider);
  });
}

function createLocalStorageModule() {
  _angular.default.module('discoverLocalStorageProvider', ['discoverPrivate']).service('localStorage', createLocalStorageService('localStorage')).service('sessionStorage', createLocalStorageService('sessionStorage'));
}

var createLocalStorageService = function createLocalStorageService(type) {
  return function ($window) {
    return new _public2.Storage($window[type]);
  };
};

function createElasticSearchModule() {
  _angular.default.module('discoverEs', ['elasticsearch', 'discoverConfig']) // Elasticsearch client used for requesting data.  Connects to the /elasticsearch proxy
  .service('es', _es.createEsService);
}

function createIndexPatternsModule() {
  _angular.default.module('discoverIndexPatterns', []).value('indexPatterns', _public.IndexPatterns);
}

function createPagerFactoryModule() {
  _angular.default.module('discoverPagerFactory', []).factory('pagerFactory', _pager_factory.createPagerFactory);
}

function createDocTableModule() {
  _angular.default.module('discoverDocTable', ['discoverKbnUrl', 'discoverConfig', 'discoverAppState', 'discoverPagerFactory', 'react']).directive('docTable', _doc_table.createDocTableDirective).directive('kbnTableHeader', _table_header.createTableHeaderDirective).directive('toolBarPagerText', _pager.createToolBarPagerTextDirective).directive('toolBarPagerText', _pager.createToolBarPagerTextDirective).directive('kbnTableRow', _table_row.createTableRowDirective).directive('toolBarPagerButtons', _pager.createToolBarPagerButtonsDirective).directive('kbnInfiniteScroll', _infinite_scroll.createInfiniteScrollDirective).directive('docViewer', _doc_viewer.createDocViewerDirective);
}