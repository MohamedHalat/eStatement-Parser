"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderFunctionsRegistry = void 0;

var _registry = require("./registry");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpressionRenderFunction =
/**
 * This must match the name of the function that is used to create the `type: render` object.
 */

/**
 * Use this to set a more friendly name.
 */

/**
 * A sentence or few about what this element does.
 */

/**
 * Used to validate the data before calling the render function.
 */

/**
 * Tell the renderer if the dom node should be reused, it's recreated each time by default.
 */

/**
 * The function called to render the data.
 */
function ExpressionRenderFunction(config) {
  _classCallCheck(this, ExpressionRenderFunction);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "displayName", void 0);

  _defineProperty(this, "help", void 0);

  _defineProperty(this, "validate", void 0);

  _defineProperty(this, "reuseDomNode", void 0);

  _defineProperty(this, "render", void 0);

  var name = config.name,
      displayName = config.displayName,
      help = config.help,
      validate = config.validate,
      reuseDomNode = config.reuseDomNode,
      render = config.render;
  this.name = name;
  this.displayName = displayName || name;
  this.help = help || '';

  this.validate = validate || function () {};

  this.reuseDomNode = Boolean(reuseDomNode);
  this.render = render;
};

var RenderFunctionsRegistry =
/*#__PURE__*/
function (_Registry) {
  _inherits(RenderFunctionsRegistry, _Registry);

  function RenderFunctionsRegistry() {
    _classCallCheck(this, RenderFunctionsRegistry);

    return _possibleConstructorReturn(this, _getPrototypeOf(RenderFunctionsRegistry).apply(this, arguments));
  }

  _createClass(RenderFunctionsRegistry, [{
    key: "register",
    value: function register(definition) {
      var renderFunction = new ExpressionRenderFunction(_typeof(definition) === 'object' ? definition : definition());
      this.set(renderFunction.name, renderFunction);
    }
  }]);

  return RenderFunctionsRegistry;
}(_registry.Registry);

exports.RenderFunctionsRegistry = RenderFunctionsRegistry;