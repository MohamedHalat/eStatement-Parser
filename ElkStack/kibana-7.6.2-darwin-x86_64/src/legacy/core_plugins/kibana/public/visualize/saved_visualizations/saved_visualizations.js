"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedVisLoader = createSavedVisLoader;

var _saved_objects = require("ui/saved_objects");

var _legacy = require("../../../../visualizations/public/np_ready/public/legacy");

var _find_list_items = require("./find_list_items");

var _saved_vis = require("./_saved_vis");

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

function createSavedVisLoader(services) {
  var savedObjectsClient = services.savedObjectsClient;

  var SavedObjectLoaderVisualize =
  /*#__PURE__*/
  function (_SavedObjectLoader) {
    _inherits(SavedObjectLoaderVisualize, _SavedObjectLoader);

    function SavedObjectLoaderVisualize() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, SavedObjectLoaderVisualize);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SavedObjectLoaderVisualize)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "mapHitSource", function (source, id) {
        var visTypes = _legacy.start.types;
        source.id = id;
        source.url = _this.urlFor(id);
        var typeName = source.typeName;

        if (source.visState) {
          try {
            typeName = JSON.parse(String(source.visState)).type;
          } catch (e) {}
          /* missing typename handled below */
          // eslint-disable-line no-empty

        }

        if (!typeName || !visTypes.get(typeName)) {
          source.error = 'Unknown visualization type';
          return source;
        }

        source.type = visTypes.get(typeName);
        source.savedObjectType = 'visualization';
        source.icon = source.type.icon;
        source.image = source.type.image;
        source.typeTitle = source.type.title;
        source.editUrl = "#".concat((0, _.createVisualizeEditUrl)(id));
        return source;
      });

      return _this;
    }

    _createClass(SavedObjectLoaderVisualize, [{
      key: "urlFor",
      value: function urlFor(id) {
        return "#/visualize/edit/".concat(encodeURIComponent(id));
      } // This behaves similarly to find, except it returns visualizations that are
      // defined as appExtensions and which may not conform to type: visualization

    }, {
      key: "findListItems",
      value: function findListItems() {
        var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        return (0, _find_list_items.findListItems)({
          search: search,
          size: size,
          mapSavedObjectApiHits: this.mapSavedObjectApiHits.bind(this),
          savedObjectsClient: savedObjectsClient,
          visTypes: _legacy.start.types.getAliases()
        });
      }
    }]);

    return SavedObjectLoaderVisualize;
  }(_saved_objects.SavedObjectLoader);

  var SavedVis = (0, _saved_vis.createSavedVisClass)(services);
  return new SavedObjectLoaderVisualize(SavedVis, savedObjectsClient, services.chrome);
}