"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intializeSavedObject = intializeSavedObject;

var _lodash = _interopRequireDefault(require("lodash"));

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
 * Initialize saved object
 */
function intializeSavedObject(savedObject, savedObjectsClient, config) {
  var esType, resp, respMapped;
  return regeneratorRuntime.async(function intializeSavedObject$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          esType = config.type; // ensure that the esType is defined

          if (esType) {
            _context.next = 3;
            break;
          }

          throw new Error('You must define a type name to use SavedObject objects.');

        case 3:
          if (savedObject.id) {
            _context.next = 12;
            break;
          }

          // just assign the defaults and be done
          _lodash.default.assign(savedObject, savedObject.defaults);

          _context.next = 7;
          return regeneratorRuntime.awrap(savedObject.hydrateIndexPattern());

        case 7:
          if (!(typeof config.afterESResp === 'function')) {
            _context.next = 11;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(config.afterESResp(savedObject));

        case 10:
          savedObject = _context.sent;

        case 11:
          return _context.abrupt("return", savedObject);

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(savedObjectsClient.get(esType, savedObject.id));

        case 14:
          resp = _context.sent;
          respMapped = {
            _id: resp.id,
            _type: resp.type,
            _source: _lodash.default.cloneDeep(resp.attributes),
            references: resp.references,
            found: !!resp._version
          };
          _context.next = 18;
          return regeneratorRuntime.awrap(savedObject.applyESResp(respMapped));

        case 18:
          if (!(typeof config.init === 'function')) {
            _context.next = 21;
            break;
          }

          _context.next = 21;
          return regeneratorRuntime.awrap(config.init.call(savedObject));

        case 21:
          return _context.abrupt("return", savedObject);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
}