"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InspectorViewChooser = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var InspectorViewChooser =
/*#__PURE__*/
function (_Component) {
  _inherits(InspectorViewChooser, _Component);

  function InspectorViewChooser() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InspectorViewChooser);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InspectorViewChooser)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isSelectorOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "toggleSelector", function () {
      _this.setState(function (prev) {
        return {
          isSelectorOpen: !prev.isSelectorOpen
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeSelector", function () {
      _this.setState({
        isSelectorOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderView", function (view, index) {
      return _react2.default.createElement(_eui.EuiContextMenuItem, {
        key: index,
        onClick: function onClick() {
          _this.props.onViewSelected(view);

          _this.closeSelector();
        },
        toolTipContent: view.help,
        toolTipPosition: "left",
        "data-test-subj": "inspectorViewChooser".concat(view.title)
      }, view.title);
    });

    return _this;
  }

  _createClass(InspectorViewChooser, [{
    key: "renderViewButton",
    value: function renderViewButton() {
      return _react2.default.createElement(_eui.EuiButtonEmpty, {
        size: "s",
        iconType: "arrowDown",
        iconSide: "right",
        onClick: this.toggleSelector,
        "data-test-subj": "inspectorViewChooser"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "inspector.view",
        defaultMessage: "View: {viewName}",
        values: {
          viewName: this.props.selectedView.title
        }
      }));
    }
  }, {
    key: "renderSingleView",
    value: function renderSingleView() {
      return _react2.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: this.props.selectedView.help
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "inspector.view",
        defaultMessage: "View: {viewName}",
        values: {
          viewName: this.props.selectedView.title
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var views = this.props.views;

      if (views.length < 2) {
        return this.renderSingleView();
      }

      var triggerButton = this.renderViewButton();
      return _react2.default.createElement(_eui.EuiPopover, {
        id: "inspectorViewChooser",
        ownFocus: true,
        button: triggerButton,
        isOpen: this.state.isSelectorOpen,
        closePopover: this.closeSelector,
        panelPaddingSize: "none",
        anchorPosition: "downRight",
        repositionOnScroll: true
      }, _react2.default.createElement(_eui.EuiContextMenuPanel, {
        items: views.map(this.renderView)
      }));
    }
  }]);

  return InspectorViewChooser;
}(_react2.Component);

exports.InspectorViewChooser = InspectorViewChooser;

_defineProperty(InspectorViewChooser, "propTypes", {
  views: _propTypes.default.array.isRequired,
  onViewSelected: _propTypes.default.func.isRequired,
  selectedView: _propTypes.default.object.isRequired
});