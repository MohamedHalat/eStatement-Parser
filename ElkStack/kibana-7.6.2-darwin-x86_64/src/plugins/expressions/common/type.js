"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;
exports.serializeProvider = serializeProvider;
exports.Type = void 0;

var _lodash = require("lodash");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getType(node) {
  if (node == null) return 'null';

  if (typeof node === 'object') {
    if (!node.type) throw new Error('Objects must have a type property');
    return node.type;
  }

  return typeof node;
}

function serializeProvider(types) {
  return {
    serialize: provider('serialize'),
    deserialize: provider('deserialize')
  };

  function provider(key) {
    return context => {
      const type = getType(context);
      const typeDef = types[type];

      const fn = (0, _lodash.get)(typeDef, key) || _lodash.identity;

      return fn(context);
    };
  }
}

class Type {
  /**
   * A short help text.
   */

  /**
   * Type validation, useful for checking function output.
   */

  /**
   * Optional serialization (used when passing context around client/server).
   */
  constructor(config) {
    this.config = config;

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "help", void 0);

    _defineProperty(this, "validate", void 0);

    _defineProperty(this, "create", void 0);

    _defineProperty(this, "serialize", void 0);

    _defineProperty(this, "deserialize", void 0);

    _defineProperty(this, "getToFn", value => (0, _lodash.get)(this.config, ['to', value]) || (0, _lodash.get)(this.config, ['to', '*']));

    _defineProperty(this, "getFromFn", value => (0, _lodash.get)(this.config, ['from', value]) || (0, _lodash.get)(this.config, ['from', '*']));

    _defineProperty(this, "castsTo", value => typeof this.getToFn(value) === 'function');

    _defineProperty(this, "castsFrom", value => typeof this.getFromFn(value) === 'function');

    _defineProperty(this, "to", (node, toTypeName, types) => {
      const typeName = getType(node);

      if (typeName !== this.name) {
        throw new Error(`Can not cast object of type '${typeName}' using '${this.name}'`);
      } else if (!this.castsTo(toTypeName)) {
        throw new Error(`Can not cast '${typeName}' to '${toTypeName}'`);
      }

      return this.getToFn(toTypeName)(node, types);
    });

    _defineProperty(this, "from", (node, types) => {
      const typeName = getType(node);
      if (!this.castsFrom(typeName)) throw new Error(`Can not cast '${this.name}' from ${typeName}`);
      return this.getFromFn(typeName)(node, types);
    });

    const {
      name,
      help,
      deserialize,
      serialize,
      validate
    } = config;
    this.name = name;
    this.help = help || '';

    this.validate = validate || (() => {}); // Optional


    this.create = config.create;
    this.serialize = serialize;
    this.deserialize = deserialize;
  }

}

exports.Type = Type;