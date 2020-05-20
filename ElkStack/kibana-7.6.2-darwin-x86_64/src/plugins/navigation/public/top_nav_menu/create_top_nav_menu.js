"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTopNav = createTopNav;

var _react = _interopRequireDefault(require("react"));

var _top_nav_menu = require("./top_nav_menu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function createTopNav(data, extraConfig) {
  return function (props) {
    var relevantConfig = extraConfig.filter(function (dataItem) {
      return dataItem.appName === undefined || dataItem.appName === props.appName;
    });
    var config = (props.config || []).concat(relevantConfig);
    return _react.default.createElement(_top_nav_menu.TopNavMenu, _extends({}, props, {
      data: data,
      config: config
    }));
  };
}