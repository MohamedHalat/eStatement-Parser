"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSoon = fetchSoon;

var _call_client = require("./call_client");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * This function introduces a slight delay in the request process to allow multiple requests to queue
 * up (e.g. when a dashboard is loading).
 */
function fetchSoon(request, options, _ref) {
  var es, config, esShardTimeout, msToDelay;
  return regeneratorRuntime.async(function fetchSoon$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          es = _ref.es, config = _ref.config, esShardTimeout = _ref.esShardTimeout;
          msToDelay = config.get('courier:batchSearches') ? 50 : 0;
          return _context.abrupt("return", delayedFetch(request, options, {
            es: es,
            config: config,
            esShardTimeout: esShardTimeout
          }, msToDelay));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}
/**
 * Delays executing a function for a given amount of time, and returns a promise that resolves
 * with the result.
 * @param fn The function to invoke
 * @param ms The number of milliseconds to wait
 * @return Promise<any> A promise that resolves with the result of executing the function
 */


function delay(fn, ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      return resolve(fn());
    }, ms);
  });
} // The current batch/queue of requests to fetch


var requestsToFetch = [];
var requestOptions = []; // The in-progress fetch (if there is one)

var fetchInProgress = null;
/**
 * Delay fetching for a given amount of time, while batching up the requests to be fetched.
 * Returns a promise that resolves with the response for the given request.
 * @param request The request to fetch
 * @param ms The number of milliseconds to wait (and batch requests)
 * @return Promise<SearchResponse> The response for the given request
 */

function delayedFetch(request, options, _ref2, ms) {
  var es, config, esShardTimeout, i, responses;
  return regeneratorRuntime.async(function delayedFetch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          es = _ref2.es, config = _ref2.config, esShardTimeout = _ref2.esShardTimeout;
          i = requestsToFetch.length;
          requestsToFetch = [].concat(_toConsumableArray(requestsToFetch), [request]);
          requestOptions = [].concat(_toConsumableArray(requestOptions), [options]);
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetchInProgress = fetchInProgress || delay(function () {
            var response = (0, _call_client.callClient)(requestsToFetch, requestOptions, {
              es: es,
              config: config,
              esShardTimeout: esShardTimeout
            });
            requestsToFetch = [];
            requestOptions = [];
            fetchInProgress = null;
            return response;
          }, ms));

        case 6:
          responses = _context2.sent;
          return _context2.abrupt("return", responses[i]);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}