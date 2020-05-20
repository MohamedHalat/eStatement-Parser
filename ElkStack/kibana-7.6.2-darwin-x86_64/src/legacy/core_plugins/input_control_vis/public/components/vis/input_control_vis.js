"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputControlVis = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _editor_utils = require("../../editor_utils");

var _list_control = require("../vis/list_control");

var _range_control = require("../vis/range_control");

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

function isListControl(control) {
  return control.type === _editor_utils.CONTROL_TYPES.LIST;
}

function isRangeControl(control) {
  return control.type === _editor_utils.CONTROL_TYPES.RANGE;
}

var InputControlVis =
/*#__PURE__*/
function (_Component) {
  _inherits(InputControlVis, _Component);

  function InputControlVis(props) {
    var _this;

    _classCallCheck(this, InputControlVis);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputControlVis).call(this, props));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleReset = _this.handleReset.bind(_assertThisInitialized(_this));
    _this.handleClearAll = _this.handleClearAll.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InputControlVis, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      this.props.submitFilters();
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      this.props.resetControls();
    }
  }, {
    key: "handleClearAll",
    value: function handleClearAll() {
      this.props.clearControls();
    }
  }, {
    key: "renderControls",
    value: function renderControls() {
      var _this2 = this;

      return this.props.controls.map(function (control, index) {
        var controlComponent = null;

        if (isListControl(control)) {
          controlComponent = _react.default.createElement(_list_control.ListControl, {
            id: control.id,
            label: control.label,
            options: control.selectOptions,
            selectedOptions: control.value,
            formatOptionLabel: control.format,
            disableMsg: control.isEnabled() ? undefined : control.disabledReason,
            multiselect: control.options.multiselect,
            partialResults: control.partialResults,
            dynamicOptions: control.options.dynamicOptions,
            controlIndex: index,
            stageFilter: _this2.props.stageFilter,
            fetchOptions: function fetchOptions(query) {
              _this2.props.refreshControl(index, query);
            }
          });
        } else if (isRangeControl(control)) {
          controlComponent = _react.default.createElement(_range_control.RangeControl, {
            control: control,
            controlIndex: index,
            stageFilter: _this2.props.stageFilter
          });
        } else {
          throw new Error("Unhandled control type ".concat(control.type));
        }

        return _react.default.createElement(_eui.EuiFlexItem, {
          key: control.id,
          style: {
            minWidth: '250px'
          },
          "data-test-subj": "inputControlItem"
        }, controlComponent);
      });
    }
  }, {
    key: "renderStagingButtons",
    value: function renderStagingButtons() {
      return _react.default.createElement(_eui.EuiFlexGroup, {
        wrap: true
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        fill: true,
        onClick: this.handleSubmit,
        disabled: !this.props.hasChanges(),
        "data-test-subj": "inputControlSubmitBtn"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inputControl.vis.inputControlVis.applyChangesButtonLabel",
        defaultMessage: "Apply changes"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: this.handleReset,
        disabled: !this.props.hasChanges(),
        "data-test-subj": "inputControlCancelBtn"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inputControl.vis.inputControlVis.cancelChangesButtonLabel",
        defaultMessage: "Cancel changes"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: this.handleClearAll,
        disabled: !this.props.hasValues(),
        "data-test-subj": "inputControlClearBtn"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inputControl.vis.inputControlVis.clearFormButtonLabel",
        defaultMessage: "Clear form"
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var stagingButtons;

      if (this.props.controls.length > 0 && !this.props.updateFiltersOnChange) {
        stagingButtons = this.renderStagingButtons();
      }

      return _react.default.createElement("div", {
        className: "icvContainer"
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        wrap: true
      }, this.renderControls()), stagingButtons);
    }
  }]);

  return InputControlVis;
}(_react.Component);

exports.InputControlVis = InputControlVis;