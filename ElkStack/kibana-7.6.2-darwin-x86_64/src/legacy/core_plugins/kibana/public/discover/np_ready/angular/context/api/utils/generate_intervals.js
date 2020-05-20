"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asPairs = asPairs;
exports.generateIntervals = generateIntervals;

var _kibana_services = require("../../../../../kibana_services");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(asPairs);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Generate a sequence of pairs from the iterable that looks like
 * `[[x_0, x_1], [x_1, x_2], [x_2, x_3], ..., [x_(n-1), x_n]]`.
 */
function asPairs(iterable) {
  var currentPair, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

  return regeneratorRuntime.wrap(function asPairs$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          currentPair = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = iterable[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 15;
            break;
          }

          value = _step.value;
          currentPair = [].concat(_toConsumableArray(currentPair), [value]).slice(-2);

          if (!(currentPair.length === 2)) {
            _context.next = 12;
            break;
          }

          _context.next = 12;
          return currentPair;

        case 12:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 21:
          _context.prev = 21;
          _context.prev = 22;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }

        case 24:
          _context.prev = 24;

          if (!_didIteratorError) {
            _context.next = 27;
            break;
          }

          throw _iteratorError;

        case 27:
          return _context.finish(24);

        case 28:
          return _context.finish(21);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[4, 17, 21, 29], [22,, 24, 28]]);
}
/**
 * Returns a iterable containing intervals `[start,end]` for Elasticsearch date range queries
 * depending on type (`successors` or `predecessors`) and sort (`asc`, `desc`) these are ascending or descending intervals.
 */


function generateIntervals(offsets, startTime, type, sort) {
  var offsetSign = sort === _kibana_services.SortDirection.asc && type === 'successors' || sort === _kibana_services.SortDirection.desc && type === 'predecessors' ? 1 : -1; // ending with `null` opens the last interval

  return asPairs([].concat(_toConsumableArray(offsets.map(function (offset) {
    return startTime + offset * offsetSign;
  })), [null]));
}