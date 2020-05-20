"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatesFromKbnUrl = getStatesFromKbnUrl;
exports.getStateFromKbnUrl = getStateFromKbnUrl;
exports.setStateToKbnUrl = setStateToKbnUrl;
exports.getRelativeToHistoryPath = getRelativeToHistoryPath;
exports.createKbnUrlControls = void 0;

var _url = require("url");

var _history = require("history");

var _state_encoder = require("../state_encoder");

var _parse = require("./parse");

var _stringify_query_string = require("./stringify_query_string");

var _format = require("./format");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Parses a kibana url and retrieves all the states encoded into url,
 * Handles both expanded rison state and hashed state (where the actual state stored in sessionStorage)
 * e.g.:
 *
 * given an url:
 * http://localhost:5601/oxf/app/kibana#/management/kibana/index_patterns/id?_a=(tab:indexedFields)&_b=(f:test,i:'',l:'')
 * will return object:
 * {_a: {tab: 'indexedFields'}, _b: {f: 'test', i: '', l: ''}};
 */
function getStatesFromKbnUrl() {
  var _parseUrlHash;

  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;
  var keys = arguments.length > 1 ? arguments[1] : undefined;
  var query = (_parseUrlHash = (0, _parse.parseUrlHash)(url)) === null || _parseUrlHash === void 0 ? void 0 : _parseUrlHash.query;
  if (!query) return {};
  var decoded = {};
  Object.entries(query).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        key = _ref2[0];

    return keys ? keys.includes(key) : true;
  }).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        q = _ref4[0],
        value = _ref4[1];

    decoded[q] = (0, _state_encoder.decodeState)(value);
  });
  return decoded;
}
/**
 * Retrieves specific state from url by key
 * e.g.:
 *
 * given an url:
 * http://localhost:5601/oxf/app/kibana#/management/kibana/index_patterns/id?_a=(tab:indexedFields)&_b=(f:test,i:'',l:'')
 * and key '_a'
 * will return object:
 * {tab: 'indexedFields'}
 */


function getStateFromKbnUrl(key) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  return getStatesFromKbnUrl(url, [key])[key] || null;
}
/**
 * Sets state to the url by key and returns a new url string.
 * Doesn't actually updates history
 *
 * e.g.:
 * given a url: http://localhost:5601/oxf/app/kibana#/management/kibana/index_patterns/id?_a=(tab:indexedFields)&_b=(f:test,i:'',l:'')
 * key: '_a'
 * and state: {tab: 'other'}
 *
 * will return url:
 * http://localhost:5601/oxf/app/kibana#/management/kibana/index_patterns/id?_a=(tab:other)&_b=(f:test,i:'',l:'')
 */


function setStateToKbnUrl(key, state) {
  var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    useHash: false
  },
      _ref5$useHash = _ref5.useHash,
      useHash = _ref5$useHash === void 0 ? false : _ref5$useHash;

  var rawUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window.location.href;
  return (0, _format.replaceUrlHashQuery)(rawUrl, function (query) {
    var encoded = (0, _state_encoder.encodeState)(state, useHash);
    return _objectSpread({}, query, _defineProperty({}, key, encoded));
  });
}
/**
 * A tiny wrapper around history library to listen for url changes and update url
 * History library handles a bunch of cross browser edge cases
 */


var createKbnUrlControls = function createKbnUrlControls() {
  var history = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _history.createBrowserHistory)();
  var updateQueue = []; // if we should replace or push with next async update,
  // if any call in a queue asked to push, then we should push

  var shouldReplace = true;

  function updateUrl(newUrl) {
    var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var currentUrl = (0, _parse.getCurrentUrl)();
    if (newUrl === currentUrl) return currentUrl; // skip update

    var historyPath = getRelativeToHistoryPath(newUrl, history);

    if (replace) {
      history.replace(historyPath);
    } else {
      history.push(historyPath);
    }

    return (0, _parse.getCurrentUrl)();
  } // queue clean up


  function cleanUp() {
    updateQueue.splice(0, updateQueue.length);
    shouldReplace = true;
  } // runs scheduled url updates


  function _flush() {
    var replace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : shouldReplace;
    if (updateQueue.length === 0) return (0, _parse.getCurrentUrl)();
    var resultUrl = updateQueue.reduce(function (url, nextUpdate) {
      return nextUpdate(url);
    }, (0, _parse.getCurrentUrl)());
    cleanUp();
    var newUrl = updateUrl(resultUrl, replace);
    return newUrl;
  }

  return {
    listen: function listen(cb) {
      return history.listen(function () {
        cb();
      });
    },
    update: function update(newUrl) {
      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return updateUrl(newUrl, replace);
    },
    updateAsync: function updateAsync(updater) {
      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      updateQueue.push(updater);

      if (shouldReplace) {
        shouldReplace = replace;
      } // Schedule url update to the next microtask
      // this allows to batch synchronous url changes


      return Promise.resolve().then(function () {
        return _flush();
      });
    },
    flush: function flush(replace) {
      return _flush(replace);
    },
    cancel: function cancel() {
      cleanUp();
    }
  };
};
/**
 * Depending on history configuration extracts relative path for history updates
 * 4 possible cases (see tests):
 * 1. Browser history with empty base path
 * 2. Browser history with base path
 * 3. Hash history with empty base path
 * 4. Hash history with base path
 */


exports.createKbnUrlControls = createKbnUrlControls;

function getRelativeToHistoryPath(absoluteUrl, history) {
  function stripBasename() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var stripLeadingHash = function stripLeadingHash(_) {
      return _.charAt(0) === '#' ? _.substr(1) : _;
    };

    var stripTrailingSlash = function stripTrailingSlash(_) {
      return _.charAt(_.length - 1) === '/' ? _.substr(0, _.length - 1) : _;
    };

    var baseName = stripLeadingHash(stripTrailingSlash(history.createHref({})));
    return path.startsWith(baseName) ? path.substr(baseName.length) : path;
  }

  var isHashHistory = history.createHref({}).includes('#');
  var parsedUrl = isHashHistory ? (0, _parse.parseUrlHash)(absoluteUrl) : (0, _parse.parseUrl)(absoluteUrl);
  var parsedHash = isHashHistory ? null : (0, _parse.parseUrlHash)(absoluteUrl);
  return (0, _url.format)({
    pathname: stripBasename(parsedUrl.pathname),
    search: (0, _stringify_query_string.stringifyQueryString)(parsedUrl.query),
    hash: parsedHash ? (0, _url.format)({
      pathname: parsedHash.pathname,
      search: (0, _stringify_query_string.stringifyQueryString)(parsedHash.query)
    }) : parsedUrl.hash
  });
}