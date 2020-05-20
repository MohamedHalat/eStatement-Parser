"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNavLink = toNavLink;

var _application = require("../../application");

var _nav_link = require("./nav_link");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function toNavLink(app, basePath) {
  var useAppStatus = app.navLinkStatus === _application.AppNavLinkStatus.default;
  return new _nav_link.NavLinkWrapper(_objectSpread({}, app, {
    hidden: useAppStatus ? app.status === _application.AppStatus.inaccessible : app.navLinkStatus === _application.AppNavLinkStatus.hidden,
    disabled: useAppStatus ? false : app.navLinkStatus === _application.AppNavLinkStatus.disabled,
    legacy: isLegacyApp(app),
    baseUrl: isLegacyApp(app) ? relativeToAbsolute(basePath.prepend(app.appUrl)) : relativeToAbsolute(basePath.prepend(app.appRoute))
  }));
}

function relativeToAbsolute(url) {
  // convert all link urls to absolute urls
  var a = document.createElement('a');
  a.setAttribute('href', url);
  return a.href;
}

function isLegacyApp(app) {
  return app.legacy === true;
}