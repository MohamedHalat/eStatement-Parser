"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListControlEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _index_pattern_select_form_row = require("./index_pattern_select_form_row");

var _field_select = require("./field_select");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function filterField(field) {
  return Boolean(field.aggregatable) && ['number', 'boolean', 'date', 'ip', 'string'].includes(field.type);
}

var ListControlEditor =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ListControlEditor, _PureComponent);

  function ListControlEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ListControlEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ListControlEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoadingFieldType: true,
      isStringField: false,
      prevFieldName: _this.props.controlParams.fieldName,
      IndexPatternSelect: null
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      if (_this.state.isLoadingFieldType) {
        _this.loadIsStringField();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "loadIsStringField", function _callee() {
      var indexPattern, field;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!_this.props.controlParams.indexPattern || !_this.props.controlParams.fieldName)) {
                _context.next = 3;
                break;
              }

              _this.setState({
                isLoadingFieldType: false
              });

              return _context.abrupt("return");

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return regeneratorRuntime.awrap(_this.props.getIndexPattern(_this.props.controlParams.indexPattern));

            case 6:
              indexPattern = _context.sent;
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return");

            case 12:
              if (_this.isMounted) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return");

            case 14:
              field = indexPattern.fields.find(function (_ref) {
                var name = _ref.name;
                return name === _this.props.controlParams.fieldName;
              });

              if (field) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return");

            case 17:
              _this.setState({
                isLoadingFieldType: false,
                isStringField: field.type === 'string'
              });

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[3, 9]]);
    });

    _defineProperty(_assertThisInitialized(_this), "renderOptions", function () {
      var _this$props$controlPa, _this$props$controlPa2;

      if (_this.state.isLoadingFieldType || !_this.props.controlParams.fieldName) {
        return;
      }

      var options = [];

      if (_this.props.parentCandidates && _this.props.parentCandidates.length > 0) {
        var parentCandidatesOptions = [{
          value: '',
          text: ''
        }].concat(_toConsumableArray(_this.props.parentCandidates));
        options.push(_react.default.createElement(_eui.EuiFormRow, {
          id: "parentSelect-".concat(_this.props.controlIndex),
          label: _react.default.createElement(_react2.FormattedMessage, {
            id: "inputControl.editor.listControl.parentLabel",
            defaultMessage: "Parent control"
          }),
          helpText: _react.default.createElement(_react2.FormattedMessage, {
            id: "inputControl.editor.listControl.parentDescription",
            defaultMessage: "Options are based on the value of parent control. Disabled if parent is not set."
          }),
          key: "parentSelect"
        }, _react.default.createElement(_eui.EuiSelect, {
          options: parentCandidatesOptions,
          value: _this.props.controlParams.parent,
          onChange: function onChange(event) {
            _this.props.handleParentChange(_this.props.controlIndex, event);
          }
        })));
      }

      options.push(_react.default.createElement(_eui.EuiFormRow, {
        id: "multiselect-".concat(_this.props.controlIndex),
        key: "multiselect",
        helpText: _react.default.createElement(_react2.FormattedMessage, {
          id: "inputControl.editor.listControl.multiselectDescription",
          defaultMessage: "Allow multiple selection"
        })
      }, _react.default.createElement(_eui.EuiSwitch, {
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "inputControl.editor.listControl.multiselectLabel",
          defaultMessage: "Multiselect"
        }),
        checked: (_this$props$controlPa = _this.props.controlParams.options.multiselect) !== null && _this$props$controlPa !== void 0 ? _this$props$controlPa : true,
        onChange: function onChange(event) {
          _this.props.handleCheckboxOptionChange(_this.props.controlIndex, 'multiselect', event);
        },
        "data-test-subj": "listControlMultiselectInput"
      })));
      var dynamicOptionsHelpText = _this.state.isStringField ? _react.default.createElement(_react2.FormattedMessage, {
        id: "inputControl.editor.listControl.dynamicOptions.updateDescription",
        defaultMessage: "Update options in response to user input"
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "inputControl.editor.listControl.dynamicOptions.stringFieldDescription",
        defaultMessage: "Only available for \"string\" fields"
      });
      options.push(_react.default.createElement(_eui.EuiFormRow, {
        id: "dynamicOptions-".concat(_this.props.controlIndex),
        key: "dynamicOptions",
        helpText: dynamicOptionsHelpText
      }, _react.default.createElement(_eui.EuiSwitch, {
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "inputControl.editor.listControl.dynamicOptionsLabel",
          defaultMessage: "Dynamic Options"
        }),
        checked: (_this$props$controlPa2 = _this.props.controlParams.options.dynamicOptions) !== null && _this$props$controlPa2 !== void 0 ? _this$props$controlPa2 : false,
        onChange: function onChange(event) {
          _this.props.handleCheckboxOptionChange(_this.props.controlIndex, 'dynamicOptions', event);
        },
        disabled: _this.state.isStringField ? false : true,
        "data-test-subj": "listControlDynamicOptionsSwitch"
      }))); // size is not used when dynamic options is set

      if (!_this.props.controlParams.options.dynamicOptions || !_this.state.isStringField) {
        options.push(_react.default.createElement(_eui.EuiFormRow, {
          id: "size-".concat(_this.props.controlIndex),
          label: _react.default.createElement(_react2.FormattedMessage, {
            id: "inputControl.editor.listControl.sizeLabel",
            defaultMessage: "Size"
          }),
          key: "size",
          helpText: _react.default.createElement(_react2.FormattedMessage, {
            id: "inputControl.editor.listControl.sizeDescription",
            defaultMessage: "Number of options"
          })
        }, _react.default.createElement(_eui.EuiFieldNumber, {
          min: 1,
          value: _this.props.controlParams.options.size,
          onChange: function onChange(event) {
            _this.props.handleNumberOptionChange(_this.props.controlIndex, 'size', event);
          },
          "data-test-subj": "listControlSizeInput"
        })));
      }

      return options;
    });

    return _this;
  }

  _createClass(ListControlEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMounted = true;
      this.loadIsStringField();
      this.getIndexPatternSelect();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMounted = false;
    }
  }, {
    key: "getIndexPatternSelect",
    value: function getIndexPatternSelect() {
      var _ref2, _ref3, data;

      return regeneratorRuntime.async(function getIndexPatternSelect$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.props.deps.core.getStartServices());

            case 2:
              _ref2 = _context2.sent;
              _ref3 = _slicedToArray(_ref2, 2);
              data = _ref3[1].data;
              this.setState({
                IndexPatternSelect: data.ui.IndexPatternSelect
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.IndexPatternSelect === null) {
        return null;
      }

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_index_pattern_select_form_row.IndexPatternSelectFormRow, {
        indexPatternId: this.props.controlParams.indexPattern,
        onChange: this.props.handleIndexPatternChange,
        controlIndex: this.props.controlIndex,
        IndexPatternSelect: this.state.IndexPatternSelect
      }), _react.default.createElement(_field_select.FieldSelect, {
        fieldName: this.props.controlParams.fieldName,
        indexPatternId: this.props.controlParams.indexPattern,
        filterField: filterField,
        onChange: this.props.handleFieldNameChange,
        getIndexPattern: this.props.getIndexPattern,
        controlIndex: this.props.controlIndex
      }), this.renderOptions());
    }
  }]);

  return ListControlEditor;
}(_react.PureComponent);

exports.ListControlEditor = ListControlEditor;

_defineProperty(ListControlEditor, "getDerivedStateFromProps", function (nextProps, prevState) {
  var isNewFieldName = prevState.prevFieldName !== nextProps.controlParams.fieldName;

  if (!prevState.isLoadingFieldType && isNewFieldName) {
    return {
      prevFieldName: nextProps.controlParams.fieldName,
      isLoadingFieldType: true
    };
  }

  return null;
});