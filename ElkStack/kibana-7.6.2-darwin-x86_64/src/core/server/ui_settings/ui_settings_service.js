"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSettingsService = void 0;

var _operators = require("rxjs/operators");

var _ui_settings_config = require("./ui_settings_config");

var _ui_settings_client = require("./ui_settings_client");

var _utils = require("../../utils/");

var _routes = require("./routes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
class UiSettingsService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "config$", void 0);

    _defineProperty(this, "uiSettingsDefaults", new Map());

    _defineProperty(this, "overrides", {});

    this.log = coreContext.logger.get('ui-settings-service');
    this.config$ = coreContext.configService.atPath(_ui_settings_config.config.path);
  }

  async setup(deps) {
    (0, _routes.registerRoutes)(deps.http.createRouter(''));
    this.log.debug('Setting up ui settings service');
    const config = await this.config$.pipe((0, _operators.first)()).toPromise();
    this.overrides = config.overrides;
    return {
      register: this.register.bind(this),
      asScopedToClient: this.getScopedClientFactory()
    };
  }

  async start() {
    return {
      asScopedToClient: this.getScopedClientFactory()
    };
  }

  async stop() {}

  getScopedClientFactory() {
    const {
      version,
      buildNum
    } = this.coreContext.env.packageInfo;
    return savedObjectsClient => new _ui_settings_client.UiSettingsClient({
      type: 'config',
      id: version,
      buildNum,
      savedObjectsClient,
      defaults: (0, _utils.mapToObject)(this.uiSettingsDefaults),
      overrides: this.overrides,
      log: this.log
    });
  }

  register(settings = {}) {
    Object.entries(settings).forEach(([key, value]) => {
      if (this.uiSettingsDefaults.has(key)) {
        throw new Error(`uiSettings for the key [${key}] has been already registered`);
      }

      this.uiSettingsDefaults.set(key, value);
    });
  }

}

exports.UiSettingsService = UiSettingsService;