"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimefilterService = void 0;

var _index = require("./index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TimefilterService =
/*#__PURE__*/
function () {
  function TimefilterService() {
    _classCallCheck(this, TimefilterService);
  }

  _createClass(TimefilterService, [{
    key: "setup",
    value: function setup(_ref) {
      var uiSettings = _ref.uiSettings,
          storage = _ref.storage;
      var timefilterConfig = {
        timeDefaults: uiSettings.get('timepicker:timeDefaults'),
        refreshIntervalDefaults: uiSettings.get('timepicker:refreshIntervalDefaults')
      };
      var history = new _index.TimeHistory(storage);
      var timefilter = new _index.Timefilter(timefilterConfig, history);
      return {
        timefilter: timefilter,
        history: history
      };
    }
  }, {
    key: "start",
    value: function start() {// nothing to do here yet
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here yet
    }
  }]);

  return TimefilterService;
}();
/** @public */


exports.TimefilterService = TimefilterService;