"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelloWorldContainerComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _ = require("../..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var HelloWorldContainerComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(HelloWorldContainerComponent, _Component);

  function HelloWorldContainerComponent(props) {
    var _this;

    _classCallCheck(this, HelloWorldContainerComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HelloWorldContainerComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "roots", {});

    _defineProperty(_assertThisInitialized(_this), "mounted", false);

    _defineProperty(_assertThisInitialized(_this), "inputSubscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "outputSubscription", void 0);

    Object.values(_this.props.container.getInput().panels).forEach(function (panelState) {
      _this.roots[panelState.explicitInput.id] = _react.default.createRef();
    });
    _this.state = {
      loaded: _this.props.container.getOutput().embeddableLoaded,
      panels: _this.props.container.getInput().panels
    };
    return _this;
  }

  _createClass(HelloWorldContainerComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      return regeneratorRuntime.async(function componentDidMount$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.mounted = true;
              this.inputSubscription = this.props.container.getInput$().subscribe(function () {
                if (_this2.mounted) {
                  _this2.setState({
                    panels: _this2.props.container.getInput().panels
                  });
                }
              });
              this.outputSubscription = this.props.container.getOutput$().subscribe(function () {
                if (_this2.mounted) {
                  _this2.setState({
                    loaded: _this2.props.container.getOutput().embeddableLoaded
                  });
                }
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      this.props.container.destroy();

      if (this.inputSubscription) {
        this.inputSubscription.unsubscribe();
      }

      if (this.outputSubscription) {
        this.outputSubscription.unsubscribe();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("h2", null, "HELLO WORLD! These are my precious embeddable children:"), _react.default.createElement(_eui.EuiSpacer, {
        size: "l"
      }), _react.default.createElement(_eui.EuiFlexGroup, null, this.renderList()));
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this3 = this;

      var list = Object.values(this.state.panels).map(function (panelState) {
        var item = _react.default.createElement(_eui.EuiFlexItem, {
          key: panelState.explicitInput.id
        }, _react.default.createElement(_.EmbeddableChildPanel, {
          container: _this3.props.container,
          embeddableId: panelState.explicitInput.id,
          getActions: _this3.props.getActions,
          getEmbeddableFactory: _this3.props.getEmbeddableFactory,
          getAllEmbeddableFactories: _this3.props.getAllEmbeddableFactories,
          overlays: _this3.props.overlays,
          notifications: _this3.props.notifications,
          inspector: _this3.props.inspector,
          SavedObjectFinder: _this3.props.SavedObjectFinder
        }));

        return item;
      });
      return list;
    }
  }]);

  return HelloWorldContainerComponent;
}(_react.Component);

exports.HelloWorldContainerComponent = HelloWorldContainerComponent;