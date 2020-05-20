"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchIndexPatterns = fetchIndexPatterns;

var _lodash = require("lodash");

var _ = require("../..");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function fetchIndexPatterns(savedObjectsClient, indexPatternStrings, uiSettings) {
  var searchString, indexPatternsFromSavedObjects, exactMatches, defaultIndex, allMatches;
  return regeneratorRuntime.async(function fetchIndexPatterns$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(!indexPatternStrings || (0, _lodash.isEmpty)(indexPatternStrings))) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", []);

        case 2:
          searchString = indexPatternStrings.map(function (string) {
            return "\"".concat(string, "\"");
          }).join(' | ');
          _context.next = 5;
          return regeneratorRuntime.awrap(savedObjectsClient.find({
            type: 'index-pattern',
            fields: ['title', 'fields'],
            search: searchString,
            searchFields: ['title']
          }));

        case 5:
          indexPatternsFromSavedObjects = _context.sent;
          exactMatches = indexPatternsFromSavedObjects.savedObjects.filter(function (savedObject) {
            return indexPatternStrings.includes(savedObject.attributes.title);
          });
          defaultIndex = uiSettings.get('defaultIndex');

          if (!(exactMatches.length === indexPatternStrings.length)) {
            _context.next = 12;
            break;
          }

          _context.t0 = exactMatches;
          _context.next = 19;
          break;

        case 12:
          _context.t1 = [];
          _context.t2 = _toConsumableArray(exactMatches);
          _context.next = 16;
          return regeneratorRuntime.awrap(savedObjectsClient.get('index-pattern', defaultIndex));

        case 16:
          _context.t3 = _context.sent;
          _context.t4 = [_context.t3];
          _context.t0 = _context.t1.concat.call(_context.t1, _context.t2, _context.t4);

        case 19:
          allMatches = _context.t0;
          return _context.abrupt("return", allMatches.map(_.indexPatterns.getFromSavedObject));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  });
}