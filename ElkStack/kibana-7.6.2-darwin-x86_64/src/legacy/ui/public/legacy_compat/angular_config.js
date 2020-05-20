"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$setupXsrfRequestInterceptor = exports.configureAppAngularModule = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _notify = require("ui/notify");

var _url = require("ui/url");

var _public = require("../../../../plugins/kibana_react/public");

var _error_url_overflow = require("../error_url_overflow");

var _system_api = require("../system_api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// @ts-ignore
// @ts-ignore
// @ts-ignore
var URL_LIMIT_WARN_WITHIN = 1000;
/**
 * Detects whether a given angular route is a dummy route that doesn't
 * require any action. There are two ways this can happen:
 * If `outerAngularWrapperRoute` is set on the route config object,
 * it means the local application service set up this route on the outer angular
 * and the internal routes will handle the hooks.
 *
 * If angular did not detect a route and it is the local angular, we are currently
 * navigating away from a URL controlled by a local angular router and the
 * application will get unmounted. In this case the outer router will handle
 * the hooks.
 * @param $route Injected $route dependency
 * @param isLocalAngular Flag whether this is the local angular router
 */

function isDummyRoute($route, isLocalAngular) {
  return $route.current && $route.current.$$route && $route.current.$$route.outerAngularWrapperRoute || !$route.current && isLocalAngular;
}

var configureAppAngularModule = function configureAppAngularModule(angularModule, newPlatform, isLocalAngular) {
  var legacyMetadata = newPlatform.injectedMetadata.getLegacyMetadata();
  (0, _lodash.forOwn)(newPlatform.injectedMetadata.getInjectedVars(), function (val, name) {
    if (name !== undefined) {
      // The legacy platform modifies some of these values, clone to an unfrozen object.
      angularModule.value(name, (0, _lodash.cloneDeep)(val));
    }
  });
  angularModule.value('kbnVersion', newPlatform.injectedMetadata.getKibanaVersion()).value('buildNum', legacyMetadata.buildNum).value('buildSha', legacyMetadata.buildSha).value('serverName', legacyMetadata.serverName).value('esUrl', getEsUrl(newPlatform)).value('uiCapabilities', newPlatform.application.capabilities).config(setupCompileProvider(newPlatform)).config(setupLocationProvider(newPlatform)).config($setupXsrfRequestInterceptor(newPlatform)).run(capture$httpLoadingCount(newPlatform)).run($setupBreadcrumbsAutoClear(newPlatform, isLocalAngular)).run($setupBadgeAutoClear(newPlatform, isLocalAngular)).run($setupHelpExtensionAutoClear(newPlatform, isLocalAngular)).run($setupUrlOverflowHandling(newPlatform, isLocalAngular)).run($setupUICapabilityRedirect(newPlatform));
};

exports.configureAppAngularModule = configureAppAngularModule;

var getEsUrl = function getEsUrl(newPlatform) {
  var a = document.createElement('a');
  a.href = newPlatform.http.basePath.prepend('/elasticsearch');
  var protocolPort = /https/.test(a.protocol) ? 443 : 80;
  var port = a.port || protocolPort;
  return {
    host: a.hostname,
    port: port,
    protocol: a.protocol,
    pathname: a.pathname
  };
};

var setupCompileProvider = function setupCompileProvider(newPlatform) {
  return function ($compileProvider) {
    if (!newPlatform.injectedMetadata.getLegacyMetadata().devMode) {
      $compileProvider.debugInfoEnabled(false);
    }
  };
};

var setupLocationProvider = function setupLocationProvider(newPlatform) {
  return function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false,
      rewriteLinks: false
    });
    $locationProvider.hashPrefix('');
  };
};

