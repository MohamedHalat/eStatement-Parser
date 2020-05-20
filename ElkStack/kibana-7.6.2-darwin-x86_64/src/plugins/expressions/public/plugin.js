"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionsPublicPlugin = void 0;

var _registries = require("./registries");

var _services = require("./services");

var _clog = require("./functions/clog");

var _font = require("./functions/font");

var _kibana = require("./functions/kibana");

var _kibana_context = require("./functions/kibana_context");

var _expression_types = require("../common/expression_types");

var _interpreter_provider = require("./interpreter_provider");

var _create_handlers = require("./create_handlers");

var _expression_renderer = require("./expression_renderer");

var _loader = require("./loader");

var _execute = require("./execute");

var _render = require("./render");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpressionsPublicPlugin =
/*#__PURE__*/
function () {
  function ExpressionsPublicPlugin(initializerContext) {
    _classCallCheck(this, ExpressionsPublicPlugin);

    _defineProperty(this, "functions", new _registries.FunctionsRegistry());

    _defineProperty(this, "renderers", new _registries.RenderFunctionsRegistry());

    _defineProperty(this, "types", new _registries.TypesRegistry());
  }

  _createClass(ExpressionsPublicPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var inspector = _ref.inspector;
      var functions = this.functions,
          renderers = this.renderers,
          types = this.types;
      (0, _services.setRenderersRegistry)(renderers);

      var registerFunction = function registerFunction(fn) {
        functions.register(fn);
      };

      registerFunction(_clog.clog);
      registerFunction(_font.font);
      registerFunction(_kibana.kibana);
      registerFunction(_kibana_context.kibanaContext);
      types.register(_expression_types.boolean);
      types.register(_expression_types.datatable);
      types.register(_expression_types.error);
      types.register(_expression_types.filter);
      types.register(_expression_types.image);
      types.register(_expression_types.nullType);
      types.register(_expression_types.number);
      types.register(_expression_types.pointseries);
      types.register(_expression_types.range);
      types.register(_expression_types.render);
      types.register(_expression_types.shape);
      types.register(_expression_types.string);
      types.register(_expression_types.style);
      types.register(_expression_types.kibanaContext);
      types.register(_expression_types.kibanaDatatable); // TODO: Refactor this function.

      var getExecutor = function getExecutor() {
        var interpretAst = function interpretAst(ast, context, handlers) {
          var interpret = (0, _interpreter_provider.interpreterProvider)({
            types: types.toJS(),
            handlers: _objectSpread({}, handlers, {}, (0, _create_handlers.createHandlers)()),
            functions: functions
          });
          return interpret(ast, context);
        };

        var executor = {
          interpreter: {
            interpretAst: interpretAst
          }
        };
        return executor;
      };

      (0, _services.setInterpreter)(getExecutor().interpreter);
      var setup = {
        registerFunction: registerFunction,
        registerRenderer: function registerRenderer(renderer) {
          renderers.register(renderer);
        },
        registerType: function registerType(type) {
          types.register(type);
        },
        __LEGACY: {
          functions: functions,
          renderers: renderers,
          types: types,
          getExecutor: getExecutor
        }
      };
      return setup;
    }
  }, {
    key: "start",
    value: function start(core, _ref2) {
      var inspector = _ref2.inspector;
      (0, _services.setCoreStart)(core);
      (0, _services.setInspector)(inspector);
      (0, _services.setNotifications)(core.notifications);
      return {
        execute: _execute.execute,
        ExpressionDataHandler: _execute.ExpressionDataHandler,
        ExpressionLoader: _loader.ExpressionLoader,
        ExpressionRenderer: _expression_renderer.ExpressionRendererImplementation,
        ExpressionRenderHandler: _render.ExpressionRenderHandler,
        loader: _loader.loader,
        render: _render.render
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return ExpressionsPublicPlugin;
}();

exports.ExpressionsPublicPlugin = ExpressionsPublicPlugin;