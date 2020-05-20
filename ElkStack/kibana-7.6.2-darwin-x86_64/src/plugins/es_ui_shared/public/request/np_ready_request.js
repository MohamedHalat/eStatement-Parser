"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRequest = exports.sendRequest = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sendRequest = function sendRequest(httpClient, _ref) {
  var path, method, body, query, response;
  return regeneratorRuntime.async(function sendRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          path = _ref.path, method = _ref.method, body = _ref.body, query = _ref.query;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(httpClient[method](path, {
            body: body,
            query: query
          }));

        case 4:
          response = _context.sent;
          return _context.abrupt("return", {
            data: response.data ? response.data : response,
            error: null
          });

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", {
            data: null,
            error: _context.t0.response && _context.t0.response.data ? _context.t0.response.data : _context.t0.body
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.sendRequest = sendRequest;

var useRequest = function useRequest(httpClient, _ref2) {
  var path = _ref2.path,
      method = _ref2.method,
      query = _ref2.query,
      body = _ref2.body,
      pollIntervalMs = _ref2.pollIntervalMs,
      initialData = _ref2.initialData,
      _ref2$deserializer = _ref2.deserializer,
      deserializer = _ref2$deserializer === void 0 ? function (data) {
    return data;
  } : _ref2$deserializer;

  // Main states for tracking request status and data
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(initialData),
      _useState6 = _slicedToArray(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1]; // Consumers can use isInitialRequest to implement a polling UX.


  var _useState7 = (0, _react.useState)(true),
      _useState8 = _slicedToArray(_useState7, 2),
      isInitialRequest = _useState8[0],
      setIsInitialRequest = _useState8[1];

  var pollInterval = (0, _react.useRef)(null);
  var pollIntervalId = (0, _react.useRef)(null); // We always want to use the most recently-set interval in scheduleRequest.

  pollInterval.current = pollIntervalMs; // Tied to every render and bound to each request.

  var isOutdatedRequest = false;

  var scheduleRequest = function scheduleRequest() {
    // Clear current interval
    if (pollIntervalId.current) {
      clearTimeout(pollIntervalId.current);
    } // Set new interval


    if (pollInterval.current) {
      pollIntervalId.current = setTimeout(_sendRequest, pollInterval.current);
    }
  };

  var _sendRequest = function _sendRequest() {
    var requestBody, response, serializedResponseData, responseError, responseData;
    return regeneratorRuntime.async(function _sendRequest$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // We don't clear error or data, so it's up to the consumer to decide whether to display the
            // "old" error/data or loading state when a new request is in-flight.
            setIsLoading(true);
            requestBody = {
              path: path,
              method: method,
              query: query,
              body: body
            };
            _context2.next = 4;
            return regeneratorRuntime.awrap(sendRequest(httpClient, requestBody));

          case 4:
            response = _context2.sent;
            serializedResponseData = response.data, responseError = response.error;
            responseData = deserializer(serializedResponseData); // If an outdated request has resolved, DON'T update state, but DO allow the processData handler
            // to execute side effects like update telemetry.

            if (!isOutdatedRequest) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", {
              data: null,
              error: null
            });

          case 9:
            setError(responseError);
            setData(responseData);
            setIsLoading(false);
            setIsInitialRequest(false); // If we're on an interval, we need to schedule the next request. This also allows us to reset
            // the interval if the user has manually requested the data, to avoid doubled-up requests.

            scheduleRequest();
            return _context2.abrupt("return", {
              data: serializedResponseData,
              error: responseError
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  (0, _react.useEffect)(function () {
    _sendRequest(); // To be functionally correct we'd send a new request if the method, path, or body changes.
    // But it doesn't seem likely that the method will change and body is likely to be a new
    // object even if its shape hasn't changed, so for now we're just watching the path.

  }, [path]);
  (0, _react.useEffect)(function () {
    scheduleRequest(); // Clean up intervals and inflight requests and corresponding state changes

    return function () {
      isOutdatedRequest = true;

      if (pollIntervalId.current) {
        clearTimeout(pollIntervalId.current);
      }
    };
  }, [pollIntervalMs]);
  return {
    isInitialRequest: isInitialRequest,
    isLoading: isLoading,
    error: error,
    data: data,
    sendRequest: _sendRequest // Gives the user the ability to manually request data

  };
};

exports.useRequest = useRequest;