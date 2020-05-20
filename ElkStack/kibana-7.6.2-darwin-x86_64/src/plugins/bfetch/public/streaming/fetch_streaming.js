"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchStreaming = fetchStreaming;

var _common = require("../../../kibana_utils/common");

var _from_streaming_xhr = require("./from_streaming_xhr");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Sends an AJAX request to the server, and processes the result as a
 * streaming HTTP/1 response. Streams data as text through observable.
 */
function fetchStreaming(_ref) {
  var url = _ref.url,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'POST' : _ref$method,
      _ref$body = _ref.body,
      body = _ref$body === void 0 ? '' : _ref$body;
  var xhr = new window.XMLHttpRequest();

  var _defer = (0, _common.defer)(),
      promise = _defer.promise,
      resolve = _defer.resolve,
      reject = _defer.reject; // Begin the request


  xhr.open(method, url);
  xhr.withCredentials = true; // Set the HTTP headers

  Object.entries(headers).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];

    return xhr.setRequestHeader(k, v);
  });
  var stream = (0, _from_streaming_xhr.fromStreamingXhr)(xhr);
  stream.subscribe({
    complete: function complete() {
      return resolve();
    },
    error: function error(_error) {
      return reject(_error);
    }
  }); // Send the payload to the server

  xhr.send(body);
  return {
    xhr: xhr,
    promise: promise,
    stream: stream
  };
}