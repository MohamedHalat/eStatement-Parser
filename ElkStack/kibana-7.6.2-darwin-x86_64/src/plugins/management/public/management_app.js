"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManagementApp = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _i18n = require("@kbn/i18n");

var _components = require("./components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ManagementApp =
/*#__PURE__*/
function () {
  function ManagementApp(_ref, getSections, registerLegacyApp, getLegacyManagementSections, getStartServices) {
    var _this = this;

    var id = _ref.id,
        title = _ref.title,
        basePath = _ref.basePath,
        _ref$order = _ref.order,
        order = _ref$order === void 0 ? 100 : _ref$order,
        _mount = _ref.mount;

    _classCallCheck(this, ManagementApp);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "title", void 0);

    _defineProperty(this, "basePath", void 0);

    _defineProperty(this, "order", void 0);

    _defineProperty(this, "mount", void 0);

    _defineProperty(this, "enabledStatus", true);

    this.id = id;
    this.title = title;
    this.basePath = basePath;
    this.order = order;
    this.mount = _mount;
    registerLegacyApp({
      id: basePath.substr(1),
      // get rid of initial slash
      title: title,
      mount: function mount(_ref2, params) {
        var appUnmount, _ref3, _ref4, coreStart, setBreadcrumbs;

        return regeneratorRuntime.async(function mount$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                setBreadcrumbs = function _ref7(crumbs) {
                  var _ref5, _ref6, coreStart;

                  return regeneratorRuntime.async(function setBreadcrumbs$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return regeneratorRuntime.awrap(getStartServices());

                        case 2:
                          _ref5 = _context.sent;
                          _ref6 = _slicedToArray(_ref5, 1);
                          coreStart = _ref6[0];
                          coreStart.chrome.setBreadcrumbs([{
                            text: _i18n.i18n.translate('management.breadcrumb', {
                              defaultMessage: 'Management'
                            }),
                            href: '#/management'
                          }].concat(_toConsumableArray(crumbs)));

                        case 6:
                        case "end":
                          return _context.stop();
                      }
                    }
                  });
                };

                _objectDestructuringEmpty(_ref2);

                if (_this.enabledStatus) {
                  _context4.next = 10;
                  break;
                }

                _context4.next = 5;
                return regeneratorRuntime.awrap(getStartServices());

              case 5:
                _ref3 = _context4.sent;
                _ref4 = _slicedToArray(_ref3, 1);
                coreStart = _ref4[0];
                coreStart.application.navigateToApp('kibana#/management');
                return _context4.abrupt("return", function () {});

              case 10:
                _reactDom.default.render(React.createElement(_components.ManagementChrome, {
                  getSections: getSections,
                  selectedId: id,
                  legacySections: getLegacyManagementSections().items,
                  onMounted: function _callee(element) {
                    return regeneratorRuntime.async(function _callee$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return regeneratorRuntime.awrap(_mount({
                              basePath: basePath,
                              element: element,
                              setBreadcrumbs: setBreadcrumbs
                            }));

                          case 2:
                            appUnmount = _context2.sent;

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    });
                  }
                }), params.element);

                return _context4.abrupt("return", function _callee2() {
                  return regeneratorRuntime.async(function _callee2$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          appUnmount();

                          _reactDom.default.unmountComponentAtNode(params.element);

                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  });
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        });
      }
    });
  }

  _createClass(ManagementApp, [{
    key: "enable",
    value: function enable() {
      this.enabledStatus = true;
    }
  }, {
    key: "disable",
    value: function disable() {
      this.enabledStatus = false;
    }
  }, {
    key: "enabled",
    get: function get() {
      return this.enabledStatus;
    }
  }]);

  return ManagementApp;
}();

exports.ManagementApp = ManagementApp;