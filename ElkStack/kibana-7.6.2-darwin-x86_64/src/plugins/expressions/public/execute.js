"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;
exports.ExpressionDataHandler = void 0;

var _common = require("@kbn/interpreter/common");

var _public = require("../../inspector/public");

var _services = require("./services");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The search context describes a specific context (filters, time range and query)
 * that will be applied to the expression for execution. Not every expression will
 * be effected by that. You have to use special functions
 * that will pick up this search context and forward it to following functions that
 * understand it.
 */
var ExpressionDataHandler = function ExpressionDataHandler(expression, params) {
  var _this = this;

  _classCallCheck(this, ExpressionDataHandler);

  _defineProperty(this, "abortController", void 0);

  _defineProperty(this, "expression", void 0);

  _defineProperty(this, "ast", void 0);

  _defineProperty(this, "inspectorAdapters", void 0);

  _defineProperty(this, "promise", void 0);

  _defineProperty(this, "isPending", true);

  _defineProperty(this, "cancel", function () {
    _this.abortController.abort();
  });

  _defineProperty(this, "getData", function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_this.promise);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              type: 'error',
              error: {
                type: _context.t0.type,
                message: _context.t0.message,
                stack: _context.t0.stack
              }
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 6]]);
  });

  _defineProperty(this, "getExpression", function () {
    return _this.expression;
  });

  _defineProperty(this, "getAst", function () {
    return _this.ast;
  });

  _defineProperty(this, "inspect", function () {
    return _this.inspectorAdapters;
  });

  _defineProperty(this, "getActiveInspectorAdapters", function () {
    var adapters = {}; // Add the requests inspector adapters if the vis type explicitly requested it via
    // inspectorAdapters.requests: true in its definition or if it's using the courier
    // request handler, since that will automatically log its requests.

    adapters.requests = new _public.RequestAdapter(); // Add the data inspector adapter if the vis type requested it or if the
    // vis is using courier, since we know that courier supports logging
    // its data.

    adapters.data = new _public.DataAdapter();
    return adapters;
  });

  if (typeof expression === 'string') {
    this.expression = expression;
    this.ast = (0, _common.fromExpression)(expression);
  } else {
    this.ast = expression;
    this.expression = (0, _common.toExpression)(this.ast);
  }

  this.abortController = new AbortController();
  this.inspectorAdapters = params.inspectorAdapters || this.getActiveInspectorAdapters();

  var getInitialContext = function getInitialContext() {
    return _objectSpread({
      type: 'kibana_context'
    }, params.searchContext);
  };

  var defaultContext = {
    type: 'null'
  };
  var interpreter = (0, _services.getInterpreter)();
  this.promise = interpreter.interpretAst(this.ast, params.context || defaultContext, {
    getInitialContext: getInitialContext,
    inspectorAdapters: this.inspectorAdapters,
    abortSignal: this.abortController.signal
  }).then(function (v) {
    _this.isPending = false;
    return v;
  }, function () {
    _this.isPending = false;
  });
};

exports.ExpressionDataHandler = ExpressionDataHandler;

function execute(expression) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new ExpressionDataHandler(expression, params);
}