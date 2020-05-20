"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batchedFetch = batchedFetch;

var _lodash = _interopRequireDefault(require("lodash"));

var _operators = require("rxjs/operators");

var _streaming = require("../../../../../plugins/bfetch/public/streaming");

var _public = require("../../../../../plugins/kibana_utils/public");

var _consts = require("./consts");

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
// eslint-disable-next-line

/**
 * Create a function which executes an Expression function on the
 * server as part of a larger batch of executions.
 */
function batchedFetch(_ref) {
  var fetchStreaming = _ref.fetchStreaming,
      serialize = _ref.serialize,
      _ref$ms = _ref.ms,
      ms = _ref$ms === void 0 ? 10 : _ref$ms;
  // Uniquely identifies each function call in a batch operation
  // so that the appropriate promise can be resolved / rejected later.
  var id = 0; // A map like { id: { future, request } }, which is used to
  // track all of the function calls in a batch operation.

  var batch = {};
  var timeout;

  var nextId = function nextId() {
    return ++id;
  };

  var reset = function reset() {
    id = 0;
    batch = {};
    timeout = undefined;
  };

  var runBatch = function runBatch() {
    processBatch(fetchStreaming, batch);
    reset();
  };

  return function (_ref2) {
    var functionName = _ref2.functionName,
        context = _ref2.context,
        args = _ref2.args;

    if (!timeout) {
      timeout = setTimeout(runBatch, ms);
    }

    var request = {
      functionName: functionName,
      args: args,
      context: serialize(context)
    }; // Check to see if this is a duplicate server function.

    var duplicate = Object.values(batch).find(function (batchedRequest) {
      return _lodash.default.isMatch(batchedRequest.request, request);
    }); // If it is, just return the promise of the duplicated request.

    if (duplicate) {
      return duplicate.future.promise;
    } // If not, create a new promise, id, and add it to the batched collection.


    var future = (0, _public.defer)();
    var newId = nextId();
    request.id = newId;
    batch[newId] = {
      future: future,
      request: request
    };
    return future.promise;
  };
}
/**
 * Runs the specified batch of functions on the server, then resolves
 * the related promises.
 */


function processBatch(fetchStreaming, batch) {
  var _fetchStreaming, stream, promise;

  return regeneratorRuntime.async(function processBatch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _fetchStreaming = fetchStreaming({
            url: _consts.FUNCTIONS_URL,
            body: JSON.stringify({
              functions: Object.values(batch).map(function (_ref3) {
                var request = _ref3.request;
                return request;
              })
            })
          }), stream = _fetchStreaming.stream, promise = _fetchStreaming.promise;
          stream.pipe((0, _streaming.split)('\n'), (0, _operators.filter)(Boolean), (0, _operators.map)(function (json) {
            return JSON.parse(json);
          })).subscribe(function (message) {
            var id = message.id,
                statusCode = message.statusCode,
                result = message.result;
            var future = batch[id].future;

            if (statusCode >= 400) {
              future.reject(result);
            } else {
              future.resolve(result);
            }
          });
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(promise);

        case 5:
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](2);
          Object.values(batch).forEach(function (_ref4) {
            var future = _ref4.future;
            future.reject(_context.t0);
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 7]]);
}