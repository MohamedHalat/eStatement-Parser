"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpConfig = exports.config = void 0;

var _configSchema = require("@kbn/config-schema");

var _os = require("os");

var _csp = require("../csp");

var _ssl_config = require("./ssl_config");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const validBasePathRegex = /(^$|^\/.*[^\/]$)/;
const uuidRegexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const match = (regex, errorMsg) => str => regex.test(str) ? undefined : errorMsg; // before update to make sure it's in sync with validation rules in Legacy
// https://github.com/elastic/kibana/blob/master/src/legacy/server/config/schema.js


const config = {
  path: 'server',
  schema: _configSchema.schema.object({
    name: _configSchema.schema.string({
      defaultValue: () => (0, _os.hostname)()
    }),
    autoListen: _configSchema.schema.boolean({
      defaultValue: true
    }),
    basePath: _configSchema.schema.maybe(_configSchema.schema.string({
      validate: match(validBasePathRegex, "must start with a slash, don't end with one")
    })),
    cors: _configSchema.schema.conditional(_configSchema.schema.contextRef('dev'), true, _configSchema.schema.object({
      origin: _configSchema.schema.arrayOf(_configSchema.schema.string())
    }, {
      defaultValue: {
        origin: ['*://localhost:9876'] // karma test server

      }
    }), _configSchema.schema.boolean({
      defaultValue: false
    })),
    customResponseHeaders: _configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.string(), {
      defaultValue: {}
    }),
    host: _configSchema.schema.string({
      defaultValue: 'localhost',
      hostname: true
    }),
    maxPayload: _configSchema.schema.byteSize({
      defaultValue: '1048576b'
    }),
    port: _configSchema.schema.number({
      defaultValue: 5601
    }),
    rewriteBasePath: _configSchema.schema.boolean({
      defaultValue: false
    }),
    ssl: _ssl_config.sslSchema,
    keepaliveTimeout: _configSchema.schema.number({
      defaultValue: 120000
    }),
    socketTimeout: _configSchema.schema.number({
      defaultValue: 120000
    }),
    compression: _configSchema.schema.object({
      enabled: _configSchema.schema.boolean({
        defaultValue: true
      }),
      referrerWhitelist: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.string({
        hostname: true
      }), {
        minSize: 1
      }))
    }),
    uuid: _configSchema.schema.maybe(_configSchema.schema.string({
      validate: match(uuidRegexp, 'must be a valid uuid')
    })),
    xsrf: _configSchema.schema.object({
      disableProtection: _configSchema.schema.boolean({
        defaultValue: false
      }),
      whitelist: _configSchema.schema.arrayOf(_configSchema.schema.string({
        validate: match(/^\//, 'must start with a slash')
      }), {
        defaultValue: []
      })
    })
  }, {
    validate: rawConfig => {
      if (!rawConfig.basePath && rawConfig.rewriteBasePath) {
        return 'cannot use [rewriteBasePath] when [basePath] is not specified';
      }

      if (!rawConfig.compression.enabled && rawConfig.compression.referrerWhitelist) {
        return 'cannot use [compression.referrerWhitelist] when [compression.enabled] is set to false';
      }

      if (rawConfig.ssl.enabled && rawConfig.ssl.redirectHttpFromPort !== undefined && rawConfig.ssl.redirectHttpFromPort === rawConfig.port) {
        return 'Kibana does not accept http traffic to [port] when ssl is ' + 'enabled (only https is allowed), so [ssl.redirectHttpFromPort] ' + `cannot be configured to the same value. Both are [${rawConfig.port}].`;
      }
    }
  })
};
exports.config = config;

class HttpConfig {
  /**
   * @internal
   */
  constructor(rawHttpConfig, rawCspConfig) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "autoListen", void 0);

    _defineProperty(this, "host", void 0);

    _defineProperty(this, "keepaliveTimeout", void 0);

    _defineProperty(this, "socketTimeout", void 0);

    _defineProperty(this, "port", void 0);

    _defineProperty(this, "cors", void 0);

    _defineProperty(this, "customResponseHeaders", void 0);

    _defineProperty(this, "maxPayload", void 0);

    _defineProperty(this, "basePath", void 0);

    _defineProperty(this, "rewriteBasePath", void 0);

    _defineProperty(this, "ssl", void 0);

    _defineProperty(this, "compression", void 0);

    _defineProperty(this, "csp", void 0);

    _defineProperty(this, "xsrf", void 0);

    this.autoListen = rawHttpConfig.autoListen;
    this.host = rawHttpConfig.host;
    this.port = rawHttpConfig.port;
    this.cors = rawHttpConfig.cors;
    this.customResponseHeaders = rawHttpConfig.customResponseHeaders;
    this.maxPayload = rawHttpConfig.maxPayload;
    this.name = rawHttpConfig.name;
    this.basePath = rawHttpConfig.basePath;
    this.keepaliveTimeout = rawHttpConfig.keepaliveTimeout;
    this.socketTimeout = rawHttpConfig.socketTimeout;
    this.rewriteBasePath = rawHttpConfig.rewriteBasePath;
    this.ssl = new _ssl_config.SslConfig(rawHttpConfig.ssl || {});
    this.compression = rawHttpConfig.compression;
    this.csp = new _csp.CspConfig(rawCspConfig);
    this.xsrf = rawHttpConfig.xsrf;
  }

}

exports.HttpConfig = HttpConfig;