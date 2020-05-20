"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyESResp = applyESResp;

var _lodash = _interopRequireDefault(require("lodash"));

var _parse_search_source = require("ui/saved_objects/helpers/parse_search_source");

var _public = require("../../../../../plugins/kibana_utils/public");

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

/**
 * A given response of and ElasticSearch containing a plain saved object is applied to the given
 * savedObject
 */
function applyESResp(resp, savedObject, config) {
  var mapping, esType, injectReferences, hydrateIndexPattern, meta;
  return regeneratorRuntime.async(function applyESResp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mapping = (0, _public.expandShorthand)(config.mapping);
          esType = config.type || '';
          savedObject._source = _lodash.default.cloneDeep(resp._source);
          injectReferences = config.injectReferences;
          hydrateIndexPattern = savedObject.hydrateIndexPattern;

          if (!(typeof resp.found === 'boolean' && !resp.found)) {
            _context.next = 7;
            break;
          }

          throw new _public.SavedObjectNotFound(esType, savedObject.id || '');

        case 7:
          meta = resp._source.kibanaSavedObjectMeta || {};
          delete resp._source.kibanaSavedObjectMeta;

          if (!config.indexPattern && savedObject._source.indexPattern) {
            config.indexPattern = savedObject._source.indexPattern;
            delete savedObject._source.indexPattern;
          } // assign the defaults to the response


          _lodash.default.defaults(savedObject._source, savedObject.defaults); // transform the source using _deserializers


          _lodash.default.forOwn(mapping, function (fieldMapping, fieldName) {
            if (fieldMapping._deserialize && typeof fieldName === 'string') {
              savedObject._source[fieldName] = fieldMapping._deserialize(savedObject._source[fieldName]);
            }
          }); // Give obj all of the values in _source.fields


          _lodash.default.assign(savedObject, savedObject._source);

          savedObject.lastSavedTitle = savedObject.title;
          _context.next = 16;
          return regeneratorRuntime.awrap((0, _parse_search_source.parseSearchSource)(savedObject, esType, meta.searchSourceJSON, resp.references));

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(hydrateIndexPattern());

        case 18:
          if (injectReferences && resp.references && resp.references.length > 0) {
            injectReferences(savedObject, resp.references);
          }

          if (!(typeof config.afterESResp === 'function')) {
            _context.next = 23;
            break;
          }

          _context.next = 22;
          return regeneratorRuntime.awrap(config.afterESResp(savedObject));

        case 22:
          savedObject = _context.sent;

        case 23:
          return _context.abrupt("return", savedObject);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  });
}