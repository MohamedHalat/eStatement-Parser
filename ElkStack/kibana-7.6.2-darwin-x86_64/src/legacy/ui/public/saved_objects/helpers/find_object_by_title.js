"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findObjectByTitle = findObjectByTitle;

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
 * Returns an object matching a given title
 *
 * @param savedObjectsClient {SavedObjectsClientContract}
 * @param type {string}
 * @param title {string}
 * @returns {Promise<SimpleSavedObject|undefined>}
 */
function findObjectByTitle(savedObjectsClient, type, title) {
  var response;
  return regeneratorRuntime.async(function findObjectByTitle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (title) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return");

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(savedObjectsClient.find({
            type: type,
            perPage: 10,
            search: "\"".concat(title, "\""),
            searchFields: ['title'],
            fields: ['title']
          }));

        case 4:
          response = _context.sent;
          return _context.abrupt("return", response.savedObjects.find(function (obj) {
            return obj.get('title').toLowerCase() === title.toLowerCase();
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}