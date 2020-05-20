"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldSelect = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var FieldSelectUi =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldSelectUi, _Component);

  function FieldSelectUi(props) {
    var _this;

    _classCallCheck(this, FieldSelectUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FieldSelectUi).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "hasUnmounted", void 0);

    _defineProperty(_assertThisInitialized(_this), "loadFields", function (indexPatternId) {
      _this.setState({
        isLoading: true,
        fields: [],
        indexPatternId: indexPatternId
      }, _this.debouncedLoad.bind(null, indexPatternId));
    });

    _defineProperty(_assertThisInitialized(_this), "debouncedLoad", _lodash.default.debounce(function _callee(indexPatternId) {
      var _this$props$filterFie;

      var indexPattern, fieldsByTypeMap, fields;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!indexPatternId || indexPatternId.length === 0)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(_this.props.getIndexPattern(indexPatternId));

            case 5:
              indexPattern = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return");

            case 11:
              if (!_this.hasUnmounted) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return");

            case 13:
              if (!(indexPattern.id !== _this.state.indexPatternId)) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return");

            case 15:
              fieldsByTypeMap = new Map();
              fields = [];
              indexPattern.fields.filter((_this$props$filterFie = _this.props.filterField) !== null && _this$props$filterFie !== void 0 ? _this$props$filterFie : function () {
                return true;
              }).forEach(function (field) {
                var _fieldsByTypeMap$get;

                var fieldsList = (_fieldsByTypeMap$get = fieldsByTypeMap.get(field.type)) !== null && _fieldsByTypeMap$get !== void 0 ? _fieldsByTypeMap$get : [];
                fieldsList.push(field.name);
                fieldsByTypeMap.set(field.type, fieldsList);
              });
              fieldsByTypeMap.forEach(function (fieldsList, fieldType) {
                fields.push({
                  label: fieldType,
                  options: fieldsList.sort().map(function (fieldName) {
                    return {
                      value: fieldName,
                      label: fieldName
                    };
                  })
                });
              });
              fields.sort(function (a, b) {
                if (a.label < b.label) return -1;
                if (a.label > b.label) return 1;
                return 0;
              });

              _this.setState({
                isLoading: false,
                fields: fields
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[2, 8]]);
    }, 300));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (selectedOptions) {
      _this.props.onChange(_lodash.default.get(selectedOptions, '0.value'));
    });

    _this.hasUnmounted = false;
    _this.state = {
      isLoading: false,
      fields: [],
      indexPatternId: props.indexPatternId
    };
    return _this;
  }

  _createClass(FieldSelectUi, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.hasUnmounted = true;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadFields(this.state.indexPatternId);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.indexPatternId !== nextProps.indexPatternId) {
        var _nextProps$indexPatte;

        this.loadFields((_nextProps$indexPatte = nextProps.indexPatternId) !== null && _nextProps$indexPatte !== void 0 ? _nextProps$indexPatte : '');
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.indexPatternId || this.props.indexPatternId.trim().length === 0) {
        return null;
      }

      var selectId = "fieldSelect-".concat(this.props.controlIndex);
      var selectedOptions = [];
      var intl = this.props.intl;

      if (this.props.fieldName) {
        selectedOptions.push({
          value: this.props.fieldName,
          label: this.props.fieldName
        });
      }

      return _react.default.createElement(_eui.EuiFormRow, {
        id: selectId,
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "inputControl.editor.fieldSelect.fieldLabel",
          defaultMessage: "Field"
        })
      }, _react.default.createElement(_eui.EuiComboBox, {
        placeholder: intl.formatMessage({
          id: 'inputControl.editor.fieldSelect.selectFieldPlaceholder',
          defaultMessage: 'Select field...'
        }),
        singleSelection: true,
        isLoading: this.state.isLoading,
        options: this.state.fields,
        selectedOptions: selectedOptions,
        onChange: this.onChange,
        "data-test-subj": selectId
      }));
    }
  }]);

  return FieldSelectUi;
}(_react.Component);

var FieldSelect = (0, _react2.injectI18n)(FieldSelectUi);
exports.FieldSelect = FieldSelect;