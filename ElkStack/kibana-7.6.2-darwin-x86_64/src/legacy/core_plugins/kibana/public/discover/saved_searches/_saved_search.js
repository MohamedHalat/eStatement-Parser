"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedSearchClass = createSavedSearchClass;

var _saved_object = require("ui/saved_objects/saved_object");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createSavedSearchClass(services) {
  var SavedObjectClass = (0, _saved_object.createSavedObjectClass)(services);

  var SavedSearch =
  /*#__PURE__*/
  function (_SavedObjectClass) {
    _inherits(SavedSearch, _SavedObjectClass);

    // Order these fields to the top, the rest are alphabetical
    function SavedSearch(id) {
      var _this;

      _classCallCheck(this, SavedSearch);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SavedSearch).call(this, {
        id: id,
        type: 'search',
        mapping: {
          title: 'text',
          description: 'text',
          hits: 'integer',
          columns: 'keyword',
          sort: 'keyword',
          version: 'integer'
        },
        searchSource: true,
        defaults: {
          title: '',
          description: '',
          columns: [],
          hits: 0,
          sort: [],
          version: 1
        }
      }));

      _defineProperty(_assertThisInitialized(_this), "id", void 0);

      _defineProperty(_assertThisInitialized(_this), "showInRecentlyAccessed", void 0);

      _this.showInRecentlyAccessed = true;
      _this.id = id;

      _this.getFullPath = function () {
        return "/app/kibana#/discover/".concat(String(id));
      };

      return _this;
    }

    return SavedSearch;
  }(SavedObjectClass);

  _defineProperty(SavedSearch, "type", 'search');

  _defineProperty(SavedSearch, "mapping", {
    title: 'text',
    description: 'text',
    hits: 'integer',
    columns: 'keyword',
    sort: 'keyword',
    version: 'integer'
  });

  _defineProperty(SavedSearch, "fieldOrder", ['title', 'description']);

  _defineProperty(SavedSearch, "searchSource", true);

  return SavedSearch;
}