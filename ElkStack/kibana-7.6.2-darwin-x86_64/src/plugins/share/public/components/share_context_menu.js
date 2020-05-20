"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareContextMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _url_panel_content = require("./url_panel_content");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ShareContextMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(ShareContextMenu, _Component);

  function ShareContextMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ShareContextMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ShareContextMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getPanels", function () {
      var panels = [];
      var menuItems = [];
      var permalinkPanel = {
        id: panels.length + 1,
        title: _i18n.i18n.translate('share.contextMenu.permalinkPanelTitle', {
          defaultMessage: 'Permalink'
        }),
        content: _react.default.createElement(_url_panel_content.UrlPanelContent, {
          allowShortUrl: _this.props.allowShortUrl,
          objectId: _this.props.objectId,
          objectType: _this.props.objectType,
          basePath: _this.props.basePath,
          post: _this.props.post,
          shareableUrl: _this.props.shareableUrl
        })
      };
      menuItems.push({
        name: _i18n.i18n.translate('share.contextMenu.permalinksLabel', {
          defaultMessage: 'Permalinks'
        }),
        icon: 'link',
        panel: permalinkPanel.id,
        sortOrder: 0
      });
      panels.push(permalinkPanel);

      if (_this.props.allowEmbed) {
        var embedPanel = {
          id: panels.length + 1,
          title: _i18n.i18n.translate('share.contextMenu.embedCodePanelTitle', {
            defaultMessage: 'Embed Code'
          }),
          content: _react.default.createElement(_url_panel_content.UrlPanelContent, {
            allowShortUrl: _this.props.allowShortUrl,
            isEmbedded: true,
            objectId: _this.props.objectId,
            objectType: _this.props.objectType,
            basePath: _this.props.basePath,
            post: _this.props.post,
            shareableUrl: _this.props.shareableUrl
          })
        };
        panels.push(embedPanel);
        menuItems.push({
          name: _i18n.i18n.translate('share.contextMenu.embedCodeLabel', {
            defaultMessage: 'Embed code'
          }),
          icon: 'console',
          panel: embedPanel.id,
          sortOrder: 0
        });
      }

      _this.props.shareMenuItems.forEach(function (_ref) {
        var shareMenuItem = _ref.shareMenuItem,
            panel = _ref.panel;
        var panelId = panels.length + 1;
        panels.push(_objectSpread({}, panel, {
          id: panelId
        }));
        menuItems.push(_objectSpread({}, shareMenuItem, {
          panel: panelId
        }));
      });

      if (menuItems.length > 1) {
        var topLevelMenuPanel = {
          id: panels.length + 1,
          title: _i18n.i18n.translate('share.contextMenuTitle', {
            defaultMessage: 'Share this {objectType}',
            values: {
              objectType: _this.props.objectType
            }
          }),
          items: menuItems // Sorts ascending on sort order first and then ascending on name
          .sort(function (a, b) {
            var aSortOrder = a.sortOrder || 0;
            var bSortOrder = b.sortOrder || 0;

            if (aSortOrder > bSortOrder) {
              return 1;
            }

            if (aSortOrder < bSortOrder) {
              return -1;
            }

            if (a.name.toLowerCase().localeCompare(b.name.toLowerCase()) > 0) {
              return 1;
            }

            return -1;
          }).map(function (menuItem) {
            menuItem['data-test-subj'] = "sharePanel-".concat(menuItem.name.replace(' ', ''));
            delete menuItem.sortOrder;
            return menuItem;
          })
        };
        panels.push(topLevelMenuPanel);
      }

      var lastPanelIndex = panels.length - 1;
      var initialPanelId = panels[lastPanelIndex].id;
      return {
        panels: panels,
        initialPanelId: initialPanelId
      };
    });

    return _this;
  }

  _createClass(ShareContextMenu, [{
    key: "render",
    value: function render() {
      var _this$getPanels = this.getPanels(),
          panels = _this$getPanels.panels,
          initialPanelId = _this$getPanels.initialPanelId;

      return _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_eui.EuiContextMenu, {
        initialPanelId: initialPanelId,
        panels: panels,
        "data-test-subj": "shareContextMenu"
      }));
    }
  }]);

  return ShareContextMenu;
}(_react.Component);

exports.ShareContextMenu = ShareContextMenu;