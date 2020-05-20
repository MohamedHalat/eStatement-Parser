"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setI18n = exports.getI18n = exports.setTypes = exports.getTypes = exports.setUISettings = exports.getUISettings = void 0;

var _public = require("../../../../../../plugins/kibana_utils/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _createGetterSetter = (0, _public.createGetterSetter)('UISettings'),
    _createGetterSetter2 = _slicedToArray(_createGetterSetter, 2),
    getUISettings = _createGetterSetter2[0],
    setUISettings = _createGetterSetter2[1];

exports.setUISettings = setUISettings;
exports.getUISettings = getUISettings;

var _createGetterSetter3 = (0, _public.createGetterSetter)('Types'),
    _createGetterSetter4 = _slicedToArray(_createGetterSetter3, 2),
    getTypes = _createGetterSetter4[0],
    setTypes = _createGetterSetter4[1];

exports.setTypes = setTypes;
exports.getTypes = getTypes;

var _createGetterSetter5 = (0, _public.createGetterSetter)('I18n'),
    _createGetterSetter6 = _slicedToArray(_createGetterSetter5, 2),
    getI18n = _createGetterSetter6[0],
    setI18n = _createGetterSetter6[1];

exports.setI18n = setI18n;
exports.getI18n = getI18n;