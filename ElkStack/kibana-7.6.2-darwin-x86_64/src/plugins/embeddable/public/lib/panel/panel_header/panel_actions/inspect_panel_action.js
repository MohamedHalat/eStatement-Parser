"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InspectPanelAction = exports.INSPECT_PANEL_ACTION_ID = void 0;

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INSPECT_PANEL_ACTION_ID = 'openInspector';
exports.INSPECT_PANEL_ACTION_ID = INSPECT_PANEL_ACTION_ID;

var InspectPanelAction =
/*#__PURE__*/
function () {
  function InspectPanelAction(inspector) {
    _classCallCheck(this, InspectPanelAction);

    this.inspector = inspector;

    _defineProperty(this, "type", INSPECT_PANEL_ACTION_ID);

    _defineProperty(this, "id", INSPECT_PANEL_ACTION_ID);

    _defineProperty(this, "order", 10);
  }

  _createClass(InspectPanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.panel.inspectPanel.displayName', {
        defaultMessage: 'Inspect'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return 'inspect';
    }
  }, {
    key: "isCompatible",
    value: function isCompatible(_ref) {
      var embeddable;
      return regeneratorRuntime.async(function isCompatible$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              embeddable = _ref.embeddable;
              return _context.abrupt("return", this.inspector.isAvailable(embeddable.getInspectorAdapters()));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "execute",
    value: function execute(_ref2) {
      var embeddable, adapters, session, originalDestroy;
      return regeneratorRuntime.async(function execute$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              embeddable = _ref2.embeddable;
              adapters = embeddable.getInspectorAdapters();
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.isCompatible({
                embeddable: embeddable
              }));

            case 4:
              _context2.t0 = !_context2.sent;

              if (_context2.t0) {
                _context2.next = 7;
                break;
              }

              _context2.t0 = adapters === undefined;

            case 7:
              if (!_context2.t0) {
                _context2.next = 9;
                break;
              }

              throw new Error('Action not compatible with context');

            case 9:
              session = this.inspector.open(adapters, {
                title: embeddable.getTitle()
              }); // Overwrite the embeddables.destroy() function to close the inspector
              // before calling the original destroy method

              originalDestroy = embeddable.destroy;

              embeddable.destroy = function () {
                session.close();

                if (originalDestroy) {
                  originalDestroy.call(embeddable);
                }
              }; // In case the inspector gets closed (otherwise), restore the original destroy function


              session.onClose.finally(function () {
                embeddable.destroy = originalDestroy;
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return InspectPanelAction;
}();

exports.InspectPanelAction = InspectPanelAction;