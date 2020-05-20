"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManagementSection = void 0;

var _management_app = require("./management_app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ManagementSection =
/*#__PURE__*/
function () {
  function ManagementSection(_ref, getSections, registerLegacyApp, getLegacyManagementSection, getStartServices) {
    var id = _ref.id,
        title = _ref.title,
        _ref$order = _ref.order,
        order = _ref$order === void 0 ? 100 : _ref$order,
        euiIconType = _ref.euiIconType,
        icon = _ref.icon;

    _classCallCheck(this, ManagementSection);

    _defineProperty(this, "id", '');

    _defineProperty(this, "title", '');

    _defineProperty(this, "apps", []);

    _defineProperty(this, "order", void 0);

    _defineProperty(this, "euiIconType", void 0);

    _defineProperty(this, "icon", void 0);

    _defineProperty(this, "getSections", void 0);

    _defineProperty(this, "registerLegacyApp", void 0);

    _defineProperty(this, "getLegacyManagementSection", void 0);

    _defineProperty(this, "getStartServices", void 0);

    this.id = id;
    this.title = title;
    this.order = order;
    this.euiIconType = euiIconType;
    this.icon = icon;
    this.getSections = getSections;
    this.registerLegacyApp = registerLegacyApp;
    this.getLegacyManagementSection = getLegacyManagementSection;
    this.getStartServices = getStartServices;
  }

  _createClass(ManagementSection, [{
    key: "registerApp",
    value: function registerApp(_ref2) {
      var id = _ref2.id,
          title = _ref2.title,
          order = _ref2.order,
          mount = _ref2.mount;

      if (this.getApp(id)) {
        throw new Error("Management app already registered - id: ".concat(id, ", title: ").concat(title));
      }

      var app = new _management_app.ManagementApp({
        id: id,
        title: title,
        order: order,
        mount: mount,
        basePath: "/management/".concat(this.id, "/").concat(id)
      }, this.getSections, this.registerLegacyApp, this.getLegacyManagementSection, this.getStartServices);
      this.apps.push(app);
      return app;
    }
  }, {
    key: "getApp",
    value: function getApp(id) {
      return this.apps.find(function (app) {
        return app.id === id;
      });
    }
  }, {
    key: "getAppsEnabled",
    value: function getAppsEnabled() {
      return this.apps.filter(function (app) {
        return app.enabled;
      }).sort(function (a, b) {
        return a.order - b.order;
      });
    }
  }]);

  return ManagementSection;
}();

exports.ManagementSection = ManagementSection;