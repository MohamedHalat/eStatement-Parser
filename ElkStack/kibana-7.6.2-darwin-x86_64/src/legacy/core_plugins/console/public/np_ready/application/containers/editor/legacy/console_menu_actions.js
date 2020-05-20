"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoIndent = autoIndent;
exports.getDocumentation = getDocumentation;

var _get_endpoint_from_position = require("../../../../lib/autocomplete/get_endpoint_from_position");

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
function autoIndent(editor, event) {
  return regeneratorRuntime.async(function autoIndent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          _context.next = 3;
          return regeneratorRuntime.awrap(editor.autoIndent());

        case 3:
          editor.getCoreEditor().getContainer().focus();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getDocumentation(editor, docLinkVersion) {
  return editor.getRequestsInRange().then(function (requests) {
    if (!requests || requests.length === 0) {
      return null;
    }

    var position = requests[0].range.end;
    position.column = position.column - 1;
    var endpoint = (0, _get_endpoint_from_position.getEndpointFromPosition)(editor.getCoreEditor(), position, editor.parser);

    if (endpoint && endpoint.documentation && endpoint.documentation.indexOf('http') !== -1) {
      return endpoint.documentation.replace('/master/', "/".concat(docLinkVersion, "/")).replace('/current/', "/".concat(docLinkVersion, "/"));
    } else {
      return null;
    }
  });
}