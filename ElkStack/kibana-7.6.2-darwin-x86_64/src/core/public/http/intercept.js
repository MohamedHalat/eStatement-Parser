"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interceptRequest = interceptRequest;
exports.interceptResponse = interceptResponse;

var _http_intercept_halt_error = require("./http_intercept_halt_error");

var _response = require("./response");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function interceptRequest(request, interceptors, controller) {
  var next;
  return regeneratorRuntime.async(function interceptRequest$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          next = request;
          return _context3.abrupt("return", _toConsumableArray(interceptors).reduceRight(function (promise, interceptor) {
            return promise.then(function _callee(current) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      next = current;
                      checkHalt(controller);

                      if (interceptor.request) {
                        _context.next = 4;
                        break;
                      }

                      return _context.abrupt("return", current);

                    case 4:
                      _context.next = 6;
                      return regeneratorRuntime.awrap(interceptor.request(current, controller));

                    case 6:
                      _context.t0 = _context.sent;

                      if (_context.t0) {
                        _context.next = 9;
                        break;
                      }

                      _context.t0 = current;

                    case 9:
                      return _context.abrupt("return", _context.t0);

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }, function _callee2(error) {
              var nextRequest;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      checkHalt(controller, error);

                      if (interceptor.requestError) {
                        _context2.next = 3;
                        break;
                      }

                      throw error;

                    case 3:
                      _context2.next = 5;
                      return regeneratorRuntime.awrap(interceptor.requestError({
                        error: error,
                        request: next
                      }, controller));

                    case 5:
                      nextRequest = _context2.sent;

                      if (nextRequest) {
                        _context2.next = 8;
                        break;
                      }

                      throw error;

                    case 8:
                      next = nextRequest;
                      return _context2.abrupt("return", next);

                    case 10:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
          }, Promise.resolve(request)));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function interceptResponse(responsePromise, interceptors, controller) {
  var current;
  return regeneratorRuntime.async(function interceptResponse$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_toConsumableArray(interceptors).reduce(function (promise, interceptor) {
            return promise.then(function _callee3(httpResponse) {
              var interceptorOverrides;
              return regeneratorRuntime.async(function _callee3$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      current = httpResponse;
                      checkHalt(controller);

                      if (interceptor.response) {
                        _context4.next = 4;
                        break;
                      }

                      return _context4.abrupt("return", httpResponse);

                    case 4:
                      _context4.next = 6;
                      return regeneratorRuntime.awrap(interceptor.response(httpResponse, controller));

                    case 6:
                      _context4.t0 = _context4.sent;

                      if (_context4.t0) {
                        _context4.next = 9;
                        break;
                      }

                      _context4.t0 = {};

                    case 9:
                      interceptorOverrides = _context4.t0;
                      return _context4.abrupt("return", new _response.HttpResponse(_objectSpread({}, httpResponse, {}, interceptorOverrides)));

                    case 11:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            }, function _callee4(error) {
              var request, _next;

              return regeneratorRuntime.async(function _callee4$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      request = error.request || current && current.request;
                      checkHalt(controller, error);

                      if (interceptor.responseError) {
                        _context5.next = 4;
                        break;
                      }

                      throw error;

                    case 4:
                      _context5.prev = 4;
                      _context5.next = 7;
                      return regeneratorRuntime.awrap(interceptor.responseError({
                        error: error,
                        request: request,
                        response: error.response || current && current.response,
                        body: error.body || current && current.body
                      }, controller));

                    case 7:
                      _next = _context5.sent;
                      checkHalt(controller, error);

                      if (_next) {
                        _context5.next = 11;
                        break;
                      }

                      throw error;

                    case 11:
                      return _context5.abrupt("return", new _response.HttpResponse(_objectSpread({}, _next, {
                        request: request
                      })));

                    case 14:
                      _context5.prev = 14;
                      _context5.t0 = _context5["catch"](4);
                      checkHalt(controller, _context5.t0);
                      throw _context5.t0;

                    case 18:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, null, null, [[4, 14]]);
            });
          }, responsePromise));

        case 2:
          return _context6.abrupt("return", _context6.sent);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function checkHalt(controller, error) {
  if (error instanceof _http_intercept_halt_error.HttpInterceptHaltError) {
    throw error;
  } else if (controller.halted) {
    throw new _http_intercept_halt_error.HttpInterceptHaltError();
  }
}