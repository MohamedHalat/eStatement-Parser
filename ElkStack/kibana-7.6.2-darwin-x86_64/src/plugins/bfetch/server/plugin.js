"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BfetchServerPlugin = void 0;

var _configSchema = require("@kbn/config-schema");

var _common = require("../common");

var _streaming = require("./streaming");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BfetchServerPlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "addStreamingResponseRoute", ({
      router,
      logger
    }) => (path, handler) => {
      router.post({
        path: `/${(0, _common.removeLeadingSlash)(path)}`,
        validate: {
          body: _configSchema.schema.any()
        }
      }, async (context, request, response) => {
        const data = request.body;
        return response.ok({
          headers: {
            'Content-Type': 'application/x-ndjson',
            Connection: 'keep-alive',
            'Transfer-Encoding': 'chunked',
            'Cache-Control': 'no-cache'
          },
          body: (0, _streaming.createNDJSONStream)(data, handler, logger)
        });
      });
    });
  }

  setup(core, plugins) {
    const logger = this.initializerContext.logger.get();
    const router = core.http.createRouter();
    const addStreamingResponseRoute = this.addStreamingResponseRoute({
      router,
      logger
    });
    return {
      addStreamingResponseRoute
    };
  }

  start(core, plugins) {
    return {};
  }

  stop() {}

}

exports.BfetchServerPlugin = BfetchServerPlugin;