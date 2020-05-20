"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestContextProvider = RequestContextProvider;
exports.useRequestActionContext = exports.useRequestReadContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _create_use_context = require("./create_use_context");

var store = _interopRequireWildcard(require("../stores/request"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RequestReadContext = (0, _react.createContext)(null);
var RequestActionContext = (0, _react.createContext)(null);

function RequestContextProvider(_ref) {
  var children = _ref.children;

  var _useReducer = (0, _react.useReducer)(store.reducer, store.initialValue),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return _react.default.createElement(RequestReadContext.Provider, {
    value: state
  }, _react.default.createElement(RequestActionContext.Provider, {
    value: dispatch
  }, children));
}

var useRequestReadContext = (0, _create_use_context.createUseContext)(RequestReadContext, 'RequestReadContext');
exports.useRequestReadContext = useRequestReadContext;
var useRequestActionContext = (0, _create_use_context.createUseContext)(RequestActionContext, 'RequestActionContext');
exports.useRequestActionContext = useRequestActionContext;