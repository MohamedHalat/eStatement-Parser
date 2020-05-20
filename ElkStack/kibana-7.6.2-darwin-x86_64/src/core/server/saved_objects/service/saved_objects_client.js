"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsClient = void 0;

var _errors = require("./lib/errors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @public
 */
class SavedObjectsClient {
  /** @internal */
  constructor(repository) {
    _defineProperty(this, "errors", _errors.SavedObjectsErrorHelpers);

    _defineProperty(this, "_repository", void 0);

    this._repository = repository;
  }
  /**
   * Persists a SavedObject
   *
   * @param type
   * @param attributes
   * @param options
   */


  async create(type, attributes, options) {
    return await this._repository.create(type, attributes, options);
  }
  /**
   * Persists multiple documents batched together as a single request
   *
   * @param objects
   * @param options
   */


  async bulkCreate(objects, options) {
    return await this._repository.bulkCreate(objects, options);
  }
  /**
   * Deletes a SavedObject
   *
   * @param type
   * @param id
   * @param options
   */


  async delete(type, id, options = {}) {
    return await this._repository.delete(type, id, options);
  }
  /**
   * Find all SavedObjects matching the search query
   *
   * @param options
   */


  async find(options) {
    return await this._repository.find(options);
  }
  /**
   * Returns an array of objects by id
   *
   * @param objects - an array of ids, or an array of objects containing id, type and optionally fields
   * @example
   *
   * bulkGet([
   *   { id: 'one', type: 'config' },
   *   { id: 'foo', type: 'index-pattern' }
   * ])
   */


  async bulkGet(objects = [], options = {}) {
    return await this._repository.bulkGet(objects, options);
  }
  /**
   * Retrieves a single object
   *
   * @param type - The type of SavedObject to retrieve
   * @param id - The ID of the SavedObject to retrieve
   * @param options
   */


  async get(type, id, options = {}) {
    return await this._repository.get(type, id, options);
  }
  /**
   * Updates an SavedObject
   *
   * @param type
   * @param id
   * @param options
   */


  async update(type, id, attributes, options = {}) {
    return await this._repository.update(type, id, attributes, options);
  }
  /**
   * Bulk Updates multiple SavedObject at once
   *
   * @param objects
   */


  async bulkUpdate(objects, options) {
    return await this._repository.bulkUpdate(objects, options);
  }

}

exports.SavedObjectsClient = SavedObjectsClient;

_defineProperty(SavedObjectsClient, "errors", _errors.SavedObjectsErrorHelpers);