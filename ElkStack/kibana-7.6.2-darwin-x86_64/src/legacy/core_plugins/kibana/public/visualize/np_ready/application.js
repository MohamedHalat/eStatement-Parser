"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _angular = _interopRequireDefault(require("angular"));

var _eui = require("@elastic/eui");

var _angular2 = require("@kbn/i18n/angular");

var _legacy_imports = require("../legacy_imports");

var _legacy_app = require("./legacy_app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var angularModuleInstance = null;

var renderApp = function renderApp(element, appBasePath, deps) {
  var $injector;
  return regeneratorRuntime.async(function renderApp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!angularModuleInstance) {
            angularModuleInstance = createLocalAngularModule(deps.core, deps.navigation); // global routing stuff

            (0, _legacy_imports.configureAppAngularModule)(angularModuleInstance, deps.core, true); // custom routing stuff

            (0, _legacy_app.initVisualizeApp)(angularModuleInstance, deps);
          }

          $injector = mountVisualizeApp(appBasePath, element);
          return _context.abrupt("return", function () {
            return $injector.get('$rootScope').$destroy();
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.renderApp = renderApp;

var mainTemplate = function mainTemplate(basePath) {
  return "<div ng-view class=\"kbnLocalApplicationWrapper\">\n  <base href=\"".concat(basePath, "\" />\n</div>\n");
};

var moduleName = 'app/visualize';
var thirdPartyAngularDependencies = ['ngSanitize', 'ngRoute', 'react'];

function mountVisualizeApp(appBasePath, element) {
  var mountpoint = document.createElement('div');
  mountpoint.setAttribute('class', 'kbnLocalApplicationWrapper');
  mountpoint.innerHTML = mainTemplate(appBasePath); // bootstrap angular into detached element and attach it later to
  // make angular-within-angular possible

  var $injector = _angular.default.bootstrap(mountpoint, [moduleName]); // initialize global state handler


  element.appendChild(mountpoint);
  return $injector;
}

function createLocalAngularModule(core, navigation) {
  createLocalI18nModule();
  createLocalPrivateModule();
  createLocalPromiseModule();
  createLocalConfigModule(core);
  createLocalKbnUrlModule();
  createLocalStateModule();
  createLocalPersistedStateModule();
  createLocalTopNavModule(navigation);
  createLocalConfirmModalModule();

  var visualizeAngularModule = _angular.default.module(moduleName, [].concat(thirdPartyAngularDependencies, ['app/visualize/Config', 'app/visualize/I18n', 'app/visualize/Private', 'app/visualize/PersistedState', 'app/visualize/TopNav', 'app/visualize/State', 'app/visualize/ConfirmModal']));

  return visualizeAngularModule;
}

function createLocalConfirmModalModule() {
  _angular.default.module('app/visualize/ConfirmModal', ['react']).factory('confirmModal', _legacy_imports.confirmModalFactory).directive('confirmModal', function (reactDirective) {
    return reactDirective(_eui.EuiConfirmModal);
  });
}

function createLocalStateModule() {
  _angular.default.module('app/visualize/State', ['app/visualize/Private', 'app/visualize/Config', 'app/visualize/KbnUrl', 'app/visualize/Promise', 'app/visualize/PersistedState']).factory('AppState', function (Private) {
    return Private(_legacy_imports.AppStateProvider);
  }).service('getAppState', function (Private) {
    return Private(_legacy_imports.AppStateProvider).getAppState;
  }).service('globalState', function (Private) {
    return Private(_legacy_imports.GlobalStateProvider);
  });
}

function createLocalPersistedStateModule() {
  _angular.default.module('app/visualize/PersistedState', ['app/visualize/Private', 'app/visualize/Promise']).factory('PersistedState', function (Private) {
    var Events = Private(_legacy_imports.EventsProvider);
    return (
      /*#__PURE__*/
      function (_PersistedState) {
        _inherits(AngularPersistedState, _PersistedState);

        function AngularPersistedState(value, path) {
          _classCallCheck(this, AngularPersistedState);

          return _possibleConstructorReturn(this, _getPrototypeOf(AngularPersistedState).call(this, value, path, Events));
        }

        return AngularPersistedState;
      }(_legacy_imports.PersistedState)
    );
  });
}

function createLocalKbnUrlModule() {
  _angular.default.module('app/visualize/KbnUrl', ['app/visualize/Private', 'ngRoute']).service('kbnUrl', function (Private) {
    return Private(_legacy_imports.KbnUrlProvider);
  }).service('redirectWhenMissing', function (Private) {
    return Private(_legacy_imports.RedirectWhenMissingProvider);
  });
}

function createLocalConfigModule(core) {
  _angular.default.module('app/visualize/Config', ['app/visualize/Private']).provider('stateManagementConfig', _legacy_imports.StateManagementConfigProvider).provider('config', function () {
    return {
      $get: function $get() {
        return {
          get: core.uiSettings.get.bind(core.uiSettings)
        };
      }
    };
  });
}

function createLocalPromiseModule() {
  _angular.default.module('app/visualize/Promise', []).service('Promise', _legacy_imports.PromiseServiceCreator);
}

function createLocalPrivateModule() {
  _angular.default.module('app/visualize/Private', []).provider('Private', _legacy_imports.PrivateProvider);
}

function createLocalTopNavModule(navigation) {
  _angular.default.module('app/visualize/TopNav', ['react']).directive('kbnTopNav', _legacy_imports.createTopNavDirective).directive('kbnTopNavHelper', (0, _legacy_imports.createTopNavHelper)(navigation.ui));
}

function createLocalI18nModule() {
  _angular.default.module('app/visualize/I18n', []).provider('i18n', _angular2.I18nProvider).filter('i18n', _angular2.i18nFilter).directive('i18nId', _angular2.i18nDirective);
}