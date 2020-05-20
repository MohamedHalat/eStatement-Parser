"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplacePanelAction = exports.REPLACE_PANEL_ACTION = void 0;

var _i18n = require("@kbn/i18n");

var _embeddable_plugin = require("../embeddable_plugin");

var _embeddable = require("../embeddable");

var _ui_actions_plugin = require("../ui_actions_plugin");

var _open_replace_panel_flyout = require("./open_replace_panel_flyout");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REPLACE_PANEL_ACTION = 'replacePanel';
exports.REPLACE_PANEL_ACTION = REPLACE_PANEL_ACTION;

function isDashboard(embeddable) {
  return embeddable.type === _embeddable.DASHBOARD_CONTAINER_TYPE;
}

var ReplacePanelAction =
/*#__PURE__*/
function () {
  function ReplacePanelAction(core, savedobjectfinder, notifications, getEmbeddableFactories) {
    _classCallCheck(this, ReplacePanelAction);

    this.core = core;
    this.savedobjectfinder = savedobjectfinder;
    this.notifications = notifications;
    this.getEmbeddableFactories = getEmbeddableFactories;

    _defineProperty(this, "type", REPLACE_PANEL_ACTION);

    _defineProperty(this, "id", REPLACE_PANEL_ACTION);

    _defineProperty(this, "order", 11);
  }

  _createClass(ReplacePanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName(_ref) {
      var embeddable = _ref.embeddable;

      if (!embeddable.parent || !isDashboard(embeddable.parent)) {
        throw new _ui_actions_plugin.IncompatibleActionError();
      }

      return _i18n.i18n.translate('dashboardEmbeddableContainer.panel.removePanel.replacePanel', {
        defaultMessage: 'Replace panel'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType(_ref2) {
      var embeddable = _ref2.embeddable;

      if (!embeddable.parent || !isDashboard(embeddable.parent)) {
        throw new _ui_actions_plugin.IncompatibleActionError();
      }

      return 'kqlOperand';
    }
  }, {
    key: "isCompatible",
    value: function isCompatible(_ref3) {
      var embeddable;
      return regeneratorRuntime.async(function isCompatible$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              embeddable = _ref3.embeddable;

              if (!embeddable.getInput().viewMode) {
                _context.next = 4;
                break;
              }

              if (!(embeddable.getInput().viewMode === _embeddable_plugin.ViewMode.VIEW)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", false);

            case 4:
              return _context.abrupt("return", Boolean(embeddable.parent && isDashboard(embeddable.parent)));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "execute",
    value: function execute(_ref4) {
      var embeddable, view, dash;
      return regeneratorRuntime.async(function execute$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              embeddable = _ref4.embeddable;

              if (!(!embeddable.parent || !isDashboard(embeddable.parent))) {
                _context2.next = 3;
                break;
              }

              throw new _ui_actions_plugin.IncompatibleActionError();

            case 3:
              view = embeddable;
              dash = embeddable.parent;
              (0, _open_replace_panel_flyout.openReplacePanelFlyout)({
                embeddable: dash,
                core: this.core,
                savedObjectFinder: this.savedobjectfinder,
                notifications: this.notifications,
                panelToRemove: view,
                getEmbeddableFactories: this.getEmbeddableFactories
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ReplacePanelAction;
}();

exports.ReplacePanelAction = ReplacePanelAction;