var $setupXsrfRequestInterceptor = function $setupXsrfRequestInterceptor(newPlatform) {
  var version = newPlatform.injectedMetadata.getLegacyMetadata().version; // Configure jQuery prefilter

  _jquery.default.ajaxPrefilter(function (_ref, originalOptions, jqXHR) {
    var _ref$kbnXsrfToken = _ref.kbnXsrfToken,
        kbnXsrfToken = _ref$kbnXsrfToken === void 0 ? true : _ref$kbnXsrfToken;

    if (kbnXsrfToken) {
      jqXHR.setRequestHeader('kbn-version', version);
    }
  });

  return function ($httpProvider) {
    // Configure $httpProvider interceptor
    $httpProvider.interceptors.push(function () {
      return {
        request: function request(opts) {
          var _ref2 = opts,
              _ref2$kbnXsrfToken = _ref2.kbnXsrfToken,
              kbnXsrfToken = _ref2$kbnXsrfToken === void 0 ? true : _ref2$kbnXsrfToken;

          if (kbnXsrfToken) {
            (0, _lodash.set)(opts, ['headers', 'kbn-version'], version);
          }

          return opts;
        }
      };
    });
  };
};
/**
 * Injected into angular module by ui/chrome angular integration
 * and adds a root-level watcher that will capture the count of
 * active $http requests on each digest loop and expose the count to
 * the core.loadingCount api
 * @param  {Angular.Scope} $rootScope
 * @param  {HttpService} $http
 * @return {undefined}
 */


exports.$setupXsrfRequestInterceptor = $setupXsrfRequestInterceptor;

var capture$httpLoadingCount = function capture$httpLoadingCount(newPlatform) {
  return function ($rootScope, $http) {
    newPlatform.http.addLoadingCountSource(new Rx.Observable(function (observer) {
      var unwatch = $rootScope.$watch(function () {
        var reqs = $http.pendingRequests || [];
        observer.next(reqs.filter(function (req) {
          return !(0, _system_api.isSystemApiRequest)(req);
        }).length);
      });
      return unwatch;
    }));
  };
};
/**
 * integrates with angular to automatically redirect to home if required
 * capability is not met
 */


var $setupUICapabilityRedirect = function $setupUICapabilityRedirect(newPlatform) {
  return function ($rootScope, $injector) {
    var isKibanaAppRoute = window.location.pathname.endsWith('/app/kibana'); // this feature only works within kibana app for now after everything is
    // switched to the application service, this can be changed to handle all
    // apps.

    if (!isKibanaAppRoute) {
      return;
    }

    $rootScope.$on('$routeChangeStart', function (event) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          route = _ref3.$$route;

      if (!route || !route.requireUICapability) {
        return;
      }

      if (!(0, _lodash.get)(newPlatform.application.capabilities, route.requireUICapability)) {
        $injector.get('kbnUrl').change('/home');
        event.preventDefault();
      }
    });
  };
};
/**
 * internal angular run function that will be called when angular bootstraps and
 * lets us integrate with the angular router so that we can automatically clear
 * the breadcrumbs if we switch to a Kibana app that does not use breadcrumbs correctly
 */


var $setupBreadcrumbsAutoClear = function $setupBreadcrumbsAutoClear(newPlatform, isLocalAngular) {
  return function ($rootScope, $injector) {
    // A flag used to determine if we should automatically
    // clear the breadcrumbs between angular route changes.
    var breadcrumbSetSinceRouteChange = false;
    var $route = $injector.has('$route') ? $injector.get('$route') : {}; // reset breadcrumbSetSinceRouteChange any time the breadcrumbs change, even
    // if it was done directly through the new platform

    newPlatform.chrome.getBreadcrumbs$().subscribe({
      next: function next() {
        breadcrumbSetSinceRouteChange = true;
      }
    });
    $rootScope.$on('$routeChangeStart', function () {
      breadcrumbSetSinceRouteChange = false;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
      if (isDummyRoute($route, isLocalAngular)) {
        return;
      }

      var current = $route.current || {};

      if (breadcrumbSetSinceRouteChange || current.$$route && current.$$route.redirectTo) {
        return;
      }

      var k7BreadcrumbsProvider = current.k7Breadcrumbs;

      if (!k7BreadcrumbsProvider) {
        newPlatform.chrome.setBreadcrumbs([]);
        return;
      }

      try {
        newPlatform.chrome.setBreadcrumbs($injector.invoke(k7BreadcrumbsProvider));
      } catch (error) {
        (0, _notify.fatalError)(error);
      }
    });
  };
};
/**
 * internal angular run function that will be called when angular bootstraps and
 * lets us integrate with the angular router so that we can automatically clear
 * the badge if we switch to a Kibana app that does not use the badge correctly
 */


