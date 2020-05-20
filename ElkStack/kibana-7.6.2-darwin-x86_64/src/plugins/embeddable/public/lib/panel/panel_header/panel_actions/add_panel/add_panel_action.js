"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddPanelAction = exports.ADD_PANEL_ACTION_ID = void 0;

var _i18n = require("@kbn/i18n");

var _types = require("../../../../types");

var _open_add_panel_flyout = require("./open_add_panel_flyout");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ADD_PANEL_ACTION_ID = 'ADD_PANEL_ACTION_ID';
exports.ADD_PANEL_ACTION_ID = ADD_PANEL_ACTION_ID;

var AddPanelAction =
/*#__PURE__*/
function () {
  function AddPanelAction(getFactory, getAllFactories, overlays, notifications, SavedObjectFinder) {
    _classCallCheck(this, AddPanelAction);

    this.getFactory = getFactory;
    this.getAllFactories = getAllFactories;
    this.overlays = overlays;
    this.notifications = notifications;
    this.SavedObjectFinder = SavedObjectFinder;

    _defineProperty(this, "type", ADD_PANEL_ACTION_ID);

    _defineProperty(this, "id", ADD_PANEL_ACTION_ID);
  }

  _createClass(AddPanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.addPanel.displayName', {
        defaultMessage: 'Add panel'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return 'plusInCircleFilled';
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
              return _context.abrupt("return", embeddable.getIsContainer() && embeddable.getInput().viewMode === _types.ViewMode.EDIT);

            case 2:
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
              _context2.t0 = !embeddable.getIsContainer();

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

              throw new Error('Context is incompatible');

            case 8:
              (0, _open_add_panel_flyout.openAddPanelFlyout)({
                embeddable: embeddable,
                getFactory: this.getFactory,
                getAllFactories: this.getAllFactories,
                overlays: this.overlays,
                notifications: this.notifications,
                SavedObjectFinder: this.SavedObjectFinder
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return AddPanelAction;
}();

exports.AddPanelAction = AddPanelAction;