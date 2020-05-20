"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeControlEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _index_pattern_select_form_row = require("./index_pattern_select_form_row");

var _field_select = require("./field_select");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

function filterField(field) {
  return field.type === 'number';
}

var RangeControlEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(RangeControlEditor, _Component);

  function RangeControlEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RangeControlEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RangeControlEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      IndexPatternSelect: null
    });

    return _this;
  }

  _createClass(RangeControlEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getIndexPatternSelect();
    }
  }, {
    key: "getIndexPatternSelect",
    value: function getIndexPatternSelect() {
      var _ref, _ref2, data;

      return regeneratorRuntime.async(function getIndexPatternSelect$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.props.deps.core.getStartServices());

            case 2:
              _ref = _context.sent;
              _ref2 = _slicedToArray(_ref, 2);
              data = _ref2[1].data;
              this.setState({
                IndexPatternSelect: data.ui.IndexPatternSelect
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var stepSizeId = "stepSize-".concat(this.props.controlIndex);
      var decimalPlacesId = "decimalPlaces-".concat(this.props.controlIndex);

      if (this.state.IndexPatternSelect === null) {
        return null;
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_index_pattern_select_form_row.IndexPatternSelectFormRow, {
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
      }), _react.default.createElement(_eui.EuiFormRow, {
        id: stepSizeId,
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "inputControl.editor.rangeControl.stepSizeLabel",
          defaultMessage: "Step Size"
        })
      }, _react.default.createElement(_eui.EuiFieldNumber, {
        value: this.props.controlParams.options.step,
        onChange: function onChange(event) {
          _this2.props.handleNumberOptionChange(_this2.props.controlIndex, 'step', event);
        },
        "data-test-subj": "rangeControlSizeInput".concat(this.props.controlIndex)
      })), _react.default.createElement(_eui.EuiFormRow, {
        id: decimalPlacesId,
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "inputControl.editor.rangeControl.decimalPlacesLabel",
          defaultMessage: "Decimal Places"
        })
      }, _react.default.createElement(_eui.EuiFieldNumber, {
        min: 0,
        value: this.props.controlParams.options.decimalPlaces,
        onChange: function onChange(event) {
          _this2.props.handleNumberOptionChange(_this2.props.controlIndex, 'decimalPlaces', event);
        },
        "data-test-subj": "rangeControlDecimalPlacesInput".concat(this.props.controlIndex)
      })));
    }
  }]);

  return RangeControlEditor;
}(_react.Component);

exports.RangeControlEditor = RangeControlEditor;