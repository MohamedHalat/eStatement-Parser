"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setQueryService = exports.getQueryService = exports.setIndexPatterns = exports.getIndexPatterns = exports.setOverlays = exports.getOverlays = exports.setHttp = exports.getHttp = exports.setFieldFormats = exports.getFieldFormats = exports.setNotifications = exports.getNotifications = void 0;

var _public = require("../../kibana_utils/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _createGetterSetter = (0, _public.createGetterSetter)('Notifications'),
    _createGetterSetter2 = _slicedToArray(_createGetterSetter, 2),
    getNotifications = _createGetterSetter2[0],
    setNotifications = _createGetterSetter2[1];

exports.setNotifications = setNotifications;
exports.getNotifications = getNotifications;

var _createGetterSetter3 = (0, _public.createGetterSetter)('FieldFormats'),
    _createGetterSetter4 = _slicedToArray(_createGetterSetter3, 2),
    getFieldFormats = _createGetterSetter4[0],
    setFieldFormats = _createGetterSetter4[1];

exports.setFieldFormats = setFieldFormats;
exports.getFieldFormats = getFieldFormats;

var _createGetterSetter5 = (0, _public.createGetterSetter)('Http'),
    _createGetterSetter6 = _slicedToArray(_createGetterSetter5, 2),
    getHttp = _createGetterSetter6[0],
    setHttp = _createGetterSetter6[1];

exports.setHttp = setHttp;
exports.getHttp = getHttp;

var _createGetterSetter7 = (0, _public.createGetterSetter)('Overlays'),
    _createGetterSetter8 = _slicedToArray(_createGetterSetter7, 2),
    getOverlays = _createGetterSetter8[0],
    setOverlays = _createGetterSetter8[1];

exports.setOverlays = setOverlays;
exports.getOverlays = getOverlays;

var _createGetterSetter9 = (0, _public.createGetterSetter)('IndexPatterns'),
    _createGetterSetter10 = _slicedToArray(_createGetterSetter9, 2),
    getIndexPatterns = _createGetterSetter10[0],
    setIndexPatterns = _createGetterSetter10[1];

exports.setIndexPatterns = setIndexPatterns;
exports.getIndexPatterns = getIndexPatterns;

var _createGetterSetter11 = (0, _public.createGetterSetter)('Query'),
    _createGetterSetter12 = _slicedToArray(_createGetterSetter11, 2),
    getQueryService = _createGetterSetter12[0],
    setQueryService = _createGetterSetter12[1];

exports.setQueryService = setQueryService;
exports.getQueryService = getQueryService;