"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStateContainer = createStateContainer;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _deepFreezeStrict = _interopRequireDefault(require("deep-freeze-strict"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var $$observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
var $$setActionType = '@@SET';
var freeze = process.env.NODE_ENV !== 'production' ? function (value) {
  var isFreezable = value !== null && _typeof(value) === 'object';
  if (isFreezable) return (0, _deepFreezeStrict.default)(value);
  return value;
} : function (value) {
  return value;
};

function createStateContainer(defaultState) {
  var pureTransitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var pureSelectors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var data$ = new _rxjs.BehaviorSubject(freeze(defaultState));
  var state$ = data$.pipe((0, _operators.skip)(1));

  var get = function get() {
    return data$.getValue();
  };

  var container = _defineProperty({
    get: get,
    state$: state$,
    getState: function getState() {
      return data$.getValue();
    },
    set: function set(state) {
      container.dispatch({
        type: $$setActionType,
        args: [state]
      });
    },
    reducer: function reducer(state, action) {
      if (action.type === $$setActionType) {
        return freeze(action.args[0]);
      }

      var pureTransition = pureTransitions[action.type];
      return pureTransition ? freeze(pureTransition(state).apply(void 0, _toConsumableArray(action.args))) : state;
    },
    replaceReducer: function replaceReducer(nextReducer) {
      return container.reducer = nextReducer;
    },
    dispatch: function dispatch(action) {
      return data$.next(container.reducer(get(), action));
    },
    transitions: Object.keys(pureTransitions).reduce(function (acc, type) {
      return _objectSpread({}, acc, _defineProperty({}, type, function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return container.dispatch({
          type: type,
          args: args
        });
      }));
    }, {}),
    selectors: Object.keys(pureSelectors).reduce(function (acc, selector) {
      return _objectSpread({}, acc, _defineProperty({}, selector, function () {
        return pureSelectors[selector](get()).apply(void 0, arguments);
      }));
    }, {}),
    addMiddleware: function addMiddleware(middleware) {
      return container.dispatch = middleware(container)(container.dispatch);
    },
    subscribe: function subscribe(listener) {
      var subscription = state$.subscribe(listener);
      return function () {
        return subscription.unsubscribe();
      };
    }
  }, $$observable, state$);

  return container;
}