"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _adapters = require("../../../adapters");

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

var RequestSelector =
/*#__PURE__*/
function (_Component) {
  _inherits(RequestSelector, _Component);

  function RequestSelector() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RequestSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RequestSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPopoverOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "togglePopover", function () {
      _this.setState(function (prevState) {
        return {
          isPopoverOpen: !prevState.isPopoverOpen
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderRequestDropdownItem", function (request, index) {
      var hasFailed = request.status === _adapters.RequestStatus.ERROR;
      var inProgress = request.status === _adapters.RequestStatus.PENDING;
      return _react.default.createElement(_eui.EuiContextMenuItem, {
        key: index,
        icon: request === _this.props.selectedRequest ? 'check' : 'empty',
        onClick: function onClick() {
          _this.props.onRequestChanged(request);

          _this.closePopover();
        },
        toolTipContent: request.description,
        toolTipPosition: "left",
        "data-test-subj": "inspectorRequestChooser".concat(request.name)
      }, _react.default.createElement(_eui.EuiTextColor, {
        color: hasFailed ? 'danger' : 'default'
      }, request.name, hasFailed && _react.default.createElement(_react2.FormattedMessage, {
        id: "inspector.requests.failedLabel",
        defaultMessage: " (failed)"
      }), inProgress && _react.default.createElement(_eui.EuiLoadingSpinner, {
        size: "s",
        "aria-label": _i18n.i18n.translate('inspector.requests.requestInProgressAriaLabel', {
          defaultMessage: 'Request in progress'
        }),
        className: "insRequestSelector__menuSpinner"
      })));
    });

    return _this;
  }

  _createClass(RequestSelector, [{
    key: "renderRequestDropdown",
    value: function renderRequestDropdown() {
      var button = _react.default.createElement(_eui.EuiButtonEmpty, {
        iconType: "arrowDown",
        iconSide: "right",
        size: "s",
        onClick: this.togglePopover,
        "data-test-subj": "inspectorRequestChooser"
      }, this.props.selectedRequest.name);

      return _react.default.createElement(_eui.EuiPopover, {
        id: "inspectorRequestChooser",
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        panelPaddingSize: "none",
        anchorPosition: "downLeft",
        repositionOnScroll: true
      }, _react.default.createElement(_eui.EuiContextMenuPanel, {
        items: this.props.requests.map(this.renderRequestDropdownItem),
        "data-test-subj": "inspectorRequestChooserMenuPanel"
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          selectedRequest = _this$props.selectedRequest,
          requests = _this$props.requests;
      return _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "xs"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement("strong", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "inspector.requests.requestLabel",
        defaultMessage: "Request:"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }, requests.length <= 1 && _react.default.createElement("div", {
        className: "insRequestSelector__singleRequest",
        "data-test-subj": "inspectorRequestName"
      }, selectedRequest.name), requests.length > 1 && this.renderRequestDropdown()), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, selectedRequest.status !== _adapters.RequestStatus.PENDING && _react.default.createElement(_eui.EuiToolTip, {
        position: "left",
        title: selectedRequest.status === _adapters.RequestStatus.OK ? _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.requests.requestSucceededTooltipTitle",
          defaultMessage: "Request succeeded"
        }) : _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.requests.requestFailedTooltipTitle",
          defaultMessage: "Request failed"
        }),
        content: _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.requests.requestTooltipDescription",
          defaultMessage: "The total time the request took."
        })
      }, _react.default.createElement(_eui.EuiBadge, {
        color: selectedRequest.status === _adapters.RequestStatus.OK ? 'secondary' : 'danger',
        iconType: selectedRequest.status === _adapters.RequestStatus.OK ? 'check' : 'cross'
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inspector.requests.requestTimeLabel",
        defaultMessage: "{requestTime}ms",
        values: {
          requestTime: selectedRequest.time
        }
      }))), selectedRequest.status === _adapters.RequestStatus.PENDING && _react.default.createElement(_eui.EuiLoadingSpinner, {
        size: "m",
        "aria-label": _i18n.i18n.translate('inspector.requests.requestInProgressAriaLabel', {
          defaultMessage: 'Request in progress'
        })
      })));
    }
  }]);

  return RequestSelector;
}(_react.Component);

exports.RequestSelector = RequestSelector;

_defineProperty(RequestSelector, "propTypes", {
  requests: _propTypes.default.array.isRequired,
  selectedRequest: _propTypes.default.object.isRequired,
  onRequestChanged: _propTypes.default.func
});