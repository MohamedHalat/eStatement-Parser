"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyService = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _csp = require("../csp");

var _dev = require("../dev");

var _http = require("../http");

var _plugins = require("./plugins");

var _config = require("./config");

var _legacy_internals = require("./legacy_internals");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getLegacyRawConfig(config, pathConfig) {
  const rawConfig = config.toRaw(); // Elasticsearch config is solely handled by the core and legacy platform
  // shouldn't have direct access to it.

  if (rawConfig.elasticsearch !== undefined) {
    delete rawConfig.elasticsearch;
  }

  return { ...rawConfig,
    // We rely heavily in the default value of 'path.data' in the legacy world and,
    // since it has been moved to NP, it won't show up in RawConfig.
    path: pathConfig
  };
}
/** @internal */


/** @internal */
class LegacyService {
  /** Symbol to represent the legacy platform as a fake "plugin". Used by the ContextService */
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "legacyId", Symbol());

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "devConfig$", void 0);

    _defineProperty(this, "httpConfig$", void 0);

    _defineProperty(this, "kbnServer", void 0);

    _defineProperty(this, "configSubscription", void 0);

    _defineProperty(this, "setupDeps", void 0);

    _defineProperty(this, "update$", void 0);

    _defineProperty(this, "legacyRawConfig", void 0);

    _defineProperty(this, "legacyPlugins", void 0);

    _defineProperty(this, "settings", void 0);

    _defineProperty(this, "legacyInternals", void 0);

    const {
      logger,
      configService
    } = coreContext;
    this.log = logger.get('legacy-service');
    this.devConfig$ = configService.atPath(_dev.config.path).pipe((0, _operators.map)(rawConfig => new _dev.DevConfig(rawConfig)));
    this.httpConfig$ = (0, _rxjs.combineLatest)(configService.atPath(_http.config.path), configService.atPath(_csp.config.path)).pipe((0, _operators.map)(([http, csp]) => new _http.HttpConfig(http, csp)));
  }

  async discoverPlugins() {
    this.update$ = (0, _rxjs.combineLatest)(this.coreContext.configService.getConfig$(), this.coreContext.configService.atPath('path')).pipe((0, _operators.tap)(([config, pathConfig]) => {
      if (this.kbnServer !== undefined) {
        this.kbnServer.applyLoggingConfiguration(getLegacyRawConfig(config, pathConfig));
      }
    }), (0, _operators.tap)({
      error: err => this.log.error(err)
    }), (0, _operators.publishReplay)(1));
    this.configSubscription = this.update$.connect();
    this.settings = await this.update$.pipe((0, _operators.first)(), (0, _operators.map)(([config, pathConfig]) => getLegacyRawConfig(config, pathConfig))).toPromise();
    const {
      pluginSpecs,
      pluginExtendedConfig,
      disabledPluginSpecs,
      uiExports,
      navLinks
    } = await (0, _plugins.findLegacyPluginSpecs)(this.settings, this.coreContext.logger, this.coreContext.env.packageInfo);
    this.legacyPlugins = {
      pluginSpecs,
      disabledPluginSpecs,
      uiExports,
      navLinks
    };
    const deprecationProviders = await pluginSpecs.map(spec => spec.getDeprecationsProvider()).reduce(async (providers, current) => {
      if (current) {
        return [...(await providers), await (0, _config.convertLegacyDeprecationProvider)(current)];
      }

      return providers;
    }, Promise.resolve([]));
    deprecationProviders.forEach(provider => this.coreContext.configService.addDeprecationProvider('', provider));
    this.legacyRawConfig = pluginExtendedConfig; // check for unknown uiExport types

    if (uiExports.unknown && uiExports.unknown.length > 0) {
      throw new Error(`Unknown uiExport types: ${uiExports.unknown.map(({
        pluginSpec,
        type
      }) => `${type} from ${pluginSpec.getId()}`).join(', ')}`);
    }

    return {
      pluginSpecs,
      disabledPluginSpecs,
      uiExports,
      navLinks,
      pluginExtendedConfig,
      settings: this.settings
    };
  }

  async setup(setupDeps) {
    this.log.debug('setting up legacy service');

    if (!this.legacyPlugins) {
      throw new Error('Legacy service has not discovered legacy plugins yet. Ensure LegacyService.discoverPlugins() is called before LegacyService.setup()');
    } // propagate the instance uuid to the legacy config, as it was the legacy way to access it.


    this.legacyRawConfig.set('server.uuid', setupDeps.core.uuid.getInstanceUuid());
    this.setupDeps = setupDeps;
    this.legacyInternals = new _legacy_internals.LegacyInternals(this.legacyPlugins.uiExports, this.legacyRawConfig, setupDeps.core.http.server);
  }

  async start(startDeps) {
    const {
      setupDeps
    } = this;

    if (!setupDeps || !this.legacyPlugins) {
      throw new Error('Legacy service is not setup yet.');
    }

    this.log.debug('starting legacy service'); // Receive initial config and create kbnServer/ClusterManager.

    if (this.coreContext.env.isDevClusterMaster) {
      await this.createClusterManager(this.legacyRawConfig);
    } else {
      this.kbnServer = await this.createKbnServer(this.settings, this.legacyRawConfig, setupDeps, startDeps, this.legacyPlugins);
    }
  }

  async stop() {
    this.log.debug('stopping legacy service');

    if (this.configSubscription !== undefined) {
      this.configSubscription.unsubscribe();
      this.configSubscription = undefined;
    }

    if (this.kbnServer !== undefined) {
      await this.kbnServer.close();
      this.kbnServer = undefined;
    }
  }

  async createClusterManager(config) {
    const basePathProxy$ = this.coreContext.env.cliArgs.basePath ? (0, _rxjs.combineLatest)([this.devConfig$, this.httpConfig$]).pipe((0, _operators.first)(), (0, _operators.map)(([dev, http]) => new _http.BasePathProxyServer(this.coreContext.logger.get('server'), http, dev))) : _rxjs.EMPTY; // eslint-disable-next-line @typescript-eslint/no-var-requires

    const {
      ClusterManager
    } = require('../../../cli/cluster/cluster_manager');

    return new ClusterManager(this.coreContext.env.cliArgs, config, (await basePathProxy$.toPromise()));
  }

  async createKbnServer(settings, config, setupDeps, startDeps, legacyPlugins) {
    const coreSetup = {
      capabilities: setupDeps.core.capabilities,
      context: setupDeps.core.context,
      elasticsearch: {
        adminClient: setupDeps.core.elasticsearch.adminClient,
        dataClient: setupDeps.core.elasticsearch.dataClient,
        createClient: setupDeps.core.elasticsearch.createClient
      },
      http: {
        createCookieSessionStorageFactory: setupDeps.core.http.createCookieSessionStorageFactory,
        registerRouteHandlerContext: setupDeps.core.http.registerRouteHandlerContext.bind(null, this.legacyId),
        createRouter: () => setupDeps.core.http.createRouter('', this.legacyId),
        registerOnPreAuth: setupDeps.core.http.registerOnPreAuth,
        registerAuth: setupDeps.core.http.registerAuth,
        registerOnPostAuth: setupDeps.core.http.registerOnPostAuth,
        registerOnPreResponse: setupDeps.core.http.registerOnPreResponse,
        basePath: setupDeps.core.http.basePath,
        csp: setupDeps.core.http.csp,
        isTlsEnabled: setupDeps.core.http.isTlsEnabled
      },
      savedObjects: {
        setClientFactory: setupDeps.core.savedObjects.setClientFactory,
        addClientWrapper: setupDeps.core.savedObjects.addClientWrapper,
        createInternalRepository: setupDeps.core.savedObjects.createInternalRepository,
        createScopedRepository: setupDeps.core.savedObjects.createScopedRepository
      },
      uiSettings: {
        register: setupDeps.core.uiSettings.register
      },
      uuid: {
        getInstanceUuid: setupDeps.core.uuid.getInstanceUuid
      }
    };
    const coreStart = {
      capabilities: startDeps.core.capabilities,
      savedObjects: {
        getScopedClient: startDeps.core.savedObjects.getScopedClient
      },
      uiSettings: {
        asScopedToClient: startDeps.core.uiSettings.asScopedToClient
      }
    }; // eslint-disable-next-line @typescript-eslint/no-var-requires

    const KbnServer = require('../../../legacy/server/kbn_server');

    const kbnServer = new KbnServer(settings, config, {
      env: {
        mode: this.coreContext.env.mode,
        packageInfo: this.coreContext.env.packageInfo
      },
      setupDeps: {
        core: coreSetup,
        plugins: setupDeps.plugins
      },
      startDeps: {
        core: coreStart,
        plugins: startDeps.plugins
      },
      __internals: {
        hapiServer: setupDeps.core.http.server,
        kibanaMigrator: startDeps.core.savedObjects.migrator,
        uiPlugins: setupDeps.core.plugins.uiPlugins,
        elasticsearch: setupDeps.core.elasticsearch,
        rendering: setupDeps.core.rendering,
        uiSettings: setupDeps.core.uiSettings,
        savedObjectsClientProvider: startDeps.core.savedObjects.clientProvider,
        legacy: this.legacyInternals
      },
      logger: this.coreContext.logger
    }, legacyPlugins); // The kbnWorkerType check is necessary to prevent the repl
    // from being started multiple times in different processes.
    // We only want one REPL.

    if (this.coreContext.env.cliArgs.repl && process.env.kbnWorkerType === 'server') {
      require('../../../cli/repl').startRepl(kbnServer);
    }

    const {
      autoListen
    } = await this.httpConfig$.pipe((0, _operators.first)()).toPromise();

    if (autoListen) {
      try {
        await kbnServer.listen();
      } catch (err) {
        await kbnServer.close();
        throw err;
      }
    } else {
      await kbnServer.ready();
    }

    return kbnServer;
  }

}

exports.LegacyService = LegacyService;