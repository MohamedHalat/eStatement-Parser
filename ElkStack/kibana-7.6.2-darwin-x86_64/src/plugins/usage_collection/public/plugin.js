"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUnauthenticated = isUnauthenticated;
exports.UsageCollectionPlugin = void 0;

var _analytics = require("@kbn/analytics");

var _public = require("../../kibana_utils/public");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isUnauthenticated(http) {
  var anonymousPaths = http.anonymousPaths;
  return anonymousPaths.isAnonymous(window.location.pathname);
}

var UsageCollectionPlugin =
/*#__PURE__*/
function () {
  function UsageCollectionPlugin(initializerContext) {
    _classCallCheck(this, UsageCollectionPlugin);

    _defineProperty(this, "trackUserAgent", true);

    _defineProperty(this, "reporter", void 0);

    _defineProperty(this, "config", void 0);

    this.config = initializerContext.config.get();
  }

  _createClass(UsageCollectionPlugin, [{
    key: "setup",
    value: function setup(_ref) {
      var _this = this;

      var http = _ref.http;
      var localStorage = new _public.Storage(window.localStorage);
      var debug = this.config.uiMetric.debug;
      this.reporter = (0, _services.createReporter)({
        localStorage: localStorage,
        debug: debug,
        fetch: http
      });
      return {
        allowTrackUserAgent: function allowTrackUserAgent(allow) {
          _this.trackUserAgent = allow;
        },
        reportUiStats: this.reporter.reportUiStats,
        METRIC_TYPE: _analytics.METRIC_TYPE
      };
    }
  }, {
    key: "start",
    value: function start(_ref2) {
      var http = _ref2.http;

      if (!this.reporter) {
        return;
      }

      if (this.config.uiMetric.enabled && !isUnauthenticated(http)) {
        this.reporter.start();
      }

      if (this.trackUserAgent) {
        this.reporter.reportUserAgent('kibana');
      }
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return UsageCollectionPlugin;
}();

exports.UsageCollectionPlugin = UsageCollectionPlugin;