"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatHitProvider = formatHitProvider;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var formattedCache = new WeakMap();
var partialFormattedCache = new WeakMap(); // Takes a hit, merges it with any stored/scripted fields, and with the metaFields
// returns a formatted version

function formatHitProvider(indexPattern, defaultFormat) {
  function convert(hit, val, fieldName) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'html';
    var field = indexPattern.fields.getByName(fieldName);
    var format = field ? field.format : defaultFormat;
    return format.convert(val, type, {
      field: field,
      hit: hit
    });
  }

  function formatHit(hit) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'html';

    if (type === 'text') {
      // formatHit of type text is for react components to get rid of <span ng-non-bindable>
      // since it's currently just used at the discover's doc view table, caching is not necessary
      var flattened = indexPattern.flattenHit(hit);
      var result = {};

      for (var _i = 0, _Object$entries = Object.entries(flattened); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        result[key] = convert(hit, value, key, type);
      }

      return result;
    }

    var cached = formattedCache.get(hit);

    if (cached) {
      return cached;
    } // use and update the partial cache, but don't rewrite it.
    // _source is stored in partialFormattedCache but not formattedCache


    var partials = partialFormattedCache.get(hit) || {};
    partialFormattedCache.set(hit, partials);
    var cache = {};
    formattedCache.set(hit, cache);

    _lodash.default.forOwn(indexPattern.flattenHit(hit), function (val, fieldName) {
      // sync the formatted and partial cache
      if (!fieldName) {
        return;
      }

      var formatted = partials[fieldName] == null ? convert(hit, val, fieldName) : partials[fieldName];
      cache[fieldName] = partials[fieldName] = formatted;
    });

    return cache;
  }

  formatHit.formatField = function (hit, fieldName) {
    var partials = partialFormattedCache.get(hit);

    if (partials && partials[fieldName] != null) {
      return partials[fieldName];
    }

    if (!partials) {
      partials = {};
      partialFormattedCache.set(hit, partials);
    }

    var val = fieldName === '_source' ? hit._source : indexPattern.flattenHit(hit)[fieldName];
    return convert(hit, val, fieldName);
  };

  return formatHit;
}