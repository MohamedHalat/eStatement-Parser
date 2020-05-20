"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fetch = void 0;

var _lodash = require("lodash");

var _url = require("url");

var _http_fetch_error = require("./http_fetch_error");

var _http_intercept_controller = require("./http_intercept_controller");

var _response = require("./response");

var _intercept = require("./intercept");

var _http_intercept_halt_error = require("./http_intercept_halt_error");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSON_CONTENT = /^(application\/(json|x-javascript)|text\/(x-)?javascript|x-json)(;.*)?$/;
var NDJSON_CONTENT = /^(application\/ndjson)(;.*)?$/;

var Fetch =
/*#__PURE__*/
function () {
  function Fetch(params) {
    var _this = this;

    _classCallCheck(this, Fetch);

    this.params = params;

    _defineProperty(this, "interceptors", new Set());

    _defineProperty(this, "delete", this.shorthand('DELETE'));

    _defineProperty(this, "get", this.shorthand('GET'));

    _defineProperty(this, "head", this.shorthand('HEAD'));

    _defineProperty(this, "options", this.shorthand('options'));

    _defineProperty(this, "patch", this.shorthand('PATCH'));

    _defineProperty(this, "post", this.shorthand('POST'));

    _defineProperty(this, "put", this.shorthand('PUT'));

    _defineProperty(this, "fetch", function _callee2(path) {
      var options,
          initialRequest,
          controller,
          _args2 = arguments;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              initialRequest = _this.createRequest(path, options);
              controller = new _http_intercept_controller.HttpInterceptController(); // We wrap the interception in a separate promise to ensure that when
              // a halt is called we do not resolve or reject, halting handling of the promise.

              return _context2.abrupt("return", new Promise(function _callee(resolve, reject) {
                var interceptedRequest, initialResponse, interceptedResponse;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return regeneratorRuntime.awrap((0, _intercept.interceptRequest)(initialRequest, _this.interceptors, controller));

                      case 3:
                        interceptedRequest = _context.sent;
                        initialResponse = _this.fetchResponse(interceptedRequest);
                        _context.next = 7;
                        return regeneratorRuntime.awrap((0, _intercept.interceptResponse)(initialResponse, _this.interceptors, controller));

                      case 7:
                        interceptedResponse = _context.sent;

                        if (options.asResponse) {
                          resolve(interceptedResponse);
                        } else {
                          resolve(interceptedResponse.body);
                        }

                        _context.next = 14;
                        break;

                      case 11:
                        _context.prev = 11;
                        _context.t0 = _context["catch"](0);

                        if (!(_context.t0 instanceof _http_intercept_halt_error.HttpInterceptHaltError)) {
                          reject(_context.t0);
                        }

                      case 14:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, null, null, [[0, 11]]);
              }));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  }

  _createClass(Fetch, [{
    key: "intercept",
    value: function intercept(interceptor) {
      var _this2 = this;

      this.interceptors.add(interceptor);
      return function () {
        _this2.interceptors.delete(interceptor);
      };
    }
  }, {
    key: "removeAllInterceptors",
    value: function removeAllInterceptors() {
      this.interceptors.clear();
    }
  }, {
    key: "createRequest",
    value: function createRequest(path, options) {
      // Merge and destructure options out that are not applicable to the Fetch API.
      var _merge = (0, _lodash.merge)({
        method: 'GET',
        credentials: 'same-origin',
        prependBasePath: true,
        headers: {
          'kbn-version': this.params.kibanaVersion,
          'Content-Type': 'application/json'
        }
      }, options || {}),
          query = _merge.query,
          shouldPrependBasePath = _merge.prependBasePath,
          asResponse = _merge.asResponse,
          fetchOptions = _objectWithoutProperties(_merge, ["query", "prependBasePath", "asResponse"]);

      var url = (0, _url.format)({
        pathname: shouldPrependBasePath ? this.params.basePath.prepend(path) : path,
        query: query
      });

      if (options && options.headers && 'Content-Type' in options.headers && options.headers['Content-Type'] === undefined) {
        delete fetchOptions.headers['Content-Type'];
      }

      return new Request(url, fetchOptions);
    }
  }, {
    key: "fetchResponse",
    value: function fetchResponse(request) {
      var response, body, _err$name, contentType, text, _err$name2;

      return regeneratorRuntime.async(function fetchResponse$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              body = null;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(window.fetch(request));

            case 4:
              response = _context3.sent;
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);
              throw new _http_fetch_error.HttpFetchError(_context3.t0.message, (_err$name = _context3.t0.name) !== null && _err$name !== void 0 ? _err$name : 'Error', request);

            case 10:
              contentType = response.headers.get('Content-Type') || '';
              _context3.prev = 11;

              if (!NDJSON_CONTENT.test(contentType)) {
                _context3.next = 18;
                break;
              }

              _context3.next = 15;
              return regeneratorRuntime.awrap(response.blob());

            case 15:
              body = _context3.sent;
              _context3.next = 28;
              break;

            case 18:
              if (!JSON_CONTENT.test(contentType)) {
                _context3.next = 24;
                break;
              }

              _context3.next = 21;
              return regeneratorRuntime.awrap(response.json());

            case 21:
              body = _context3.sent;
              _context3.next = 28;
              break;

            case 24:
              _context3.next = 26;
              return regeneratorRuntime.awrap(response.text());

            case 26:
              text = _context3.sent;

              try {
                body = JSON.parse(text);
              } catch (err) {
                body = text;
              }

            case 28:
              _context3.next = 33;
              break;

            case 30:
              _context3.prev = 30;
              _context3.t1 = _context3["catch"](11);
              throw new _http_fetch_error.HttpFetchError(_context3.t1.message, (_err$name2 = _context3.t1.name) !== null && _err$name2 !== void 0 ? _err$name2 : 'Error', request, response, body);

            case 33:
              if (response.ok) {
                _context3.next = 35;
                break;
              }

              throw new _http_fetch_error.HttpFetchError(response.statusText, 'Error', request, response, body);

            case 35:
              return _context3.abrupt("return", new _response.HttpResponse({
                request: request,
                response: response,
                body: body
              }));

            case 36:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 7], [11, 30]]);
    }
  }, {
    key: "shorthand",
    value: function shorthand(method) {
      var _this3 = this;

      return function (path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return _this3.fetch(path, _objectSpread({}, options, {
          method: method
        }));
      };
    }
  }]);

  return Fetch;
}();

exports.Fetch = Fetch;