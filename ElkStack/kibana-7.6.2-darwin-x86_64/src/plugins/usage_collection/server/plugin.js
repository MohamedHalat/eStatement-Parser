"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsageCollectionPlugin = void 0;

var _operators = require("rxjs/operators");

var _collector = require("./collector");

var _routes = require("./routes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UsageCollectionPlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "legacySavedObjects", void 0);

    this.logger = this.initializerContext.logger.get();
  }

  async setup(core) {
    const config = await this.initializerContext.config.create().pipe((0, _operators.first)()).toPromise();
    const collectorSet = new _collector.CollectorSet({
      logger: this.logger,
      maximumWaitTimeForAllCollectorsInS: config.maximumWaitTimeForAllCollectorsInS
    });
    const router = core.http.createRouter();

    const getLegacySavedObjects = () => this.legacySavedObjects;

    (0, _routes.setupRoutes)(router, getLegacySavedObjects);
    return { ...collectorSet,
      registerLegacySavedObjects: legacySavedObjects => {
        this.legacySavedObjects = legacySavedObjects;
      }
    };
  }

  start() {
    this.logger.debug('Starting plugin');
  }

  stop() {
    this.logger.debug('Stopping plugin');
  }

}

exports.UsageCollectionPlugin = UsageCollectionPlugin;