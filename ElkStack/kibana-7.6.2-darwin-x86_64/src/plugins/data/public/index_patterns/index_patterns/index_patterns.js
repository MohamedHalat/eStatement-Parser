"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatterns = void 0;

var _pattern_cache = require("./_pattern_cache");

var _index_pattern = require("./index_pattern");

var _index_patterns_api_client = require("./index_patterns_api_client");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var indexPatternCache = (0, _pattern_cache.createIndexPatternCache)();

var IndexPatterns =
/*#__PURE__*/
function () {
  function IndexPatterns(config, savedObjectsClient, http) {
    var _this = this;

    _classCallCheck(this, IndexPatterns);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "savedObjectsClient", void 0);

    _defineProperty(this, "savedObjectsCache", void 0);

    _defineProperty(this, "apiClient", void 0);

    _defineProperty(this, "getIds", function _callee() {
      var refresh,
          _args = arguments;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              refresh = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

              if (!(!_this.savedObjectsCache || refresh)) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return regeneratorRuntime.awrap(_this.refreshSavedObjectsCache());

            case 4:
              if (_this.savedObjectsCache) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", []);

            case 6:
              return _context.abrupt("return", _this.savedObjectsCache.map(function (obj) {
                return obj === null || obj === void 0 ? void 0 : obj.id;
              }));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    _defineProperty(this, "getTitles", function _callee2() {
      var refresh,
          _args2 = arguments;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              refresh = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;

              if (!(!_this.savedObjectsCache || refresh)) {
                _context2.next = 4;
                break;
              }

              _context2.next = 4;
              return regeneratorRuntime.awrap(_this.refreshSavedObjectsCache());

            case 4:
              if (_this.savedObjectsCache) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", []);

            case 6:
              return _context2.abrupt("return", _this.savedObjectsCache.map(function (obj) {
                var _obj$attributes;

                return obj === null || obj === void 0 ? void 0 : (_obj$attributes = obj.attributes) === null || _obj$attributes === void 0 ? void 0 : _obj$attributes.title;
              }));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    });

    _defineProperty(this, "getFields", function _callee3(fields) {
      var refresh,
          _args3 = arguments;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              refresh = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;

              if (!(!_this.savedObjectsCache || refresh)) {
                _context3.next = 4;
                break;
              }

              _context3.next = 4;
              return regeneratorRuntime.awrap(_this.refreshSavedObjectsCache());

            case 4:
              if (_this.savedObjectsCache) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", []);

            case 6:
              return _context3.abrupt("return", _this.savedObjectsCache.map(function (obj) {
                var result = {};
                fields.forEach(function (f) {
                  var _obj$attributes2;

                  return result[f] = obj[f] || (obj === null || obj === void 0 ? void 0 : (_obj$attributes2 = obj.attributes) === null || _obj$attributes2 === void 0 ? void 0 : _obj$attributes2[f]);
                });
                return result;
              }));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    });

    _defineProperty(this, "getFieldsForTimePattern", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _this.apiClient.getFieldsForTimePattern(options);
    });

    _defineProperty(this, "getFieldsForWildcard", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _this.apiClient.getFieldsForWildcard(options);
    });

    _defineProperty(this, "clearCache", function (id) {
      _this.savedObjectsCache = null;

      if (id) {
        indexPatternCache.clear(id);
      } else {
        indexPatternCache.clearAll();
      }
    });

    _defineProperty(this, "getCache", function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (_this.savedObjectsCache) {
                _context4.next = 3;
                break;
              }

              _context4.next = 3;
              return regeneratorRuntime.awrap(_this.refreshSavedObjectsCache());

            case 3:
              return _context4.abrupt("return", _this.savedObjectsCache);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    });

    _defineProperty(this, "getDefault", function _callee5() {
      var defaultIndexPatternId;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              defaultIndexPatternId = _this.config.get('defaultIndex');

              if (!defaultIndexPatternId) {
                _context5.next = 5;
                break;
              }

              _context5.next = 4;
              return regeneratorRuntime.awrap(_this.get(defaultIndexPatternId));

            case 4:
              return _context5.abrupt("return", _context5.sent);

            case 5:
              return _context5.abrupt("return", null);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      });
    });

    _defineProperty(this, "get", function _callee6(id) {
      var cache, indexPattern;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              cache = indexPatternCache.get(id);

              if (!cache) {
                _context6.next = 3;
                break;
              }

              return _context6.abrupt("return", cache);

            case 3:
              _context6.next = 5;
              return regeneratorRuntime.awrap(_this.make(id));

            case 5:
              indexPattern = _context6.sent;
              return _context6.abrupt("return", indexPatternCache.set(id, indexPattern));

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      });
    });

    _defineProperty(this, "make", function (id) {
      var indexPattern = new _index_pattern.IndexPattern(id, function (cfg) {
        return _this.config.get(cfg);
      }, _this.savedObjectsClient, _this.apiClient, indexPatternCache);
      return indexPattern.init();
    });

    this.apiClient = new _index_patterns_api_client.IndexPatternsApiClient(http);
    this.config = config;
    this.savedObjectsClient = savedObjectsClient;
  }

  _createClass(IndexPatterns, [{
    key: "refreshSavedObjectsCache",
    value: function refreshSavedObjectsCache() {
      return regeneratorRuntime.async(function refreshSavedObjectsCache$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.savedObjectsClient.find({
                type: 'index-pattern',
                fields: ['title'],
                perPage: 10000
              }));

            case 2:
              this.savedObjectsCache = _context7.sent.savedObjects;

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }]);

  return IndexPatterns;
}();

exports.IndexPatterns = IndexPatterns;