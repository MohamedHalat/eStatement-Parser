"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHistory = createHistory;
exports.History = void 0;

var _rxjs = require("rxjs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var History =
/*#__PURE__*/
function () {
  function History(storage) {
    _classCallCheck(this, History);

    this.storage = storage;

    _defineProperty(this, "changeEmitter", new _rxjs.BehaviorSubject(this.getHistory() || []));
  }

  _createClass(History, [{
    key: "getHistoryKeys",
    value: function getHistoryKeys() {
      return this.storage.keys().filter(function (key) {
        return key.indexOf('hist_elem') === 0;
      }).sort().reverse();
    }
  }, {
    key: "getHistory",
    value: function getHistory() {
      var _this = this;

      return this.getHistoryKeys().map(function (key) {
        return _this.storage.get(key);
      });
    } // This is used as an optimization mechanism so that different components
    // can listen for changes to history and update because changes to history can
    // be triggered from different places in the app. The alternative would be to store
    // this in state so that we hook into the React model, but it would require loading history
    // every time the application starts even if a user is not going to view history.

  }, {
    key: "change",
    value: function change(listener) {
      var subscription = this.changeEmitter.subscribe(listener);
      return function () {
        return subscription.unsubscribe();
      };
    }
  }, {
    key: "addToHistory",
    value: function addToHistory(endpoint, method, data) {
      var _this2 = this;

      var keys = this.getHistoryKeys();
      keys.splice(0, 500); // only maintain most recent X;

      keys.forEach(function (key) {
        _this2.storage.delete(key);
      });
      var timestamp = new Date().getTime();
      var k = 'hist_elem_' + timestamp;
      this.storage.set(k, {
        time: timestamp,
        endpoint: endpoint,
        method: method,
        data: data
      });
      this.changeEmitter.next(this.getHistory());
    }
  }, {
    key: "updateCurrentState",
    value: function updateCurrentState(content) {
      var timestamp = new Date().getTime();
      this.storage.set('editor_state', {
        time: timestamp,
        content: content
      });
    }
  }, {
    key: "getSavedEditorState",
    value: function getSavedEditorState() {
      var saved = this.storage.get('editor_state');
      if (!saved) return;
      var time = saved.time,
          content = saved.content;
      return {
        time: time,
        content: content
      };
    }
  }, {
    key: "clearHistory",
    value: function clearHistory() {
      var _this3 = this;

      this.getHistoryKeys().forEach(function (key) {
        return _this3.storage.delete(key);
      });
    }
  }]);

  return History;
}();

exports.History = History;

function createHistory(deps) {
  return new History(deps.storage);
}