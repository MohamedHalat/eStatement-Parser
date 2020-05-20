"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _url = require("url");

var _path = require("path");

var _lodash = _interopRequireDefault(require("lodash"));

var _boom = _interopRequireDefault(require("boom"));

var _register_hapi_plugins = require("./register_hapi_plugins");

var _setup_base_path_provider = require("./setup_base_path_provider");

var _setup_default_route_provider = require("./setup_default_route_provider");

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
async function _default(kbnServer, server, config) {
  server = kbnServer.server;
  (0, _setup_base_path_provider.setupBasePathProvider)(kbnServer);
  (0, _setup_default_route_provider.setupDefaultRouteProvider)(server);
  await (0, _register_hapi_plugins.registerHapiPlugins)(server); // provide a simple way to expose static directories

  server.decorate('server', 'exposeStaticDir', function (routePath, dirPath) {
    this.route({
      path: routePath,
      method: 'GET',
      handler: {
        directory: {
          path: dirPath,
          listing: false,
          lookupCompressed: true
        }
      },
      config: {
        auth: false
      }
    });
  }); // helper for creating view managers for servers

  server.decorate('server', 'setupViews', function (path, engines) {
    this.views({
      path: path,
      isCached: config.get('optimize.viewCaching'),
      engines: _lodash.default.assign({
        pug: require('pug')
      }, engines || {})
    });
  });
  server.route({
    path: '/',
    method: 'GET',

    async handler(req, h) {
      return h.redirect((await req.getDefaultRoute()));
    }

  });
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: function (req, h) {
      const path = req.path;

      if (path === '/' || path.charAt(path.length - 1) !== '/') {
        throw _boom.default.notFound();
      }

      const pathPrefix = req.getBasePath() ? `${req.getBasePath()}/` : '';
      return h.redirect((0, _url.format)({
        search: req.url.search,
        pathname: pathPrefix + path.slice(0, -1)
      })).permanent(true);
    }
  }); // Expose static assets

  server.exposeStaticDir('/ui/{path*}', (0, _path.resolve)(__dirname, '../../ui/public/assets'));
}

module.exports = exports.default;