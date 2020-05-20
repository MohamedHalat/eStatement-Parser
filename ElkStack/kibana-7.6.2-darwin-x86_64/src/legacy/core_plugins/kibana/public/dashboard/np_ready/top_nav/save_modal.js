"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardSaveModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _legacy_imports = require("../../legacy_imports");

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

var DashboardSaveModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DashboardSaveModal, _React$Component);

  function DashboardSaveModal(props) {
    var _this;

    _classCallCheck(this, DashboardSaveModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardSaveModal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      description: _this.props.description,
      timeRestore: _this.props.timeRestore
    });

    _defineProperty(_assertThisInitialized(_this), "saveDashboard", function (_ref) {
      var newTitle = _ref.newTitle,
          newCopyOnSave = _ref.newCopyOnSave,
          isTitleDuplicateConfirmed = _ref.isTitleDuplicateConfirmed,
          onTitleDuplicate = _ref.onTitleDuplicate;

      _this.props.onSave({
        newTitle: newTitle,
        newDescription: _this.state.description,
        newCopyOnSave: newCopyOnSave,
        newTimeRestore: _this.state.timeRestore,
        isTitleDuplicateConfirmed: isTitleDuplicateConfirmed,
        onTitleDuplicate: onTitleDuplicate
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDescriptionChange", function (event) {
      _this.setState({
        description: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTimeRestoreChange", function (event) {
      _this.setState({
        timeRestore: event.target.checked
      });
    });

    return _this;
  }

  _createClass(DashboardSaveModal, [{
    key: "renderDashboardSaveOptions",
    value: function renderDashboardSaveOptions() {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.dashboard.topNav.saveModal.descriptionFormRowLabel",
          defaultMessage: "Description"
        })
      }, _react.default.createElement(_eui.EuiTextArea, {
        "data-test-subj": "dashboardDescription",
        value: this.state.description,
        onChange: this.onDescriptionChange
      })), _react.default.createElement(_eui.EuiFormRow, {
        helpText: _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.dashboard.topNav.saveModal.storeTimeWithDashboardFormRowHelpText",
          defaultMessage: "This changes the time filter to the currently selected time each time this dashboard is loaded."
        })
      }, _react.default.createElement(_eui.EuiSwitch, {
        "data-test-subj": "storeTimeWithDashboard",
        checked: this.state.timeRestore,
        onChange: this.onTimeRestoreChange,
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.dashboard.topNav.saveModal.storeTimeWithDashboardFormRowLabel",
          defaultMessage: "Store time with dashboard"
        })
      })));
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_legacy_imports.SavedObjectSaveModal, {
        onSave: this.saveDashboard,
        onClose: this.props.onClose,
        title: this.props.title,
        showCopyOnSave: this.props.showCopyOnSave,
        objectType: "dashboard",
        options: this.renderDashboardSaveOptions()
      });
    }
  }]);

  return DashboardSaveModal;
}(_react.default.Component);

exports.DashboardSaveModal = DashboardSaveModal;