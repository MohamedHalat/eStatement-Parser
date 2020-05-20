"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingCountService = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var LoadingCountService =
/*#__PURE__*/
function () {
  function LoadingCountService() {
    _classCallCheck(this, LoadingCountService);

    _defineProperty(this, "stop$", new _rxjs.Subject());

    _defineProperty(this, "loadingCount$", new _rxjs.BehaviorSubject(0));
  }

  _createClass(LoadingCountService, [{
    key: "setup",
    value: function setup(_ref) {
      var _this = this;

      var fatalErrors = _ref.fatalErrors;
      return {
        getLoadingCount$: function getLoadingCount$() {
          return _this.loadingCount$.pipe((0, _operators.distinctUntilChanged)());
        },
        addLoadingCountSource: function addLoadingCountSource(count$) {
          count$.pipe((0, _operators.distinctUntilChanged)(), (0, _operators.tap)(function (count) {
            if (count < 0) {
              throw new Error('Observables passed to loadingCount.add() must only emit positive numbers');
            }
          }), // use takeUntil() so that we can finish each stream on stop() the same way we do when they complete,
          // by removing the previous count from the total
          (0, _operators.takeUntil)(_this.stop$), (0, _operators.endWith)(0), (0, _operators.startWith)(0), (0, _operators.pairwise)(), (0, _operators.map)(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                prev = _ref3[0],
                next = _ref3[1];

            return next - prev;
          })).subscribe({
            next: function next(delta) {
              _this.loadingCount$.next(_this.loadingCount$.getValue() + delta);
            },
            error: function error(_error) {
              return fatalErrors.add(_error);
            }
          });
        }
      };
    }
  }, {
    key: "start",
    value: function start(_ref4) {
      var fatalErrors = _ref4.fatalErrors;
      return this.setup({
        fatalErrors: fatalErrors
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stop$.next();
      this.loadingCount$.complete();
    }
  }]);

  return LoadingCountService;
}();

exports.LoadingCountService = LoadingCountService;