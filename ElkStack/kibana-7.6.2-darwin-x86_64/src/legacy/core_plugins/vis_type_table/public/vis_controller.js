"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableVisualizationController = void 0;

var _angular = _interopRequireDefault(require("angular"));

var _jquery = _interopRequireDefault(require("jquery"));

var _legacy_imports = require("./legacy_imports");

var _get_inner_angular = require("./get_inner_angular");

var _table_vis_legacy_module = require("./table_vis_legacy_module");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var innerAngularName = 'kibana/table_vis';

var TableVisualizationController =
/*#__PURE__*/
function () {
  function TableVisualizationController(domeElement, vis) {
    _classCallCheck(this, TableVisualizationController);

    _defineProperty(this, "tableVisModule", void 0);

    _defineProperty(this, "injector", void 0);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "vis", void 0);

    _defineProperty(this, "$rootScope", null);

    _defineProperty(this, "$scope", void 0);

    _defineProperty(this, "$compile", void 0);

    this.el = (0, _jquery.default)(domeElement);
    this.vis = vis;
  }

  _createClass(TableVisualizationController, [{
    key: "getInjector",
    value: function getInjector() {
      if (!this.injector) {
        var mountpoint = document.createElement('div');
        mountpoint.setAttribute('style', 'height: 100%; width: 100%;');
        this.injector = _angular.default.bootstrap(mountpoint, [innerAngularName]);
        this.el.append(mountpoint);
      }

      return this.injector;
    }
  }, {
    key: "initLocalAngular",
    value: function initLocalAngular() {
      if (!this.tableVisModule) {
        this.tableVisModule = (0, _get_inner_angular.getAngularModule)(innerAngularName, _legacy_imports.npStart.core);
        (0, _table_vis_legacy_module.initTableVisLegacyModule)(this.tableVisModule);
      }
    }
  }, {
    key: "render",
    value: function render(esResponse, visParams, status) {
      var _this = this;

      return regeneratorRuntime.async(function render$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.initLocalAngular();
              return _context2.abrupt("return", new Promise(function _callee(resolve, reject) {
                var $injector, updateScope;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!_this.$rootScope) {
                          $injector = _this.getInjector();
                          _this.$rootScope = $injector.get('$rootScope');
                          _this.$compile = $injector.get('$compile');
                        }

                        updateScope = function updateScope() {
                          if (!_this.$scope) {
                            return;
                          }

                          _this.$scope.vis = _this.vis;
                          _this.$scope.visState = _this.vis.getState();
                          _this.$scope.esResponse = esResponse;
                          _this.$scope.visParams = visParams;
                          _this.$scope.renderComplete = resolve;
                          _this.$scope.renderFailed = reject;
                          _this.$scope.resize = Date.now();
                          _this.$scope.updateStatus = status;

                          _this.$scope.$apply();
                        };

                        if (!_this.$scope && _this.$compile) {
                          _this.$scope = _this.$rootScope.$new();
                          _this.$scope.uiState = _this.vis.getUiState();
                          updateScope();

                          _this.el.find('div').append(_this.$compile(_this.vis.type.visConfig.template)(_this.$scope));

                          _this.$scope.$apply();
                        } else {
                          updateScope();
                        }

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              }));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.$rootScope) {
        this.$rootScope.$destroy();
        this.$rootScope = null;
      }
    }
  }]);

  return TableVisualizationController;
}();

exports.TableVisualizationController = TableVisualizationController;