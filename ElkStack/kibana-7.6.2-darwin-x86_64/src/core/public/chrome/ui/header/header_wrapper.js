"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderWrapper = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var IS_LOCKED_KEY = 'core.chrome.isLocked';

var HeaderWrapper = function HeaderWrapper(props) {
  var initialIsLocked = localStorage.getItem(IS_LOCKED_KEY);

  var _useState = (0, _react.useState)(initialIsLocked === 'true'),
      _useState2 = _slicedToArray(_useState, 2),
      isLocked = _useState2[0],
      setIsLocked = _useState2[1];

  var setIsLockedStored = function setIsLockedStored(locked) {
    localStorage.setItem(IS_LOCKED_KEY, "".concat(locked));
    setIsLocked(locked);
  };

  var className = (0, _classnames.default)('chrHeaderWrapper', {
    'chrHeaderWrapper--navIsLocked': isLocked
  }, 'hide-for-sharing');
  return _react.default.createElement("div", {
    className: className,
    "data-test-subj": "headerGlobalNav"
  }, _react.default.createElement(_.Header, _extends({}, props, {
    onIsLockedUpdate: setIsLockedStored,
    isLocked: isLocked
  })));
};

exports.HeaderWrapper = HeaderWrapper;