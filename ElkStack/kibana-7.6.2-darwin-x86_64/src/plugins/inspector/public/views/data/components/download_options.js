"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataDownloadOptions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _export_csv = require("../lib/export_csv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DataDownloadOptions =
/*#__PURE__*/
function (_Component) {
  _inherits(DataDownloadOptions, _Component);

  function DataDownloadOptions() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataDownloadOptions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataDownloadOptions)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPopoverOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "onTogglePopover", function () {
      _this.setState(function (state) {
        return {
          isPopoverOpen: !state.isPopoverOpen
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "exportCsv", function () {
      var customParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var filename = _this.props.title;

      if (!filename || filename.length === 0) {
        filename = _i18n.i18n.translate('inspector.data.downloadOptionsUnsavedFilename', {
          defaultMessage: 'unsaved'
        });
      }

      (0, _export_csv.exportAsCsv)(_objectSpread({
        filename: "".concat(filename, ".csv"),
        columns: _this.props.columns,
        rows: _this.props.rows,
        csvSeparator: _this.props.csvSeparator,
        quoteValues: _this.props.quoteValues
      }, customParams));
    });

    _defineProperty(_assertThisInitialized(_this), "exportFormattedCsv", function () {
      _this.exportCsv({
        valueFormatter: function valueFormatter(item) {
          return item.formatted;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "exportFormattedAsRawCsv", function () {
      _this.exportCsv({
        valueFormatter: function valueFormatter(item) {
          return item.raw;
        }
      });
    });

    return _this;
  }

  _createClass(DataDownloadOptions, [{
    key: "renderUnformattedDownload",
    value: function renderUnformattedDownload() {
      return _react.default.createElement(_eui.EuiButton, {
        size: "s",
        onClick: this.exportCsv
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inspector.data.downloadCSVButtonLabel",
        defaultMessage: "Download CSV"
      }));
    }
  }, {
    key: "renderFormattedDownloads",
    value: function renderFormattedDownloads() {
      var button = _react.default.createElement(_eui.EuiButton, {
        iconType: "arrowDown",
        iconSide: "right",
        size: "s",
        onClick: this.onTogglePopover
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inspector.data.downloadCSVToggleButtonLabel",
        defaultMessage: "Download CSV"
      }));

      var items = [_react.default.createElement(_eui.EuiContextMenuItem, {
        key: "csv",
        onClick: this.exportFormattedCsv,
        toolTipContent: _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.data.formattedCSVButtonTooltip",
          defaultMessage: "Download the data in table format"
        }),
        toolTipPosition: "left"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inspector.data.formattedCSVButtonLabel",
        defaultMessage: "Formatted CSV"
      })), _react.default.createElement(_eui.EuiContextMenuItem, {
        key: "rawCsv",
        onClick: this.exportFormattedAsRawCsv,
        toolTipContent: _react.default.createElement(_react2.FormattedMessage, {
          id: "inspector.data.rawCSVButtonTooltip",
          defaultMessage: "Download the data as provided, for example, dates as timestamps"
        }),
        toolTipPosition: "left"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "inspector.data.rawCSVButtonLabel",
        defaultMessage: "Raw CSV"
      }))];
      return _react.default.createElement(_eui.EuiPopover, {
        id: "inspectorDownloadData",
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        panelPaddingSize: "none",
        repositionOnScroll: true
      }, _react.default.createElement(_eui.EuiContextMenuPanel, {
        className: "eui-textNoWrap",
        items: items
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.isFormatted ? this.renderFormattedDownloads() : this.renderUnformattedDownload();
    }
  }]);

  return DataDownloadOptions;
}(_react.Component);

exports.DataDownloadOptions = DataDownloadOptions;

_defineProperty(DataDownloadOptions, "propTypes", {
  title: _propTypes.default.string.isRequired,
  csvSeparator: _propTypes.default.string.isRequired,
  quoteValues: _propTypes.default.bool.isRequired,
  isFormatted: _propTypes.default.bool,
  columns: _propTypes.default.array,
  rows: _propTypes.default.array
});