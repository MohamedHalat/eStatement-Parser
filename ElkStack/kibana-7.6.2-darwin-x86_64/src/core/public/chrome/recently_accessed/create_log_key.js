"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogKey = createLogKey;

var _utils = require("../../utils/");

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
function createLogKey(type, optionalIdentifier) {
  var baseKey, protectedIdentifier;
  return regeneratorRuntime.async(function createLogKey$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          baseKey = "kibana.history.".concat(type);

          if (optionalIdentifier) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", baseKey);

        case 3:
          protectedIdentifier = new _utils.Sha256().update(optionalIdentifier, 'utf8').digest('base64');
          return _context.abrupt("return", "".concat(baseKey, "-").concat(protectedIdentifier));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}