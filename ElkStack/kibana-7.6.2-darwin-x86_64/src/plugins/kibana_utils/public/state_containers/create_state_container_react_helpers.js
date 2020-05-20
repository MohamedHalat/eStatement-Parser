"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStateContainerReactHelpers = void 0;

var React = _interopRequireWildcard(require("react"));

var _useObservable = _interopRequireDefault(require("react-use/lib/useObservable"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useContext = React.useContext,
    useLayoutEffect = React.useLayoutEffect,
    useRef = React.useRef,
    h = React.createElement;

var createStateContainerReactHelpers = function createStateContainerReactHelpers() {
  var context = React.createContext(null);

  var useContainer = function useContainer() {
    return useContext(context);
  };

  var useState = function useState() {
    var _useContainer = useContainer(),
        state$ = _useContainer.state$,
        get = _useContainer.get;

    var value = (0, _useObservable.default)(state$, get());
    return value;
  };

  var useTransitions = function useTransitions() {
    return useContainer().transitions;
  };

  var useSelector = function useSelector(selector) {
    var comparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fastDeepEqual.default;

    var _useContainer2 = useContainer(),
        state$ = _useContainer2.state$,
        get = _useContainer2.get;

    var lastValueRef = useRef(get());

    var _React$useState = React.useState(function () {
      var newValue = selector(get());
      lastValueRef.current = newValue;
      return newValue;
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        value = _React$useState2[0],
        setValue = _React$useState2[1];

    useLayoutEffect(function () {
      var subscription = state$.subscribe(function (currentState) {
        var newValue = selector(currentState);

        if (!comparator(lastValueRef.current, newValue)) {
          lastValueRef.current = newValue;
          setValue(newValue);
        }
      });
      return function () {
        return subscription.unsubscribe();
      };
    }, [state$, comparator]);
    return value;
  };

  var connect = function connect(mapStateToProp) {
    return function (component) {
      return function (props) {
        return h(component, _objectSpread({}, useSelector(mapStateToProp), {}, props));
      };
    };
  };

  return {
    Provider: context.Provider,
    Consumer: context.Consumer,
    context: context,
    useContainer: useContainer,
    useState: useState,
    useTransitions: useTransitions,
    useSelector: useSelector,
    connect: connect
  };
};

exports.createStateContainerReactHelpers = createStateContainerReactHelpers;