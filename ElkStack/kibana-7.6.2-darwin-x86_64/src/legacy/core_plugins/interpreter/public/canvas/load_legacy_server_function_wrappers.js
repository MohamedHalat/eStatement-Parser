"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;
exports.serializeProvider = serializeProvider;
exports.loadLegacyServerFunctionWrappers = void 0;

var _lodash = require("lodash");

var _new_platform = require("ui/new_platform");

var _consts = require("./consts");

var _batched_fetch = require("./batched_fetch");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getType(node) {
  if (node == null) return 'null';

  if (_typeof(node) === 'object') {
    if (!node.type) throw new Error('Objects must have a type property');
    return node.type;
  }

  return _typeof(node);
}

function serializeProvider(types) {
  return {
    serialize: provider('serialize'),
    deserialize: provider('deserialize')
  };

  function provider(key) {
    return function (context) {
      var type = getType(context);
      var typeDef = types[type];

      var fn = (0, _lodash.get)(typeDef, key) || _lodash.identity;

      return fn(context);
    };
  }
}

var cached = null;

var loadLegacyServerFunctionWrappers = function loadLegacyServerFunctionWrappers() {
  return regeneratorRuntime.async(function loadLegacyServerFunctionWrappers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!cached) {
            cached = function _callee() {
              var serverFunctionList, types, _serializeProvider, serialize, batch;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(_new_platform.npSetup.core.http.get(_consts.FUNCTIONS_URL));

                    case 2:
                      serverFunctionList = _context.sent;
                      types = _new_platform.npSetup.plugins.expressions.__LEGACY.types.toJS();
                      _serializeProvider = serializeProvider(types), serialize = _serializeProvider.serialize;
                      batch = (0, _batched_fetch.batchedFetch)({
                        fetchStreaming: _new_platform.npStart.plugins.bfetch.fetchStreaming,
                        serialize: serialize
                      }); // For every sever-side function, register a client-side
                      // function that matches its definition, but which simply
                      // calls the server-side function endpoint.

                      Object.keys(serverFunctionList).forEach(function (functionName) {
                        var fn = function fn() {
                          return _objectSpread({}, serverFunctionList[functionName], {
                            fn: function fn(context, args) {
                              return batch({
                                functionName: functionName,
                                args: args,
                                context: context
                              });
                            }
                          });
                        };

                        _new_platform.npSetup.plugins.expressions.registerFunction(fn);
                      });

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }();
          }

          return _context2.abrupt("return", cached);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.loadLegacyServerFunctionWrappers = loadLegacyServerFunctionWrappers;