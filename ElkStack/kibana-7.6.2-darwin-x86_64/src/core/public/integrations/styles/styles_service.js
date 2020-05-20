"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StylesService = void 0;

var _disable_animations = _interopRequireDefault(require("!!raw-loader!./disable_animations.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var StylesService =
/*#__PURE__*/
function () {
  function StylesService() {
    _classCallCheck(this, StylesService);

    _defineProperty(this, "uiSettingsSubscription", void 0);
  }

  _createClass(StylesService, [{
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
      var uiSettings, disableAnimationsStyleTag, setDisableAnimations;
      return regeneratorRuntime.async(function start$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              uiSettings = _ref.uiSettings;
              disableAnimationsStyleTag = document.createElement('style');
              disableAnimationsStyleTag.setAttribute('id', 'disableAnimationsCss');
              document.head.appendChild(disableAnimationsStyleTag);

              setDisableAnimations = function setDisableAnimations(disableAnimations) {
                disableAnimationsStyleTag.textContent = disableAnimations ? _disable_animations.default : '';
              };

              this.uiSettingsSubscription = uiSettings.get$('accessibility:disableAnimations').subscribe(setDisableAnimations);

            case 6:
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

  return StylesService;
}();

exports.StylesService = StylesService;