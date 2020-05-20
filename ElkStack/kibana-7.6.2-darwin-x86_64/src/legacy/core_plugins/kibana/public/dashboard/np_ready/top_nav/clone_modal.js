"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardCloneModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

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

var DashboardCloneModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DashboardCloneModal, _React$Component);

  function DashboardCloneModal(props) {
    var _this;

    _classCallCheck(this, DashboardCloneModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardCloneModal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "onTitleDuplicate", function () {
      _this.setState({
        isTitleDuplicateConfirmed: true,
        hasTitleDuplicate: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "cloneDashboard", function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                isLoading: true
              });

              _context.next = 3;
              return regeneratorRuntime.awrap(_this.props.onClone(_this.state.newDashboardName, _this.state.isTitleDuplicateConfirmed, _this.onTitleDuplicate));

            case 3:
              if (_this.isMounted) {
                _this.setState({
                  isLoading: false
                });
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (event) {
      _this.setState({
        newDashboardName: event.target.value,
        isTitleDuplicateConfirmed: false,
        hasTitleDuplicate: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderDuplicateTitleCallout", function () {
      if (!_this.state.hasTitleDuplicate) {
        return;
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCallOut, {
        size: "s",
        title: _i18n.i18n.translate('kbn.dashboard.topNav.cloneModal.dashboardExistsTitle', {
          defaultMessage: 'A dashboard with the title {newDashboardName} already exists.',
          values: {
            newDashboardName: "'".concat(_this.state.newDashboardName, "'")
          }
        }),
        color: "warning",
        "data-test-subj": "titleDupicateWarnMsg"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.dashboard.topNav.cloneModal.dashboardExistsDescription",
        defaultMessage: "Click {confirmClone} to clone the dashboard with the duplicate title.",
        values: {
          confirmClone: _react.default.createElement("strong", null, _react.default.createElement(_react2.FormattedMessage, {
            id: "kbn.dashboard.topNav.cloneModal.confirmCloneDescription",
            defaultMessage: "Confirm Clone"
          }))
        }
      }))));
    });

    _this.state = {
      newDashboardName: props.title,
      isTitleDuplicateConfirmed: false,
      hasTitleDuplicate: false,
      isLoading: false
    };
    return _this;
  }

  _createClass(DashboardCloneModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
        "data-test-subj": "dashboardCloneModal",
        className: "dshCloneModal",
        onClose: this.props.onClose
      }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.dashboard.topNav.cloneModal.cloneDashboardModalHeaderTitle",
        defaultMessage: "Clone dashboard"
      }))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.dashboard.topNav.cloneModal.enterNewNameForDashboardDescription",
        defaultMessage: "Please enter a new name for your dashboard."
      }))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFieldText, {
        autoFocus: true,
        "data-test-subj": "clonedDashboardTitle",
        value: this.state.newDashboardName,
        onChange: this.onInputChange,
        isInvalid: this.state.hasTitleDuplicate
      }), this.renderDuplicateTitleCallout()), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
        "data-test-subj": "cloneCancelButton",
        onClick: this.props.onClose
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.dashboard.topNav.cloneModal.cancelButtonLabel",
        defaultMessage: "Cancel"
      })), _react.default.createElement(_eui.EuiButton, {
        fill: true,
        "data-test-subj": "cloneConfirmButton",
        onClick: this.cloneDashboard,
        isLoading: this.state.isLoading
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.dashboard.topNav.cloneModal.confirmButtonLabel",
        defaultMessage: "Confirm Clone"
      })))));
    }
  }]);

  return DashboardCloneModal;
}(_react.default.Component);

exports.DashboardCloneModal = DashboardCloneModal;