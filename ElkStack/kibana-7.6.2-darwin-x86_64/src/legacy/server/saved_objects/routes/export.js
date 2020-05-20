"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExportRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _jsonStableStringify = _interopRequireDefault(require("json-stable-stringify"));

var _streams = require("../../../utils/streams");

var _saved_objects = require("../../../../core/server/saved_objects");

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
// Disable lint errors for imports from src/core/server/saved_objects until SavedObjects migration is complete
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const createExportRoute = (prereqs, server, supportedTypes) => ({
  path: '/api/saved_objects/_export',
  method: 'POST',
  config: {
    pre: [prereqs.getSavedObjectsClient],
    validate: {
      payload: _joi.default.object().keys({
        type: _joi.default.array().items(_joi.default.string().valid(supportedTypes.sort())).single().optional(),
        objects: _joi.default.array().items({
          type: _joi.default.string().valid(supportedTypes.sort()).required(),
          id: _joi.default.string().required()
        }).max(server.config().get('savedObjects.maxImportExportSize')).optional(),
        search: _joi.default.string().optional(),
        includeReferencesDeep: _joi.default.boolean().default(false),
        excludeExportDetails: _joi.default.boolean().default(false)
      }).xor('type', 'objects').nand('search', 'objects').default()
    },

    async handler(request, h) {
      const {
        savedObjectsClient
      } = request.pre;
      const exportStream = await (0, _saved_objects.getSortedObjectsForExport)({
        savedObjectsClient,
        types: request.payload.type,
        search: request.payload.search,
        objects: request.payload.objects,
        exportSizeLimit: server.config().get('savedObjects.maxImportExportSize'),
        includeReferencesDeep: request.payload.includeReferencesDeep,
        excludeExportDetails: request.payload.excludeExportDetails
      });
      const docsToExport = await (0, _streams.createPromiseFromStreams)([exportStream, (0, _streams.createMapStream)(obj => {
        return (0, _jsonStableStringify.default)(obj);
      }), (0, _streams.createConcatStream)([])]);
      return h.response(docsToExport.join('\n')).header('Content-Disposition', `attachment; filename="export.ndjson"`).header('Content-Type', 'application/ndjson');
    }

  }
});

exports.createExportRoute = createExportRoute;