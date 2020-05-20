"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashUrl = exports.unhashUrl = exports.hashQuery = exports.unhashQuery = void 0;

var _state_encoder = require("../state_encoder");

var _format = require("./format");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var unhashQuery = createQueryMapper(_state_encoder.hashedStateToExpandedState);
exports.unhashQuery = unhashQuery;
var hashQuery = createQueryMapper(_state_encoder.expandedStateToHashedState);
exports.hashQuery = hashQuery;
var unhashUrl = createQueryReplacer(unhashQuery);
exports.unhashUrl = unhashUrl;
var hashUrl = createQueryReplacer(hashQuery); // naive hack, but this allows to decouple these utils from AppState, GlobalState for now
// when removing AppState, GlobalState and migrating to IState containers,
// need to make sure that apps explicitly passing this whitelist to hash

exports.hashUrl = hashUrl;
var __HACK_HARDCODED_LEGACY_HASHABLE_PARAMS = ['_g', '_a', '_s'];

function createQueryMapper(queryParamMapper) {
  return function (query) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      hashableParams: __HACK_HARDCODED_LEGACY_HASHABLE_PARAMS
    };
    return Object.fromEntries(Object.entries(query || {}).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          value = _ref2[1];

      if (!options.hashableParams.includes(name)) return [name, value];
      return [name, queryParamMapper(value) || value];
    }));
  };
}

function createQueryReplacer(queryMapper, options) {
  return function (url) {
    return (0, _format.replaceUrlHashQuery)(url, function (query) {
      return queryMapper(query, options);
    });
  };
}