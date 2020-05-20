"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.telemetryCollectionManager = exports.TelemetryCollectionManager = void 0;

var _collectors = require("./collectors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TelemetryCollectionManager {
  constructor() {
    _defineProperty(this, "usageGetterMethodPriority", -1);

    _defineProperty(this, "collections", []);

    _defineProperty(this, "setCollection", collectionConfig => {
      const {
        title,
        priority,
        esCluster,
        statsGetter,
        clusterDetailsGetter
      } = collectionConfig;

      if (typeof priority !== 'number') {
        throw new Error('priority must be set.');
      }

      if (priority === this.usageGetterMethodPriority) {
        throw new Error(`A Usage Getter with the same priority is already set.`);
      }

      if (priority > this.usageGetterMethodPriority) {
        if (!statsGetter) {
          throw Error('Stats getter method not set.');
        }

        if (!esCluster) {
          throw Error('esCluster name must be set for the getCluster method.');
        }

        if (!clusterDetailsGetter) {
          throw Error('Cluser UUIds method is not set.');
        }

        this.collections.unshift({
          statsGetter,
          clusterDetailsGetter,
          esCluster,
          title
        });
        this.usageGetterMethodPriority = priority;
      }
    });

    _defineProperty(this, "getStatsCollectionConfig", async (collection, config) => {
      const {
        start,
        end
      } = config;
      const server = config.unencrypted ? config.req.server : config.server;
      const {
        callWithRequest,
        callWithInternalUser
      } = server.plugins.elasticsearch.getCluster(collection.esCluster);
      const callCluster = config.unencrypted ? (...args) => callWithRequest(config.req, ...args) : callWithInternalUser;
      const {
        usageCollection
      } = server.newPlatform.setup.plugins;
      return {
        server,
        callCluster,
        start,
        end,
        usageCollection
      };
    });

    _defineProperty(this, "getOptInStatsForCollection", async (collection, optInStatus, statsCollectionConfig) => {
      const clustersDetails = await collection.clusterDetailsGetter(statsCollectionConfig);
      return clustersDetails.map(({
        clusterUuid
      }) => ({
        cluster_uuid: clusterUuid,
        opt_in_status: optInStatus
      }));
    });

    _defineProperty(this, "getUsageForCollection", async (collection, statsCollectionConfig) => {
      const clustersDetails = await collection.clusterDetailsGetter(statsCollectionConfig);

      if (clustersDetails.length === 0) {
        // don't bother doing a further lookup, try next collection.
        return;
      }

      return await collection.statsGetter(clustersDetails, statsCollectionConfig);
    });

    _defineProperty(this, "getOptInStats", async (optInStatus, config) => {
      for (const collection of this.collections) {
        const statsCollectionConfig = await this.getStatsCollectionConfig(collection, config);

        try {
          const optInStats = await this.getOptInStatsForCollection(collection, optInStatus, statsCollectionConfig);

          if (optInStats && optInStats.length) {
            statsCollectionConfig.server.log(['debug', 'telemetry', 'collection'], `Got Opt In stats using ${collection.title} collection.`);

            if (config.unencrypted) {
              return optInStats;
            }

            const isDev = statsCollectionConfig.server.config().get('env.dev');
            return (0, _collectors.encryptTelemetry)(optInStats, isDev);
          }
        } catch (err) {
          statsCollectionConfig.server.log(['debu', 'telemetry', 'collection'], `Failed to collect any opt in stats with registered collections.`); // swallow error to try next collection;
        }
      }

      return [];
    });

    _defineProperty(this, "getStats", async config => {
      for (const collection of this.collections) {
        const statsCollectionConfig = await this.getStatsCollectionConfig(collection, config);

        try {
          const usageData = await this.getUsageForCollection(collection, statsCollectionConfig);

          if (usageData && usageData.length) {
            statsCollectionConfig.server.log(['debug', 'telemetry', 'collection'], `Got Usage using ${collection.title} collection.`);

            if (config.unencrypted) {
              return usageData;
            }

            const isDev = statsCollectionConfig.server.config().get('env.dev');
            return (0, _collectors.encryptTelemetry)(usageData, isDev);
          }
        } catch (err) {
          statsCollectionConfig.server.log(['debu', 'telemetry', 'collection'], `Failed to collect any usage with registered collections.`); // swallow error to try next collection;
        }
      }

      return [];
    });
  }

}

exports.TelemetryCollectionManager = TelemetryCollectionManager;
const telemetryCollectionManager = new TelemetryCollectionManager();
exports.telemetryCollectionManager = telemetryCollectionManager;