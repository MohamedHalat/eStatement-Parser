"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kibana = void 0;

var _i18n = require("@kbn/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var kibana = function kibana() {
  return {
    name: 'kibana',
    type: 'kibana_context',
    context: {
      types: ['kibana_context', 'null']
    },
    help: _i18n.i18n.translate('expressions.functions.kibana.help', {
      defaultMessage: 'Gets kibana global context'
    }),
    args: {},
    fn: function fn(context, args, handlers) {
      var initialContext = handlers.getInitialContext ? handlers.getInitialContext() : {};

      if (context && context.query) {
        initialContext.query = initialContext.query.concat(context.query);
      }

      if (context && context.filters) {
        initialContext.filters = initialContext.filters.concat(context.filters);
      }

      var timeRange = initialContext.timeRange || (context ? context.timeRange : undefined);
      return _objectSpread({}, context, {
        type: 'kibana_context',
        query: initialContext.query,
        filters: initialContext.filters,
        timeRange: timeRange
      });
    }
  };
};

exports.kibana = kibana;