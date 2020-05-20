"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getControlsTab = exports.ControlsTab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _control_editor = require("./control_editor");

var _editor_utils = require("../../editor_utils");

var _lineage = require("../../lineage");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ControlsTabUi =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ControlsTabUi, _PureComponent);

  function ControlsTabUi() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ControlsTabUi);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ControlsTabUi)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      type: _editor_utils.CONTROL_TYPES.LIST
    });

    _defineProperty(_assertThisInitialized(_this), "getIndexPattern", function _callee(indexPatternId) {
      var _ref, _ref2, startDeps;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_this.props.deps.core.getStartServices());

            case 2:
              _ref = _context.sent;
              _ref2 = _slicedToArray(_ref, 2);
              startDeps = _ref2[1];
              _context.next = 7;
              return regeneratorRuntime.awrap(startDeps.data.indexPatterns.get(indexPatternId));

            case 7:
              return _context.abrupt("return", _context.sent);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      return _this.props.setValue('controls', value);
    });

    _defineProperty(_assertThisInitialized(_this), "handleLabelChange", function (controlIndex, event) {
      var updatedControl = _this.props.stateParams.controls[controlIndex];
      updatedControl.label = event.target.value;

      _this.onChange((0, _editor_utils.setControl)(_this.props.stateParams.controls, controlIndex, updatedControl));
    });

    _defineProperty(_assertThisInitialized(_this), "handleIndexPatternChange", function (controlIndex, indexPatternId) {
      var updatedControl = _this.props.stateParams.controls[controlIndex];
      updatedControl.indexPattern = indexPatternId;
      updatedControl.fieldName = '';

      _this.onChange((0, _editor_utils.setControl)(_this.props.stateParams.controls, controlIndex, updatedControl));
    });

    _defineProperty(_assertThisInitialized(_this), "handleFieldNameChange", function (controlIndex, fieldName) {
      var updatedControl = _this.props.stateParams.controls[controlIndex];
      updatedControl.fieldName = fieldName;

      _this.onChange((0, _editor_utils.setControl)(_this.props.stateParams.controls, controlIndex, updatedControl));
    });

    _defineProperty(_assertThisInitialized(_this), "handleCheckboxOptionChange", function (controlIndex, optionName, event) {
      var updatedControl = _this.props.stateParams.controls[controlIndex]; // @ts-ignore

      updatedControl.options[optionName] = event.target.checked;

      _this.onChange((0, _editor_utils.setControl)(_this.props.stateParams.controls, controlIndex, updatedControl));
    });

    _defineProperty(_assertThisInitialized(_this), "handleNumberOptionChange", function (controlIndex, optionName, event) {
      var updatedControl = _this.props.stateParams.controls[controlIndex]; // @ts-ignore

      updatedControl.options[optionName] = parseFloat(event.target.value);

      _this.onChange((0, _editor_utils.setControl)(_this.props.stateParams.controls, controlIndex, updatedControl));
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemoveControl", function (controlIndex) {
      _this.onChange((0, _editor_utils.removeControl)(_this.props.stateParams.controls, controlIndex));
    });

    _defineProperty(_assertThisInitialized(_this), "moveControl", function (controlIndex, direction) {
      _this.onChange((0, _editor_utils.moveControl)(_this.props.stateParams.controls, controlIndex, direction));
    });

    _defineProperty(_assertThisInitialized(_this), "handleAddControl", function () {
      _this.onChange((0, _editor_utils.addControl)(_this.props.stateParams.controls, (0, _editor_utils.newControl)(_this.state.type)));
    });

    _defineProperty(_assertThisInitialized(_this), "handleParentChange", function (controlIndex, event) {
      var updatedControl = _this.props.stateParams.controls[controlIndex];
      updatedControl.parent = event.target.value;

      _this.onChange((0, _editor_utils.setControl)(_this.props.stateParams.controls, controlIndex, updatedControl));
    });

    return _this;
  }

  _createClass(ControlsTabUi, [{
    key: "renderControls",
    value: function renderControls() {
      var _this2 = this;

      var lineageMap = (0, _lineage.getLineageMap)(this.props.stateParams.controls);
      return this.props.stateParams.controls.map(function (controlParams, controlIndex) {
        var parentCandidates = (0, _lineage.getParentCandidates)(_this2.props.stateParams.controls, controlParams.id, lineageMap);
        return _react.default.createElement(_control_editor.ControlEditor, {
          key: controlParams.id,
          controlIndex: controlIndex,
          controlParams: controlParams,
          handleLabelChange: _this2.handleLabelChange,
          moveControl: _this2.moveControl,
          handleRemoveControl: _this2.handleRemoveControl,
          handleIndexPatternChange: _this2.handleIndexPatternChange,
          handleFieldNameChange: _this2.handleFieldNameChange,
          getIndexPattern: _this2.getIndexPattern,
          handleCheckboxOptionChange: _this2.handleCheckboxOptionChange,
          handleNumberOptionChange: _this2.handleNumberOptionChange,
          parentCandidates: parentCandidates,
          handleParentChange: _this2.handleParentChange,
          deps: _this2.props.deps
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var intl = this.props.intl;
      return _react.default.createElement("div", null, this.renderControls(), _react.default.createElement(_eui.EuiPanel, {
        grow: false
      }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
        id: "selectControlType"
      }, _react.default.createElement(_eui.EuiSelect, {
        "data-test-subj": "selectControlType",
        options: [{
          value: _editor_utils.CONTROL_TYPES.RANGE,
          text: intl.formatMessage({
            id: 'inputControl.editor.controlsTab.select.rangeDropDownOptionLabel',
            defaultMessage: 'Range slider'
          })
        }, {
          value: _editor_utils.CONTROL_TYPES.LIST,
          text: intl.formatMessage({
            id: 'inputControl.editor.controlsTab.select.listDropDownOptionLabel',
            defaultMessage: 'Options list'
          })
        }],
        value: this.state.type,
        onChange: function onChange(event) {
          return _this3.setState({
            type: event.target.value
          });
        },
        "aria-label": intl.formatMessage({
          id: 'inputControl.editor.controlsTab.select.controlTypeAriaLabel',
          defaultMessage: 'Select control type'
        })
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFormRow, {
        id: "addControl"
      }, _react.default.createElement(_eui.EuiButton, {
        fill: true,
        onClick: this.handleAddControl,
        iconType: "plusInCircle",
        "data-test-subj": "inputControlEditorAddBtn",
        "aria-label": intl.formatMessage({
          id: 'inputControl.editor.controlsTab.select.addControlAriaLabel',
          defaultMessage: 'Add control'
        })
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inputControl.editor.controlsTab.addButtonLabel",
        defaultMessage: "Add"
      })))))));
    }
  }]);

  return ControlsTabUi;
}(_react.PureComponent);

var ControlsTab = (0, _react2.injectI18n)(ControlsTabUi);
exports.ControlsTab = ControlsTab;

var getControlsTab = function getControlsTab(deps) {
  return function (props) {
    return _react.default.createElement(ControlsTab, _extends({}, props, {
      deps: deps
    }));
  };
};

exports.getControlsTab = getControlsTab;