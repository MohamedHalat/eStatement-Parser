"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListControl = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _form_row = require("./form_row");

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

var ListControlUi =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ListControlUi, _PureComponent);

  function ListControlUi() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ListControlUi);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ListControlUi)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.isMounted = true;
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      _this.isMounted = false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnChange", function (selectedOptions) {
      var selectedValues = selectedOptions.map(function (_ref) {
        var value = _ref.value;
        return value;
      });

      _this.props.stageFilter(_this.props.controlIndex, selectedValues);
    });

    _defineProperty(_assertThisInitialized(_this), "debouncedFetch", _lodash.default.debounce(function _callee(searchValue) {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.props.fetchOptions) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(_this.props.fetchOptions(searchValue));

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
    }, 300));

    _defineProperty(_assertThisInitialized(_this), "onSearchChange", function (searchValue) {
      _this.setState({
        isLoading: true
      }, _this.debouncedFetch.bind(null, searchValue));
    });

    return _this;
  }

  _createClass(ListControlUi, [{
    key: "renderControl",
    value: function renderControl() {
      var _this$props$options,
          _this2 = this;

      var intl = this.props.intl;

      if (this.props.disableMsg) {
        return _react.default.createElement(_eui.EuiFieldText, {
          placeholder: intl.formatMessage({
            id: 'inputControl.vis.listControl.selectTextPlaceholder',
            defaultMessage: 'Select...'
          }),
          disabled: true
        });
      }

      var options = (_this$props$options = this.props.options) === null || _this$props$options === void 0 ? void 0 : _this$props$options.map(function (option) {
        return _defineProperty({
          label: _this2.props.formatOptionLabel(option).toString(),
          value: option
        }, 'data-test-subj', "option_".concat(option.toString().replace(' ', '_')));
      }).sort(function (a, b) {
        return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
      });
      var selectedOptions = this.props.selectedOptions.map(function (selectedOption) {
        return {
          label: _this2.props.formatOptionLabel(selectedOption).toString(),
          value: selectedOption
        };
      });
      return _react.default.createElement(_eui.EuiComboBox, {
        placeholder: intl.formatMessage({
          id: 'inputControl.vis.listControl.selectPlaceholder',
          defaultMessage: 'Select...'
        }),
        options: options,
        isLoading: this.state.isLoading,
        async: this.props.dynamicOptions,
        onSearchChange: this.props.dynamicOptions ? this.onSearchChange : undefined,
        selectedOptions: selectedOptions,
        onChange: this.handleOnChange,
        singleSelection: !this.props.multiselect,
        "data-test-subj": "listControlSelect".concat(this.props.controlIndex)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var partialResultsWarningMessage = _i18n.i18n.translate('inputControl.vis.listControl.partialResultsWarningMessage', {
        defaultMessage: 'Terms list might be incomplete because the request is taking too long. ' + 'Adjust the autocomplete settings in kibana.yml for complete results.'
      });

      return _react.default.createElement(_form_row.FormRow, {
        id: this.props.id,
        label: this.props.label,
        warningMsg: this.props.partialResults ? partialResultsWarningMessage : undefined,
        controlIndex: this.props.controlIndex,
        disableMsg: this.props.disableMsg
      }, this.renderControl());
    }
  }]);

  return ListControlUi;
}(_react.PureComponent);

_defineProperty(ListControlUi, "defaultProps", {
  dynamicOptions: false,
  multiselect: true,
  selectedOptions: [],
  options: []
});

var ListControl = (0, _react2.injectI18n)(ListControlUi);
exports.ListControl = ListControl;