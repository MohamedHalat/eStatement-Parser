"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MomentService = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var MomentService =
/*#__PURE__*/
function () {
  function MomentService() {
    _classCallCheck(this, MomentService);

    _defineProperty(this, "uiSettingsSubscription", void 0);
  }

  _createClass(MomentService, [{
    key: "setup",
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start(_ref) {
      var uiSettings, setDefaultTimezone, setStartDayOfWeek;
      return regeneratorRuntime.async(function start$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              uiSettings = _ref.uiSettings;

              setDefaultTimezone = function setDefaultTimezone(tz) {
                return _momentTimezone.default.tz.setDefault(tz);
              };

              setStartDayOfWeek = function setStartDayOfWeek(day) {
                var dow = _momentTimezone.default.weekdays().indexOf(day);

                _momentTimezone.default.updateLocale(_momentTimezone.default.locale(), {
                  week: {
                    dow: dow
                  }
                });
              };

              this.uiSettingsSubscription = (0, _rxjs.merge)(uiSettings.get$('dateFormat:tz').pipe((0, _operators.tap)(setDefaultTimezone)), uiSettings.get$('dateFormat:dow').pipe((0, _operators.tap)(setStartDayOfWeek))).subscribe();

            case 4:
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
              if (this.uiSettingsSubscription) {
                this.uiSettingsSubscription.unsubscribe();
                this.uiSettingsSubscription = undefined;
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return MomentService;
}();

exports.MomentService = MomentService;