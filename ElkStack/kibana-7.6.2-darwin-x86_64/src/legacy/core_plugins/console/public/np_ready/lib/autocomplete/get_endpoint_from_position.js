"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEndpointFromPosition = getEndpointFromPosition;

var _autocomplete = require("./autocomplete");

var _kb = require("../kb/kb");

var _engine = require("./engine");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getEndpointFromPosition(editor, pos, parser) {
  var lineValue = editor.getLineValue(pos.lineNumber);

  var context = _objectSpread({}, (0, _autocomplete.getCurrentMethodAndTokenPaths)(editor, {
    column: lineValue.length + 1
    /* Go to the very end of the line */
    ,
    lineNumber: pos.lineNumber
  }, parser, true));

  var components = (0, _kb.getTopLevelUrlCompleteComponents)(context.method);
  (0, _engine.populateContext)(context.urlTokenPath, context, editor, true, components);
  return context.endpoint;
}