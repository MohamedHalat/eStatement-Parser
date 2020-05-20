"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CapabilitiesService = void 0;

var _utils = require("../../../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Service that is responsible for UI Capabilities.
 * @internal
 */
var CapabilitiesService =
/*#__PURE__*/
function () {
  function CapabilitiesService() {
    _classCallCheck(this, CapabilitiesService);
  }

  _createClass(CapabilitiesService, [{
    key: "start",
    value: function start(_ref) {
      var appIds, http, route, capabilities;
      return regeneratorRuntime.async(function start$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              appIds = _ref.appIds, http = _ref.http;
              route = http.anonymousPaths.isAnonymous(window.location.pathname) ? '/defaults' : '';
              _context.next = 4;
              return regeneratorRuntime.awrap(http.post("/api/core/capabilities".concat(route), {
                body: JSON.stringify({
                  applications: appIds
                })
              }));

            case 4:
              capabilities = _context.sent;
              return _context.abrupt("return", {
                capabilities: (0, _utils.deepFreeze)(capabilities)
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return CapabilitiesService;
}();

exports.CapabilitiesService = CapabilitiesService;