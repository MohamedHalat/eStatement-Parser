"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldFormatRegisty = void 0;

var _lodash = require("lodash");

var _common = require("../../common");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FieldFormatRegisty =
/*#__PURE__*/
function () {
  function FieldFormatRegisty() {
    var _this = this;

    _classCallCheck(this, FieldFormatRegisty);

    _defineProperty(this, "fieldFormats", void 0);

    _defineProperty(this, "uiSettings", void 0);

    _defineProperty(this, "defaultMap", void 0);

    _defineProperty(this, "basePath", void 0);

    _defineProperty(this, "getConfig", function (key, override) {
      return _this.uiSettings.get(key, override);
    });

    _defineProperty(this, "getDefaultConfig", function (fieldType, esTypes) {
      var type = _this.getDefaultTypeName(fieldType, esTypes);

      return _this.defaultMap && _this.defaultMap[type] || {
        id: _common.FIELD_FORMAT_IDS.STRING,
        params: {}
      };
    });

    _defineProperty(this, "getType", function (formatId) {
      var fieldFormat = _this.fieldFormats.get(formatId);

      if (fieldFormat) {
        var decoratedFieldFormat = _this.fieldFormatMetaParamsDecorator(fieldFormat);

        if (decoratedFieldFormat) {
          return decoratedFieldFormat;
        }
      }

      return undefined;
    });

    _defineProperty(this, "getDefaultType", function (fieldType, esTypes) {
      var config = _this.getDefaultConfig(fieldType, esTypes);

      return _this.getType(config.id);
    });

    _defineProperty(this, "getTypeNameByEsTypes", function (esTypes) {
      if (!Array.isArray(esTypes)) {
        return undefined;
      }

      return esTypes.find(function (type) {
        return _this.defaultMap[type] && _this.defaultMap[type].es;
      });
    });

    _defineProperty(this, "getDefaultTypeName", function (fieldType, esTypes) {
      var esType = _this.getTypeNameByEsTypes(esTypes);

      return esType || fieldType;
    });

    _defineProperty(this, "getInstance", (0, _lodash.memoize)(function (formatId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var DerivedFieldFormat = _this.getType(formatId);

      if (!DerivedFieldFormat) {
        throw new Error("Field Format '".concat(formatId, "' not found!"));
      }

      return new DerivedFieldFormat(params, _this.getConfig);
    }));

    _defineProperty(this, "getDefaultInstance", (0, _lodash.memoize)(this.getDefaultInstancePlain, this.getDefaultInstanceCacheResolver));

    _defineProperty(this, "register", function (fieldFormats) {
      fieldFormats.forEach(function (fieldFormat) {
        return _this.fieldFormats.set(fieldFormat.id, fieldFormat);
      });
      return _this;
    });

    _defineProperty(this, "fieldFormatMetaParamsDecorator", function (fieldFormat) {
      var getMetaParams = function getMetaParams(customParams) {
        return _this.buildMetaParams(customParams);
      };

      if (fieldFormat) {
        var _class, _temp;

        return _temp = _class =
        /*#__PURE__*/
        function (_fieldFormat) {
          _inherits(DecoratedFieldFormat, _fieldFormat);

          function DecoratedFieldFormat() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var getConfig = arguments.length > 1 ? arguments[1] : undefined;

            _classCallCheck(this, DecoratedFieldFormat);

            return _possibleConstructorReturn(this, _getPrototypeOf(DecoratedFieldFormat).call(this, getMetaParams(params), getConfig));
          }

          return DecoratedFieldFormat;
        }(fieldFormat), _defineProperty(_class, "id", fieldFormat.id), _defineProperty(_class, "fieldType", fieldFormat.fieldType), _temp;
      }

      return undefined;
    });

    _defineProperty(this, "buildMetaParams", function (customParams) {
      return _objectSpread({
        parsedUrl: {
          origin: window.location.origin,
          pathname: window.location.pathname,
          basePath: _this.basePath
        }
      }, customParams);
    });

    this.fieldFormats = new Map();
    this.defaultMap = {};
  }

  _createClass(FieldFormatRegisty, [{
    key: "init",
    value: function init(_ref) {
      var _this2 = this;

      var uiSettings = _ref.uiSettings,
          http = _ref.http;
      this.uiSettings = uiSettings;
      this.basePath = http.basePath.get();
      this.parseDefaultTypeMap(this.uiSettings.get('format:defaultTypeMap'));
      this.uiSettings.getUpdate$().subscribe(function (_ref2) {
        var key = _ref2.key,
            newValue = _ref2.newValue;

        if (key === 'format:defaultTypeMap') {
          _this2.parseDefaultTypeMap(newValue);
        }
      });
    }
    /**
     * Get the id of the default type for this field type
     * using the format:defaultTypeMap config map
     *
     * @param  {KBN_FIELD_TYPES} fieldType - the field type
     * @param  {ES_FIELD_TYPES[]} esTypes - Array of ES data types
     * @return {FieldType}
     */

  }, {
    key: "getDefaultInstancePlain",

    /**
     * Get the default fieldFormat instance for a field format.
     *
     * @param  {KBN_FIELD_TYPES} fieldType
     * @param  {ES_FIELD_TYPES[]} esTypes
     * @return {FieldFormat}
     */
    value: function getDefaultInstancePlain(fieldType, esTypes) {
      var conf = this.getDefaultConfig(fieldType, esTypes);
      var DerivedFieldFormat = this.getType(conf.id);

      if (!DerivedFieldFormat) {
        throw new Error("Field Format '".concat(conf.id, "' not found!"));
      }

      return new DerivedFieldFormat(conf.params, this.getConfig);
    }
    /**
     * Returns a cache key built by the given variables for caching in memoized
     * Where esType contains fieldType, fieldType is returned
     * -> kibana types have a higher priority in that case
     * -> would lead to failing tests that match e.g. date format with/without esTypes
     * https://lodash.com/docs#memoize
     *
     * @param  {KBN_FIELD_TYPES} fieldType
     * @param  {ES_FIELD_TYPES[]} esTypes
     * @return {String}
     */

  }, {
    key: "getDefaultInstanceCacheResolver",
    value: function getDefaultInstanceCacheResolver(fieldType, esTypes) {
      // @ts-ignore
      return Array.isArray(esTypes) && esTypes.indexOf(fieldType) === -1 ? [fieldType].concat(_toConsumableArray(esTypes)).join('-') : fieldType;
    }
    /**
     * Get filtered list of field formats by format type
     *
     * @param  {KBN_FIELD_TYPES} fieldType
     * @return {FieldFormat[]}
     */

  }, {
    key: "getByFieldType",
    value: function getByFieldType(fieldType) {
      var _this3 = this;

      return _toConsumableArray(this.fieldFormats.values()).filter(function (format) {
        return format && format.fieldType.indexOf(fieldType) !== -1;
      }).map(function (format) {
        return _this3.fieldFormatMetaParamsDecorator(format);
      });
    }
    /**
     * Get the default fieldFormat instance for a field format.
     * It's a memoized function that builds and reads a cache
     *
     * @param  {KBN_FIELD_TYPES} fieldType
     * @param  {ES_FIELD_TYPES[]} esTypes
     * @return {FieldFormat}
     */

  }, {
    key: "parseDefaultTypeMap",
    value: function parseDefaultTypeMap(value) {
      this.defaultMap = value;
      (0, _lodash.forOwn)(this, function (fn) {
        if ((0, _lodash.isFunction)(fn) && fn.cache) {
          // clear all memoize caches
          // @ts-ignore
          fn.cache = new _lodash.memoize.Cache();
        }
      });
    }
  }]);

  return FieldFormatRegisty;
}();

exports.FieldFormatRegisty = FieldFormatRegisty;