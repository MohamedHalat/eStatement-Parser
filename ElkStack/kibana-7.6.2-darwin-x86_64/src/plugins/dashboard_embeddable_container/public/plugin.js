"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardEmbeddableContainerPublicPlugin = void 0;

var React = _interopRequireWildcard(require("react"));

var _embeddable_plugin = require("./embeddable_plugin");

var _ = require(".");

var _dashboard_container_factory = require("./embeddable/dashboard_container_factory");

var _public = require("../../../plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DashboardEmbeddableContainerPublicPlugin =
/*#__PURE__*/
function () {
  function DashboardEmbeddableContainerPublicPlugin(initializerContext) {
    _classCallCheck(this, DashboardEmbeddableContainerPublicPlugin);
  }

  _createClass(DashboardEmbeddableContainerPublicPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var embeddable = _ref.embeddable,
          uiActions = _ref.uiActions;
      var expandPanelAction = new _.ExpandPanelAction();
      uiActions.registerAction(expandPanelAction);
      uiActions.attachAction(_embeddable_plugin.CONTEXT_MENU_TRIGGER, expandPanelAction.id);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      var application = core.application,
          notifications = core.notifications,
          overlays = core.overlays;
      var embeddable = plugins.embeddable,
          inspector = plugins.inspector,
          uiActions = plugins.uiActions;

      var SavedObjectFinder = function SavedObjectFinder(props) {
        return React.createElement(_public.SavedObjectFinderUi, _extends({}, props, {
          savedObjects: core.savedObjects,
          uiSettings: core.uiSettings
        }));
      };

      var useHideChrome = function useHideChrome() {
        React.useEffect(function () {
          core.chrome.setIsVisible(false);
          return function () {
            return core.chrome.setIsVisible(true);
          };
        }, []);
      };

      var ExitFullScreenButton = function ExitFullScreenButton(props) {
        useHideChrome();
        return React.createElement(_public.ExitFullScreenButton, props);
      };

      var changeViewAction = new _.ReplacePanelAction(core, SavedObjectFinder, notifications, plugins.embeddable.getEmbeddableFactories);
      uiActions.registerAction(changeViewAction);
      uiActions.attachAction(_embeddable_plugin.CONTEXT_MENU_TRIGGER, changeViewAction.id);
      var factory = new _dashboard_container_factory.DashboardContainerFactory({
        application: application,
        notifications: notifications,
        overlays: overlays,
        embeddable: embeddable,
        inspector: inspector,
        SavedObjectFinder: SavedObjectFinder,
        ExitFullScreenButton: ExitFullScreenButton,
        uiActions: uiActions
      });
      embeddable.registerEmbeddableFactory(factory.type, factory);
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return DashboardEmbeddableContainerPublicPlugin;
}();

exports.DashboardEmbeddableContainerPublicPlugin = DashboardEmbeddableContainerPublicPlugin;