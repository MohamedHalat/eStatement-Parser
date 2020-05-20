"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizePanelTitleAction = void 0;

var _i18n = require("@kbn/i18n");

var _types = require("../../../../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CUSTOMIZE_PANEL_ACTION_ID = 'CUSTOMIZE_PANEL_ACTION_ID';

var CustomizePanelTitleAction =
/*#__PURE__*/
function () {
  function CustomizePanelTitleAction(getDataFromUser) {
    _classCallCheck(this, CustomizePanelTitleAction);

    this.getDataFromUser = getDataFromUser;

    _defineProperty(this, "type", CUSTOMIZE_PANEL_ACTION_ID);

    _defineProperty(this, "id", CUSTOMIZE_PANEL_ACTION_ID);

    _defineProperty(this, "order", 10);

    this.order = 10;
  }

  _createClass(CustomizePanelTitleAction, [{
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.customizePanel.action.displayName', {
        defaultMessage: 'Customize panel'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return 'pencil';
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
              return _context.abrupt("return", embeddable.getInput().viewMode === _types.ViewMode.EDIT ? true : false);

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
      var embeddable, customTitle;
      return regeneratorRuntime.async(function execute$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              embeddable = _ref2.embeddable;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.getDataFromUser({
                embeddable: embeddable
              }));

            case 3:
              customTitle = _context2.sent;
              embeddable.updateInput(customTitle);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return CustomizePanelTitleAction;
}();

exports.CustomizePanelTitleAction = CustomizePanelTitleAction;