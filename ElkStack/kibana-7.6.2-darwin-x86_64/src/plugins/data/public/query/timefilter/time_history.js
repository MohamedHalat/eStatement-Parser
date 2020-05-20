"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeHistory = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _persisted_log = require("../persisted_log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimeHistory =
/*#__PURE__*/
function () {
  function TimeHistory(storage) {
    _classCallCheck(this, TimeHistory);

    _defineProperty(this, "history", void 0);

    var historyOptions = {
      maxLength: 10,
      filterDuplicates: true,
      isDuplicate: function isDuplicate(oldItem, newItem) {
        return oldItem.from === newItem.from && oldItem.to === newItem.to;
      }
    };
    this.history = new _persisted_log.PersistedLog('kibana.timepicker.timeHistory', historyOptions, storage);
  }

  _createClass(TimeHistory, [{
    key: "add",
    value: function add(time) {
      if (!time || !time.from || !time.to) {
        return;
      } // time from/to can be strings or moment objects - convert to strings so always dealing with same types


      var justStringsTime = {
        from: _moment.default.isMoment(time.from) ? time.from.toISOString() : time.from,
        to: _moment.default.isMoment(time.to) ? time.to.toISOString() : time.to
      };
      this.history.add(justStringsTime);
    }
  }, {
    key: "get",
    value: function get() {
      return this.history.get();
    }
  }]);

  return TimeHistory;
}();

exports.TimeHistory = TimeHistory;