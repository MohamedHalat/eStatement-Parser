"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = void 0;

var _config = require("./config");

var _elasticsearch = require("./elasticsearch");

var _http = require("./http");

var _rendering = require("./rendering");

var _legacy = require("./legacy");

var _ui_settings = require("./ui_settings");

var _plugins = require("./plugins");

var _saved_objects = require("../server/saved_objects");

var _csp = require("./csp");

var _logging = require("./logging");

var _dev = require("./dev");

var _path = require("./path");

var _kibana_config = require("./kibana_config");

var _saved_objects2 = require("./saved_objects");

var _utils = require("../utils");

var _context = require("./context");

var _capabilities = require("./capabilities");

var _uuid = require("./uuid");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const coreId = Symbol('core');
const rootConfigPath = '';

class Server {
  constructor(rawConfigProvider, env, logger) {
    this.env = env;
    this.logger = logger;

    _defineProperty(this, "configService", void 0);

    _defineProperty(this, "capabilities", void 0);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "elasticsearch", void 0);

    _defineProperty(this, "http", void 0);

    _defineProperty(this, "rendering", void 0);

    _defineProperty(this, "legacy", void 0);

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "plugins", void 0);

    _defineProperty(this, "savedObjects", void 0);

    _defineProperty(this, "uiSettings", void 0);

    _defineProperty(this, "uuid", void 0);

    this.log = this.logger.get('server');
    this.configService = new _config.ConfigService(rawConfigProvider, env, logger);
    const core = {
      coreId,
      configService: this.configService,
      env,
      logger
    };
    this.context = new _context.ContextService(core);
    this.http = new _http.HttpService(core);
    this.rendering = new _rendering.RenderingService(core);
    this.plugins = new _plugins.PluginsService(core);
    this.legacy = new _legacy.LegacyService(core);
    this.elasticsearch = new _elasticsearch.ElasticsearchService(core);
    this.savedObjects = new _saved_objects.SavedObjectsService(core);
    this.uiSettings = new _ui_settings.UiSettingsService(core);
    this.capabilities = new _capabilities.CapabilitiesService(core);
    this.uuid = new _uuid.UuidService(core);
  }

  async setup() {
    this.log.debug('setting up server'); // Discover any plugins before continuing. This allows other systems to utilize the plugin dependency graph.

    const pluginDependencies = await this.plugins.discover();
    const legacyPlugins = await this.legacy.discoverPlugins(); // Immediately terminate in case of invalid configuration

    await this.configService.validate();
    await (0, _legacy.ensureValidConfiguration)(this.configService, legacyPlugins);
    const contextServiceSetup = this.context.setup({
      // We inject a fake "legacy plugin" with dependencies on every plugin so that legacy plugins:
      // 1) Can access context from any NP plugin
      // 2) Can register context providers that will only be available to other legacy plugins and will not leak into
      //    New Platform plugins.
      pluginDependencies: new Map([...pluginDependencies, [this.legacy.legacyId, [...pluginDependencies.keys()]]])
    });
    const uuidSetup = await this.uuid.setup();
    const httpSetup = await this.http.setup({
      context: contextServiceSetup
    });
    this.registerDefaultRoute(httpSetup);
    const capabilitiesSetup = this.capabilities.setup({
      http: httpSetup
    });
    const elasticsearchServiceSetup = await this.elasticsearch.setup({
      http: httpSetup
    });
    const uiSettingsSetup = await this.uiSettings.setup({
      http: httpSetup
    });
    const savedObjectsSetup = await this.savedObjects.setup({
      elasticsearch: elasticsearchServiceSetup,
      legacyPlugins
    });
    const coreSetup = {
      capabilities: capabilitiesSetup,
      context: contextServiceSetup,
      elasticsearch: elasticsearchServiceSetup,
      http: httpSetup,
      uiSettings: uiSettingsSetup,
      savedObjects: savedObjectsSetup,
      uuid: uuidSetup
    };
    const pluginsSetup = await this.plugins.setup(coreSetup);
    const renderingSetup = await this.rendering.setup({
      http: httpSetup,
      legacyPlugins,
      plugins: pluginsSetup
    });
    await this.legacy.setup({
      core: { ...coreSetup,
        plugins: pluginsSetup,
        rendering: renderingSetup
      },
      plugins: (0, _utils.mapToObject)(pluginsSetup.contracts)
    });
    this.registerCoreContext(coreSetup, renderingSetup);
    return coreSetup;
  }

  async start() {
    this.log.debug('starting server');
    const savedObjectsStart = await this.savedObjects.start({});
    const capabilitiesStart = this.capabilities.start();
    const uiSettingsStart = await this.uiSettings.start();
    const pluginsStart = await this.plugins.start({
      capabilities: capabilitiesStart,
      savedObjects: savedObjectsStart,
      uiSettings: uiSettingsStart
    });
    const coreStart = {
      capabilities: capabilitiesStart,
      savedObjects: savedObjectsStart,
      uiSettings: uiSettingsStart,
      plugins: pluginsStart
    };
    await this.legacy.start({
      core: coreStart,
      plugins: (0, _utils.mapToObject)(pluginsStart.contracts)
    });
    await this.http.start();
    await this.rendering.start();
    return coreStart;
  }

  async stop() {
    this.log.debug('stopping server');
    await this.legacy.stop();
    await this.plugins.stop();
    await this.savedObjects.stop();
    await this.elasticsearch.stop();
    await this.http.stop();
    await this.uiSettings.stop();
    await this.rendering.stop();
  }

  registerDefaultRoute(httpSetup) {
    const router = httpSetup.createRouter('/core');
    router.get({
      path: '/',
      validate: false
    }, async (context, req, res) => res.ok({
      body: {
        version: '0.0.1'
      }
    }));
  }

  registerCoreContext(coreSetup, rendering) {
    coreSetup.http.registerRouteHandlerContext(coreId, 'core', async (context, req, res) => {
      const savedObjectsClient = coreSetup.savedObjects.getScopedClient(req);
      const uiSettingsClient = coreSetup.uiSettings.asScopedToClient(savedObjectsClient);
      return {
        rendering: {
          render: async (options = {}) => rendering.render(req, uiSettingsClient, { ...options,
            vars: await this.legacy.legacyInternals.getVars('core', req)
          })
        },
        savedObjects: {
          client: savedObjectsClient
        },
        elasticsearch: {
          adminClient: coreSetup.elasticsearch.adminClient.asScoped(req),
          dataClient: coreSetup.elasticsearch.dataClient.asScoped(req)
        },
        uiSettings: {
          client: uiSettingsClient
        }
      };
    });
  }

  async setupCoreConfig() {
    const schemas = [[_path.config.path, _path.config.schema], [_csp.config.path, _csp.config.schema], [_elasticsearch.config.path, _elasticsearch.config.schema], [_logging.config.path, _logging.config.schema], [_http.config.path, _http.config.schema], [_plugins.config.path, _plugins.config.schema], [_dev.config.path, _dev.config.schema], [_kibana_config.config.path, _kibana_config.config.schema], [_saved_objects2.config.path, _saved_objects2.config.schema], [_ui_settings.config.path, _ui_settings.config.schema]];
    this.configService.addDeprecationProvider(rootConfigPath, _config.coreDeprecationProvider);
    this.configService.addDeprecationProvider(_elasticsearch.config.path, _elasticsearch.config.deprecations);
    this.configService.addDeprecationProvider(_ui_settings.config.path, _ui_settings.config.deprecations);

    for (const [path, schema] of schemas) {
      await this.configService.setSchema(path, schema);
    }
  }

}

exports.Server = Server;