"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareMenuManager = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _share_context_menu = require("../components/share_context_menu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ShareMenuManager =
/*#__PURE__*/
function () {
  function ShareMenuManager() {
    var _this = this;

    _classCallCheck(this, ShareMenuManager);

    _defineProperty(this, "isOpen", false);

    _defineProperty(this, "container", document.createElement('div'));

    _defineProperty(this, "onClose", function () {
      _reactDom.default.unmountComponentAtNode(_this.container);

      _this.isOpen = false;
    });
  }

  _createClass(ShareMenuManager, [{
    key: "start",
    value: function start(core, shareRegistry) {
      var _this2 = this;

      return {
        /**
         * Collects share menu items from registered providers and mounts the share context menu under
         * the given `anchorElement`. If the context menu is already opened, a call to this method closes it.
         * @param options
         */
        toggleShareContextMenu: function toggleShareContextMenu(options) {
          var menuItems = shareRegistry.getShareMenuItems(_objectSpread({}, options, {
            onClose: _this2.onClose
          }));

          _this2.toggleShareContextMenu(_objectSpread({}, options, {
            menuItems: menuItems,
            post: core.http.post,
            basePath: core.http.basePath.get()
          }));
        }
      };
    }
  }, {
    key: "toggleShareContextMenu",
    value: function toggleShareContextMenu(_ref) {
      var anchorElement = _ref.anchorElement,
          allowEmbed = _ref.allowEmbed,
          allowShortUrl = _ref.allowShortUrl,
          objectId = _ref.objectId,
          objectType = _ref.objectType,
          sharingData = _ref.sharingData,
          menuItems = _ref.menuItems,
          shareableUrl = _ref.shareableUrl,
          post = _ref.post,
          basePath = _ref.basePath;

      if (this.isOpen) {
        this.onClose();
        return;
      }

      this.isOpen = true;
      document.body.appendChild(this.container);

      var element = _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_eui.EuiWrappingPopover, {
        id: "sharePopover",
        button: anchorElement,
        isOpen: true,
        closePopover: this.onClose,
        panelPaddingSize: "none",
        withTitle: true,
        anchorPosition: "downLeft"
      }, _react.default.createElement(_share_context_menu.ShareContextMenu, {
        allowEmbed: allowEmbed,
        allowShortUrl: allowShortUrl,
        objectId: objectId,
        objectType: objectType,
        shareMenuItems: menuItems,
        sharingData: sharingData,
        shareableUrl: shareableUrl,
        onClose: this.onClose,
        post: post,
        basePath: basePath
      })));

      _reactDom.default.render(element, this.container);
    }
  }]);

  return ShareMenuManager;
}();

exports.ShareMenuManager = ShareMenuManager;