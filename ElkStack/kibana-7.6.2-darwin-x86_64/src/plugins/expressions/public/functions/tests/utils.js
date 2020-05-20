"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functionWrapper = void 0;

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Takes a function spec and passes in default args,
// overriding with any provided args.
var functionWrapper = function functionWrapper(fnSpec) {
  var spec = fnSpec();
  var defaultArgs = (0, _lodash.mapValues)(spec.args, function (argSpec) {
    return argSpec.default;
  });
  return function (context) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var handlers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return spec.fn(context, _objectSpread({}, defaultArgs, {}, args), handlers);
  };
};

exports.functionWrapper = functionWrapper;