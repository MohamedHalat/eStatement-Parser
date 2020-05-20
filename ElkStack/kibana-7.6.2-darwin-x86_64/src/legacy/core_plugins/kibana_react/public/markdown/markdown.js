"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Markdown = exports.markdownFactory = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _markdownIt = _interopRequireDefault(require("markdown-it"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Return a memoized markdown rendering function that use the specified
 * whiteListedRules and openLinksInNewTab configurations.
 * @param {Array of Strings} whiteListedRules - white list of markdown rules
 * list of rules can be found at https://github.com/markdown-it/markdown-it/issues/361
 * @param {Boolean} openLinksInNewTab
 * @return {Function} Returns an Object to use with dangerouslySetInnerHTML
 * with the rendered markdown HTML
 */
var markdownFactory = (0, _lodash.memoize)(function () {
  var whiteListedRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var openLinksInNewTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var markdownIt; // It is imperative that the html config property be set to false, to mitigate XSS: the output of markdown-it is
  // fed directly to the DOM via React's dangerouslySetInnerHTML below.

  if (whiteListedRules && whiteListedRules.length > 0) {
    markdownIt = new _markdownIt.default('zero', {
      html: false,
      linkify: true
    });
    markdownIt.enable(whiteListedRules);
  } else {
    markdownIt = new _markdownIt.default({
      html: false,
      linkify: true
    });
  }

  if (openLinksInNewTab) {
    // All links should open in new browser tab.
    // Define custom renderer to add 'target' attribute
    // https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
    var originalLinkRender = markdownIt.renderer.rules.link_open || function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

    markdownIt.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      var href = tokens[idx].attrGet('href');
      var target = '_blank';
      var rel = (0, _eui.getSecureRelForTarget)({
        href: href === null ? undefined : href,
        target: target
      }); // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/

      tokens[idx].attrPush(['target', target]);

      if (rel) {
        tokens[idx].attrPush(['rel', rel]);
      }

      return originalLinkRender(tokens, idx, options, env, self);
    };
  }
  /**
   * This method is used to render markdown from the passed parameter
   * into HTML. It will just return an empty string when the markdown is empty.
   * @param {String} markdown - The markdown String
   * @return {String} - Returns the rendered HTML as string.
   */


  return function (markdown) {
    return markdown ? markdownIt.render(markdown) : '';
  };
}, function () {
  var whiteListedRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var openLinksInNewTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return "".concat(whiteListedRules.join('_')).concat(openLinksInNewTab);
});
exports.markdownFactory = markdownFactory;

var Markdown =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Markdown, _PureComponent);

  function Markdown() {
    _classCallCheck(this, Markdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(Markdown).apply(this, arguments));
  }

  _createClass(Markdown, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          _this$props$markdown = _this$props.markdown,
          markdown = _this$props$markdown === void 0 ? '' : _this$props$markdown,
          openLinksInNewTab = _this$props.openLinksInNewTab,
          whiteListedRules = _this$props.whiteListedRules,
          rest = _objectWithoutProperties(_this$props, ["className", "markdown", "openLinksInNewTab", "whiteListedRules"]);

      var classes = (0, _classnames.default)('kbnMarkdown__body', className);
      var markdownRenderer = markdownFactory(whiteListedRules, openLinksInNewTab);
      var renderedMarkdown = markdownRenderer(markdown);
      return _react.default.createElement("div", _extends({}, rest, {
        className: classes
        /*
         * Justification for dangerouslySetInnerHTML:
         * The Markdown Visualization is, believe it or not, responsible for rendering Markdown.
         * This relies on `markdown-it` to produce safe and correct HTML.
         */
        ,
        dangerouslySetInnerHTML: {
          __html: renderedMarkdown
        } // eslint-disable-line react/no-danger

      }));
    }
  }]);

  return Markdown;
}(_react.PureComponent);

exports.Markdown = Markdown;