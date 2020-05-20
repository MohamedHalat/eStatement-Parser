"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSearchSource = parseSearchSource;

var _lodash = _interopRequireDefault(require("lodash"));

var _migrate_legacy_query = require("ui/utils/migrate_legacy_query");

var _public = require("../../../../../plugins/kibana_utils/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function parseSearchSource(savedObject, esType, searchSourceJson, references) {
  if (!savedObject.searchSource) return; // if we have a searchSource, set its values based on the searchSourceJson field

  var searchSourceValues;

  try {
    searchSourceValues = JSON.parse(searchSourceJson);
  } catch (e) {
    throw new _public.InvalidJSONProperty("Invalid JSON in ".concat(esType, " \"").concat(savedObject.id, "\". ").concat(e.message, " JSON: ").concat(searchSourceJson));
  } // This detects a scenario where documents with invalid JSON properties have been imported into the saved object index.
  // (This happened in issue #20308)


  if (!searchSourceValues || _typeof(searchSourceValues) !== 'object') {
    throw new _public.InvalidJSONProperty("Invalid searchSourceJSON in ".concat(esType, " \"").concat(savedObject.id, "\"."));
  } // Inject index id if a reference is saved


  if (searchSourceValues.indexRefName) {
    var reference = references.find(function (ref) {
      return ref.name === searchSourceValues.indexRefName;
    });

    if (!reference) {
      throw new Error("Could not find reference for ".concat(searchSourceValues.indexRefName, " on ").concat(savedObject.getEsType(), " ").concat(savedObject.id));
    }

    searchSourceValues.index = reference.id;
    delete searchSourceValues.indexRefName;
  }

  if (searchSourceValues.filter) {
    searchSourceValues.filter.forEach(function (filterRow) {
      if (!filterRow.meta || !filterRow.meta.indexRefName) {
        return;
      }

      var reference = references.find(function (ref) {
        return ref.name === filterRow.meta.indexRefName;
      });

      if (!reference) {
        throw new Error("Could not find reference for ".concat(filterRow.meta.indexRefName, " on ").concat(savedObject.getEsType()));
      }

      filterRow.meta.index = reference.id;
      delete filterRow.meta.indexRefName;
    });
  }

  var searchSourceFields = savedObject.searchSource.getFields();

  var fnProps = _lodash.default.transform(searchSourceFields, function (dynamic, val, name) {
    if (_lodash.default.isFunction(val) && name) dynamic[name] = val;
  }, {});

  savedObject.searchSource.setFields(_lodash.default.defaults(searchSourceValues, fnProps));
  var query = savedObject.searchSource.getOwnField('query');

  if (typeof query !== 'undefined') {
    savedObject.searchSource.setField('query', (0, _migrate_legacy_query.migrateLegacyQuery)(query));
  }
}