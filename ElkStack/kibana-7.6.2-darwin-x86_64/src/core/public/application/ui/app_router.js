"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRouter = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _app_container = require("./app_container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var AppRouter = function AppRouter(_ref) {
  var history = _ref.history,
      mounters = _ref.mounters,
      setAppLeaveHandler = _ref.setAppLeaveHandler;
  return _react.default.createElement(_reactRouterDom.Router, {
    history: history
  }, _react.default.createElement(_reactRouterDom.Switch, null, _toConsumableArray(mounters).flatMap(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        appId = _ref3[0],
        mounter = _ref3[1];

    return (// Remove /app paths from the routes as they will be handled by the
      // "named" route parameter `:appId` below
      mounter.appBasePath.startsWith('/app') ? [] : [_react.default.createElement(_reactRouterDom.Route, {
        key: mounter.appRoute,
        path: mounter.appRoute,
        render: function render() {
          return _react.default.createElement(_app_container.AppContainer, {
            mounter: mounter,
            appId: appId,
            setAppLeaveHandler: setAppLeaveHandler
          });
        }
      })]
    );
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/app/:appId",
    render: function render(_ref4) {
      var _filter$;

      var appId = _ref4.match.params.appId;

      // Find the mounter including legacy mounters with subapps:
      var _ref5 = mounters.has(appId) ? [appId, mounters.get(appId)] : (_filter$ = _toConsumableArray(mounters).filter(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 1),
            key = _ref8[0];

        return key.split(':')[0] === appId;
      })[0]) !== null && _filter$ !== void 0 ? _filter$ : [],
          _ref6 = _slicedToArray(_ref5, 2),
          id = _ref6[0],
          mounter = _ref6[1];

      return _react.default.createElement(_app_container.AppContainer, {
        mounter: mounter,
        appId: id,
        setAppLeaveHandler: setAppLeaveHandler
      });
    }
  })));
};

exports.AppRouter = AppRouter;