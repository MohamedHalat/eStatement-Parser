"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevToolsPlugin = void 0;

var _lodash = require("lodash");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DevToolsPlugin =
/*#__PURE__*/
function () {
  function DevToolsPlugin() {
    _classCallCheck(this, DevToolsPlugin);

    _defineProperty(this, "devTools", new Map());
  }

  _createClass(DevToolsPlugin, [{
    key: "getSortedDevTools",
    value: function getSortedDevTools() {
      return (0, _lodash.sortBy)(_toConsumableArray(this.devTools.values()), 'order');
    }
  }, {
    key: "setup",
    value: function setup(core, _ref) {
      var _this = this;

      var kibana_legacy = _ref.kibana_legacy;
      kibana_legacy.registerLegacyApp({
        id: 'dev_tools',
        title: 'Dev Tools',
        mount: function mount(appMountContext, params) {
          var _ref2, renderApp;

          return regeneratorRuntime.async(function mount$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (_this.getSortedDevTools) {
                    _context.next = 2;
                    break;
                  }

                  throw new Error('not started yet');

                case 2:
                  _context.next = 4;
                  return regeneratorRuntime.awrap(import('./application'));

                case 4:
                  _ref2 = _context.sent;
                  renderApp = _ref2.renderApp;
                  return _context.abrupt("return", renderApp(params.element, appMountContext, params.appBasePath, _this.getSortedDevTools()));

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          });
        }
      });
      return {
        register: function register(devTool) {
          if (_this.devTools.has(devTool.id)) {
            throw new Error("Dev tool with id [".concat(devTool.id, "] has already been registered. Use a unique id."));
          }

          _this.devTools.set(devTool.id, devTool);
        }
      };
    }
  }, {
    key: "start",
    value: function start() {
      return {
        getSortedDevTools: this.getSortedDevTools.bind(this)
      };
    }
  }]);

  return DevToolsPlugin;
}();

exports.DevToolsPlugin = DevToolsPlugin;