"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localApplicationService = exports.LocalApplicationService = void 0;

var _new_platform = require("ui/new_platform");

var _eui = require("@elastic/eui");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var matchAllWithPrefix = function matchAllWithPrefix(prefixOrApp) {
  return "/".concat(typeof prefixOrApp === 'string' ? prefixOrApp : prefixOrApp.id, "/:tail*?");
};
/**
 * To be able to migrate and shim parts of the Kibana app plugin
 * while still running some parts of it in the legacy world, this
 * service emulates the core application service while using the global
 * angular router to switch between apps without page reload.
 *
 * The id of the apps is used as prefix of the route - when switching between
 * to apps, the current application is unmounted.
 *
 * This service becomes unnecessary once the platform provides a central
 * router that handles switching between applications without page reload.
 */


var LocalApplicationService =
/*#__PURE__*/
function () {
  function LocalApplicationService() {
    _classCallCheck(this, LocalApplicationService);

    _defineProperty(this, "idGenerator", (0, _eui.htmlIdGenerator)('kibanaAppLocalApp'));
  }

  _createClass(LocalApplicationService, [{
    key: "attachToAngular",

    /**
     * Wires up listeners to handle mounting and unmounting of apps to
     * the legacy angular route manager. Once all apps within the Kibana
     * plugin are using the local route manager, this implementation can
     * be switched to a more lightweight implementation.
     *
     * @param angularRouteManager The current `ui/routes` instance
     */
    value: function attachToAngular(angularRouteManager) {
      var _this = this;

      _new_platform.npStart.plugins.kibana_legacy.getApps().forEach(function (app) {
        var wrapperElementId = _this.idGenerator();

        angularRouteManager.when(matchAllWithPrefix(app), {
          outerAngularWrapperRoute: true,
          reloadOnSearch: false,
          reloadOnUrl: false,
          template: "<div class=\"kbnLocalApplicationWrapper\" id=\"".concat(wrapperElementId, "\"></div>"),
          controller: function controller($scope) {
            var element = document.getElementById(wrapperElementId);
            var unmountHandler = null;
            var isUnmounted = false;
            $scope.$on('$destroy', function () {
              if (unmountHandler) {
                unmountHandler();
              }

              isUnmounted = true;
            });

            (function _callee() {
              var params;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      params = {
                        element: element,
                        appBasePath: '',
                        onAppLeave: function onAppLeave() {
                          return undefined;
                        }
                      };

                      if (!isAppMountDeprecated(app.mount)) {
                        _context.next = 7;
                        break;
                      }

                      _context.next = 4;
                      return regeneratorRuntime.awrap(app.mount({
                        core: _new_platform.npStart.core
                      }, params));

                    case 4:
                      _context.t0 = _context.sent;
                      _context.next = 10;
                      break;

                    case 7:
                      _context.next = 9;
                      return regeneratorRuntime.awrap(app.mount(params));

                    case 9:
                      _context.t0 = _context.sent;

                    case 10:
                      unmountHandler = _context.t0;

                      // immediately unmount app if scope got destroyed in the meantime
                      if (isUnmounted) {
                        unmountHandler();
                      }

                    case 12:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })();
          }
        });
      });

      _new_platform.npStart.plugins.kibana_legacy.getForwards().forEach(function (_ref) {
        var legacyAppId = _ref.legacyAppId,
            newAppId = _ref.newAppId,
            keepPrefix = _ref.keepPrefix;
        angularRouteManager.when(matchAllWithPrefix(legacyAppId), {
          resolveRedirectTo: function resolveRedirectTo($location) {
            var url = $location.url();
            return "/".concat(newAppId).concat(keepPrefix ? url : url.replace(legacyAppId, ''));
          }
        });
      });
    }
  }]);

  return LocalApplicationService;
}();

exports.LocalApplicationService = LocalApplicationService;
var localApplicationService = new LocalApplicationService();
exports.localApplicationService = localApplicationService;

function isAppMountDeprecated(mount) {
  // Mount functions with two arguments are assumed to expect deprecated `context` object.
  return mount.length === 2;
}