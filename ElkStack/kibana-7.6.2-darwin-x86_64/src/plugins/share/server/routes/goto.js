"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGotoRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _short_url_assert_valid = require("./lib/short_url_assert_valid");

var _utils = require("../../../../core/utils");

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
const createGotoRoute = ({
  router,
  shortUrlLookup,
  http
}) => {
  router.get({
    path: '/goto/{urlId}',
    validate: {
      params: _configSchema.schema.object({
        urlId: _configSchema.schema.string()
      })
    }
  }, router.handleLegacyErrors(async function (context, request, response) {
    const basePath = http.basePath.get(request);
    const url = await shortUrlLookup.getUrl(request.params.urlId, {
      savedObjects: context.core.savedObjects.client
    });
    (0, _short_url_assert_valid.shortUrlAssertValid)(url);
    const uiSettings = context.core.uiSettings.client;
    const stateStoreInSessionStorage = await uiSettings.get('state:storeInSessionStorage');

    if (!stateStoreInSessionStorage) {
      const prependedUrl = (0, _utils.modifyUrl)(url, parts => {
        if (!parts.hostname && parts.pathname && parts.pathname.startsWith('/')) {
          parts.pathname = `${basePath}${parts.pathname}`;
        }
      });
      return response.redirected({
        headers: {
          location: prependedUrl
        }
      });
    }

    const prependedLegacyRedirectUrl = (0, _utils.modifyUrl)('/goto_LP/' + request.params.urlId, parts => {
      if (!parts.hostname && parts.pathname && parts.pathname.startsWith('/')) {
        parts.pathname = `${basePath}${parts.pathname}`;
      }
    });
    return response.redirected({
      headers: {
        location: prependedLegacyRedirectUrl
      }
    });
  }));
};

exports.createGotoRoute = createGotoRoute;