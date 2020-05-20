"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchHitsInInterval = fetchHitsInInterval;

var _kibana_services = require("../../../../../kibana_services");

var _date_conversion = require("./date_conversion");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Fetch the hits between a given `interval` up to a maximum of `maxCount` documents.
 * The documents are sorted by `sort`
 *
 * The `searchSource` is assumed to have the appropriate index pattern
 * and filters set.
 */
function fetchHitsInInterval(searchSource, timeField, sort, sortDir, interval, searchAfter, maxCount, nanosValue) {
  var range, _interval, start, stop, response;

  return regeneratorRuntime.async(function fetchHitsInInterval$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          range = {
            format: 'strict_date_optional_time'
          };
          _interval = _slicedToArray(interval, 2), start = _interval[0], stop = _interval[1];

          if (start) {
            range[sortDir === _kibana_services.SortDirection.asc ? 'gte' : 'lte'] = (0, _date_conversion.convertTimeValueToIso)(start, nanosValue);
          }

          if (stop) {
            range[sortDir === _kibana_services.SortDirection.asc ? 'lte' : 'gte'] = (0, _date_conversion.convertTimeValueToIso)(stop, nanosValue);
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(searchSource.setField('size', maxCount).setField('query', {
            query: {
              constant_score: {
                filter: {
                  range: _defineProperty({}, timeField, range)
                }
              }
            },
            language: 'lucene'
          }).setField('searchAfter', searchAfter).setField('sort', sort).setField('version', true).fetch());

        case 6:
          response = _context.sent;
          return _context.abrupt("return", response.hits ? response.hits.hits : []);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}