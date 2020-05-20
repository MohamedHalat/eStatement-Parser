"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeSavedObject = serializeSavedObject;

var _lodash = _interopRequireDefault(require("lodash"));

var _angular = _interopRequireDefault(require("angular"));

var _public = require("../../../../../plugins/kibana_utils/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function serializeSavedObject(savedObject, config) {
  // mapping definition for the fields that this object will expose
  var mapping = (0, _public.expandShorthand)(config.mapping);
  var attributes = {};
  var references = [];

  _lodash.default.forOwn(mapping, function (fieldMapping, fieldName) {
    if (typeof fieldName !== 'string') {
      return;
    } // @ts-ignore


    var savedObjectFieldVal = savedObject[fieldName];

    if (savedObjectFieldVal != null) {
      attributes[fieldName] = fieldMapping._serialize ? fieldMapping._serialize(savedObjectFieldVal) : savedObjectFieldVal;
    }
  });

  if (savedObject.searchSource) {
    var searchSourceFields = _lodash.default.omit(savedObject.searchSource.getFields(), ['sort', 'size']);

    if (searchSourceFields.index) {
      // searchSourceFields.index will normally be an IndexPattern, but can be a string in two scenarios:
      // (1) `init()` (and by extension `hydrateIndexPattern()`) hasn't been called on  Saved Object
      // (2) The IndexPattern doesn't exist, so we fail to resolve it in `hydrateIndexPattern()`
      var indexId = typeof searchSourceFields.index === 'string' ? searchSourceFields.index : searchSourceFields.index.id;
      var refName = 'kibanaSavedObjectMeta.searchSourceJSON.index';
      references.push({
        name: refName,
        type: 'index-pattern',
        id: indexId
      });
      searchSourceFields = _objectSpread({}, searchSourceFields, {
        indexRefName: refName,
        index: undefined
      });
    }

    if (searchSourceFields.filter) {
      searchSourceFields = _objectSpread({}, searchSourceFields, {
        filter: searchSourceFields.filter.map(function (filterRow, i) {
          if (!filterRow.meta || !filterRow.meta.index) {
            return filterRow;
          }

          var refName = "kibanaSavedObjectMeta.searchSourceJSON.filter[".concat(i, "].meta.index");
          references.push({
            name: refName,
            type: 'index-pattern',
            id: filterRow.meta.index
          });
          return _objectSpread({}, filterRow, {
            meta: _objectSpread({}, filterRow.meta, {
              indexRefName: refName,
              index: undefined
            })
          });
        })
      });
    }

    attributes.kibanaSavedObjectMeta = {
      searchSourceJSON: _angular.default.toJson(searchSourceFields)
    };
  }

  return {
    attributes: attributes,
    references: references
  };
}