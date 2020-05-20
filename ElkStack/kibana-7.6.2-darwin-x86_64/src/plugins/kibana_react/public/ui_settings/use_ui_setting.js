"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUiSetting$ = exports.useUiSetting = void 0;

var _react = require("react");

var _useObservable = _interopRequireDefault(require("react-use/lib/useObservable"));

var _context = require("../context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns the current UI-settings value.
 *
 * Usage:
 *
 * ```js
 * const darkMode = useUiSetting('theme:darkMode');
 * ```
 */
var useUiSetting = function useUiSetting(key, defaultValue) {
  var _useKibana = (0, _context.useKibana)(),
      services = _useKibana.services;

  if (_typeof(services.uiSettings) !== 'object') {
    throw new TypeError('uiSettings service not available in kibana-react context.');
  }

  return services.uiSettings.get(key, defaultValue);
};

exports.useUiSetting = useUiSetting;

/**
 * Returns a 2-tuple, where first entry is the setting value and second is a
 * function to update the setting value.
 *
 * Synchronously returns the most current value of the setting and subscribes
 * to all subsequent updates, which will re-render your component on new values.
 *
 * Usage:
 *
 * ```js
 * const [darkMode, setDarkMode] = useUiSetting$('theme:darkMode');
 * ```
 */
var useUiSetting$ = function useUiSetting$(key, defaultValue) {
  var _useKibana2 = (0, _context.useKibana)(),
      services = _useKibana2.services;

  if (_typeof(services.uiSettings) !== 'object') {
    throw new TypeError('uiSettings service not available in kibana-react context.');
  }

  var observable$ = (0, _react.useMemo)(function () {
    return services.uiSettings.get$(key, defaultValue);
  }, [key, defaultValue, services.uiSettings]);
  var value = (0, _useObservable.default)(observable$, services.uiSettings.get(key, defaultValue));
  var set = (0, _react.useCallback)(function (newValue) {
    return services.uiSettings.set(key, newValue);
  }, [key]);
  return [value, set];
};

exports.useUiSetting$ = useUiSetting$;