"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisTypeTimeseriesPlugin = void 0;

var _lodash = require("lodash");

var _server = require("../../../legacy/core_plugins/vis_type_timeseries/server");

var _validation_telemetry_service = require("./validation_telemetry/validation_telemetry_service");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class VisTypeTimeseriesPlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "validationTelementryService", void 0);

    this.initializerContext = initializerContext;
    this.validationTelementryService = new _validation_telemetry_service.ValidationTelemetryService();
  }

  setup(core, plugins) {
    const logger = this.initializerContext.logger.get('visTypeTimeseries');
    const config$ = this.initializerContext.config.create(); // Global config contains things like the ES shard timeout

    const globalConfig$ = this.initializerContext.config.legacy.globalConfig$;
    const framework = {
      core,
      plugins,
      config$,
      globalConfig$,
      logger
    };
    return {
      __legacy: {
        config$,
        registerLegacyAPI: (0, _lodash.once)(async __LEGACY => {
          const validationTelemetrySetup = await this.validationTelementryService.setup(core, { ...plugins,
            globalConfig$
          });
          await (0, _server.init)(framework, __LEGACY, validationTelemetrySetup);
        })
      },
      getVisData: async (requestContext, options) => {
        return await (0, _server.getVisData)(requestContext, options, framework);
      }
    };
  }

  start(core) {}

}

exports.VisTypeTimeseriesPlugin = VisTypeTimeseriesPlugin;