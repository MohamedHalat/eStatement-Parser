"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _details = require("./details");

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

var DETAILS = [{
  name: 'Statistics',
  label: _i18n.i18n.translate('inspector.requests.statisticsTabLabel', {
    defaultMessage: 'Statistics'
  }),
  component: _details.RequestDetailsStats
}, {
  name: 'Request',
  label: _i18n.i18n.translate('inspector.requests.requestTabLabel', {
    defaultMessage: 'Request'
  }),
  component: _details.RequestDetailsRequest
}, {
  name: 'Response',
  label: _i18n.i18n.translate('inspector.requests.responseTabLabel', {
    defaultMessage: 'Response'
  }),
  component: _details.RequestDetailsResponse
}];

var RequestDetails =
/*#__PURE__*/
function (_Component) {
  _inherits(RequestDetails, _Component);

  function RequestDetails() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RequestDetails);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RequestDetails)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      availableDetails: [],
      selectedDetail: null
    });

    _defineProperty(_assertThisInitialized(_this), "selectDetailsTab", function (detail) {
      if (detail !== _this.state.selectedDetail) {
        _this.setState({
          selectedDetail: detail
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderDetailTab", function (detail) {
      return _react.default.createElement(_eui.EuiTab, {
        key: detail.name,
        isSelected: detail === _this.state.selectedDetail,
        onClick: function onClick() {
          return _this.selectDetailsTab(detail);
        },
        "data-test-subj": "inspectorRequestDetail".concat(detail.name)
      }, detail.label);
    });

    return _this;
  }

  _createClass(RequestDetails, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          selectedDetail = _this$state.selectedDetail,
          availableDetails = _this$state.availableDetails;
      var DetailComponent = RequestDetails.getSelectedDetailComponent(selectedDetail);

      if (!availableDetails.length || !DetailComponent) {
        return null;
      }

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTabs, {
        size: "s"
      }, this.state.availableDetails.map(this.renderDetailTab)), _react.default.createElement(DetailComponent, {
        request: this.props.request
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var selectedDetail = prevState && prevState.selectedDetail;
      var availableDetails = DETAILS.filter(function (detail) {
        return !detail.component.shouldShow || detail.component.shouldShow(nextProps.request);
      }); // If the previously selected detail is still available we want to stay
      // on this tab and not set another selectedDetail.

      if (selectedDetail && availableDetails.includes(selectedDetail)) {
        return {
          availableDetails: availableDetails
        };
      }

      return {
        availableDetails: availableDetails,
        selectedDetail: availableDetails[0]
      };
    }
  }, {
    key: "getSelectedDetailComponent",
    value: function getSelectedDetailComponent(detail) {
      return detail ? detail.component : null;
    }
  }]);

  return RequestDetails;
}(_react.Component);

exports.RequestDetails = RequestDetails;

_defineProperty(RequestDetails, "propTypes", {
  request: _propTypes.default.object.isRequired
});