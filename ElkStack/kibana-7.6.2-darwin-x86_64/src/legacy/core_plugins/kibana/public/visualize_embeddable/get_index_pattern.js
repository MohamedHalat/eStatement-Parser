"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexPattern = getIndexPattern;

var _new_platform = require("ui/new_platform");

var _public = require("../../../../../plugins/data/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getIndexPattern(savedVis) {
  var savedObjectsClient, defaultIndex, indexPatternObjects, _indexPatternObjects$, _indexPatternObjects$2, indexPattern, savedObject;

  return regeneratorRuntime.async(function getIndexPattern$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(savedVis.vis.type.name !== 'metrics')) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", savedVis.vis.indexPattern);

        case 2:
          savedObjectsClient = _new_platform.npStart.core.savedObjects.client;
          defaultIndex = _new_platform.npStart.core.uiSettings.get('defaultIndex');

          if (!savedVis.vis.params.index_pattern) {
            _context.next = 10;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(savedObjectsClient.find({
            type: 'index-pattern',
            fields: ['title', 'fields'],
            search: "\"".concat(savedVis.vis.params.index_pattern, "\""),
            searchFields: ['title']
          }));

        case 7:
          indexPatternObjects = _context.sent;
          _indexPatternObjects$ = indexPatternObjects.savedObjects.map(_public.indexPatterns.getFromSavedObject), _indexPatternObjects$2 = _slicedToArray(_indexPatternObjects$, 1), indexPattern = _indexPatternObjects$2[0];
          return _context.abrupt("return", indexPattern);

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(savedObjectsClient.get('index-pattern', defaultIndex));

        case 12:
          savedObject = _context.sent;
          return _context.abrupt("return", _public.indexPatterns.getFromSavedObject(savedObject));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
}