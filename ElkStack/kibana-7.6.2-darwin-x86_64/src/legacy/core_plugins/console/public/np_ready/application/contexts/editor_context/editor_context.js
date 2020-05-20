"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorContextProvider = EditorContextProvider;
exports.useEditorActionContext = exports.useEditorReadContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var editor = _interopRequireWildcard(require("../../stores/editor"));

var _create_use_context = require("../create_use_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EditorReadContext = (0, _react.createContext)(null);
var EditorActionContext = (0, _react.createContext)(null);

function EditorContextProvider(_ref) {
  var children = _ref.children,
      settings = _ref.settings;

  var _useReducer = (0, _react.useReducer)(editor.reducer, editor.initialValue, function (value) {
    return _objectSpread({}, value, {
      settings: settings
    });
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return _react.default.createElement(EditorReadContext.Provider, {
    value: state
  }, _react.default.createElement(EditorActionContext.Provider, {
    value: dispatch
  }, children));
}

var useEditorReadContext = (0, _create_use_context.createUseContext)(EditorReadContext, 'EditorReadContext');
exports.useEditorReadContext = useEditorReadContext;
var useEditorActionContext = (0, _create_use_context.createUseContext)(EditorActionContext, 'EditorActionContext');
exports.useEditorActionContext = useEditorActionContext;