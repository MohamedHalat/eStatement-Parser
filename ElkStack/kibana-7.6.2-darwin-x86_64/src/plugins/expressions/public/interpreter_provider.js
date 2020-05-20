"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpreterProvider = interpreterProvider;
Object.defineProperty(exports, "createError", {
  enumerable: true,
  get: function get() {
    return _create_error.createError;
  }
});

var _common = require("@kbn/interpreter/common");

var _lodash = require("lodash");

var _create_error = require("./create_error");

var _type = require("../common/type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function interpreterProvider(config) {
  var functions = config.functions,
      types = config.types;

  var handlers = _objectSpread({}, config.handlers, {
    types: types
  });

  function cast(node, toTypeNames) {
    // If you don't give us anything to cast to, you'll get your input back
    if (!toTypeNames || toTypeNames.length === 0) return node; // No need to cast if node is already one of the valid types

    var fromTypeName = (0, _type.getType)(node);
    if (toTypeNames.includes(fromTypeName)) return node;
    var fromTypeDef = types[fromTypeName];

    for (var i = 0; i < toTypeNames.length; i++) {
      // First check if the current type can cast to this type
      if (fromTypeDef && fromTypeDef.castsTo(toTypeNames[i])) {
        return fromTypeDef.to(node, toTypeNames[i], types);
      } // If that isn't possible, check if this type can cast from the current type


      var toTypeDef = types[toTypeNames[i]];
      if (toTypeDef && toTypeDef.castsFrom(fromTypeName)) return toTypeDef.from(node, types);
    }

    throw new Error("Can not cast '".concat(fromTypeName, "' to any of '").concat(toTypeNames.join(', '), "'"));
  }

  function invokeChain(chainArr, context) {
    var chain, link, fnName, fnArgs, fnDef, _ref, resolvedArgs, newContext;

    return regeneratorRuntime.async(function invokeChain$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (chainArr.length) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", context);

          case 2:
            if (!(handlers.abortSignal && handlers.abortSignal.aborted)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", (0, _create_error.createError)({
              message: 'The expression was aborted.',
              name: 'AbortError'
            }));

          case 4:
            chain = (0, _lodash.clone)(chainArr);
            link = chain.shift(); // Every thing in the chain will always be a function right?

            if (link) {
              _context.next = 8;
              break;
            }

            throw Error('Function chain is empty.');

          case 8:
            fnName = link.function, fnArgs = link.arguments;
            fnDef = (0, _common.getByAlias)(functions.toJS(), fnName);

            if (fnDef) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", (0, _create_error.createError)({
              message: "Function ".concat(fnName, " could not be found.")
            }));

          case 12:
            _context.prev = 12;
            _context.next = 15;
            return regeneratorRuntime.awrap(resolveArgs(fnDef, context, fnArgs));

          case 15:
            _ref = _context.sent;
            resolvedArgs = _ref.resolvedArgs;
            _context.next = 19;
            return regeneratorRuntime.awrap(invokeFunction(fnDef, context, resolvedArgs));

          case 19:
            newContext = _context.sent;

            if (!((0, _type.getType)(newContext) === 'error')) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", newContext);

          case 22:
            return _context.abrupt("return", invokeChain(chain, newContext));

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](12);
            // Everything that throws from a function will hit this
            // The interpreter should *never* fail. It should always return a `{type: error}` on failure
            _context.t0.message = "[".concat(fnName, "] > ").concat(_context.t0.message);
            return _context.abrupt("return", (0, _create_error.createError)(_context.t0));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[12, 25]]);
  }

  function invokeFunction(fnDef, context, args) {
    var acceptableContext, fnOutput, returnType, expectedType, type;
    return regeneratorRuntime.async(function invokeFunction$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Check function input.
            acceptableContext = cast(context, fnDef.context ? fnDef.context.types : undefined);
            _context2.next = 3;
            return regeneratorRuntime.awrap(fnDef.fn(acceptableContext, args, handlers));

          case 3:
            fnOutput = _context2.sent;
            // Validate that the function returned the type it said it would.
            // This isn't really required, but it keeps function developers honest.
            returnType = (0, _type.getType)(fnOutput);
            expectedType = fnDef.type;

            if (!(expectedType && returnType !== expectedType)) {
              _context2.next = 8;
              break;
            }

            throw new Error("Function '".concat(fnDef.name, "' should return '").concat(expectedType, "',") + " actually returned '".concat(returnType, "'"));

          case 8:
            // Validate the function output against the type definition's validate function
            type = handlers.types[fnDef.type];

            if (!(type && type.validate)) {
              _context2.next = 17;
              break;
            }

            _context2.prev = 10;
            type.validate(fnOutput);
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](10);
            throw new Error("Output of '".concat(fnDef.name, "' is not a valid type '").concat(fnDef.type, "': ").concat(_context2.t0));

          case 17:
            return _context2.abrupt("return", fnOutput);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[10, 14]]);
  } // Processes the multi-valued AST argument values into arguments that can be passed to the function


  function resolveArgs(fnDef, context, argAsts) {
    var argDefs, dealiasedArgAsts, argAstsWithDefaults, resolveArgFns, argNames, resolvedArgValues, resolvedMultiArgs, resolvedArgs;
    return regeneratorRuntime.async(function resolveArgs$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            argDefs = fnDef.args; // Use the non-alias name from the argument definition

            dealiasedArgAsts = (0, _lodash.reduce)(argAsts, function (acc, argAst, argName) {
              var argDef = (0, _common.getByAlias)(argDefs, argName); // TODO: Implement a system to allow for undeclared arguments

              if (!argDef) {
                throw new Error("Unknown argument '".concat(argName, "' passed to function '").concat(fnDef.name, "'"));
              }

              acc[argDef.name] = (acc[argDef.name] || []).concat(argAst);
              return acc;
            }, {}); // Check for missing required arguments

            (0, _lodash.each)(argDefs, function (argDef) {
              var _ref2 = argDef,
                  aliases = _ref2.aliases,
                  argDefault = _ref2.default,
                  argName = _ref2.name,
                  required = _ref2.required;

              if (typeof argDefault === 'undefined' && required && typeof dealiasedArgAsts[argName] === 'undefined') {
                if (!aliases || aliases.length === 0) {
                  throw new Error("".concat(fnDef.name, " requires an argument"));
                } else {
                  var errorArg = argName === '_' ? aliases[0] : argName; // use an alias if _ is the missing arg

                  throw new Error("".concat(fnDef.name, " requires an \"").concat(errorArg, "\" argument"));
                }
              }
            }); // Fill in default values from argument definition

            argAstsWithDefaults = (0, _lodash.reduce)(argDefs, function (acc, argDef, argName) {
              if (typeof acc[argName] === 'undefined' && typeof argDef.default !== 'undefined') {
                acc[argName] = [(0, _common.fromExpression)(argDef.default, 'argument')];
              }

              return acc;
            }, dealiasedArgAsts); // Create the functions to resolve the argument ASTs into values
            // These are what are passed to the actual functions if you opt out of resolving

            resolveArgFns = (0, _lodash.mapValues)(argAstsWithDefaults, function (asts, argName) {
              return asts.map(function (item) {
                return function _callee() {
                  var ctx,
                      newContext,
                      _args3 = arguments;
                  return regeneratorRuntime.async(function _callee$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          ctx = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : context;
                          _context3.next = 3;
                          return regeneratorRuntime.awrap(interpret(item, ctx));

                        case 3:
                          newContext = _context3.sent;

                          if (!((0, _type.getType)(newContext) === 'error')) {
                            _context3.next = 6;
                            break;
                          }

                          throw newContext.error;

                        case 6:
                          return _context3.abrupt("return", cast(newContext, argDefs[argName].types));

                        case 7:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  });
                };
              });
            });
            argNames = (0, _lodash.keys)(resolveArgFns); // Actually resolve unless the argument definition says not to

            _context4.next = 8;
            return regeneratorRuntime.awrap(Promise.all(argNames.map(function (argName) {
              var interpretFns = resolveArgFns[argName];
              if (!argDefs[argName].resolve) return interpretFns;
              return Promise.all(interpretFns.map(function (fn) {
                return fn();
              }));
            })));

          case 8:
            resolvedArgValues = _context4.sent;
            resolvedMultiArgs = (0, _lodash.zipObject)(argNames, resolvedArgValues); // Just return the last unless the argument definition allows multiple

            resolvedArgs = (0, _lodash.mapValues)(resolvedMultiArgs, function (argValues, argName) {
              if (argDefs[argName].multi) return argValues;
              return (0, _lodash.last)(argValues);
            }); // Return an object here because the arguments themselves might actually have a 'then'
            // function which would be treated as a promise

            return _context4.abrupt("return", {
              resolvedArgs: resolvedArgs
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    });
  }

  var interpret = function interpret(ast) {
    var context,
        type,
        _args5 = arguments;
    return regeneratorRuntime.async(function interpret$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            context = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : null;
            type = (0, _type.getType)(ast);
            _context5.t0 = type;
            _context5.next = _context5.t0 === 'expression' ? 5 : _context5.t0 === 'string' ? 6 : _context5.t0 === 'number' ? 6 : _context5.t0 === 'null' ? 6 : _context5.t0 === 'boolean' ? 6 : 7;
            break;

          case 5:
            return _context5.abrupt("return", invokeChain(ast.chain, context));

          case 6:
            return _context5.abrupt("return", ast);

          case 7:
            throw new Error("Unknown AST object: ".concat(JSON.stringify(ast)));

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    });
  };

  return interpret;
}