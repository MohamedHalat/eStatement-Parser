"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemovePanelAction = exports.REMOVE_PANEL_ACTION = void 0;

var _i18n = require("@kbn/i18n");

var _ui_actions = require("../../../ui_actions");

var _types = require("../../../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REMOVE_PANEL_ACTION = 'deletePanel';
exports.REMOVE_PANEL_ACTION = REMOVE_PANEL_ACTION;

function hasExpandedPanelInput(container) {
  return container.getInput().expandedPanelId !== undefined;
}

var RemovePanelAction =
/*#__PURE__*/
function () {
  function RemovePanelAction() {
    _classCallCheck(this, RemovePanelAction);

    _defineProperty(this, "type", REMOVE_PANEL_ACTION);

    _defineProperty(this, "id", REMOVE_PANEL_ACTION);

    _defineProperty(this, "order", 5);
  }

  _createClass(RemovePanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.panel.removePanel.displayName', {
        defaultMessage: 'Delete from dashboard'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return 'trash';
    }
  }, {
    key: "isCompatible",
    value: function isCompatible(_ref) {
      var embeddable, isPanelExpanded;
      return regeneratorRuntime.async(function isCompatible$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              embeddable = _ref.embeddable;
              isPanelExpanded = embeddable.parent && hasExpandedPanelInput(embeddable.parent) && embeddable.parent.getInput().expandedPanelId === embeddable.id;
              return _context.abrupt("return", Boolean(embeddable.parent && embeddable.getInput().viewMode === _types.ViewMode.EDIT && !isPanelExpanded));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "execute",
    value: function execute(_ref2) {
      var embeddable;
      return regeneratorRuntime.async(function execute$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              embeddable = _ref2.embeddable;
              _context2.t0 = !embeddable.parent;

              if (_context2.t0) {
                _context2.next = 6;
                break;
              }

              _context2.next = 5;
              return regeneratorRuntime.awrap(this.isCompatible({
                embeddable: embeddable
              }));

            case 5:
              _context2.t0 = !_context2.sent;

            case 6:
              if (!_context2.t0) {
                _context2.next = 8;
                break;
              }

              throw new _ui_actions.IncompatibleActionError();

            case 8:
              embeddable.parent.removeEmbeddable(embeddable.id);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return RemovePanelAction;
}();

exports.RemovePanelAction = RemovePanelAction;