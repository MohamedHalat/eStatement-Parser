"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionRendererImplementation = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _operators = require("rxjs/operators");

var _useShallowCompareEffect = _interopRequireDefault(require("react-use/lib/useShallowCompareEffect"));

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _loader = require("./loader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultState = {
  isEmpty: true,
  isLoading: false,
  error: null
};

var ExpressionRendererImplementation = function ExpressionRendererImplementation(_ref) {
  var className = _ref.className,
      dataAttrs = _ref.dataAttrs,
      padding = _ref.padding,
      renderError = _ref.renderError,
      expression = _ref.expression,
      expressionLoaderOptions = _objectWithoutProperties(_ref, ["className", "dataAttrs", "padding", "renderError", "expression"]);

  var mountpoint = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(_objectSpread({}, defaultState)),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var hasCustomRenderErrorHandler = !!renderError;
  var expressionLoaderRef = (0, _react.useRef)(null); // flag to skip next render$ notification,
  // because of just handled error

  var hasHandledErrorRef = (0, _react.useRef)(false); // will call done() in LayoutEffect when done with rendering custom error state

  var errorRenderHandlerRef = (0, _react.useRef)(null);
  /* eslint-disable react-hooks/exhaustive-deps */
  // OK to ignore react-hooks/exhaustive-deps because options update is handled by calling .update()

  (0, _react.useEffect)(function () {
    var subs = [];
    expressionLoaderRef.current = new _loader.ExpressionLoader(mountpoint.current, expression, _objectSpread({}, expressionLoaderOptions, {
      // react component wrapper provides different
      // error handling api which is easier to work with from react
      // if custom renderError is not provided then we fallback to default error handling from ExpressionLoader
      onRenderError: hasCustomRenderErrorHandler ? function (domNode, error, handlers) {
        errorRenderHandlerRef.current = handlers;
        setState(function () {
          return _objectSpread({}, defaultState, {
            isEmpty: false,
            error: error
          });
        });

        if (expressionLoaderOptions.onRenderError) {
          expressionLoaderOptions.onRenderError(domNode, error, handlers);
        }
      } : expressionLoaderOptions.onRenderError
    }));
    subs.push(expressionLoaderRef.current.loading$.subscribe(function () {
      hasHandledErrorRef.current = false;
      setState(function (prevState) {
        return _objectSpread({}, prevState, {
          isLoading: true
        });
      });
    }), expressionLoaderRef.current.render$.pipe((0, _operators.filter)(function () {
      return !hasHandledErrorRef.current;
    })).subscribe(function (item) {
      setState(function () {
        return _objectSpread({}, defaultState, {
          isEmpty: false
        });
      });
    }));
    return function () {
      subs.forEach(function (s) {
        return s.unsubscribe();
      });

      if (expressionLoaderRef.current) {
        expressionLoaderRef.current.destroy();
        expressionLoaderRef.current = null;
      }

      errorRenderHandlerRef.current = null;
    };
  }, [hasCustomRenderErrorHandler]); // Re-fetch data automatically when the inputs change

  (0, _useShallowCompareEffect.default)(function () {
    if (expressionLoaderRef.current) {
      expressionLoaderRef.current.update(expression, expressionLoaderOptions);
    }
  }, // when expression is changed by reference and when any other loaderOption is changed by reference
  [_objectSpread({
    expression: expression
  }, expressionLoaderOptions)]);
  /* eslint-enable react-hooks/exhaustive-deps */
  // call expression loader's done() handler when finished rendering custom error state

  (0, _react.useLayoutEffect)(function () {
    if (state.error && errorRenderHandlerRef.current) {
      hasHandledErrorRef.current = true;
      errorRenderHandlerRef.current.done();
      errorRenderHandlerRef.current = null;
    }
  }, [state.error]);
  var classes = (0, _classnames.default)('expExpressionRenderer', {
    'expExpressionRenderer-isEmpty': state.isEmpty,
    'expExpressionRenderer-hasError': !!state.error,
    className: className
  });
  var expressionStyles = {};

  if (padding) {
    expressionStyles.padding = _eui_theme_light.default.paddingSizes[padding];
  }

  return _react.default.createElement("div", _extends({}, dataAttrs, {
    className: classes
  }), state.isEmpty && _react.default.createElement(_eui.EuiLoadingChart, {
    mono: true,
    size: "l"
  }), state.isLoading && _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent",
    position: "absolute"
  }), !state.isLoading && state.error && renderError && renderError(state.error.message), _react.default.createElement("div", {
    className: "expExpressionRenderer__expression",
    style: expressionStyles,
    ref: mountpoint
  }));
};

exports.ExpressionRendererImplementation = ExpressionRendererImplementation;