"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisData = getVisData;

var _lodash = _interopRequireDefault(require("lodash"));

var _operators = require("rxjs/operators");

var _get_panel_data = require("./vis_data/get_panel_data");

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
function getVisData(requestContext, options, framework, request) {
  // NOTE / TODO: This facade has been put in place to make migrating to the New Platform easier. It
  // removes the need to refactor many layers of dependencies on "req", and instead just augments the top
  // level object passed from here. The layers should be refactored fully at some point, but for now
  // this works and we are still using the New Platform services for these vis data portions.
  const reqFacade = { ...(request || {}),
    payload: options,
    getUiSettingsService: () => requestContext.core.uiSettings.client,
    getSavedObjectsClient: () => requestContext.core.savedObjects.client,
    server: {
      plugins: {
        elasticsearch: {
          getCluster: () => {
            return {
              callWithRequest: async (req, endpoint, params) => {
                return await requestContext.core.elasticsearch.dataClient.callAsCurrentUser(endpoint, params);
              }
            };
          }
        }
      }
    },
    getEsShardTimeout: async () => {
      return await framework.globalConfig$.pipe((0, _operators.first)(), (0, _operators.map)(config => config.elasticsearch.shardTimeout.asMilliseconds())).toPromise();
    }
  };
  const promises = reqFacade.payload.panels.map((0, _get_panel_data.getPanelData)(reqFacade));
  return Promise.all(promises).then(res => {
    return res.reduce((acc, data) => {
      return _lodash.default.assign(acc, data);
    }, {});
  });
}