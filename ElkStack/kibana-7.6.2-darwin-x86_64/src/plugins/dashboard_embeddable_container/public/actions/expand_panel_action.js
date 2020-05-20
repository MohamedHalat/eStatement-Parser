"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandPanelAction = exports.EXPAND_PANEL_ACTION = void 0;

var _i18n = require("@kbn/i18n");

var _ui_actions_plugin = require("../ui_actions_plugin");

var _embeddable = require("../embeddable");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EXPAND_PANEL_ACTION = 'togglePanel';
exports.EXPAND_PANEL_ACTION = EXPAND_PANEL_ACTION;

function isDashboard(embeddable) {
  return embeddable.type === _embeddable.DASHBOARD_CONTAINER_TYPE;
}

function isExpanded(embeddable) {
  if (!embeddable.parent || !isDashboard(embeddable.parent)) {
    throw new _ui_actions_plugin.IncompatibleActionError();
  }

  return embeddable.id === embeddable.parent.getInput().expandedPanelId;
}

var ExpandPanelAction =
/*#__PURE__*/
function () {
  function ExpandPanelAction() {
    _classCallCheck(this, ExpandPanelAction);

    _defineProperty(this, "type", EXPAND_PANEL_ACTION);

    _defineProperty(this, "id", EXPAND_PANEL_ACTION);

    _defineProperty(this, "order", 7);
  }

  _createClass(ExpandPanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName(_ref) {
      var embeddable = _ref.embeddable;

      if (!embeddable.parent || !isDashboard(embeddable.parent)) {
        throw new _ui_actions_plugin.IncompatibleActionError();
      }

      return isExpanded(embeddable) ? _i18n.i18n.translate('dashboardEmbeddableContainer.actions.toggleExpandPanelMenuItem.expandedDisplayName', {
        defaultMessage: 'Minimize'
      }) : _i18n.i18n.translate('dashboardEmbeddableContainer.actions.toggleExpandPanelMenuItem.notExpandedDisplayName', {
        defaultMessage: 'Full screen'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType(_ref2) {
      var embeddable = _ref2.embeddable;

      if (!embeddable.parent || !isDashboard(embeddable.parent)) {
        throw new _ui_actions_plugin.IncompatibleActionError();
      } // TODO: use 'minimize' when an eui-icon of such is available.


      return isExpanded(embeddable) ? 'expand' : 'expand';
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
              return _context.abrupt("return", Boolean(embeddable.parent && isDashboard(embeddable.parent)));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "execute",
    value: function execute(_ref4) {
      var embeddable, newValue;
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
              newValue = isExpanded(embeddable) ? undefined : embeddable.id;
              embeddable.parent.updateInput({
                expandedPanelId: newValue
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return ExpandPanelAction;
}();

exports.ExpandPanelAction = ExpandPanelAction;