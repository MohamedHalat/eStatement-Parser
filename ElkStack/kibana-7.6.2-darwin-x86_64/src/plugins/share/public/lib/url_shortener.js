"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortenUrl = shortenUrl;

var _url = _interopRequireDefault(require("url"));

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
function shortenUrl(absoluteUrl, _ref) {
  var basePath, post, parsedUrl, path, hash, relativeUrl, body, resp;
  return regeneratorRuntime.async(function shortenUrl$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          basePath = _ref.basePath, post = _ref.post;
          parsedUrl = _url.default.parse(absoluteUrl);

          if (!(!parsedUrl || !parsedUrl.path)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return");

        case 4:
          path = parsedUrl.path.replace(basePath, '');
          hash = parsedUrl.hash ? parsedUrl.hash : '';
          relativeUrl = path + hash;
          body = JSON.stringify({
            url: relativeUrl
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(post('/api/shorten_url', {
            body: body
          }));

        case 10:
          resp = _context.sent;
          return _context.abrupt("return", _url.default.format({
            protocol: parsedUrl.protocol,
            host: parsedUrl.host,
            pathname: "".concat(basePath, "/goto/").concat(resp.urlId)
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}