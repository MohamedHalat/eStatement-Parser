"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldList = void 0;

var _lodash = require("lodash");

var _field = require("./field");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FieldList =
/*#__PURE__*/
function (_Array) {
  _inherits(FieldList, _Array);

  function FieldList(indexPattern) {
    var _this;

    var specs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var shortDotsEnable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, FieldList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FieldList).call(this));

    _defineProperty(_assertThisInitialized(_this), "byName", new Map());

    _defineProperty(_assertThisInitialized(_this), "groups", new Map());

    _defineProperty(_assertThisInitialized(_this), "indexPattern", void 0);

    _defineProperty(_assertThisInitialized(_this), "shortDotsEnable", void 0);

    _defineProperty(_assertThisInitialized(_this), "setByName", function (field) {
      return _this.byName.set(field.name, field);
    });

    _defineProperty(_assertThisInitialized(_this), "setByGroup", function (field) {
      if (typeof _this.groups.get(field.type) === 'undefined') {
        _this.groups.set(field.type, new Map());
      }

      _this.groups.get(field.type).set(field.name, field);
    });

    _defineProperty(_assertThisInitialized(_this), "removeByGroup", function (field) {
      return _this.groups.get(field.type).delete(field.name);
    });

    _defineProperty(_assertThisInitialized(_this), "getByName", function (name) {
      return _this.byName.get(name);
    });

    _defineProperty(_assertThisInitialized(_this), "getByType", function (type) {
      return _toConsumableArray((_this.groups.get(type) || new Map()).values());
    });

    _defineProperty(_assertThisInitialized(_this), "add", function (field) {
      var newField = new _field.Field(_this.indexPattern, field, _this.shortDotsEnable);

      _this.push(newField);

      _this.setByName(newField);

      _this.setByGroup(newField);
    });

    _defineProperty(_assertThisInitialized(_this), "remove", function (field) {
      _this.removeByGroup(field);

      _this.byName.delete(field.name);

      var fieldIndex = (0, _lodash.findIndex)(_assertThisInitialized(_this), {
        name: field.name
      });

      _this.splice(fieldIndex, 1);
    });

    _defineProperty(_assertThisInitialized(_this), "update", function (field) {
      var index = _this.findIndex(function (f) {
        return f.name === field.name;
      });

      _this.splice(index, 1, field);

      _this.setByName(field);

      _this.removeByGroup(field);

      _this.setByGroup(field);
    });

    _this.indexPattern = indexPattern;
    _this.shortDotsEnable = shortDotsEnable;
    specs.map(function (field) {
      return _this.add(field);
    });
    return _this;
  }

  return FieldList;
}(_wrapNativeSuper(Array));

exports.FieldList = FieldList;