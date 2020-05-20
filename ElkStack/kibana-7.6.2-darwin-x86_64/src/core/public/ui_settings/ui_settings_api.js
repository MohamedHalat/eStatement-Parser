"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSettingsApi = void 0;

var _rxjs = require("rxjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NOOP_CHANGES = {
  values: {},
  callback: function callback() {// noop
  }
};

var UiSettingsApi =
/*#__PURE__*/
function () {
  function UiSettingsApi(http) {
    _classCallCheck(this, UiSettingsApi);

    this.http = http;

    _defineProperty(this, "pendingChanges", void 0);

    _defineProperty(this, "sendInProgress", false);

    _defineProperty(this, "loadingCount$", new _rxjs.BehaviorSubject(0));
  }
  /**
   * Adds a key+value that will be sent to the server ASAP. If a request is
   * already in progress it will wait until the previous request is complete
   * before sending the next request
   */


  _createClass(UiSettingsApi, [{
    key: "batchSet",
    value: function batchSet(key, value) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var prev = _this.pendingChanges || NOOP_CHANGES;
        _this.pendingChanges = {
          values: _objectSpread({}, prev.values, _defineProperty({}, key, value)),
          callback: function callback(error, resp) {
            prev.callback(error, resp);

            if (error) {
              reject(error);
            } else {
              resolve(resp);
            }
          }
        };

        _this.flushPendingChanges();
      });
    }
    /**
     * Gets an observable that notifies subscribers of the current number of active requests
     */

  }, {
    key: "getLoadingCount$",
    value: function getLoadingCount$() {
      return this.loadingCount$.asObservable();
    }
    /**
     * Prepares the uiSettings API to be discarded
     */

  }, {
    key: "stop",
    value: function stop() {
      this.loadingCount$.complete();
    }
    /**
     * Report back if there are pending changes waiting to be sent.
     */

  }, {
    key: "hasPendingChanges",
    value: function hasPendingChanges() {
      return !!(this.pendingChanges && this.sendInProgress);
    }
    /**
     * If there are changes that need to be sent to the server and there is not already a
     * request in progress, this method will start a request sending those changes. Once
     * the request is complete `flushPendingChanges()` will be called again, and if the
     * prerequisites are still true (because changes were queued while the request was in
     * progress) then another request will be started until all pending changes have been
     * sent to the server.
     */

  }, {
    key: "flushPendingChanges",
    value: function flushPendingChanges() {
      var changes;
      return regeneratorRuntime.async(function flushPendingChanges$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.pendingChanges) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              if (!this.sendInProgress) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              changes = this.pendingChanges;
              this.pendingChanges = undefined;
              _context.prev = 6;
              this.sendInProgress = true;
              _context.t0 = changes;
              _context.t1 = undefined;
              _context.next = 12;
              return regeneratorRuntime.awrap(this.sendRequest('POST', '/api/kibana/settings', {
                changes: changes.values
              }));

            case 12:
              _context.t2 = _context.sent;

              _context.t0.callback.call(_context.t0, _context.t1, _context.t2);

              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t3 = _context["catch"](6);
              changes.callback(_context.t3);

            case 19:
              _context.prev = 19;
              this.sendInProgress = false;
              this.flushPendingChanges();
              return _context.finish(19);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[6, 16, 19, 23]]);
    }
    /**
     * Calls window.fetch() with the proper headers and error handling logic.
     */

  }, {
    key: "sendRequest",
    value: function sendRequest(method, path, body) {
      return regeneratorRuntime.async(function sendRequest$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              this.loadingCount$.next(this.loadingCount$.getValue() + 1);
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.http.fetch(path, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                  accept: 'application/json'
                }
              }));

            case 4:
              return _context2.abrupt("return", _context2.sent);

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);

              if (!(_context2.t0.response && _context2.t0.response.status >= 300)) {
                _context2.next = 11;
                break;
              }

              throw new Error("Request failed with status code: ".concat(_context2.t0.response.status));

            case 11:
              throw _context2.t0;

            case 12:
              _context2.prev = 12;
              this.loadingCount$.next(this.loadingCount$.getValue() - 1);
              return _context2.finish(12);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 7, 12, 15]]);
    }
  }]);

  return UiSettingsApi;
}();

exports.UiSettingsApi = UiSettingsApi;