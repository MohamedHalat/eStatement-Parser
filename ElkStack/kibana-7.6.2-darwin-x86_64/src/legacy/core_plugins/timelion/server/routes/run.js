"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runRoute = runRoute;

var _joi = _interopRequireDefault(require("joi"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _lodash = _interopRequireDefault(require("lodash"));

var _chain_runner = _interopRequireDefault(require("../handlers/chain_runner.js"));

var _get_namespaced_settings = _interopRequireDefault(require("../lib/get_namespaced_settings"));

var _tl_config = _interopRequireDefault(require("../handlers/lib/tl_config"));

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
// @ts-ignore
// @ts-ignore
// @ts-ignore
const timelionDefaults = (0, _get_namespaced_settings.default)();

function formatErrorResponse(e, h) {
  return h.response({
    title: e.toString(),
    message: e.toString()
  }).code(500);
}

const requestPayload = {
  payload: _joi.default.object({
    sheet: _joi.default.array().items(_joi.default.string()).required(),
    extended: _joi.default.object({
      es: _joi.default.object({
        filter: _joi.default.object({
          bool: _joi.default.object({
            filter: _joi.default.array().allow(null),
            must: _joi.default.array().allow(null),
            should: _joi.default.array().allow(null),
            must_not: _joi.default.array().allow(null)
          })
        })
      })
    }).optional(),
    time: _joi.default.object({
      from: _joi.default.string(),
      interval: _joi.default.string().required(),
      timezone: _joi.default.string().required(),
      to: _joi.default.string()
    }).required()
  })
};

function runRoute(server) {
  server.route({
    method: 'POST',
    path: '/api/timelion/run',
    options: {
      validate: requestPayload
    },
    handler: async (request, h) => {
      try {
        const uiSettings = await request.getUiSettingsService().getAll();
        const tlConfig = (0, _tl_config.default)({
          server,
          request,
          settings: _lodash.default.defaults(uiSettings, timelionDefaults) // Just in case they delete some setting.

        });
        const chainRunner = (0, _chain_runner.default)(tlConfig);
        const sheet = await _bluebird.default.all(chainRunner.processRequest(request.payload));
        return {
          sheet,
          stats: chainRunner.getStats()
        };
      } catch (err) {
        server.log(['timelion', 'error'], `${err.toString()}: ${err.stack}`); // TODO Maybe we should just replace everywhere we throw with Boom? Probably.

        if (err.isBoom) {
          return err;
        } else {
          return formatErrorResponse(err, h);
        }
      }
    }
  });
}