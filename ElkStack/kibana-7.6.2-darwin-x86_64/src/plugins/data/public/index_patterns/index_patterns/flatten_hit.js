"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenHitWrapper = flattenHitWrapper;
exports.createFlattenHitWrapper = createFlattenHitWrapper;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Takes a hit, merges it with any stored/scripted fields, and with the metaFields
// returns a flattened version
function flattenHit(indexPattern, hit, deep) {
  var flat = {}; // recursively merge _source

  var fields = indexPattern.fields.getByName;

  (function flatten(obj) {
    var keyPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    keyPrefix = keyPrefix ? keyPrefix + '.' : '';

    _lodash.default.forOwn(obj, function (val, key) {
      key = keyPrefix + key;

      if (deep) {
        var _field = fields(key);

        var isNestedField = _field && _field.type === 'nested';

        var isArrayOfObjects = Array.isArray(val) && _lodash.default.isPlainObject(_lodash.default.first(val));

        if (isArrayOfObjects && !isNestedField) {
          _lodash.default.each(val, function (v) {
            return flatten(v, key);
          });

          return;
        }
      } else if (flat[key] !== void 0) {
        return;
      }

      var field = fields(key);
      var hasValidMapping = field && field.type !== 'conflict';
      var isValue = !_lodash.default.isPlainObject(val);

      if (hasValidMapping || isValue) {
        if (!flat[key]) {
          flat[key] = val;
        } else if (Array.isArray(flat[key])) {
          flat[key].push(val);
        } else {
          flat[key] = [flat[key], val];
        }

        return;
      }

      flatten(val, key);
    });
  })(hit._source);

  return flat;
}

function decorateFlattenedWrapper(hit, metaFields) {
  return function (flattened) {
    // assign the meta fields
    _lodash.default.each(metaFields, function (meta) {
      if (meta === '_source') return;
      flattened[meta] = hit[meta];
    }); // unwrap computed fields


    _lodash.default.forOwn(hit.fields, function (val, key) {
      if (key[0] === '_' && !_lodash.default.contains(metaFields, key)) return;
      flattened[key] = Array.isArray(val) && val.length === 1 ? val[0] : val;
    });

    return flattened;
  };
}
/**
 * This is wrapped by `createFlattenHitWrapper` in order to provide a single cache to be
 * shared across all uses of this function. It is only exported here for use in mocks.
 *
 * @internal
 */


function flattenHitWrapper(indexPattern) {
  var metaFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new WeakMap();
  return function cachedFlatten(hit) {
    var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var decorateFlattened = decorateFlattenedWrapper(hit, metaFields);
    var cached = cache.get(hit);
    var flattened = cached || flattenHit(indexPattern, hit, deep);

    if (!cached) {
      cache.set(hit, _objectSpread({}, flattened));
    }

    return decorateFlattened(flattened);
  };
}
/**
 * This wraps `flattenHitWrapper` so one single cache can be provided for all uses of that
 * function. The returned value of this function is what is included in the index patterns
 * setup contract.
 *
 * @public
 */


function createFlattenHitWrapper() {
  var cache = new WeakMap();
  return _lodash.default.partial(flattenHitWrapper, _lodash.default, _lodash.default, cache);
}