"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderHelpMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _rxjs = require("rxjs");

var _header_extension = require("./header_extension");

var _constants = require("../../constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HeaderHelpMenuUI =
/*#__PURE__*/
function (_Component) {
  _inherits(HeaderHelpMenuUI, _Component);

  function HeaderHelpMenuUI(props) {
    var _this;

    _classCallCheck(this, HeaderHelpMenuUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderHelpMenuUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "createGithubUrl", function (labels, title) {
      var url = new URL('https://github.com/elastic/kibana/issues/new?');

      if (labels.length) {
        url.searchParams.set('labels', labels.join(','));
      }

      if (title) {
        url.searchParams.set('title', title);
      }

      return url.toString();
    });

    _defineProperty(_assertThisInitialized(_this), "createCustomLink", function (index, text, addSpacer, buttonProps) {
      return _react.default.createElement(_react.Fragment, {
        key: "helpButton".concat(index)
      }, _react.default.createElement(_eui.EuiButtonEmpty, _extends({}, buttonProps, {
        size: "xs",
        flush: "left"
      }), text), addSpacer && _react.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onMenuButtonClick", function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeMenu", function () {
      _this.setState({
        isOpen: false
      });
    });

    _this.state = {
      isOpen: false,
      helpExtension: undefined,
      helpSupportUrl: ''
    };
    return _this;
  }

  _createClass(HeaderHelpMenuUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscription = (0, _rxjs.combineLatest)(this.props.helpExtension$, this.props.helpSupportUrl$).subscribe(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            helpExtension = _ref2[0],
            helpSupportUrl = _ref2[1];

        _this2.setState({
          helpExtension: helpExtension,
          helpSupportUrl: helpSupportUrl
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          intl = _this$props.intl,
          kibanaVersion = _this$props.kibanaVersion,
          useDefaultContent = _this$props.useDefaultContent,
          kibanaDocLink = _this$props.kibanaDocLink;
      var _this$state = this.state,
          helpExtension = _this$state.helpExtension,
          helpSupportUrl = _this$state.helpSupportUrl;
      var defaultContent = useDefaultContent ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiButtonEmpty, {
        href: kibanaDocLink,
        target: "_blank",
        size: "xs",
        flush: "left"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "core.ui.chrome.headerGlobalNav.helpMenuKibanaDocumentationTitle",
        defaultMessage: "Kibana documentation"
      })), _react.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }), _react.default.createElement(_eui.EuiButtonEmpty, {
        href: helpSupportUrl,
        target: "_blank",
        size: "xs",
        flush: "left"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "core.ui.chrome.headerGlobalNav.helpMenuAskElasticTitle",
        defaultMessage: "Ask Elastic"
      })), _react.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }), _react.default.createElement(_eui.EuiButtonEmpty, {
        href: _constants.KIBANA_FEEDBACK_LINK,
        target: "_blank",
        size: "xs",
        flush: "left"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "core.ui.chrome.headerGlobalNav.helpMenuGiveFeedbackTitle",
        defaultMessage: "Give feedback"
      })), _react.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }), _react.default.createElement(_eui.EuiButtonEmpty, {
        href: _constants.GITHUB_CREATE_ISSUE_LINK,
        target: "_blank",
        size: "xs",
        iconType: "logoGithub",
        flush: "left"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "core.ui.chrome.headerGlobalNav.helpMenuOpenGitHubIssueTitle",
        defaultMessage: "Open an issue in GitHub"
      }))) : null;
      var customContent;

      if (helpExtension) {
        var appName = helpExtension.appName,
            links = helpExtension.links,
            content = helpExtension.content;

        var getFeedbackText = function getFeedbackText() {
          return _i18n.i18n.translate('core.ui.chrome.headerGlobalNav.helpMenuGiveFeedbackOnApp', {
            defaultMessage: 'Give feedback on {appName}',
            values: {
              appName: helpExtension.appName
            }
          });
        };

        var customLinks = links && links.map(function (link, index) {
          var linkType = link.linkType,
              title = link.title,
              _link$labels = link.labels,
              labels = _link$labels === void 0 ? [] : _link$labels,
              text = link.content,
              rest = _objectWithoutProperties(link, ["linkType", "title", "labels", "content"]);

          switch (linkType) {
            case 'documentation':
              return _this3.createCustomLink(index, _react.default.createElement(_react2.FormattedMessage, {
                id: "core.ui.chrome.headerGlobalNav.helpMenuDocumentation",
                defaultMessage: "Documentation"
              }), index < links.length - 1, _objectSpread({
                target: '_blank',
                rel: 'noopener'
              }, rest));

            case 'github':
              return _this3.createCustomLink(index, getFeedbackText(), index < links.length - 1, _objectSpread({
                iconType: 'logoGithub',
                href: _this3.createGithubUrl(labels, title),
                target: '_blank',
                rel: 'noopener'
              }, rest));

            case 'discuss':
              return _this3.createCustomLink(index, getFeedbackText(), index < links.length - 1, _objectSpread({
                iconType: 'editorComment',
                target: '_blank',
                rel: 'noopener'
              }, rest));

            case 'custom':
              return _this3.createCustomLink(index, text, index < links.length - 1, _objectSpread({}, rest));

            default:
              break;
          }
        });
        customContent = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
          size: "xxs"
        }, _react.default.createElement("h3", null, appName)), _react.default.createElement(_eui.EuiSpacer, {
          size: "s"
        }), customLinks, content && _react.default.createElement(_react.default.Fragment, null, customLinks && _react.default.createElement(_eui.EuiSpacer, {
          size: "s"
        }), _react.default.createElement(_header_extension.HeaderExtension, {
          extension: content
        })));
      }

      var button = _react.default.createElement(_eui.EuiHeaderSectionItemButton, {
        "aria-expanded": this.state.isOpen,
        "aria-haspopup": "true",
        "aria-label": intl.formatMessage({
          id: 'core.ui.chrome.headerGlobalNav.helpMenuButtonAriaLabel',
          defaultMessage: 'Help menu'
        }),
        onClick: this.onMenuButtonClick
      }, _react.default.createElement(_eui.EuiIcon, {
        type: "help",
        size: "m"
      }));

      return (// @ts-ignore repositionOnScroll doesn't exist in EuiPopover
        _react.default.createElement(_eui.EuiPopover, {
          id: "headerHelpMenu",
          button: button,
          isOpen: this.state.isOpen,
          anchorPosition: "downRight",
          repositionOnScroll: true,
          closePopover: this.closeMenu,
          "data-test-subj": "helpMenuButton"
        }, _react.default.createElement(_eui.EuiPopoverTitle, null, _react.default.createElement(_eui.EuiFlexGroup, {
          responsive: false
        }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "core.ui.chrome.headerGlobalNav.helpMenuTitle",
          defaultMessage: "Help"
        }))), _react.default.createElement(_eui.EuiFlexItem, {
          grow: false,
          className: "chrHeaderHelpMenu__version"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "core.ui.chrome.headerGlobalNav.helpMenuVersion",
          defaultMessage: "v {version}",
          values: {
            version: kibanaVersion
          }
        })))), _react.default.createElement("div", {
          style: {
            maxWidth: 240
          }
        }, defaultContent, defaultContent && customContent && _react.default.createElement(_eui.EuiHorizontalRule, {
          margin: "m"
        }), customContent))
      );
    }
  }]);

  return HeaderHelpMenuUI;
}(_react.Component);

var HeaderHelpMenu = (0, _react2.injectI18n)(HeaderHelpMenuUI);
exports.HeaderHelpMenu = HeaderHelpMenu;
HeaderHelpMenu.defaultProps = {
  useDefaultContent: true
};