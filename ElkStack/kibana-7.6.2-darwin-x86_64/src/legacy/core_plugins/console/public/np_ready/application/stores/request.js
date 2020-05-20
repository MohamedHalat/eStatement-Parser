"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialValue = void 0;

var _immer = require("immer");

var _function = require("fp-ts/lib/function");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialResultValue = {
  data: null,
  type: 'unknown'
};
var initialValue = (0, _immer.produce)({
  requestInFlight: false,
  lastResult: initialResultValue
}, _function.identity);
exports.initialValue = initialValue;

var reducer = function reducer(state, action) {
  return (0, _immer.produce)(state, function (draft) {
    if (action.type === 'sendRequest') {
      draft.requestInFlight = true;
      draft.lastResult = initialResultValue;
      return;
    }

    if (action.type === 'requestSuccess') {
      draft.requestInFlight = false;
      draft.lastResult = action.payload;
      return;
    }

    if (action.type === 'requestFail') {
      draft.requestInFlight = false;
      draft.lastResult = _objectSpread({}, initialResultValue, {
        error: action.payload
      });
      return;
    }
  });
};

exports.reducer = reducer;