"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resizer = Resizer;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * TODO: This component uses styling constants from public UI - should be removed, next iteration should incl. horizontal and vertical resizers.
 */
function Resizer(props) {
  return _react.default.createElement("div", _extends({}, props, {
    className: "conApp__resizer",
    "data-test-subj": "splitPanelResizer"
  }), "\uFE19");
}