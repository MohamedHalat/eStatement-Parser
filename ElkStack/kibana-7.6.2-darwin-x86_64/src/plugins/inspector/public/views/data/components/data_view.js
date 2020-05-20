"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataViewComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _data_table = require("./data_table");

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

var DataViewComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(DataViewComponent, _Component);

  function DataViewComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataViewComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataViewComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "_isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "onUpdateData", function (type) {
      if (type === 'tabular') {
        _this.setState({
          tabularData: null,
          tabularOptions: {},
          tabularPromise: _this.props.adapters.data.getTabular()
        });
      }
    });

    return _this;
  }

  _createClass(DataViewComponent, [{
    key: "finishLoadingData",
    value: function finishLoadingData() {
      var tabularPromise, tabularData;
      return regeneratorRuntime.async(function finishLoadingData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tabularPromise = this.state.tabularPromise;

              if (!tabularPromise) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return regeneratorRuntime.awrap(tabularPromise);

            case 4:
              tabularData = _context.sent;

              if (this._isMounted) {
                this.setState({
                  tabularData: tabularData.data,
                  tabularOptions: tabularData.options,
                  tabularPromise: null
                });
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.props.adapters.data.on('change', this.onUpdateData);
      this.finishLoadingData();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
      this.props.adapters.data.removeListener('change', this.onUpdateData);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.finishLoadingData();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.tabularPromise) {
        return DataViewComponent.renderLoading();
      } else if (!this.state.tabularData) {
        return DataViewComponent.renderNoData();
      }

      return _react.default.createElement(_data_table.DataTableFormat, {
        data: this.state.tabularData,
        isFormatted: this.state.tabularOptions.returnsFormattedValues,
        exportTitle: this.props.title,
        uiSettings: this.props.uiSettings
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, state) {
      if (state && nextProps.adapters === state.adapters) {
        return null;
      }

      return {
        adapters: nextProps.adapters,
        tabularData: null,
        tabularOptions: {},
        tabularPromise: nextProps.adapters.data.getTabular()
      };
    }
  }, {
    key: "renderNoData",
    value: function renderNoData() {
      return _react.default.createElement(_eui.EuiEmptyPrompt, {
        title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.data.noDataAvailableTitle",
          defaultMessage: "No data available"
        })),
        body: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.data.noDataAvailableDescription",
          defaultMessage: "The element did not provide any data."
        })))
      });
    }
  }, {
    key: "renderLoading",
    value: function renderLoading() {
      return _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "center",
        alignItems: "center",
        style: {
          height: '100%'
        }
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiPanel, {
        className: "eui-textCenter"
      }, _react.default.createElement(_eui.EuiLoadingChart, {
        size: "m"
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "inspector.data.gatheringDataLabel",
        defaultMessage: "Gathering data"
      }))))));
    }
  }]);

  return DataViewComponent;
}(_react.Component);

exports.DataViewComponent = DataViewComponent;

_defineProperty(DataViewComponent, "propTypes", {
  uiSettings: _propTypes.default.object.isRequired,
  adapters: _propTypes.default.object.isRequired,
  title: _propTypes.default.string.isRequired
});