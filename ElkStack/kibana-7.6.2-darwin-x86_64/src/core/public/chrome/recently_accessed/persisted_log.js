"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersistedLog = void 0;

var _lodash = require("lodash");

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PersistedLog =
/*#__PURE__*/
function () {
  function PersistedLog(name, options) {
    var storage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

    _classCallCheck(this, PersistedLog);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "maxLength", void 0);

    _defineProperty(this, "isEqual", void 0);

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "items$", void 0);

    this.name = name;
    this.maxLength = typeof options.maxLength === 'string' ? this.maxLength = parseInt(options.maxLength, 10) : options.maxLength;
    this.isEqual = options.isEqual || _lodash.isEqual;
    this.storage = storage;
    this.items$ = new Rx.BehaviorSubject(this.loadItems());

    if (this.maxLength !== undefined && !isNaN(this.maxLength)) {
      this.items$.next((0, _lodash.take)(this.items$.value, this.maxLength));
    }
  }

  _createClass(PersistedLog, [{
    key: "add",
    value: function add(val) {
      var _this = this;

      if (val == null) {
        return this.items$.value;
      }

      var nextItems = [val].concat(_toConsumableArray(_toConsumableArray(this.items$.value).filter(function (item) {
        return !_this.isEqual(item, val);
      }))).slice(0, this.maxLength); // truncate
      // Persist the stack to storage

      this.storage.setItem(this.name, JSON.stringify(nextItems)); // Notify subscribers

      this.items$.next(nextItems);
      return nextItems;
    }
  }, {
    key: "get",
    value: function get() {
      return (0, _lodash.cloneDeep)(this.items$.value);
    }
  }, {
    key: "get$",
    value: function get$() {
      return this.items$.pipe((0, _operators.map)(function (items) {
        return (0, _lodash.cloneDeep)(items);
      }));
    }
  }, {
    key: "loadItems",
    value: function loadItems() {
      try {
        return JSON.parse(this.storage.getItem(this.name) || '[]');
      } catch (_unused) {
        return [];
      }
    }
  }]);

  return PersistedLog;
}();

exports.PersistedLog = PersistedLog;