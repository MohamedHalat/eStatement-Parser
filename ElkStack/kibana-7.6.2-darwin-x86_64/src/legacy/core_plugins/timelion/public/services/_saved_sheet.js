"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedSheetClass = createSavedSheetClass;

var _saved_object = require("ui/saved_objects/saved_object");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Used only by the savedSheets service, usually no reason to change this
function createSavedSheetClass(services, config) {
  var SavedObjectClass = (0, _saved_object.createSavedObjectClass)(services);

  var SavedSheet =
  /*#__PURE__*/
  function (_SavedObjectClass) {
    _inherits(SavedSheet, _SavedObjectClass);

    // if type:sheet has no mapping, we push this mapping into ES
    // Order these fields to the top, the rest are alphabetical
    // SavedSheet constructor. Usually you'd interact with an instance of this.
    // ID is option, without it one will be generated on save.
    function SavedSheet(id) {
      var _this;

      _classCallCheck(this, SavedSheet);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SavedSheet).call(this, {
        type: SavedSheet.type,
        mapping: SavedSheet.mapping,
        // if this is null/undefined then the SavedObject will be assigned the defaults
        id: id,
        // default values that will get assigned if the doc is new
        defaults: {
          title: 'New TimeLion Sheet',
          hits: 0,
          description: '',
          timelion_sheet: ['.es(*)'],
          timelion_interval: 'auto',
          timelion_chart_height: 275,
          timelion_columns: config.get('timelion:default_columns') || 2,
          timelion_rows: config.get('timelion:default_rows') || 2,
          version: 1
        }
      }));
      _this.showInRecentlyAccessed = true;

      _this.getFullPath = function () {
        return "/app/timelion#/".concat(_this.id);
      };

      return _this;
    }

    return SavedSheet;
  }(SavedObjectClass);

  _defineProperty(SavedSheet, "type", 'timelion-sheet');

  _defineProperty(SavedSheet, "mapping", {
    title: 'text',
    hits: 'integer',
    description: 'text',
    timelion_sheet: 'text',
    timelion_interval: 'keyword',
    timelion_other_interval: 'keyword',
    timelion_chart_height: 'integer',
    timelion_columns: 'integer',
    timelion_rows: 'integer',
    version: 'integer'
  });

  _defineProperty(SavedSheet, "fieldOrder", ['title', 'description']);

  return SavedSheet;
}