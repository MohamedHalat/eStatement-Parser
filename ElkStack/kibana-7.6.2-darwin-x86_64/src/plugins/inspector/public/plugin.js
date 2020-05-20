"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InspectorPublicPlugin = void 0;

var _i18n = require("@kbn/i18n");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../kibana_react/public");

var _view_registry = require("./view_registry");

var _inspector_panel = require("./ui/inspector_panel");

var _views = require("./views");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InspectorPublicPlugin =
/*#__PURE__*/
function () {
  function InspectorPublicPlugin(initializerContext) {
    _classCallCheck(this, InspectorPublicPlugin);

    _defineProperty(this, "views", void 0);
  }

  _createClass(InspectorPublicPlugin, [{
    key: "setup",
    value: function setup(core) {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.views = new _view_registry.InspectorViewRegistry();
              this.views.register((0, _views.getDataViewDescription)(core.uiSettings));
              this.views.register((0, _views.getRequestsViewDescription)());
              return _context.abrupt("return", {
                registerView: this.views.register.bind(this.views),
                __LEGACY: {
                  views: this.views
                }
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "start",
    value: function start(core) {
      var _this = this;

      var isAvailable = function isAvailable(adapters) {
        return _this.views.getVisible(adapters).length > 0;
      };

      var closeButtonLabel = _i18n.i18n.translate('inspector.closeButton', {
        defaultMessage: 'Close Inspector'
      });

      var open = function open(adapters) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var views = _this.views.getVisible(adapters); // Don't open inspector if there are no views available for the passed adapters


        if (!views || views.length === 0) {
          throw new Error("Tried to open an inspector without views being available.\n          Make sure to call Inspector.isAvailable() with the same adapters before to check\n          if an inspector can be shown.");
        }

        return core.overlays.openFlyout((0, _public.toMountPoint)(React.createElement(_inspector_panel.InspectorPanel, {
          views: views,
          adapters: adapters,
          title: options.title
        })), {
          'data-test-subj': 'inspectorPanel',
          closeButtonAriaLabel: closeButtonLabel
        });
      };

      return {
        isAvailable: isAvailable,
        open: open
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return InspectorPublicPlugin;
}();

exports.InspectorPublicPlugin = InspectorPublicPlugin;