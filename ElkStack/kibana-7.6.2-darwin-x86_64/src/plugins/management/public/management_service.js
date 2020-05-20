"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManagementService = void 0;

var _management_section = require("./management_section");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ManagementService =
/*#__PURE__*/
function () {
  function ManagementService() {
    _classCallCheck(this, ManagementService);

    _defineProperty(this, "sections", []);

    _defineProperty(this, "sharedInterface", {
      getSection: this.getSection.bind(this),
      getSectionsEnabled: this.getSectionsEnabled.bind(this),
      getAllSections: this.getAllSections.bind(this)
    });
  }

  _createClass(ManagementService, [{
    key: "register",
    value: function register(registerLegacyApp, getLegacyManagement, getStartServices) {
      var _this = this;

      return function (section) {
        if (_this.getSection(section.id)) {
          throw Error("ManagementSection '".concat(section.id, "' already registered"));
        }

        var newSection = new _management_section.ManagementSection(section, _this.getSectionsEnabled.bind(_this), registerLegacyApp, getLegacyManagement, getStartServices);

        _this.sections.push(newSection);

        return newSection;
      };
    }
  }, {
    key: "getSection",
    value: function getSection(sectionId) {
      return this.sections.find(function (section) {
        return section.id === sectionId;
      });
    }
  }, {
    key: "getAllSections",
    value: function getAllSections() {
      return this.sections;
    }
  }, {
    key: "getSectionsEnabled",
    value: function getSectionsEnabled() {
      return this.sections.filter(function (section) {
        return section.getAppsEnabled().length > 0;
      }).sort(function (a, b) {
        return a.order - b.order;
      });
    }
  }, {
    key: "setup",
    value: function setup(kibanaLegacy, getLegacyManagement, getStartServices) {
      var register = this.register.bind(this)(kibanaLegacy.registerLegacyApp, getLegacyManagement, getStartServices);
      register({
        id: 'kibana',
        title: 'Kibana',
        order: 30,
        euiIconType: 'logoKibana'
      });
      register({
        id: 'logstash',
        title: 'Logstash',
        order: 30,
        euiIconType: 'logoLogstash'
      });
      register({
        id: 'elasticsearch',
        title: 'Elasticsearch',
        order: 20,
        euiIconType: 'logoElasticsearch'
      });
      return _objectSpread({
        register: register
      }, this.sharedInterface);
    }
  }, {
    key: "start",
    value: function start(navigateToApp) {
      return _objectSpread({
        navigateToApp: navigateToApp
      }, this.sharedInterface);
    }
  }]);

  return ManagementService;
}();

exports.ManagementService = ManagementService;