"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownVisWrapper = MarkdownVisWrapper;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * The MarkdownVisComponent renders markdown to HTML and presents it.
 */
var MarkdownVisComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MarkdownVisComponent, _React$Component);

  function MarkdownVisComponent() {
    _classCallCheck(this, MarkdownVisComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(MarkdownVisComponent).apply(this, arguments));
  }

  _createClass(MarkdownVisComponent, [{
    key: "componentDidMount",

    /**
     * Will be called after the first render when the component is present in the DOM.
     *
     * We call renderComplete here, to signal, that we are done with rendering.
     */
    value: function componentDidMount() {
      this.props.renderComplete();
    }
    /**
     * Will be called after the component has been updated and the changes has been
     * flushed into the DOM.
     *
     * We will use this to signal that we are done rendering by calling the
     * renderComplete property.
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.props.renderComplete();
    }
    /**
     * Render the actual HTML.
     * Note: if only fontSize parameter has changed, this method will be called
     * and return the appropriate JSX, but React will detect, that only the
     * style argument has been updated, and thus only set this attribute to the DOM.
     */

  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "mkdVis",
        style: {
          fontSize: "".concat(this.props.fontSize, "pt")
        }
      }, _react.default.createElement(_public.Markdown, {
        "data-test-subj": "markdownBody",
        markdown: this.props.markdown,
        openLinksInNewTab: this.props.openLinksInNewTab
      }));
    }
  }]);

  return MarkdownVisComponent;
}(_react.default.Component);
/**
 * This is a wrapper component, that is actually used as the visualization.
 * The sole purpose of this component is to extract all required parameters from
 * the properties and pass them down as separate properties to the actual component.
 * That way the actual (MarkdownVisComponent) will properly trigger it's prop update
 * callback (componentWillReceiveProps) if one of these params change. It wouldn't
 * trigger otherwise (e.g. it doesn't for this wrapper), since it only triggers
 * if the reference to the prop changes (in this case the reference to vis).
 *
 * The way React works, this wrapper nearly brings no overhead, but allows us
 * to use proper lifecycle methods in the actual component.
 */


function MarkdownVisWrapper(props) {
  return _react.default.createElement(MarkdownVisComponent, {
    fontSize: props.visParams.fontSize,
    markdown: props.visParams.markdown,
    openLinksInNewTab: props.visParams.openLinksInNewTab,
    renderComplete: props.renderComplete
  });
}