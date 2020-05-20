"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelsContainer = PanelsContainer;

var _react = _interopRequireWildcard(require("react"));

var _context = require("../context");

var _resizer = require("../components/resizer");

var _registry = require("../registry");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initialState = {
  isDragging: false,
  currentResizerPos: -1
};

var pxToPercent = function pxToPercent(proportion, whole) {
  return proportion / whole * 100;
};

function PanelsContainer(_ref) {
  var children = _ref.children,
      onPanelWidthChange = _ref.onPanelWidthChange;

  var _Children$toArray = _react.Children.toArray(children),
      _Children$toArray2 = _slicedToArray(_Children$toArray, 2),
      firstChild = _Children$toArray2[0],
      secondChild = _Children$toArray2[1];

  var registryRef = (0, _react.useRef)(new _registry.PanelRegistry());
  var containerRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var getContainerWidth = function getContainerWidth() {
    return containerRef.current.getBoundingClientRect().width;
  };

  var childrenWithResizer = [firstChild, _react.default.createElement(_resizer.Resizer, {
    key: 'resizer',
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      setState(_objectSpread({}, state, {
        isDragging: true,
        currentResizerPos: event.clientX
      }));
    }
  }), secondChild];
  return _react.default.createElement(_context.PanelContextProvider, {
    registry: registryRef.current
  }, _react.default.createElement("div", {
    ref: containerRef,
    style: {
      display: 'flex',
      height: '100%',
      width: '100%'
    },
    onMouseMove: function onMouseMove(event) {
      if (state.isDragging) {
        var x = event.clientX;
        var registry = registryRef.current;

        var _registry$getPanels = registry.getPanels(),
            _registry$getPanels2 = _slicedToArray(_registry$getPanels, 2),
            left = _registry$getPanels2[0],
            right = _registry$getPanels2[1];

        var delta = x - state.currentResizerPos;
        var containerWidth = getContainerWidth();
        var leftPercent = pxToPercent(left.getWidth() + delta, containerWidth);
        var rightPercent = pxToPercent(right.getWidth() - delta, containerWidth);
        left.setWidth(leftPercent);
        right.setWidth(rightPercent);

        if (onPanelWidthChange) {
          onPanelWidthChange([leftPercent, rightPercent]);
        }

        setState(_objectSpread({}, state, {
          currentResizerPos: x
        }));
      }
    },
    onMouseUp: function onMouseUp() {
      setState(initialState);
    }
  }, childrenWithResizer));
}