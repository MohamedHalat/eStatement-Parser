"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationsService = void 0;

var _moment = require("./moment");

var _styles = require("./styles");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var IntegrationsService =
/*#__PURE__*/
function () {
  function IntegrationsService() {
    _classCallCheck(this, IntegrationsService);

    _defineProperty(this, "styles", new _styles.StylesService());

    _defineProperty(this, "moment", new _moment.MomentService());
  }

  _createClass(IntegrationsService, [{
    key: "setup",
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.styles.setup());

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(this.moment.setup());

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "start",
    value: function start(_ref) {
      var uiSettings;
      return regeneratorRuntime.async(function start$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              uiSettings = _ref.uiSettings;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.styles.start({
                uiSettings: uiSettings
              }));

            case 3:
              _context2.next = 5;
              return regeneratorRuntime.awrap(this.moment.start({
                uiSettings: uiSettings
              }));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "stop",
    value: function stop() {
      return regeneratorRuntime.async(function stop$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.styles.stop());

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.moment.stop());

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return IntegrationsService;
}();

exports.IntegrationsService = IntegrationsService;