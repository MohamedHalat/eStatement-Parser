"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectLoader = void 0;

var _string_utils = require("./helpers/string_utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The SavedObjectLoader class provides some convenience functions
 * to load and save one kind of saved objects (specified in the constructor).
 *
 * It is based on the SavedObjectClient which implements loading and saving
 * in an abstract, type-agnostic way. If possible, use SavedObjectClient directly
 * to avoid pulling in extra functionality which isn't used.
 */
var SavedObjectLoader =
/*#__PURE__*/
function () {
  function SavedObjectLoader(SavedObjectClass, savedObjectsClient, chrome) {
    _classCallCheck(this, SavedObjectLoader);

    this.savedObjectsClient = savedObjectsClient;
    this.chrome = chrome;

    _defineProperty(this, "Class", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "lowercaseType", void 0);

    _defineProperty(this, "loaderProperties", void 0);

    this.type = SavedObjectClass.type;
    this.Class = SavedObjectClass;
    this.lowercaseType = this.type.toLowerCase();
    this.loaderProperties = {
      name: "".concat(this.lowercaseType, "s"),
      noun: _string_utils.StringUtils.upperFirst(this.type),
      nouns: "".concat(this.lowercaseType, "s")
    };
  }
  /**
   * Retrieve a saved object by id. Returns a promise that completes when the object finishes
   * initializing.
   * @param id
   * @returns {Promise<SavedObject>}
   */


  _createClass(SavedObjectLoader, [{
    key: "get",
    value: function get(id) {
      var obj;
      return regeneratorRuntime.async(function get$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // @ts-ignore
              obj = new this.Class(id);
              return _context.abrupt("return", obj.init());

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "urlFor",
    value: function urlFor(id) {
      return "#/".concat(this.lowercaseType, "/").concat(encodeURIComponent(id));
    }
  }, {
    key: "delete",
    value: function _delete(ids) {
      var _this = this;

      var idsUsed, deletions, coreNavLinks;
      return regeneratorRuntime.async(function _delete$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              idsUsed = !Array.isArray(ids) ? [ids] : ids;
              deletions = idsUsed.map(function (id) {
                // @ts-ignore
                var savedObject = new _this.Class(id);
                return savedObject.delete();
              });
              _context2.next = 4;
              return regeneratorRuntime.awrap(Promise.all(deletions));

            case 4:
              coreNavLinks = this.chrome.navLinks;
              /**
               * Modify last url for deleted saved objects to avoid loading pages with "Could not locate..."
               */

              coreNavLinks.getAll().filter(function (link) {
                return link.linkToLastSubUrl && idsUsed.find(function (deletedId) {
                  return link.url && link.url.includes(deletedId);
                }) !== undefined;
              }).forEach(function (link) {
                return coreNavLinks.update(link.id, {
                  url: link.baseUrl
                });
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /**
     * Updates source to contain an id and url field, and returns the updated
     * source object.
     * @param source
     * @param id
     * @returns {source} The modified source object, with an id and url field.
     */

  }, {
    key: "mapHitSource",
    value: function mapHitSource(source, id) {
      source.id = id;
      source.url = this.urlFor(id);
      return source;
    }
    /**
     * Updates hit.attributes to contain an id and url field, and returns the updated
     * attributes object.
     * @param hit
     * @returns {hit.attributes} The modified hit.attributes object, with an id and url field.
     */

  }, {
    key: "mapSavedObjectApiHits",
    value: function mapSavedObjectApiHits(hit) {
      return this.mapHitSource(hit.attributes, hit.id);
    }
    /**
     * TODO: Rather than use a hardcoded limit, implement pagination. See
     * https://github.com/elastic/kibana/issues/8044 for reference.
     *
     * @param search
     * @param size
     * @param fields
     * @returns {Promise}
     */

  }, {
    key: "findAll",
    value: function findAll() {
      var _this2 = this;

      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      var fields = arguments.length > 2 ? arguments[2] : undefined;
      return this.savedObjectsClient.find({
        type: this.lowercaseType,
        search: search ? "".concat(search, "*") : undefined,
        perPage: size,
        page: 1,
        searchFields: ['title^3', 'description'],
        defaultSearchOperator: 'AND',
        fields: fields
      }).then(function (resp) {
        return {
          total: resp.total,
          hits: resp.savedObjects.map(function (savedObject) {
            return _this2.mapSavedObjectApiHits(savedObject);
          })
        };
      });
    }
  }, {
    key: "find",
    value: function find() {
      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      return this.findAll(search, size).then(function (resp) {
        return {
          total: resp.total,
          hits: resp.hits.filter(function (savedObject) {
            return !savedObject.error;
          })
        };
      });
    }
  }]);

  return SavedObjectLoader;
}();

exports.SavedObjectLoader = SavedObjectLoader;