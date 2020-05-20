"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTableFormat = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _download_options = require("./download_options");

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

var DataTableFormat =
/*#__PURE__*/
function (_Component) {
  _inherits(DataTableFormat, _Component);

  function DataTableFormat() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataTableFormat);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataTableFormat)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "csvSeparator", _this.props.uiSettings.get('csv:separator', ','));

    _defineProperty(_assertThisInitialized(_this), "quoteValues", _this.props.uiSettings.get('csv:quoteValues', true));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  _createClass(DataTableFormat, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          columns = _this$state.columns,
          rows = _this$state.rows;
      var pagination = {
        pageSizeOptions: [10, 20, 50],
        initialPageSize: 20
      };
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_download_options.DataDownloadOptions, {
        isFormatted: this.props.isFormatted,
        title: this.props.exportTitle,
        csvSeparator: this.csvSeparator,
        quoteValues: this.quoteValues,
        columns: columns,
        rows: rows
      }))), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiInMemoryTable, {
        className: "insDataTableFormat__table",
        "data-test-subj": "inspectorTable",
        columns: columns,
        items: rows,
        sorting: true,
        pagination: pagination
      }));
    }
  }], [{
    key: "renderCell",
    value: function renderCell(dataColumn, value) {
      var isFormatted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return _react.default.createElement(_eui.EuiFlexGroup, {
        responsive: false,
        gutterSize: "s",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, isFormatted ? value.formatted : value), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        responsive: false,
        gutterSize: "none",
        alignItems: "center"
      }, dataColumn.filter && _react.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.data.filterForValueButtonTooltip",
          defaultMessage: "Filter for value"
        })
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "plusInCircle",
        color: "text",
        "aria-label": _i18n.i18n.translate('inspector.data.filterForValueButtonAriaLabel', {
          defaultMessage: 'Filter for value'
        }),
        "data-test-subj": "filterForInspectorCellValue",
        className: "insDataTableFormat__filter",
        onClick: function onClick() {
          return dataColumn.filter(value);
        }
      })), dataColumn.filterOut && _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.data.filterOutValueButtonTooltip",
          defaultMessage: "Filter out value"
        })
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "minusInCircle",
        color: "text",
        "aria-label": _i18n.i18n.translate('inspector.data.filterOutValueButtonAriaLabel', {
          defaultMessage: 'Filter out value'
        }),
        "data-test-subj": "filterOutInspectorCellValue",
        className: "insDataTableFormat__filter",
        onClick: function onClick() {
          return dataColumn.filterOut(value);
        }
      }))))));
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref) {
      var data = _ref.data,
          isFormatted = _ref.isFormatted;

      if (!data) {
        return {
          columns: null,
          rows: null
        };
      }

      var columns = data.columns.map(function (dataColumn) {
        return {
          name: dataColumn.name,
          field: dataColumn.field,
          sortable: isFormatted ? function (row) {
            return row[dataColumn.field].raw;
          } : true,
          render: function render(value) {
            return DataTableFormat.renderCell(dataColumn, value, isFormatted);
          }
        };
      });
      return {
        columns: columns,
        rows: data.rows
      };
    }
  }]);

  return DataTableFormat;
}(_react.Component);

exports.DataTableFormat = DataTableFormat;

_defineProperty(DataTableFormat, "propTypes", {
  data: _propTypes.default.object.isRequired,
  exportTitle: _propTypes.default.string.isRequired,
  uiSettings: _propTypes.default.object.isRequired,
  isFormatted: _propTypes.default.bool
});