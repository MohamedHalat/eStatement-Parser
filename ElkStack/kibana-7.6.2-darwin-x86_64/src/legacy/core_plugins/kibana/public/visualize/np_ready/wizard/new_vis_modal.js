"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewVisModal = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _analytics = require("@kbn/analytics");

var _visualize_constants = require("../visualize_constants");

var _search_selection = require("./search_selection");

var _type_selection = require("./type_selection");

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

var baseUrl = "#".concat(_visualize_constants.VisualizeConstants.CREATE_PATH, "?");

var NewVisModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NewVisModal, _React$Component);

  function NewVisModal(props) {
    var _this$props$usageColl;

    var _this;

    _classCallCheck(this, NewVisModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NewVisModal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isLabsEnabled", void 0);

    _defineProperty(_assertThisInitialized(_this), "trackUiMetric", void 0);

    _defineProperty(_assertThisInitialized(_this), "onCloseModal", function () {
      _this.setState({
        showSearchVisModal: false
      });

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "onVisTypeSelected", function (visType) {
      if (!('aliasUrl' in visType) && visType.requiresSearch && visType.options.showIndexSelection) {
        _this.setState({
          showSearchVisModal: true,
          visType: visType
        });
      } else {
        _this.redirectToVis(visType);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchSelected", function (searchId, searchType) {
      _this.redirectToVis(_this.state.visType, searchType, searchId);
    });

    _this.isLabsEnabled = props.uiSettings.get('visualize:enableLabs');
    _this.state = {
      showSearchVisModal: false
    };
    _this.trackUiMetric = (_this$props$usageColl = _this.props.usageCollection) === null || _this$props$usageColl === void 0 ? void 0 : _this$props$usageColl.reportUiStats.bind(_this.props.usageCollection, 'visualize');
    return _this;
  }

  _createClass(NewVisModal, [{
    key: "render",
    value: function render() {
      if (!this.props.isOpen) {
        return null;
      }

      var visNewVisDialogAriaLabel = _i18n.i18n.translate('kbn.visualize.newVisWizard.helpTextAriaLabel', {
        defaultMessage: 'Start creating your visualization by selecting a type for that visualization. Hit escape to close this modal. Hit Tab key to go further.'
      });

      var selectionModal = this.state.showSearchVisModal && this.state.visType ? _react.default.createElement(_eui.EuiModal, {
        onClose: this.onCloseModal,
        className: "visNewVisSearchDialog"
      }, _react.default.createElement(_search_selection.SearchSelection, {
        onSearchSelected: this.onSearchSelected,
        visType: this.state.visType,
        uiSettings: this.props.uiSettings,
        savedObjects: this.props.savedObjects
      })) : _react.default.createElement(_eui.EuiModal, {
        onClose: this.onCloseModal,
        className: "visNewVisDialog",
        "aria-label": visNewVisDialogAriaLabel,
        role: "menu"
      }, _react.default.createElement(_type_selection.TypeSelection, {
        showExperimental: this.isLabsEnabled,
        onVisTypeSelected: this.onVisTypeSelected,
        visTypesRegistry: this.props.visTypesRegistry,
        addBasePath: this.props.addBasePath
      }));
      return _react.default.createElement(_eui.EuiOverlayMask, null, selectionModal);
    }
  }, {
    key: "redirectToVis",
    value: function redirectToVis(visType, searchType, searchId) {
      if (this.trackUiMetric) {
        this.trackUiMetric(_analytics.METRIC_TYPE.CLICK, visType.name);
      }

      var params;

      if ('aliasUrl' in visType) {
        params = this.props.addBasePath(visType.aliasUrl);

        if (this.props.editorParams && this.props.editorParams.includes('addToDashboard')) {
          params = "".concat(params, "?addToDashboard");
          this.props.onClose();
        }

        window.location.assign(params);
        return;
      }

      params = ["type=".concat(encodeURIComponent(visType.name))];

      if (searchType) {
        params.push("".concat(searchType === 'search' ? 'savedSearchId' : 'indexPattern', "=").concat(searchId));
      }

      params = params.concat(this.props.editorParams);
      this.props.onClose();
      location.assign("".concat(baseUrl).concat(params.join('&')));
    }
  }]);

  return NewVisModal;
}(_react.default.Component);

exports.NewVisModal = NewVisModal;

_defineProperty(NewVisModal, "defaultProps", {
  editorParams: []
});