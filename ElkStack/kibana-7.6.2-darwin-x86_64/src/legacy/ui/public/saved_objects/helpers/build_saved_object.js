"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSavedObject = buildSavedObject;

var _lodash = _interopRequireDefault(require("lodash"));

var _courier = require("ui/courier");

var _hydrate_index_pattern = require("./hydrate_index_pattern");

var _initialize_saved_object = require("./initialize_saved_object");

var _serialize_saved_object = require("./serialize_saved_object");

var _apply_es_resp = require("./apply_es_resp");

var _save_saved_object = require("./save_saved_object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildSavedObject(savedObject) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var services = arguments.length > 2 ? arguments[2] : undefined;
  var indexPatterns = services.indexPatterns,
      savedObjectsClient = services.savedObjectsClient; // type name for this object, used as the ES-type

  var esType = config.type || '';

  savedObject.getDisplayName = function () {
    return esType;
  }; // NOTE: this.type (not set in this file, but somewhere else) is the sub type, e.g. 'area' or
  // 'data table', while esType is the more generic type - e.g. 'visualization' or 'saved search'.


  savedObject.getEsType = function () {
    return esType;
  };
  /**
   * Flips to true during a save operation, and back to false once the save operation
   * completes.
   * @type {boolean}
   */


  savedObject.isSaving = false;
  savedObject.defaults = config.defaults || {}; // optional search source which this object configures

  savedObject.searchSource = config.searchSource ? new _courier.SearchSource() : undefined; // the id of the document

  savedObject.id = config.id || void 0; // the migration version of the document, should only be set on imports

  savedObject.migrationVersion = config.migrationVersion; // Whether to create a copy when the object is saved. This should eventually go away
  // in favor of a better rename/save flow.

  savedObject.copyOnSave = false;
  /**
   * After creation or fetching from ES, ensure that the searchSources index indexPattern
   * is an bonafide IndexPattern object.
   *
   * @return {Promise<IndexPattern | null>}
   */

  savedObject.hydrateIndexPattern = function (id) {
    return (0, _hydrate_index_pattern.hydrateIndexPattern)(id || '', savedObject, indexPatterns, config);
  };
  /**
   * Asynchronously initialize this object - will only run
   * once even if called multiple times.
   *
   * @return {Promise}
   * @resolved {SavedObject}
   */


  savedObject.init = _lodash.default.once(function () {
    return (0, _initialize_saved_object.intializeSavedObject)(savedObject, savedObjectsClient, config);
  });

  savedObject.applyESResp = function (resp) {
    return (0, _apply_es_resp.applyESResp)(resp, savedObject, config);
  };
  /**
   * Serialize this object
   * @return {Object}
   */


  savedObject._serialize = function () {
    return (0, _serialize_saved_object.serializeSavedObject)(savedObject, config);
  };
  /**
   * Returns true if the object's original title has been changed. New objects return false.
   * @return {boolean}
   */


  savedObject.isTitleChanged = function () {
    return savedObject._source && savedObject._source.title !== savedObject.title;
  };

  savedObject.creationOpts = function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _objectSpread({
      id: savedObject.id,
      migrationVersion: savedObject.migrationVersion
    }, opts);
  };

  savedObject.save = function _callee(opts) {
    var result;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _save_saved_object.saveSavedObject)(savedObject, config, opts, services));

          case 3:
            result = _context.sent;
            return _context.abrupt("return", Promise.resolve(result));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", Promise.reject(_context.t0));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };

  savedObject.destroy = function () {};
  /**
   * Delete this object from Elasticsearch
   * @return {promise}
   */


  savedObject.delete = function () {
    if (!savedObject.id) {
      return Promise.reject(new Error('Deleting a saved Object requires type and id'));
    }

    return savedObjectsClient.delete(esType, savedObject.id);
  };
}