"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoutes = registerRoutes;

var _configSchema = require("@kbn/config-schema");

var _fetcher = require("./fetcher");

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
function registerRoutes(http) {
  const parseMetaFields = metaFields => {
    let parsedFields = [];

    if (typeof metaFields === 'string') {
      parsedFields = JSON.parse(metaFields);
    } else {
      parsedFields = metaFields;
    }

    return parsedFields;
  };

  const router = http.createRouter();
  router.get({
    path: '/api/index_patterns/_fields_for_wildcard',
    validate: {
      query: _configSchema.schema.object({
        pattern: _configSchema.schema.string(),
        meta_fields: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())], {
          defaultValue: []
        })
      })
    }
  }, async (context, request, response) => {
    const {
      callAsCurrentUser
    } = context.core.elasticsearch.dataClient;
    const indexPatterns = new _fetcher.IndexPatternsFetcher(callAsCurrentUser);
    const {
      pattern,
      meta_fields: metaFields
    } = request.query;
    let parsedFields = [];

    try {
      parsedFields = parseMetaFields(metaFields);
    } catch (error) {
      return response.badRequest();
    }

    try {
      const fields = await indexPatterns.getFieldsForWildcard({
        pattern,
        metaFields: parsedFields
      });
      return response.ok({
        body: {
          fields
        },
        headers: {
          'content-type': 'application/json'
        }
      });
    } catch (error) {
      return response.notFound();
    }
  });
  router.get({
    path: '/api/index_patterns/_fields_for_time_pattern',
    validate: {
      query: _configSchema.schema.object({
        pattern: _configSchema.schema.string(),
        interval: _configSchema.schema.maybe(_configSchema.schema.string()),
        look_back: _configSchema.schema.number({
          min: 1
        }),
        meta_fields: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())], {
          defaultValue: []
        })
      })
    }
  }, async (context, request, response) => {
    const {
      callAsCurrentUser
    } = context.core.elasticsearch.dataClient;
    const indexPatterns = new _fetcher.IndexPatternsFetcher(callAsCurrentUser);
    const {
      pattern,
      interval,
      look_back: lookBack,
      meta_fields: metaFields
    } = request.query;
    let parsedFields = [];

    try {
      parsedFields = parseMetaFields(metaFields);
    } catch (error) {
      return response.badRequest();
    }

    try {
      const fields = await indexPatterns.getFieldsForTimePattern({
        pattern,
        interval: interval ? interval : '',
        lookBack,
        metaFields: parsedFields
      });
      return response.ok({
        body: {
          fields
        },
        headers: {
          'content-type': 'application/json'
        }
      });
    } catch (error) {
      return response.notFound();
    }
  });
}