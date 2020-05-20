"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardContainerFactory = void 0;

var _i18n = require("@kbn/i18n");

var _embeddable_plugin = require("../embeddable_plugin");

var _dashboard_container = require("./dashboard_container");

var _dashboard_constants = require("./dashboard_constants");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DashboardContainerFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(DashboardContainerFactory, _EmbeddableFactory);

  function DashboardContainerFactory(options) {
    var _this;

    _classCallCheck(this, DashboardContainerFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardContainerFactory).call(this, {
      savedObjectMetaData: options.savedObjectMetaData
    }));
    _this.options = options;

    _defineProperty(_assertThisInitialized(_this), "isContainerType", true);

    _defineProperty(_assertThisInitialized(_this), "type", _dashboard_constants.DASHBOARD_CONTAINER_TYPE);

    _defineProperty(_assertThisInitialized(_this), "allowEditing", void 0);

    var capabilities = options.application.capabilities.dashboard;

    if (!capabilities || _typeof(capabilities) !== 'object') {
      throw new TypeError('Dashboard capabilities not found.');
    }

    _this.allowEditing = !!capabilities.createNew && !!capabilities.showWriteControls;
    return _this;
  }

  _createClass(DashboardContainerFactory, [{
    key: "isEditable",
    value: function isEditable() {
      return this.allowEditing;
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('dashboardEmbeddableContainer.factory.displayName', {
        defaultMessage: 'dashboard'
      });
    }
  }, {
    key: "getDefaultInput",
    value: function getDefaultInput() {
      return {
        panels: {},
        isFullScreenMode: false,
        useMargins: true
      };
    }
  }, {
    key: "create",
    value: function create(initialInput, parent) {
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new _dashboard_container.DashboardContainer(initialInput, this.options, parent));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return DashboardContainerFactory;
}(_embeddable_plugin.EmbeddableFactory);

exports.DashboardContainerFactory = DashboardContainerFactory;