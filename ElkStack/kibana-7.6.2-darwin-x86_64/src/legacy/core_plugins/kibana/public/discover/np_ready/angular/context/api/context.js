"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContextProvider = fetchContextProvider;

var _kibana_services = require("../../../../kibana_services");

var _sorting = require("./utils/sorting");

var _date_conversion = require("./utils/date_conversion");

var _fetch_hits_in_interval = require("./utils/fetch_hits_in_interval");

var _generate_intervals = require("./utils/generate_intervals");

var _get_es_query_search_after = require("./utils/get_es_query_search_after");

var _get_es_query_sort = require("./utils/get_es_query_sort");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var DAY_MILLIS = 24 * 60 * 60 * 1000; // look from 1 day up to 10000 days into the past and future

var LOOKUP_OFFSETS = [0, 1, 7, 30, 365, 10000].map(function (days) {
  return days * DAY_MILLIS;
});

function fetchContextProvider(indexPatterns) {
  return {
    fetchSurroundingDocs: fetchSurroundingDocs
  };
  /**
   * Fetch successor or predecessor documents of a given anchor document
   *
   * @param {SurrDocType} type - `successors` or `predecessors`
   * @param {string} indexPatternId
   * @param {EsHitRecord} anchor - anchor record
   * @param {string} timeField - name of the timefield, that's sorted on
   * @param {string} tieBreakerField - name of the tie breaker, the 2nd sort field
   * @param {SortDirection} sortDir - direction of sorting
   * @param {number} size - number of records to retrieve
   * @param {Filter[]} filters - to apply in the elastic query
   * @returns {Promise<object[]>}
   */

  function fetchSurroundingDocs(type, indexPatternId, anchor, timeField, tieBreakerField, sortDir, size, filters) {
    var indexPattern, searchSource, sortDirToApply, nanos, timeValueMillis, intervals, documents, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, interval, remainingSize, searchAfter, sort, hits;

    return regeneratorRuntime.async(function fetchSurroundingDocs$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(_typeof(anchor) !== 'object' || anchor === null)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", []);

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(indexPatterns.get(indexPatternId));

          case 4:
            indexPattern = _context.sent;
            _context.next = 7;
            return regeneratorRuntime.awrap(createSearchSource(indexPattern, filters));

          case 7:
            searchSource = _context.sent;
            sortDirToApply = type === 'successors' ? sortDir : (0, _sorting.reverseSortDir)(sortDir);
            nanos = indexPattern.isTimeNanosBased() ? (0, _date_conversion.extractNanos)(anchor._source[timeField]) : '';
            timeValueMillis = nanos !== '' ? (0, _date_conversion.convertIsoToMillis)(anchor._source[timeField]) : anchor.sort[0];
            intervals = (0, _generate_intervals.generateIntervals)(LOOKUP_OFFSETS, timeValueMillis, type, sortDir);
            documents = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 16;
            _iterator = intervals[Symbol.iterator]();

          case 18:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 32;
              break;
            }

            interval = _step.value;
            remainingSize = size - documents.length;

            if (!(remainingSize <= 0)) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("break", 32);

          case 23:
            searchAfter = (0, _get_es_query_search_after.getEsQuerySearchAfter)(type, documents, timeField, anchor, nanos);
            sort = (0, _get_es_query_sort.getEsQuerySort)(timeField, tieBreakerField, sortDirToApply);
            _context.next = 27;
            return regeneratorRuntime.awrap((0, _fetch_hits_in_interval.fetchHitsInInterval)(searchSource, timeField, sort, sortDirToApply, interval, searchAfter, remainingSize, nanos));

          case 27:
            hits = _context.sent;
            documents = type === 'successors' ? [].concat(_toConsumableArray(documents), _toConsumableArray(hits)) : [].concat(_toConsumableArray(hits.slice().reverse()), _toConsumableArray(documents));

          case 29:
            _iteratorNormalCompletion = true;
            _context.next = 18;
            break;

          case 32:
            _context.next = 38;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context["catch"](16);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 38:
            _context.prev = 38;
            _context.prev = 39;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 41:
            _context.prev = 41;

            if (!_didIteratorError) {
              _context.next = 44;
              break;
            }

            throw _iteratorError;

          case 44:
            return _context.finish(41);

          case 45:
            return _context.finish(38);

          case 46:
            return _context.abrupt("return", documents);

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[16, 34, 38, 46], [39,, 41, 45]]);
  }

  function createSearchSource(indexPattern, filters) {
    return regeneratorRuntime.async(function createSearchSource$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new _kibana_services.SearchSource().setParent(undefined).setField('index', indexPattern).setField('filter', filters));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
}