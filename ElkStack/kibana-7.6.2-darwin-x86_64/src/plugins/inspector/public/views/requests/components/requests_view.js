"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestsViewComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _adapters = require("../../../adapters");

var _request_selector = require("./request_selector");

var _request_details = require("./request_details");

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

var RequestsViewComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(RequestsViewComponent, _Component);

  function RequestsViewComponent(props) {
    var _this;

    _classCallCheck(this, RequestsViewComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RequestsViewComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_onRequestsChange", function () {
      var requests = _this.props.adapters.requests.getRequests();

      var newState = {
        requests: requests
      };

      if (!requests.includes(_this.state.request)) {
        newState.request = requests.length ? requests[0] : null;
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "selectRequest", function (request) {
      if (request !== _this.state.request) {
        _this.setState({
          request: request
        });
      }
    });

    props.adapters.requests.on('change', _this._onRequestsChange);

    var _requests = props.adapters.requests.getRequests();

    _this.state = {
      requests: _requests,
      request: _requests.length ? _requests[0] : null
    };
    return _this;
  }

  _createClass(RequestsViewComponent, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.adapters.requests.removeListener('change', this._onRequestsChange);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.requests || !this.state.requests.length) {
        return RequestsViewComponent.renderEmptyRequests();
      }

      var failedCount = this.state.requests.filter(function (req) {
        return req.status === _adapters.RequestStatus.ERROR;
      }).length;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
        size: "xs"
      }, _react.default.createElement("p", {
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inspector.requests.requestWasMadeDescription",
        defaultMessage: "{requestsCount, plural, one {# request was} other {# requests were} } made{failedRequests}",
        values: {
          requestsCount: this.state.requests.length,
          failedRequests: failedCount > 0 ? _react.default.createElement(_eui.EuiTextColor, {
            color: "danger"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "inspector.requests.requestWasMadeDescription.requestHadFailureText",
            defaultMessage: ", {failedCount} had a failure",
            values: {
              failedCount: failedCount
            }
          })) : ''
        }
      }))), _react.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }), _react.default.createElement(_request_selector.RequestSelector, {
        requests: this.state.requests,
        selectedRequest: this.state.request,
        onRequestChanged: this.selectRequest
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }), this.state.request && this.state.request.description && _react.default.createElement(_eui.EuiText, {
        size: "xs"
      }, _react.default.createElement("p", null, this.state.request.description)), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), this.state.request && _react.default.createElement(_request_details.RequestDetails, {
        request: this.state.request
      }));
    }
  }], [{
    key: "renderEmptyRequests",
    value: function renderEmptyRequests() {
      return _react.default.createElement(_eui.EuiEmptyPrompt, {
        "data-test-subj": "inspectorNoRequestsMessage",
        title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.requests.noRequestsLoggedTitle",
          defaultMessage: "No requests logged"
        })),
        body: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.requests.noRequestsLoggedDescription.elementHasNotLoggedAnyRequestsText",
          defaultMessage: "The element hasn't logged any requests (yet)."
        })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.requests.noRequestsLoggedDescription.whatDoesItUsuallyMeanText",
          defaultMessage: "This usually means that there was no need to fetch any data or that the element has not yet started fetching data."
        })))
      });
    }
  }]);

  return RequestsViewComponent;
}(_react.Component);

exports.RequestsViewComponent = RequestsViewComponent;

_defineProperty(RequestsViewComponent, "propTypes", {
  adapters: _propTypes.default.object.isRequired,
  title: _propTypes.default.string.isRequired
});