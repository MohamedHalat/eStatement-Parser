"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavControlsService = void 0;

var _lodash = require("lodash");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var NavControlsService =
/*#__PURE__*/
function () {
  function NavControlsService() {
    _classCallCheck(this, NavControlsService);

    _defineProperty(this, "stop$", new _rxjs.ReplaySubject(1));
  }

  _createClass(NavControlsService, [{
    key: "start",
    value: function start() {
      var _this = this;

      var navControlsLeft$ = new _rxjs.BehaviorSubject(new Set());
      var navControlsRight$ = new _rxjs.BehaviorSubject(new Set());
      return {
        // In the future, registration should be moved to the setup phase. This
        // is not possible until the legacy nav controls are no longer supported.
        registerLeft: function registerLeft(navControl) {
          return navControlsLeft$.next(new Set([].concat(_toConsumableArray(navControlsLeft$.value.values()), [navControl])));
        },
        registerRight: function registerRight(navControl) {
          return navControlsRight$.next(new Set([].concat(_toConsumableArray(navControlsRight$.value.values()), [navControl])));
        },
        getLeft$: function getLeft$() {
          return navControlsLeft$.pipe((0, _operators.map)(function (controls) {
            return (0, _lodash.sortBy)(_toConsumableArray(controls.values()), 'order');
          }), (0, _operators.takeUntil)(_this.stop$));
        },
        getRight$: function getRight$() {
          return navControlsRight$.pipe((0, _operators.map)(function (controls) {
            return (0, _lodash.sortBy)(_toConsumableArray(controls.values()), 'order');
          }), (0, _operators.takeUntil)(_this.stop$));
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stop$.next();
    }
  }]);

  return NavControlsService;
}();

exports.NavControlsService = NavControlsService;