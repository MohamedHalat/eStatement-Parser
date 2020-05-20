"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendRequestToES = sendRequestToES;

var utils = _interopRequireWildcard(require("../../../lib/utils/utils"));

var es = _interopRequireWildcard(require("../../../lib/es/es"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
// @ts-ignore
var CURRENT_REQ_ID = 0;

function sendRequestToES(args) {
  var requests = args.requests.slice();
  return new Promise(function (resolve, reject) {
    var reqId = ++CURRENT_REQ_ID;
    var results = [];

    if (reqId !== CURRENT_REQ_ID) {
      return;
    }

    if (requests.length === 0) {
      return;
    }

    var isMultiRequest = requests.length > 1;

    var sendNextRequest = function sendNextRequest() {
      if (reqId !== CURRENT_REQ_ID) {
        resolve(results);
        return;
      }

      if (requests.length === 0) {
        resolve(results);
        return;
      }

      var req = requests.shift();
      var esPath = req.url;
      var esMethod = req.method;
      var esData = utils.collapseLiteralStrings(req.data.join('\n'));

      if (esData) {
        esData += '\n';
      } // append a new line for bulk requests.


      es.send(esMethod, esPath, esData).always(function (dataOrjqXHR, textStatus, jqXhrORerrorThrown) {
        if (reqId !== CURRENT_REQ_ID) {
          return;
        }

        var xhr = dataOrjqXHR.promise ? dataOrjqXHR : jqXhrORerrorThrown;
        var isSuccess = typeof xhr.status === 'number' && ( // Things like DELETE index where the index is not there are OK.
        xhr.status >= 200 && xhr.status < 300 || xhr.status === 404);

        if (isSuccess) {
          var value = xhr.responseText;
          var warnings = xhr.getResponseHeader('warning');

          if (warnings) {
            var deprecationMessages = utils.extractDeprecationMessages(warnings);
            value = deprecationMessages.join('\n') + '\n' + value;
          }

          if (isMultiRequest) {
            value = '# ' + req.method + ' ' + req.url + '\n' + value;
          }

          results.push({
            response: {
              contentType: xhr.getResponseHeader('Content-Type'),
              value: value
            },
            request: {
              data: esData,
              method: esMethod,
              path: esPath
            }
          }); // single request terminate via sendNextRequest as well

          sendNextRequest();
        } else {
          var _value;

          var contentType;

          if (xhr.responseText) {
            _value = xhr.responseText; // ES error should be shown

            contentType = xhr.getResponseHeader('Content-Type');
          } else {
            _value = 'Request failed to get to the server (status code: ' + xhr.status + ')';
            contentType = 'text/plain';
          }

          if (isMultiRequest) {
            _value = '# ' + req.method + ' ' + req.url + '\n' + _value;
          }

          reject({
            value: _value,
            contentType: contentType
          });
        }
      });
    };

    sendNextRequest();
  });
}