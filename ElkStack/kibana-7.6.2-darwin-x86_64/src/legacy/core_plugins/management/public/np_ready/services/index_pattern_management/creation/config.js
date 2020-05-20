"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternCreationConfig = void 0;

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var indexPatternTypeName = _i18n.i18n.translate('management.editIndexPattern.createIndex.defaultTypeName', {
  defaultMessage: 'index pattern'
});

var indexPatternButtonText = _i18n.i18n.translate('management.editIndexPattern.createIndex.defaultButtonText', {
  defaultMessage: 'Standard index pattern'
});

var indexPatternButtonDescription = _i18n.i18n.translate('management.editIndexPattern.createIndex.defaultButtonDescription', {
  defaultMessage: 'Perform full aggregations against any data'
});

var IndexPatternCreationConfig =
/*#__PURE__*/
function () {
  function IndexPatternCreationConfig(_ref) {
    var _ref$type = _ref.type,
        type = _ref$type === void 0 ? undefined : _ref$type,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? indexPatternTypeName : _ref$name,
        _ref$showSystemIndice = _ref.showSystemIndices,
        showSystemIndices = _ref$showSystemIndice === void 0 ? true : _ref$showSystemIndice,
        _ref$httpClient = _ref.httpClient,
        httpClient = _ref$httpClient === void 0 ? null : _ref$httpClient,
        _ref$isBeta = _ref.isBeta,
        isBeta = _ref$isBeta === void 0 ? false : _ref$isBeta;

    _classCallCheck(this, IndexPatternCreationConfig);

    _defineProperty(this, "key", 'default');

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "showSystemIndices", void 0);

    _defineProperty(this, "httpClient", void 0);

    _defineProperty(this, "isBeta", void 0);

    this.type = type;
    this.name = name;
    this.showSystemIndices = showSystemIndices;
    this.httpClient = httpClient;
    this.isBeta = isBeta;
  }

  _createClass(IndexPatternCreationConfig, [{
    key: "getIndexPatternCreationOption",
    value: function getIndexPatternCreationOption(urlHandler) {
      return regeneratorRuntime.async(function getIndexPatternCreationOption$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", {
                text: indexPatternButtonText,
                description: indexPatternButtonDescription,
                testSubj: "createStandardIndexPatternButton",
                onClick: function onClick() {
                  urlHandler('/management/kibana/index_pattern');
                }
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getIndexPatternType",
    value: function getIndexPatternType() {
      return this.type;
    }
  }, {
    key: "getIndexPatternName",
    value: function getIndexPatternName() {
      return this.name;
    }
  }, {
    key: "getIsBeta",
    value: function getIsBeta() {
      return this.isBeta;
    }
  }, {
    key: "getShowSystemIndices",
    value: function getShowSystemIndices() {
      return this.showSystemIndices;
    }
  }, {
    key: "getIndexTags",
    value: function getIndexTags() {
      return [];
    }
  }, {
    key: "checkIndicesForErrors",
    value: function checkIndicesForErrors() {
      return undefined;
    }
  }, {
    key: "getIndexPatternMappings",
    value: function getIndexPatternMappings() {
      return {};
    }
  }, {
    key: "renderPrompt",
    value: function renderPrompt() {
      return null;
    }
  }, {
    key: "getFetchForWildcardOptions",
    value: function getFetchForWildcardOptions() {
      return {};
    }
  }]);

  return IndexPatternCreationConfig;
}();

exports.IndexPatternCreationConfig = IndexPatternCreationConfig;