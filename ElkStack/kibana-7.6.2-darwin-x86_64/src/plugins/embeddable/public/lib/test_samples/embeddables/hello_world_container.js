"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelloWorldContainer = exports.HELLO_WORLD_CONTAINER = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@kbn/i18n/react");

var _ = require("../..");

var _hello_world_container_component = require("./hello_world_container_component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HELLO_WORLD_CONTAINER = 'HELLO_WORLD_CONTAINER';
/**
 * interfaces are not allowed to specify a sub-set of the required types until
 * https://github.com/microsoft/TypeScript/issues/15300 is fixed so we use a type
 * here instead
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions

exports.HELLO_WORLD_CONTAINER = HELLO_WORLD_CONTAINER;

var HelloWorldContainer =
/*#__PURE__*/
function (_Container) {
  _inherits(HelloWorldContainer, _Container);

  function HelloWorldContainer(input, options) {
    var _this;

    _classCallCheck(this, HelloWorldContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HelloWorldContainer).call(this, input, {
      embeddableLoaded: {}
    }, options.getEmbeddableFactory));
    _this.options = options;

    _defineProperty(_assertThisInitialized(_this), "type", HELLO_WORLD_CONTAINER);

    return _this;
  }

  _createClass(HelloWorldContainer, [{
    key: "getInheritedInput",
    value: function getInheritedInput(id) {
      return {
        id: id,
        viewMode: this.input.viewMode || _.ViewMode.EDIT,
        lastName: this.input.lastName || 'foo'
      };
    }
  }, {
    key: "render",
    value: function render(node) {
      _reactDom.default.render(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_hello_world_container_component.HelloWorldContainerComponent, {
        container: this,
        getActions: this.options.getActions,
        getAllEmbeddableFactories: this.options.getAllEmbeddableFactories,
        getEmbeddableFactory: this.options.getEmbeddableFactory,
        overlays: this.options.overlays,
        notifications: this.options.notifications,
        inspector: this.options.inspector,
        SavedObjectFinder: this.options.SavedObjectFinder
      })), node);
    }
  }]);

  return HelloWorldContainer;
}(_.Container);

exports.HelloWorldContainer = HelloWorldContainer;