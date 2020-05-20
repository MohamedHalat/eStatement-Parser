"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchService = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _utils = require("../../utils");

var _cluster_client = require("./cluster_client");

var _elasticsearch_config = require("./elasticsearch_config");

var _ensure_es_version = require("./version_check/ensure_es_version");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
class ElasticsearchService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "config$", void 0);

    _defineProperty(this, "subscription", void 0);

    _defineProperty(this, "stop$", new _rxjs.Subject());

    _defineProperty(this, "kibanaVersion", void 0);

    this.kibanaVersion = coreContext.env.packageInfo.version;
    this.log = coreContext.logger.get('elasticsearch-service');
    this.config$ = coreContext.configService.atPath('elasticsearch').pipe((0, _operators.map)(rawConfig => new _elasticsearch_config.ElasticsearchConfig(rawConfig)));
  }

  async setup(deps) {
    this.log.debug('Setting up elasticsearch service');
    const clients$ = this.config$.pipe((0, _operators.filter)(() => {
      if (this.subscription !== undefined) {
        this.log.error('Clients cannot be changed after they are created');
        return false;
      }

      return true;
    }), (0, _operators.switchMap)(config => new _rxjs.Observable(subscriber => {
      this.log.debug(`Creating elasticsearch clients`);
      const coreClients = {
        config,
        adminClient: this.createClusterClient('admin', config),
        dataClient: this.createClusterClient('data', config, deps.http.auth.getAuthHeaders)
      };
      subscriber.next(coreClients);
      return () => {
        this.log.debug(`Closing elasticsearch clients`);
        coreClients.adminClient.close();
        coreClients.dataClient.close();
      };
    })), (0, _operators.publishReplay)(1));
    this.subscription = clients$.connect();
    const config = await this.config$.pipe((0, _operators.first)()).toPromise();
    const adminClient$ = clients$.pipe((0, _operators.map)(clients => clients.adminClient));
    const dataClient$ = clients$.pipe((0, _operators.map)(clients => clients.dataClient));
    const adminClient = {
      async callAsInternalUser(endpoint, clientParams = {}, options) {
        const client = await adminClient$.pipe((0, _operators.take)(1)).toPromise();
        return await client.callAsInternalUser(endpoint, clientParams, options);
      },

      asScoped(request) {
        return {
          callAsInternalUser: adminClient.callAsInternalUser,

          async callAsCurrentUser(endpoint, clientParams = {}, options) {
            const client = await adminClient$.pipe((0, _operators.take)(1)).toPromise();
            return await client.asScoped(request).callAsCurrentUser(endpoint, clientParams, options);
          }

        };
      }

    };
    const dataClient = {
      async callAsInternalUser(endpoint, clientParams = {}, options) {
        const client = await dataClient$.pipe((0, _operators.take)(1)).toPromise();
        return await client.callAsInternalUser(endpoint, clientParams, options);
      },

      asScoped(request) {
        return {
          callAsInternalUser: dataClient.callAsInternalUser,

          async callAsCurrentUser(endpoint, clientParams = {}, options) {
            const client = await dataClient$.pipe((0, _operators.take)(1)).toPromise();
            return await client.asScoped(request).callAsCurrentUser(endpoint, clientParams, options);
          }

        };
      }

    };
    const esNodesCompatibility$ = (0, _ensure_es_version.pollEsNodesVersion)({
      callWithInternalUser: adminClient.callAsInternalUser,
      log: this.log,
      ignoreVersionMismatch: config.ignoreVersionMismatch,
      esVersionCheckInterval: config.healthCheckDelay.asMilliseconds(),
      kibanaVersion: this.kibanaVersion
    }).pipe((0, _operators.takeUntil)(this.stop$), (0, _operators.shareReplay)({
      refCount: true,
      bufferSize: 1
    }));
    return {
      legacy: {
        config$: clients$.pipe((0, _operators.map)(clients => clients.config))
      },
      adminClient,
      dataClient,
      esNodesCompatibility$,
      createClient: (type, clientConfig = {}) => {
        const finalConfig = (0, _utils.merge)({}, config, clientConfig);
        return this.createClusterClient(type, finalConfig, deps.http.auth.getAuthHeaders);
      }
    };
  }

  async start() {}

  async stop() {
    this.log.debug('Stopping elasticsearch service');

    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }

    this.stop$.next();
  }

  createClusterClient(type, config, getAuthHeaders) {
    return new _cluster_client.ClusterClient(config, this.coreContext.logger.get('elasticsearch', type), getAuthHeaders);
  }

}

exports.ElasticsearchService = ElasticsearchService;