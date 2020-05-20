"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDashboardAppDirective = initDashboardAppDirective;

var _dashboard_app_controller = require("./dashboard_app_controller");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function initDashboardAppDirective(app, deps) {
  app.directive('dashboardApp', function ($injector) {
    var AppState = $injector.get('AppState');
    var kbnUrl = $injector.get('kbnUrl');
    var confirmModal = $injector.get('confirmModal');
    var config = deps.uiSettings;
    return {
      restrict: 'E',
      controllerAs: 'dashboardApp',
      controller: function controller($scope, $route, $routeParams, getAppState, globalState) {
        return new _dashboard_app_controller.DashboardAppController(_objectSpread({
          $route: $route,
          $scope: $scope,
          $routeParams: $routeParams,
          getAppState: getAppState,
          globalState: globalState,
          kbnUrl: kbnUrl,
          AppStateClass: AppState,
          config: config,
          confirmModal: confirmModal,
          indexPatterns: deps.npDataStart.indexPatterns
        }, deps));
      }
    };
  });
}