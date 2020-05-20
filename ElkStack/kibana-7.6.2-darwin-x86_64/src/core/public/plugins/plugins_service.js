"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginsService = void 0;

var _plugin2 = require("./plugin");

var _plugin_context = require("./plugin_context");

var _utils = require("../../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sec = 1000;
/** @internal */

/**
 * Service responsible for loading plugin bundles, initializing plugins, and managing the lifecycle
 * of all plugins.
 *
 * @internal
 */
var PluginsService =
/*#__PURE__*/
function () {
  /** Plugin wrappers in topological order. */
  function PluginsService(coreContext, plugins) {
    var _this = this;

    _classCallCheck(this, PluginsService);

    this.coreContext = coreContext;

    _defineProperty(this, "plugins", new Map());

    _defineProperty(this, "pluginDependencies", new Map());

    _defineProperty(this, "satupPlugins", []);

    // Generate opaque ids
    var opaqueIds = new Map(plugins.map(function (p) {
      return [p.id, Symbol(p.id)];
    })); // Setup dependency map and plugin wrappers

    plugins.forEach(function (_ref) {
      var id = _ref.id,
          plugin = _ref.plugin,
          _ref$config = _ref.config,
          config = _ref$config === void 0 ? {} : _ref$config;

      // Setup map of dependencies
      _this.pluginDependencies.set(id, [].concat(_toConsumableArray(plugin.requiredPlugins), _toConsumableArray(plugin.optionalPlugins.filter(function (optPlugin) {
        return opaqueIds.has(optPlugin);
      })))); // Construct plugin wrappers, depending on the topological order set by the server.


      _this.plugins.set(id, new _plugin2.PluginWrapper(plugin, opaqueIds.get(id), (0, _plugin_context.createPluginInitializerContext)(_this.coreContext, opaqueIds.get(id), plugin, config)));
    });
  }

  _createClass(PluginsService, [{
    key: "getOpaqueIds",
    value: function getOpaqueIds() {
      var _this2 = this;

      // Return dependency map of opaque ids
      return new Map(_toConsumableArray(this.pluginDependencies).map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            id = _ref3[0],
            deps = _ref3[1];

        return [_this2.plugins.get(id).opaqueId, deps.map(function (depId) {
          return _this2.plugins.get(depId).opaqueId;
        })];
      }));
    }
  }, {
    key: "setup",
    value: function setup(deps) {
      var contracts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, pluginName, plugin, pluginDepContracts, contract;

      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.loadPluginBundles(deps.http.basePath.prepend));

            case 2:
              // Setup each plugin with required and optional plugin contracts
              contracts = new Map();
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 6;
              _iterator = this.plugins.entries()[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 19;
                break;
              }

              _step$value = _slicedToArray(_step.value, 2), pluginName = _step$value[0], plugin = _step$value[1];
              pluginDepContracts = _toConsumableArray(this.pluginDependencies.get(pluginName)).reduce(function (depContracts, dependencyName) {
                // Only set if present. Could be absent if plugin does not have client-side code or is a
                // missing optional plugin.
                if (contracts.has(dependencyName)) {
                  depContracts[dependencyName] = contracts.get(dependencyName);
                }

                return depContracts;
              }, {});
              _context.next = 13;
              return regeneratorRuntime.awrap((0, _utils.withTimeout)({
                promise: plugin.setup((0, _plugin_context.createPluginSetupContext)(this.coreContext, deps, plugin), pluginDepContracts),
                timeout: 30 * Sec,
                errorMessage: "Setup lifecycle of \"".concat(pluginName, "\" plugin wasn't completed in 30sec. Consider disabling the plugin and re-start.")
              }));

            case 13:
              contract = _context.sent;
              contracts.set(pluginName, contract);
              this.satupPlugins.push(pluginName);

            case 16:
              _iteratorNormalCompletion = true;
              _context.next = 8;
              break;

            case 19:
              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](6);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 25:
              _context.prev = 25;
              _context.prev = 26;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 28:
              _context.prev = 28;

              if (!_didIteratorError) {
                _context.next = 31;
                break;
              }

              throw _iteratorError;

            case 31:
              return _context.finish(28);

            case 32:
              return _context.finish(25);

            case 33:
              return _context.abrupt("return", {
                contracts: contracts
              });

            case 34:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[6, 21, 25, 33], [26,, 28, 32]]);
    }
  }, {
    key: "start",
    value: function start(deps) {
      var contracts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, _pluginName, _plugin, _pluginDepContracts, _contract;

      return regeneratorRuntime.async(function start$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Setup each plugin with required and optional plugin contracts
              contracts = new Map();
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 4;
              _iterator2 = this.plugins.entries()[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 16;
                break;
              }

              _step2$value = _slicedToArray(_step2.value, 2), _pluginName = _step2$value[0], _plugin = _step2$value[1];
              _pluginDepContracts = _toConsumableArray(this.pluginDependencies.get(_pluginName)).reduce(function (depContracts, dependencyName) {
                // Only set if present. Could be absent if plugin does not have client-side code or is a
                // missing optional plugin.
                if (contracts.has(dependencyName)) {
                  depContracts[dependencyName] = contracts.get(dependencyName);
                }

                return depContracts;
              }, {});
              _context2.next = 11;
              return regeneratorRuntime.awrap((0, _utils.withTimeout)({
                promise: _plugin.start((0, _plugin_context.createPluginStartContext)(this.coreContext, deps, _plugin), _pluginDepContracts),
                timeout: 30 * Sec,
                errorMessage: "Start lifecycle of \"".concat(_pluginName, "\" plugin wasn't completed in 30sec. Consider disabling the plugin and re-start.")
              }));

            case 11:
              _contract = _context2.sent;
              contracts.set(_pluginName, _contract);

            case 13:
              _iteratorNormalCompletion2 = true;
              _context2.next = 6;
              break;

            case 16:
              _context2.next = 22;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](4);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 22:
              _context2.prev = 22;
              _context2.prev = 23;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 25:
              _context2.prev = 25;

              if (!_didIteratorError2) {
                _context2.next = 28;
                break;
              }

              throw _iteratorError2;

            case 28:
              return _context2.finish(25);

            case 29:
              return _context2.finish(22);

            case 30:
              return _context2.abrupt("return", {
                contracts: contracts
              });

            case 31:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }
  }, {
    key: "stop",
    value: function stop() {
      var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _pluginName2;

      return regeneratorRuntime.async(function stop$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Stop plugins in reverse topological order.
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context3.prev = 3;

              for (_iterator3 = this.satupPlugins.reverse()[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                _pluginName2 = _step3.value;
                this.plugins.get(_pluginName2).stop();
              }

              _context3.next = 11;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](3);
              _didIteratorError3 = true;
              _iteratorError3 = _context3.t0;

            case 11:
              _context3.prev = 11;
              _context3.prev = 12;

              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }

            case 14:
              _context3.prev = 14;

              if (!_didIteratorError3) {
                _context3.next = 17;
                break;
              }

              throw _iteratorError3;

            case 17:
              return _context3.finish(14);

            case 18:
              return _context3.finish(11);

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[3, 7, 11, 19], [12,, 14, 18]]);
    }
  }, {
    key: "loadPluginBundles",
    value: function loadPluginBundles(addBasePath) {
      // Load all bundles in parallel
      return Promise.all(_toConsumableArray(this.plugins.values()).map(function (plugin) {
        return plugin.load(addBasePath);
      }));
    }
  }]);

  return PluginsService;
}();

exports.PluginsService = PluginsService;