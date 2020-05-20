"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaContextProvider = exports.createKibanaReactContext = exports.UseKibana = exports.withKibana = exports.useKibana = exports.context = void 0;

var React = _interopRequireWildcard(require("react"));

var _overlays = require("../overlays");

var _notifications = require("../notifications");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useMemo = React.useMemo,
    useContext = React.useContext,
    createElement = React.createElement,
    createContext = React.createContext;
var defaultContextValue = {
  services: {},
  overlays: (0, _overlays.createReactOverlays)({}),
  notifications: (0, _notifications.createNotifications)({})
};
var context = createContext(defaultContextValue);
exports.context = context;

var useKibana = function useKibana() {
  return useContext(context);
};

exports.useKibana = useKibana;

var withKibana = function withKibana(type) {
  var EnhancedType = function EnhancedType(props) {
    var kibana = useKibana();
    return React.createElement(type, _objectSpread({}, props, {
      kibana: kibana
    }));
  };

  return EnhancedType;
};

exports.withKibana = withKibana;

var UseKibana = function UseKibana(_ref) {
  var children = _ref.children;
  return React.createElement(React.Fragment, null, children(useKibana()));
};

exports.UseKibana = UseKibana;

var createKibanaReactContext = function createKibanaReactContext(services) {
  var value = {
    services: services,
    overlays: (0, _overlays.createReactOverlays)(services),
    notifications: (0, _notifications.createNotifications)(services)
  };

  var Provider = function Provider(_ref2) {
    var _ref2$services = _ref2.services,
        newServices = _ref2$services === void 0 ? {} : _ref2$services,
        children = _ref2.children;
    var oldValue = useKibana();

    var _useMemo = useMemo(function () {
      return createKibanaReactContext(_objectSpread({}, services, {}, oldValue.services, {}, newServices));
    }, [services, oldValue, newServices]),
        newValue = _useMemo.value;

    return createElement(context.Provider, {
      value: newValue,
      children: children
    });
  };

  return {
    value: value,
    Provider: Provider,
    Consumer: context.Consumer
  };
};

exports.createKibanaReactContext = createKibanaReactContext;

var _createKibanaReactCon = createKibanaReactContext({}),
    KibanaContextProvider = _createKibanaReactCon.Provider;

exports.KibanaContextProvider = KibanaContextProvider;