"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoResults = exports.PieContainsAllZeros = exports.ContainerTooSmall = exports.InvalidLogScaleValues = exports.VislibError = void 0;

var _public = require("../../../../plugins/kibana_utils/public");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var VislibError =
/*#__PURE__*/
function (_KbnError) {
  _inherits(VislibError, _KbnError);

  function VislibError(message) {
    _classCallCheck(this, VislibError);

    return _possibleConstructorReturn(this, _getPrototypeOf(VislibError).call(this, message));
  }

  _createClass(VislibError, [{
    key: "displayToScreen",
    value: function displayToScreen(handler) {
      handler.error(this.message);
    }
  }]);

  return VislibError;
}(_public.KbnError);

exports.VislibError = VislibError;

var InvalidLogScaleValues =
/*#__PURE__*/
function (_VislibError) {
  _inherits(InvalidLogScaleValues, _VislibError);

  function InvalidLogScaleValues() {
    _classCallCheck(this, InvalidLogScaleValues);

    return _possibleConstructorReturn(this, _getPrototypeOf(InvalidLogScaleValues).call(this, 'Values less than 1 cannot be displayed on a log scale'));
  }

  return InvalidLogScaleValues;
}(VislibError);

exports.InvalidLogScaleValues = InvalidLogScaleValues;

var ContainerTooSmall =
/*#__PURE__*/
function (_VislibError2) {
  _inherits(ContainerTooSmall, _VislibError2);

  function ContainerTooSmall() {
    _classCallCheck(this, ContainerTooSmall);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContainerTooSmall).call(this, 'This container is too small to render the visualization'));
  }

  return ContainerTooSmall;
}(VislibError);

exports.ContainerTooSmall = ContainerTooSmall;

var PieContainsAllZeros =
/*#__PURE__*/
function (_VislibError3) {
  _inherits(PieContainsAllZeros, _VislibError3);

  function PieContainsAllZeros() {
    _classCallCheck(this, PieContainsAllZeros);

    return _possibleConstructorReturn(this, _getPrototypeOf(PieContainsAllZeros).call(this, 'No results displayed because all values equal 0.'));
  }

  return PieContainsAllZeros;
}(VislibError);

exports.PieContainsAllZeros = PieContainsAllZeros;

var NoResults =
/*#__PURE__*/
function (_VislibError4) {
  _inherits(NoResults, _VislibError4);

  function NoResults() {
    _classCallCheck(this, NoResults);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoResults).call(this, 'No results found'));
  }

  return NoResults;
}(VislibError);

exports.NoResults = NoResults;