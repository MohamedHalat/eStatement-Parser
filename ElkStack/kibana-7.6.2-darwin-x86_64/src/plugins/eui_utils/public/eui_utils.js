"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiUtils = void 0;

var _react = require("react");

var _eui_charts_theme = require("@elastic/eui/dist/eui_charts_theme");

var _operators = require("rxjs/operators");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EuiUtils =
/*#__PURE__*/
function () {
  function EuiUtils() {
    _classCallCheck(this, EuiUtils);
  }

  _createClass(EuiUtils, [{
    key: "setup",
    value: function setup(core) {}
  }, {
    key: "start",
    value: function start(core) {
      var getChartsThemeDefault = function getChartsThemeDefault() {
        return _eui_charts_theme.EUI_CHARTS_THEME_LIGHT.theme;
      };

      var getChartsTheme$ = function getChartsTheme$() {
        return core.uiSettings.get$('theme:darkMode').pipe((0, _operators.map)(function (darkMode) {
          return darkMode ? _eui_charts_theme.EUI_CHARTS_THEME_DARK.theme : _eui_charts_theme.EUI_CHARTS_THEME_LIGHT.theme;
        }));
      };

      var useChartsTheme = function useChartsTheme() {
        var _useState = (0, _react.useState)(getChartsThemeDefault()),
            _useState2 = _slicedToArray(_useState, 2),
            value = _useState2[0],
            update = _useState2[1];

        (0, _react.useEffect)(function () {
          var s = getChartsTheme$().subscribe(update);
          return function () {
            return s.unsubscribe();
          };
        }, [false]);
        return value;
      };

      return {
        /** The default charts theme */
        getChartsThemeDefault: getChartsThemeDefault,

        /** An observable of the current charts theme */
        getChartsTheme$: getChartsTheme$,

        /** A React hook for consuming the charts theme */
        useChartsTheme: useChartsTheme
      };
    }
  }]);

  return EuiUtils;
}();

exports.EuiUtils = EuiUtils;