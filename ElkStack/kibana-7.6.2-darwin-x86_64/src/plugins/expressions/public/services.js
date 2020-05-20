"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRenderersRegistry = exports.getRenderersRegistry = exports.setNotifications = exports.getNotifications = exports.setInterpreter = exports.getInterpreter = exports.setInspector = exports.getInspector = exports.savedObjects = exports.setCoreStart = exports.getCoreStart = void 0;

var _public = require("../../kibana_utils/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _createKibanaUtilsCor = (0, _public.createKibanaUtilsCore)(),
    getCoreStart = _createKibanaUtilsCor.getCoreStart,
    setCoreStart = _createKibanaUtilsCor.setCoreStart,
    savedObjects = _createKibanaUtilsCor.savedObjects;

exports.savedObjects = savedObjects;
exports.setCoreStart = setCoreStart;
exports.getCoreStart = getCoreStart;

var _createGetterSetter = (0, _public.createGetterSetter)('Inspector'),
    _createGetterSetter2 = _slicedToArray(_createGetterSetter, 2),
    getInspector = _createGetterSetter2[0],
    setInspector = _createGetterSetter2[1];

exports.setInspector = setInspector;
exports.getInspector = getInspector;

var _createGetterSetter3 = (0, _public.createGetterSetter)('Interpreter'),
    _createGetterSetter4 = _slicedToArray(_createGetterSetter3, 2),
    getInterpreter = _createGetterSetter4[0],
    setInterpreter = _createGetterSetter4[1];

exports.setInterpreter = setInterpreter;
exports.getInterpreter = getInterpreter;

var _createGetterSetter5 = (0, _public.createGetterSetter)('Notifications'),
    _createGetterSetter6 = _slicedToArray(_createGetterSetter5, 2),
    getNotifications = _createGetterSetter6[0],
    setNotifications = _createGetterSetter6[1];

exports.setNotifications = setNotifications;
exports.getNotifications = getNotifications;

var _createGetterSetter7 = (0, _public.createGetterSetter)('Renderers registry'),
    _createGetterSetter8 = _slicedToArray(_createGetterSetter7, 2),
    getRenderersRegistry = _createGetterSetter8[0],
    setRenderersRegistry = _createGetterSetter8[1];

exports.setRenderersRegistry = setRenderersRegistry;
exports.getRenderersRegistry = getRenderersRegistry;