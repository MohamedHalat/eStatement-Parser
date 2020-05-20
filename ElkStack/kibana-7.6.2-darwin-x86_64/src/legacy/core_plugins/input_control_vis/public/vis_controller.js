"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInputControlVisController = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _legacy_imports = require("./legacy_imports");

var _input_control_vis = require("./components/vis/input_control_vis");

var _control_factory = require("./control/control_factory");

var _lineage = require("./lineage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createInputControlVisController = function createInputControlVisController(deps) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function () {
    function InputControlVisController(el, vis) {
      var _this = this;

      _classCallCheck(this, InputControlVisController);

      this.el = el;
      this.vis = vis;

      _defineProperty(this, "I18nContext", void 0);

      _defineProperty(this, "controls", void 0);

      _defineProperty(this, "queryBarUpdateHandler", void 0);

      _defineProperty(this, "filterManager", void 0);

      _defineProperty(this, "updateSubsciption", void 0);

      _defineProperty(this, "visParams", void 0);

      _defineProperty(this, "drawVis", function () {
        var _this$visParams;

        if (!_this.I18nContext) {
          throw new Error('no i18n context found');
        }

        (0, _reactDom.render)(_react.default.createElement(_this.I18nContext, null, _react.default.createElement(_input_control_vis.InputControlVis, {
          updateFiltersOnChange: (_this$visParams = _this.visParams) === null || _this$visParams === void 0 ? void 0 : _this$visParams.updateFiltersOnChange,
          controls: _this.controls,
          stageFilter: _this.stageFilter,
          submitFilters: _this.submitFilters,
          resetControls: _this.updateControlsFromKbn,
          clearControls: _this.clearControls,
          hasChanges: _this.hasChanges,
          hasValues: _this.hasValues,
          refreshControl: _this.refreshControl
        })), _this.el);
      });

      _defineProperty(this, "stageFilter", function _callee(controlIndex, newValue) {
        var _this$visParams2;

        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.controls[controlIndex].set(newValue);

                if (!((_this$visParams2 = _this.visParams) === null || _this$visParams2 === void 0 ? void 0 : _this$visParams2.updateFiltersOnChange)) {
                  _context.next = 5;
                  break;
                }

                // submit filters on each control change
                _this.submitFilters();

                _context.next = 8;
                break;

              case 5:
                _context.next = 7;
                return regeneratorRuntime.awrap(_this.updateNestedControls());

              case 7:
                _this.drawVis();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        });
      });

      _defineProperty(this, "submitFilters", function () {
        var _this$visParams3;

        var stagedControls = _this.controls.filter(function (control) {
          return control.hasChanged();
        });

        var newFilters = stagedControls.map(function (control) {
          return control.getKbnFilter();
        }).filter(function (filter) {
          return filter !== null;
        });
        stagedControls.forEach(function (control) {
          // to avoid duplicate filters, remove any old filters for control
          control.filterManager.findFilters().forEach(function (existingFilter) {
            _this.filterManager.removeFilter(existingFilter);
          });
        }); // Clean up filter pills for nested controls that are now disabled because ancestors are not set.
        // This has to be done after looking up the staged controls because otherwise removing a filter
        // will re-sync the controls of all other filters.

        _this.controls.map(function (control) {
          if (control.hasAncestors() && control.hasUnsetAncestor()) {
            control.filterManager.findFilters().forEach(function (existingFilter) {
              _this.filterManager.removeFilter(existingFilter);
            });
          }
        });

        _this.filterManager.addFilters(newFilters, (_this$visParams3 = _this.visParams) === null || _this$visParams3 === void 0 ? void 0 : _this$visParams3.pinFilters);
      });

      _defineProperty(this, "clearControls", function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.controls.forEach(function (control) {
                  control.clear();
                });

                _context2.next = 3;
                return regeneratorRuntime.awrap(_this.updateNestedControls());

              case 3:
                _this.drawVis();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        });
      });

      _defineProperty(this, "updateControlsFromKbn", function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.controls.forEach(function (control) {
                  control.reset();
                });

                _context3.next = 3;
                return regeneratorRuntime.awrap(_this.updateNestedControls());

              case 3:
                _this.drawVis();

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        });
      });

      _defineProperty(this, "hasChanges", function () {
        return _this.controls.map(function (control) {
          return control.hasChanged();
        }).some(function (control) {
          return control;
        });
      });

      _defineProperty(this, "hasValues", function () {
        return _this.controls.map(function (control) {
          return control.hasValue();
        }).reduce(function (a, b) {
          return a || b;
        });
      });

      _defineProperty(this, "refreshControl", function _callee4(controlIndex, query) {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(_this.controls[controlIndex].fetch(query));

              case 2:
                _this.drawVis();

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        });
      });

      this.controls = [];
      this.queryBarUpdateHandler = this.updateControlsFromKbn.bind(this);
      this.filterManager = deps.data.query.filterManager;
      this.updateSubsciption = this.filterManager.getUpdates$().subscribe(this.queryBarUpdateHandler);
    }

    _createClass(InputControlVisController, [{
      key: "render",
      value: function render(visData, visParams, status) {
        var _ref, _ref2, i18n;

        return regeneratorRuntime.async(function render$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(status.params || visParams.useTimeFilter && status.time)) {
                  _context5.next = 13;
                  break;
                }

                this.visParams = visParams;
                this.controls = [];
                _context5.next = 5;
                return regeneratorRuntime.awrap(this.initControls());

              case 5:
                this.controls = _context5.sent;
                _context5.next = 8;
                return regeneratorRuntime.awrap(deps.core.getStartServices());

              case 8:
                _ref = _context5.sent;
                _ref2 = _slicedToArray(_ref, 1);
                i18n = _ref2[0].i18n;
                this.I18nContext = i18n.Context;
                this.drawVis();

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.updateSubsciption.unsubscribe();
        (0, _reactDom.unmountComponentAtNode)(this.el);
        this.controls.forEach(function (control) {
          return control.destroy();
        });
      }
    }, {
      key: "initControls",
      value: function initControls() {
        var _ref3,
            _this$visParams4,
            _this2 = this;

        var controlParamsList, controlFactoryPromises, controls, getControl, controlInitPromises;
        return regeneratorRuntime.async(function initControls$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                controlParamsList = (_ref3 = (_this$visParams4 = this.visParams) === null || _this$visParams4 === void 0 ? void 0 : _this$visParams4.controls) === null || _ref3 === void 0 ? void 0 : _ref3.filter(function (controlParams) {
                  // ignore controls that do not have indexPattern or field
                  return controlParams.indexPattern && controlParams.fieldName;
                });
                controlFactoryPromises = controlParamsList.map(function (controlParams) {
                  var _this2$visParams;

                  var factory = (0, _control_factory.getControlFactory)(controlParams);
                  return factory(controlParams, (_this2$visParams = _this2.visParams) === null || _this2$visParams === void 0 ? void 0 : _this2$visParams.useTimeFilter, _legacy_imports.SearchSource, deps);
                });
                _context6.next = 4;
                return regeneratorRuntime.awrap(Promise.all(controlFactoryPromises));

              case 4:
                controls = _context6.sent;

                getControl = function getControl(controlId) {
                  return controls.find(function (_ref4) {
                    var id = _ref4.id;
                    return id === controlId;
                  });
                };

                controlInitPromises = [];
                (0, _lineage.getLineageMap)(controlParamsList).forEach(function (lineage, controlId) {
                  // first lineage item is the control. remove it
                  lineage.shift();
                  var ancestors = [];
                  lineage.forEach(function (ancestorId) {
                    var control = getControl(ancestorId);

                    if (control) {
                      ancestors.push(control);
                    }
                  });
                  var control = getControl(controlId);

                  if (control) {
                    control.setAncestors(ancestors);
                    controlInitPromises.push(control.fetch());
                  }
                });
                _context6.next = 10;
                return regeneratorRuntime.awrap(Promise.all(controlInitPromises));

              case 10:
                return _context6.abrupt("return", controls);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "updateNestedControls",
      value: function updateNestedControls() {
        var fetchPromises;
        return regeneratorRuntime.async(function updateNestedControls$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                fetchPromises = this.controls.map(function _callee5(control) {
                  return regeneratorRuntime.async(function _callee5$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          if (!control.hasAncestors()) {
                            _context7.next = 3;
                            break;
                          }

                          _context7.next = 3;
                          return regeneratorRuntime.awrap(control.fetch());

                        case 3:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  });
                });
                _context8.next = 3;
                return regeneratorRuntime.awrap(Promise.all(fetchPromises));

              case 3:
                return _context8.abrupt("return", _context8.sent);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      }
    }]);

    return InputControlVisController;
  }(), _temp;
};

exports.createInputControlVisController = createInputControlVisController;