"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIndexPatternSelect = createIndexPatternSelect;
exports.IndexPatternSelect = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _lib = require("../../index_patterns/lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getIndexPatterns = function getIndexPatterns(client, search, fields) {
  var resp;
  return regeneratorRuntime.async(function getIndexPatterns$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.find({
            type: 'index-pattern',
            fields: fields,
            search: "".concat(search, "*"),
            searchFields: ['title'],
            perPage: 100
          }));

        case 2:
          resp = _context.sent;
          return _context.abrupt("return", resp.savedObjects);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Takes in stateful runtime dependencies and pre-wires them to the component


function createIndexPatternSelect(savedObjectsClient) {
  return function (props) {
    return _react.default.createElement(IndexPatternSelect, _extends({}, props, {
      savedObjectsClient: savedObjectsClient
    }));
  };
}

var IndexPatternSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(IndexPatternSelect, _Component);

  function IndexPatternSelect(props) {
    var _this;

    _classCallCheck(this, IndexPatternSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndexPatternSelect).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "fetchSelectedIndexPattern", function _callee(indexPatternId) {
      var indexPatternTitle;
      return regeneratorRuntime.async(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (indexPatternId) {
                _context2.next = 3;
                break;
              }

              _this.setState({
                selectedIndexPattern: undefined
              });

              return _context2.abrupt("return");

            case 3:
              _context2.prev = 3;
              _context2.next = 6;
              return regeneratorRuntime.awrap((0, _lib.getTitle)(_this.props.savedObjectsClient, indexPatternId));

            case 6:
              indexPatternTitle = _context2.sent;
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return");

            case 12:
              if (_this.isMounted) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return");

            case 14:
              _this.setState({
                selectedIndexPattern: {
                  value: indexPatternId,
                  label: indexPatternTitle
                }
              });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[3, 9]]);
    });

    _defineProperty(_assertThisInitialized(_this), "debouncedFetch", _lodash.default.debounce(function _callee2(searchValue) {
      var _this$props, fieldTypes, onNoIndexPatterns, savedObjectsClient, savedObjectFields, savedObjects, options;

      return regeneratorRuntime.async(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$props = _this.props, fieldTypes = _this$props.fieldTypes, onNoIndexPatterns = _this$props.onNoIndexPatterns, savedObjectsClient = _this$props.savedObjectsClient;
              savedObjectFields = ['title'];

              if (fieldTypes) {
                savedObjectFields.push('fields');
              }

              _context3.next = 5;
              return regeneratorRuntime.awrap(getIndexPatterns(savedObjectsClient, searchValue, savedObjectFields));

            case 5:
              savedObjects = _context3.sent;

              if (fieldTypes) {
                savedObjects = savedObjects.filter(function (savedObject) {
                  try {
                    var indexPatternFields = JSON.parse(savedObject.attributes.fields);
                    return indexPatternFields.some(function (field) {
                      return fieldTypes === null || fieldTypes === void 0 ? void 0 : fieldTypes.includes(field.type);
                    });
                  } catch (err) {
                    // Unable to parse fields JSON, invalid index pattern
                    return false;
                  }
                });
              }

              if (_this.isMounted) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return");

            case 9:
              // We need this check to handle the case where search results come back in a different
              // order than they were sent out. Only load results for the most recent search.
              if (searchValue === _this.state.searchValue) {
                options = savedObjects.map(function (indexPatternSavedObject) {
                  return {
                    label: indexPatternSavedObject.attributes.title,
                    value: indexPatternSavedObject.id
                  };
                });

                _this.setState({
                  isLoading: false,
                  options: options
                });

                if (onNoIndexPatterns && searchValue === '' && options.length === 0) {
                  onNoIndexPatterns();
                }
              }

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      });
    }, 300));

    _defineProperty(_assertThisInitialized(_this), "fetchOptions", function () {
      var searchValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      _this.setState({
        isLoading: true,
        searchValue: searchValue
      }, _this.debouncedFetch.bind(null, searchValue));
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (selectedOptions) {
      _this.props.onChange(_lodash.default.get(selectedOptions, '0.value'));
    });

    _this.state = {
      isLoading: false,
      options: [],
      selectedIndexPattern: undefined,
      searchValue: undefined
    };
    return _this;
  }

  _createClass(IndexPatternSelect, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMounted = false;
      this.debouncedFetch.cancel();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMounted = true;
      this.fetchOptions();
      this.fetchSelectedIndexPattern(this.props.indexPatternId);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.indexPatternId !== this.props.indexPatternId) {
        this.fetchSelectedIndexPattern(nextProps.indexPatternId);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          fieldTypes = _this$props2.fieldTypes,
          onChange = _this$props2.onChange,
          indexPatternId = _this$props2.indexPatternId,
          placeholder = _this$props2.placeholder,
          onNoIndexPatterns = _this$props2.onNoIndexPatterns,
          savedObjectsClient = _this$props2.savedObjectsClient,
          rest = _objectWithoutProperties(_this$props2, ["fieldTypes", "onChange", "indexPatternId", "placeholder", "onNoIndexPatterns", "savedObjectsClient"]);

      return _react.default.createElement(_eui.EuiComboBox, _extends({}, rest, {
        placeholder: placeholder,
        singleSelection: true,
        isLoading: this.state.isLoading,
        onSearchChange: this.fetchOptions,
        options: this.state.options,
        selectedOptions: this.state.selectedIndexPattern ? [this.state.selectedIndexPattern] : [],
        onChange: this.onChange
      }));
    }
  }]);

  return IndexPatternSelect;
}(_react.Component);

exports.IndexPatternSelect = IndexPatternSelect;