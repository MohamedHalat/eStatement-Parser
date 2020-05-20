"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var _path = require("path");

var _i18n = require("@kbn/i18n");

var _path2 = require("../../../core/server/path");

var _mappings = _interopRequireDefault(require("./mappings.json"));

var _constants = require("./common/constants");

var _get_xpack_config_with_deprecated = require("./common/get_xpack_config_with_deprecated");

var _server = require("./server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
// @ts-ignore
const ENDPOINT_VERSION = 'v2';

const telemetry = kibana => {
  return new kibana.Plugin({
    id: 'telemetry',
    configPrefix: 'telemetry',
    publicDir: (0, _path.resolve)(__dirname, 'public'),
    require: ['elasticsearch'],

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        allowChangingOptInStatus: Joi.boolean().default(true),
        optIn: Joi.when('allowChangingOptInStatus', {
          is: false,
          then: Joi.valid(true).default(true),
          otherwise: Joi.boolean().default(true)
        }),
        // `config` is used internally and not intended to be set
        config: Joi.string().default((0, _path2.getConfigPath)()),
        banner: Joi.boolean().default(true),
        url: Joi.when('$dev', {
          is: true,
          then: Joi.string().default(`https://telemetry-staging.elastic.co/xpack/${ENDPOINT_VERSION}/send`),
          otherwise: Joi.string().default(`https://telemetry.elastic.co/xpack/${ENDPOINT_VERSION}/send`)
        }),
        optInStatusUrl: Joi.when('$dev', {
          is: true,
          then: Joi.string().default(`https://telemetry-staging.elastic.co/opt_in_status/${ENDPOINT_VERSION}/send`),
          otherwise: Joi.string().default(`https://telemetry.elastic.co/opt_in_status/${ENDPOINT_VERSION}/send`)
        }),
        sendUsageFrom: Joi.string().allow(['server', 'browser']).default('browser')
      }).default();
    },

    uiExports: {
      managementSections: ['plugins/telemetry/views/management'],
      uiSettingDefaults: {
        [_constants.CONFIG_TELEMETRY]: {
          name: _i18n.i18n.translate('telemetry.telemetryConfigTitle', {
            defaultMessage: 'Telemetry opt-in'
          }),
          description: (0, _constants.getConfigTelemetryDesc)(),
          value: false,
          readonly: true
        }
      },
      savedObjectSchemas: {
        telemetry: {
          isNamespaceAgnostic: true
        }
      },

      async replaceInjectedVars(originalInjectedVars, request, server) {
        const telemetryInjectedVars = await (0, _server.replaceTelemetryInjectedVars)(request, server);
        return Object.assign({}, originalInjectedVars, telemetryInjectedVars);
      },

      injectDefaultVars(server) {
        const config = server.config();
        return {
          telemetryEnabled: (0, _get_xpack_config_with_deprecated.getXpackConfigWithDeprecated)(config, 'telemetry.enabled'),
          telemetryUrl: (0, _get_xpack_config_with_deprecated.getXpackConfigWithDeprecated)(config, 'telemetry.url'),
          telemetryBanner: config.get('telemetry.allowChangingOptInStatus') !== false && (0, _get_xpack_config_with_deprecated.getXpackConfigWithDeprecated)(config, 'telemetry.banner'),
          telemetryOptedIn: config.get('telemetry.optIn'),
          telemetryOptInStatusUrl: config.get('telemetry.optInStatusUrl'),
          allowChangingOptInStatus: config.get('telemetry.allowChangingOptInStatus'),
          telemetrySendUsageFrom: config.get('telemetry.sendUsageFrom'),
          telemetryNotifyUserAboutOptInDefault: false
        };
      },

      hacks: ['plugins/telemetry/hacks/telemetry_init', 'plugins/telemetry/hacks/telemetry_opt_in'],
      mappings: _mappings.default
    },

    postInit(server) {
      const fetcherTask = new _server.FetcherTask(server);
      fetcherTask.start();
    },

    init(server) {
      const {
        usageCollection
      } = server.newPlatform.setup.plugins;
      const initializerContext = {
        env: {
          packageInfo: {
            version: server.config().get('pkg.version')
          }
        },
        config: {
          create() {
            const config = server.config();
            return Rx.of({
              enabled: config.get('telemetry.enabled'),
              optIn: config.get('telemetry.optIn'),
              config: config.get('telemetry.config'),
              banner: config.get('telemetry.banner'),
              url: config.get('telemetry.url'),
              allowChangingOptInStatus: config.get('telemetry.allowChangingOptInStatus')
            });
          }

        }
      };
      const coreSetup = {
        http: {
          server
        },
        log: server.log
      };
      const pluginsSetup = {
        usageCollection
      };
      (0, _server.telemetryPlugin)(initializerContext).setup(coreSetup, pluginsSetup, server);
    }

  });
}; // eslint-disable-next-line import/no-default-export


var _default = telemetry;
exports.default = _default;
module.exports = exports.default;