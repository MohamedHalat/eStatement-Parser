"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCoreStart = exports.getCoreStart = void 0;

var _create_getter_setter = require("./create_getter_setter");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _createGetterSetter = (0, _create_getter_setter.createGetterSetter)('CoreStart'),
    _createGetterSetter2 = _slicedToArray(_createGetterSetter, 2),
    getCoreStart = _createGetterSetter2[0],
    setCoreStart = _createGetterSetter2[1];

exports.setCoreStart = setCoreStart;
exports.getCoreStart = getCoreStart;