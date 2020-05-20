"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18nService = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n_eui_mapping = require("./i18n_eui_mapping");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Service that is responsible for i18n capabilities.
 * @internal
 */
var I18nService =
/*#__PURE__*/
function () {
  function I18nService() {
    _classCallCheck(this, I18nService);
  }

  _createClass(I18nService, [{
    key: "getContext",

    /**
     * Used exclusively to give a Context component to FatalErrorsService which
     * may render before Core successfully sets up or starts.
     *
     * Separated from `start` to disambiguate that this can be called from within
     * Core outside the lifecycle flow.
     * @internal
     */
    value: function getContext() {
      var mapping = _objectSpread({}, _i18n_eui_mapping.euiContextMapping);

      return {
        Context: function I18nContext(_ref) {
          var children = _ref.children;
          return _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_eui.EuiContext, {
            i18n: {
              mapping: mapping
            }
          }, children));
        }
      };
    }
  }, {
    key: "start",
    value: function start() {
      return this.getContext();
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here currently
    }
  }]);

  return I18nService;
}();
/**
 * I18nStart.Context is required by any localizable React component from \@kbn/i18n and \@elastic/eui packages
 * and is supposed to be used as the topmost component for any i18n-compatible React tree.
 *
 * @public
 *
 */


exports.I18nService = I18nService;