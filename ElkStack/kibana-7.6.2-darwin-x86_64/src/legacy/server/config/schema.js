"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _os = _interopRequireDefault(require("os"));

var _utils = require("../../../core/server/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const HANDLED_IN_NEW_PLATFORM = _joi.default.any().description('This key is handled in the new platform ONLY');

var _default = () => _joi.default.object({
  pkg: _joi.default.object({
    version: _joi.default.string().default(_joi.default.ref('$version')),
    branch: _joi.default.string().default(_joi.default.ref('$branch')),
    buildNum: _joi.default.number().default(_joi.default.ref('$buildNum')),
    buildSha: _joi.default.string().default(_joi.default.ref('$buildSha'))
  }).default(),
  env: _joi.default.object({
    name: _joi.default.string().default(_joi.default.ref('$env')),
    dev: _joi.default.boolean().default(_joi.default.ref('$dev')),
    prod: _joi.default.boolean().default(_joi.default.ref('$prod'))
  }).default(),
  dev: _joi.default.object({
    basePathProxyTarget: _joi.default.number().default(5603)
  }).default(),
  pid: _joi.default.object({
    file: _joi.default.string(),
    exclusive: _joi.default.boolean().default(false)
  }).default(),
  csp: HANDLED_IN_NEW_PLATFORM,
  cpu: _joi.default.object({
    cgroup: _joi.default.object({
      path: _joi.default.object({
        override: _joi.default.string().default()
      })
    })
  }),
  cpuacct: _joi.default.object({
    cgroup: _joi.default.object({
      path: _joi.default.object({
        override: _joi.default.string().default()
      })
    })
  }),
  server: _joi.default.object({
    name: _joi.default.string().default(_os.default.hostname()),
    // keep them for BWC, remove when not used in Legacy.
    // validation should be in sync with one in New platform.
    // https://github.com/elastic/kibana/blob/master/src/core/server/http/http_config.ts
    basePath: _joi.default.string().default('').allow('').regex(/(^$|^\/.*[^\/]$)/, `start with a slash, don't end with one`),
    host: _joi.default.string().hostname().default('localhost'),
    port: _joi.default.number().default(5601),
    rewriteBasePath: _joi.default.boolean().when('basePath', {
      is: '',
      then: _joi.default.default(false).valid(false),
      otherwise: _joi.default.default(false)
    }),
    autoListen: HANDLED_IN_NEW_PLATFORM,
    cors: HANDLED_IN_NEW_PLATFORM,
    customResponseHeaders: HANDLED_IN_NEW_PLATFORM,
    keepaliveTimeout: HANDLED_IN_NEW_PLATFORM,
    maxPayloadBytes: HANDLED_IN_NEW_PLATFORM,
    socketTimeout: HANDLED_IN_NEW_PLATFORM,
    ssl: HANDLED_IN_NEW_PLATFORM,
    compression: HANDLED_IN_NEW_PLATFORM,
    uuid: HANDLED_IN_NEW_PLATFORM,
    xsrf: HANDLED_IN_NEW_PLATFORM
  }).default(),
  uiSettings: HANDLED_IN_NEW_PLATFORM,
  logging: _joi.default.object().keys({
    silent: _joi.default.boolean().default(false),
    quiet: _joi.default.boolean().when('silent', {
      is: true,
      then: _joi.default.default(true).valid(true),
      otherwise: _joi.default.default(false)
    }),
    verbose: _joi.default.boolean().when('quiet', {
      is: true,
      then: _joi.default.valid(false).default(false),
      otherwise: _joi.default.default(false)
    }),
    events: _joi.default.any().default({}),
    dest: _joi.default.string().default('stdout'),
    filter: _joi.default.any().default({}),
    json: _joi.default.boolean().when('dest', {
      is: 'stdout',
      then: _joi.default.default(!process.stdout.isTTY),
      otherwise: _joi.default.default(true)
    }),
    timezone: _joi.default.string().allow(false).default('UTC'),
    rotate: _joi.default.object().keys({
      enabled: _joi.default.boolean().default(false),
      everyBytes: _joi.default.number() // > 1MB
      .greater(1048576) // < 1GB
      .less(1073741825) // 10MB
      .default(10485760),
      keepFiles: _joi.default.number().greater(2).less(1024).default(7),
      pollingInterval: _joi.default.number().greater(5000).less(3600000).default(10000),
      usePolling: _joi.default.boolean().default(false)
    }).default()
  }).default(),
  ops: _joi.default.object({
    interval: _joi.default.number().default(5000)
  }).default(),
  plugins: _joi.default.object({
    paths: _joi.default.array().items(_joi.default.string()).default([]),
    scanDirs: _joi.default.array().items(_joi.default.string()).default([]),
    initialize: _joi.default.boolean().default(true)
  }).default(),
  path: HANDLED_IN_NEW_PLATFORM,
  stats: _joi.default.object({
    maximumWaitTimeForAllCollectorsInS: _joi.default.number().default(60)
  }).default(),
  optimize: _joi.default.object({
    enabled: _joi.default.boolean().default(true),
    bundleFilter: _joi.default.string().default('!tests'),
    bundleDir: _joi.default.string().default((0, _utils.fromRoot)('optimize/bundles')),
    viewCaching: _joi.default.boolean().default(_joi.default.ref('$prod')),
    watch: _joi.default.boolean().default(false),
    watchPort: _joi.default.number().default(5602),
    watchHost: _joi.default.string().hostname().default('localhost'),
    watchPrebuild: _joi.default.boolean().default(false),
    watchProxyTimeout: _joi.default.number().default(5 * 60000),
    useBundleCache: _joi.default.boolean().default(_joi.default.ref('$prod')),
    sourceMaps: _joi.default.when('$prod', {
      is: true,
      then: _joi.default.boolean().valid(false),
      otherwise: _joi.default.alternatives().try(_joi.default.string().required(), _joi.default.boolean()).default('#cheap-source-map')
    }),
    workers: _joi.default.number().min(1),
    profile: _joi.default.boolean().default(false)
  }).default(),
  status: _joi.default.object({
    allowAnonymous: _joi.default.boolean().default(false)
  }).default(),
  map: _joi.default.object({
    includeElasticMapsService: _joi.default.boolean().default(true),
    proxyElasticMapsServiceInMaps: _joi.default.boolean().default(false),
    tilemap: _joi.default.object({
      url: _joi.default.string(),
      options: _joi.default.object({
        attribution: _joi.default.string(),
        minZoom: _joi.default.number().min(0, 'Must be 0 or higher').default(0),
        maxZoom: _joi.default.number().default(10),
        tileSize: _joi.default.number(),
        subdomains: _joi.default.array().items(_joi.default.string()).single(),
        errorTileUrl: _joi.default.string().uri(),
        tms: _joi.default.boolean(),
        reuseTiles: _joi.default.boolean(),
        bounds: _joi.default.array().items(_joi.default.array().items(_joi.default.number()).min(2).required()).min(2),
        default: _joi.default.boolean()
      }).default({
        default: true
      })
    }).default(),
    regionmap: _joi.default.object({
      includeElasticMapsService: _joi.default.boolean().default(true),
      layers: _joi.default.array().items(_joi.default.object({
        url: _joi.default.string(),
        format: _joi.default.object({
          type: _joi.default.string().default('geojson')
        }).default({
          type: 'geojson'
        }),
        meta: _joi.default.object({
          feature_collection_path: _joi.default.string().default('data')
        }).default({
          feature_collection_path: 'data'
        }),
        attribution: _joi.default.string(),
        name: _joi.default.string(),
        fields: _joi.default.array().items(_joi.default.object({
          name: _joi.default.string(),
          description: _joi.default.string()
        }))
      })).default([])
    }).default(),
    manifestServiceUrl: _joi.default.string().default('').allow(''),
    emsFileApiUrl: _joi.default.string().default('https://vector.maps.elastic.co'),
    emsTileApiUrl: _joi.default.string().default('https://tiles.maps.elastic.co'),
    emsLandingPageUrl: _joi.default.string().default('https://maps.elastic.co/v7.6'),
    emsFontLibraryUrl: _joi.default.string().default('https://tiles.maps.elastic.co/fonts/{fontstack}/{range}.pbf'),
    emsTileLayerId: _joi.default.object({
      bright: _joi.default.string().default('road_map'),
      desaturated: _joi.default.string().default('road_map_desaturated'),
      dark: _joi.default.string().default('dark_map')
    }).default({
      bright: 'road_map',
      desaturated: 'road_map_desaturated',
      dark: 'dark_map'
    })
  }).default(),
  i18n: _joi.default.object({
    locale: _joi.default.string().default('en')
  }).default(),
  savedObjects: _joi.default.object({
    maxImportPayloadBytes: _joi.default.number().default(10485760),
    maxImportExportSize: _joi.default.number().default(10000)
  }).default()
}).default();

exports.default = _default;
module.exports = exports.default;