var $setupBadgeAutoClear = function $setupBadgeAutoClear(newPlatform, isLocalAngular) {
  return function ($rootScope, $injector) {
    // A flag used to determine if we should automatically
    // clear the badge between angular route changes.
    var badgeSetSinceRouteChange = false;
    var $route = $injector.has('$route') ? $injector.get('$route') : {};
    $rootScope.$on('$routeChangeStart', function () {
      badgeSetSinceRouteChange = false;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
      if (isDummyRoute($route, isLocalAngular)) {
        return;
      }

      var current = $route.current || {};

      if (badgeSetSinceRouteChange || current.$$route && current.$$route.redirectTo) {
        return;
      }

      var badgeProvider = current.badge;

      if (!badgeProvider) {
        newPlatform.chrome.setBadge(undefined);
        return;
      }

      try {
        newPlatform.chrome.setBadge($injector.invoke(badgeProvider));
      } catch (error) {
        (0, _notify.fatalError)(error);
      }
    });
  };
};
/**
 * internal angular run function that will be called when angular bootstraps and
 * lets us integrate with the angular router so that we can automatically clear
 * the helpExtension if we switch to a Kibana app that does not set its own
 * helpExtension
 */


var $setupHelpExtensionAutoClear = function $setupHelpExtensionAutoClear(newPlatform, isLocalAngular) {
  return function ($rootScope, $injector) {
    /**
     * reset helpExtensionSetSinceRouteChange any time the helpExtension changes, even
     * if it was done directly through the new platform
     */
    var helpExtensionSetSinceRouteChange = false;
    newPlatform.chrome.getHelpExtension$().subscribe({
      next: function next() {
        helpExtensionSetSinceRouteChange = true;
      }
    });
    var $route = $injector.has('$route') ? $injector.get('$route') : {};
    $rootScope.$on('$routeChangeStart', function () {
      if (isDummyRoute($route, isLocalAngular)) {
        return;
      }

      helpExtensionSetSinceRouteChange = false;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
      if (isDummyRoute($route, isLocalAngular)) {
        return;
      }

      var current = $route.current || {};

      if (helpExtensionSetSinceRouteChange || current.$$route && current.$$route.redirectTo) {
        return;
      }

      newPlatform.chrome.setHelpExtension(current.helpExtension);
    });
  };
};

var $setupUrlOverflowHandling = function $setupUrlOverflowHandling(newPlatform, isLocalAngular) {
  return function ($location, $rootScope, $injector) {
    var $route = $injector.has('$route') ? $injector.get('$route') : {};
    var urlOverflow = new _error_url_overflow.UrlOverflowService();

    var check = function check() {
      if (isDummyRoute($route, isLocalAngular)) {
        return;
      } // disable long url checks when storing state in session storage


      if (newPlatform.uiSettings.get('state:storeInSessionStorage')) {
        return;
      }

      if ($location.path() === '/error/url-overflow') {
        return;
      }

      try {
        if (urlOverflow.check($location.absUrl()) <= URL_LIMIT_WARN_WITHIN) {
          newPlatform.notifications.toasts.addWarning({
            title: _i18n.i18n.translate('common.ui.chrome.bigUrlWarningNotificationTitle', {
              defaultMessage: 'The URL is big and Kibana might stop working'
            }),
            text: (0, _public.toMountPoint)(_react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
              id: "common.ui.chrome.bigUrlWarningNotificationMessage",
              defaultMessage: "Either enable the {storeInSessionStorageParam} option in {advancedSettingsLink} or simplify the onscreen visuals.",
              values: {
                storeInSessionStorageParam: _react.default.createElement("code", null, "state:storeInSessionStorage"),
                advancedSettingsLink: _react.default.createElement("a", {
                  href: "#/management/kibana/settings"
                }, _react.default.createElement(_react2.FormattedMessage, {
                  id: "common.ui.chrome.bigUrlWarningNotificationMessage.advancedSettingsLinkText",
                  defaultMessage: "advanced settings"
                }))
              }
            })))
          });
        }
      } catch (e) {
        window.location.href = (0, _url.modifyUrl)(window.location.href, function (parts) {
          parts.hash = '#/error/url-overflow';
        }); // force the browser to reload to that Kibana's potentially unstable state is unloaded

        window.location.reload();
      }
    };

    $rootScope.$on('$routeUpdate', check);
    $rootScope.$on('$routeChangeStart', check);
  };
};