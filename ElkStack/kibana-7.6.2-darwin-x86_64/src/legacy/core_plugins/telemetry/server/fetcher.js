"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FetcherTask = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _collection_manager = require("./collection_manager");

var _telemetry_config = require("./telemetry_config");

var _telemetry_repository = require("./telemetry_repository");

var _constants = require("../common/constants");

var _get_xpack_config_with_deprecated = require("../common/get_xpack_config_with_deprecated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FetcherTask {
  constructor(server) {
    _defineProperty(this, "checkDurationMs", 60 * 1000 * 5);

    _defineProperty(this, "intervalId", void 0);

    _defineProperty(this, "lastReported", void 0);

    _defineProperty(this, "isSending", false);

    _defineProperty(this, "server", void 0);

    _defineProperty(this, "getInternalRepository", () => {
      const {
        getSavedObjectsRepository
      } = this.server.savedObjects;
      const {
        callWithInternalUser
      } = this.server.plugins.elasticsearch.getCluster('admin');
      const internalRepository = getSavedObjectsRepository(callWithInternalUser);
      return internalRepository;
    });

    _defineProperty(this, "getCurrentConfigs", async () => {
      const internalRepository = this.getInternalRepository();
      const telemetrySavedObject = await (0, _telemetry_repository.getTelemetrySavedObject)(internalRepository);
      const config = this.server.config();
      const currentKibanaVersion = config.get('pkg.version');
      const configTelemetrySendUsageFrom = config.get('telemetry.sendUsageFrom');
      const allowChangingOptInStatus = config.get('telemetry.allowChangingOptInStatus');
      const configTelemetryOptIn = config.get('telemetry.optIn');
      const telemetryUrl = (0, _get_xpack_config_with_deprecated.getXpackConfigWithDeprecated)(config, 'telemetry.url');
      return {
        telemetryOptIn: (0, _telemetry_config.getTelemetryOptIn)({
          currentKibanaVersion,
          telemetrySavedObject,
          allowChangingOptInStatus,
          configTelemetryOptIn
        }),
        telemetrySendUsageFrom: (0, _telemetry_config.getTelemetrySendUsageFrom)({
          telemetrySavedObject,
          configTelemetrySendUsageFrom
        }),
        telemetryUrl
      };
    });

    _defineProperty(this, "updateLastReported", async () => {
      const internalRepository = this.getInternalRepository();
      this.lastReported = Date.now();
      (0, _telemetry_repository.updateTelemetrySavedObject)(internalRepository, {
        lastReported: this.lastReported
      });
    });

    _defineProperty(this, "shouldSendReport", ({
      telemetryOptIn,
      telemetrySendUsageFrom
    }) => {
      if (telemetryOptIn && telemetrySendUsageFrom === 'server') {
        if (!this.lastReported || Date.now() - this.lastReported > _constants.REPORT_INTERVAL_MS) {
          return true;
        }
      }

      return false;
    });

    _defineProperty(this, "fetchTelemetry", async () => {
      return await _collection_manager.telemetryCollectionManager.getStats({
        unencrypted: false,
        server: this.server,
        start: (0, _moment.default)().subtract(20, 'minutes').toISOString(),
        end: (0, _moment.default)().toISOString()
      });
    });

    _defineProperty(this, "sendTelemetry", async (url, cluster) => {
      this.server.log(['debug', 'telemetry', 'fetcher'], `Sending usage stats.`);
      await (0, _nodeFetch.default)(url, {
        method: 'post',
        body: cluster
      });
    });

    _defineProperty(this, "sendIfDue", async () => {
      if (this.isSending) {
        return;
      }

      try {
        const telemetryConfig = await this.getCurrentConfigs();

        if (!this.shouldSendReport(telemetryConfig)) {
          return;
        } // mark that we are working so future requests are ignored until we're done


        this.isSending = true;
        const clusters = await this.fetchTelemetry();

        for (const cluster of clusters) {
          await this.sendTelemetry(telemetryConfig.telemetryUrl, cluster);
        }

        await this.updateLastReported();
      } catch (err) {
        this.server.log(['warning', 'telemetry', 'fetcher'], `Error sending telemetry usage data: ${err}`);
      }

      this.isSending = false;
    });

    _defineProperty(this, "start", () => {
      this.intervalId = setInterval(() => this.sendIfDue(), this.checkDurationMs);
    });

    _defineProperty(this, "stop", () => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    });

    this.server = server;
  }

}

exports.FetcherTask = FetcherTask;