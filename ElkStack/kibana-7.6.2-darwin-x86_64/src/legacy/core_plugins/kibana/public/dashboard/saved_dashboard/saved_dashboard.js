"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedDashboardClass = createSavedDashboardClass;

var _saved_object = require("ui/saved_objects/saved_object");

var _saved_dashboard_references = require("./saved_dashboard_references");

var _ = require("..");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Used only by the savedDashboards service, usually no reason to change this
function createSavedDashboardClass(services) {
  var SavedObjectClass = (0, _saved_object.createSavedObjectClass)(services);

  var SavedDashboard =
  /*#__PURE__*/
  function (_SavedObjectClass) {
    _inherits(SavedDashboard, _SavedObjectClass);

    // save these objects with the 'dashboard' type
    // if type:dashboard has no mapping, we push this mapping into ES
    function SavedDashboard(id) {
      var _this;

      _classCallCheck(this, SavedDashboard);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SavedDashboard).call(this, {
        type: SavedDashboard.type,
        mapping: SavedDashboard.mapping,
        searchSource: SavedDashboard.searchSource,
        extractReferences: _saved_dashboard_references.extractReferences,
        injectReferences: _saved_dashboard_references.injectReferences,
        // if this is null/undefined then the SavedObject will be assigned the defaults
        id: id,
        // default values that will get assigned if the doc is new
        defaults: {
          title: '',
          hits: 0,
          description: '',
          panelsJSON: '[]',
          optionsJSON: JSON.stringify({
            // for BWC reasons we can't default dashboards that already exist without this setting to true.
            useMargins: !id,
            hidePanelTitles: false
          }),
          version: 1,
          timeRestore: false,
          timeTo: undefined,
          timeFrom: undefined,
          refreshInterval: undefined
        }
      }));

      _defineProperty(_assertThisInitialized(_this), "showInRecentlyAccessed", true);

      _this.getFullPath = function () {
        return "/app/kibana#".concat((0, _.createDashboardEditUrl)(String(_this.id)));
      };

      return _this;
    }

    _createClass(SavedDashboard, [{
      key: "getQuery",
      value: function getQuery() {
        return this.searchSource.getOwnField('query') || {
          query: '',
          language: 'kuery'
        };
      }
    }, {
      key: "getFilters",
      value: function getFilters() {
        return this.searchSource.getOwnField('filter') || [];
      }
    }]);

    return SavedDashboard;
  }(SavedObjectClass);

  _defineProperty(SavedDashboard, "type", 'dashboard');

  _defineProperty(SavedDashboard, "mapping", {
    title: 'text',
    hits: 'integer',
    description: 'text',
    panelsJSON: 'text',
    optionsJSON: 'text',
    version: 'integer',
    timeRestore: 'boolean',
    timeTo: 'keyword',
    timeFrom: 'keyword',
    refreshInterval: {
      type: 'object',
      properties: {
        display: {
          type: 'keyword'
        },
        pause: {
          type: 'boolean'
        },
        section: {
          type: 'integer'
        },
        value: {
          type: 'integer'
        }
      }
    }
  });

  _defineProperty(SavedDashboard, "fieldOrder", ['title', 'description']);

  _defineProperty(SavedDashboard, "searchSource", true);

  return SavedDashboard;
}