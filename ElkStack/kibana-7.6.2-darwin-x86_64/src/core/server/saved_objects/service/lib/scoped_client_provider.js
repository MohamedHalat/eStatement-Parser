"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsClientProvider = void 0;

var _priority_collection = require("./priority_collection");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Provider for the Scoped Saved Objects Client.
 *
 * @internal
 */
class SavedObjectsClientProvider {
  constructor({
    defaultClientFactory
  }) {
    _defineProperty(this, "_wrapperFactories", new _priority_collection.PriorityCollection());

    _defineProperty(this, "_clientFactory", void 0);

    _defineProperty(this, "_originalClientFactory", void 0);

    this._originalClientFactory = this._clientFactory = defaultClientFactory;
  }

  addClientWrapperFactory(priority, id, factory) {
    if (this._wrapperFactories.has(entry => entry.id === id)) {
      throw new Error(`wrapper factory with id ${id} is already defined`);
    }

    this._wrapperFactories.add(priority, {
      id,
      factory
    });
  }

  setClientFactory(customClientFactory) {
    if (this._clientFactory !== this._originalClientFactory) {
      throw new Error(`custom client factory is already set, unable to replace the current one`);
    }

    this._clientFactory = customClientFactory;
  }

  getClient(request, options = {}) {
    const client = this._clientFactory({
      request
    });

    const excludedWrappers = options.excludedWrappers || [];
    return this._wrapperFactories.toPrioritizedArray().reduceRight((clientToWrap, {
      id,
      factory
    }) => {
      if (excludedWrappers.includes(id)) {
        return clientToWrap;
      }

      return factory({
        request,
        client: clientToWrap
      });
    }, client);
  }

}

exports.SavedObjectsClientProvider = SavedObjectsClientProvider;