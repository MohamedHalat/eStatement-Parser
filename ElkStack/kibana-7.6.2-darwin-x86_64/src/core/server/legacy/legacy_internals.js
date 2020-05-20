"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyInternals = void 0;

var _router = require("../http/router");

var _merge_vars = require("./merge_vars");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @internal
 * @deprecated
 */
class LegacyInternals {
  constructor(uiExports, config, server) {
    this.uiExports = uiExports;
    this.config = config;
    this.server = server;

    _defineProperty(this, "injectors", new Map());

    _defineProperty(this, "cachedDefaultVars", void 0);
  }

  get defaultVars() {
    if (this.cachedDefaultVars) {
      return this.cachedDefaultVars;
    }

    const {
      defaultInjectedVarProviders = []
    } = this.uiExports;
    return this.cachedDefaultVars = defaultInjectedVarProviders.reduce((vars, {
      fn,
      pluginSpec
    }) => (0, _merge_vars.mergeVars)(vars, fn(this.server, pluginSpec.readConfigValue(this.config, []))), {});
  }

  replaceVars(vars, request) {
    const {
      injectedVarsReplacers = []
    } = this.uiExports;
    return injectedVarsReplacers.reduce(async (injected, replacer) => replacer((await injected), (0, _router.ensureRawRequest)(request), this.server), Promise.resolve(vars));
  }

  injectUiAppVars(id, injector) {
    if (!this.injectors.has(id)) {
      this.injectors.set(id, new Set());
    }

    this.injectors.get(id).add(injector);
  }

  getInjectedUiAppVars(id) {
    return [...(this.injectors.get(id) || [])].reduce(async (promise, injector) => ({ ...(await promise),
      ...(await injector())
    }), Promise.resolve({}));
  }

  async getVars(id, request, injected = {}) {
    return this.replaceVars((0, _merge_vars.mergeVars)(this.defaultVars, (await this.getInjectedUiAppVars(id)), injected), request);
  }

}

exports.LegacyInternals = LegacyInternals;