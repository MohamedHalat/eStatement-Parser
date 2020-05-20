"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedVisClass = createSavedVisClass;

var _vis = require("ui/vis");

var _saved_object = require("ui/saved_objects/saved_object");

var _public = require("../../../../visualizations/public");

var _saved_visualization_references = require("./saved_visualization_references");

var _discover = require("../../discover");

var _ = require("..");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _afterEsResp(savedVis, services) {
  return regeneratorRuntime.async(function _afterEsResp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_getLinkedSavedSearch(savedVis, services));

        case 2:
          savedVis.searchSource.setField('size', 0);

          if (!savedVis.vis) {
            _context.next = 7;
            break;
          }

          _context.t0 = _updateVis(savedVis);
          _context.next = 10;
          break;

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_createVis(savedVis));

        case 9:
          _context.t0 = _context.sent;

        case 10:
          savedVis.vis = _context.t0;
          return _context.abrupt("return", savedVis);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}

function _getLinkedSavedSearch(savedVis, services) {
  var linkedSearch, current, savedSearches;
  return regeneratorRuntime.async(function _getLinkedSavedSearch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          linkedSearch = !!savedVis.savedSearchId;
          current = savedVis.savedSearch;

          if (!(linkedSearch && current && current.id === savedVis.savedSearchId)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return");

        case 4:
          if (savedVis.savedSearch) {
            savedVis.searchSource.setParent(savedVis.savedSearch.searchSource.getParent());
            savedVis.savedSearch.destroy();
            delete savedVis.savedSearch;
          }

          savedSearches = (0, _discover.createSavedSearchesService)(services);

          if (!linkedSearch) {
            _context2.next = 11;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(savedSearches.get(savedVis.savedSearchId));

        case 9:
          savedVis.savedSearch = _context2.sent;
          savedVis.searchSource.setParent(savedVis.savedSearch.searchSource);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function _createVis(savedVis) {
  return regeneratorRuntime.async(function _createVis$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          savedVis.visState = (0, _public.updateOldState)(savedVis.visState); // visState doesn't yet exist when importing a visualization, so we can't
          // assume that exists at this point. If it does exist, then we're not
          // importing a visualization, so we want to sync the title.

          if (savedVis.visState) {
            savedVis.visState.title = savedVis.title;
          } // the typescript compiler is wrong here, will be right when vis.js -> vis.ts
          // @ts-ignore


          savedVis.vis = new _vis.Vis(savedVis.searchSource.getField('index'), savedVis.visState);
          savedVis.vis.savedSearchId = savedVis.savedSearchId;
          return _context3.abrupt("return", savedVis.vis);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function _updateVis(savedVis) {
  if (savedVis.vis && savedVis.searchSource) {
    savedVis.vis.indexPattern = savedVis.searchSource.getField('index');
    savedVis.visState.title = savedVis.title;
    savedVis.vis.setState(savedVis.visState);
    savedVis.vis.savedSearchId = savedVis.savedSearchId;
  }

  return savedVis.vis;
}

function createSavedVisClass(services) {
  var SavedObjectClass = (0, _saved_object.createSavedObjectClass)(services);

  var SavedVis =
  /*#__PURE__*/
  function (_SavedObjectClass) {
    _inherits(SavedVis, _SavedObjectClass);

    // Order these fields to the top, the rest are alphabetical
    function SavedVis() {
      var _this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, SavedVis);

      if (_typeof(opts) !== 'object') {
        opts = {
          id: opts
        };
      }

      var visState = !opts.type ? null : {
        type: opts.type
      }; // Gives our SavedWorkspace the properties of a SavedObject

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SavedVis).call(this, {
        type: SavedVis.type,
        mapping: SavedVis.mapping,
        searchSource: SavedVis.searchSource,
        extractReferences: _saved_visualization_references.extractReferences,
        injectReferences: _saved_visualization_references.injectReferences,
        id: opts.id || '',
        indexPattern: opts.indexPattern,
        defaults: {
          title: '',
          visState: visState,
          uiStateJSON: '{}',
          description: '',
          savedSearchId: opts.savedSearchId,
          version: 1
        },
        afterESResp: function afterESResp(savedObject) {
          return _afterEsResp(savedObject, services);
        }
      }));
      _this.showInRecentlyAccessed = true;

      _this.getFullPath = function () {
        return "/app/kibana#".concat(_.VisualizeConstants.EDIT_PATH, "/").concat(_this.id);
      };

      return _this;
    }

    return SavedVis;
  }(SavedObjectClass);

  _defineProperty(SavedVis, "type", 'visualization');

  _defineProperty(SavedVis, "mapping", {
    title: 'text',
    visState: 'json',
    uiStateJSON: 'text',
    description: 'text',
    savedSearchId: 'keyword',
    version: 'integer'
  });

  _defineProperty(SavedVis, "fieldOrder", ['title', 'description']);

  _defineProperty(SavedVis, "searchSource", true);

  return SavedVis;
}