"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PriorityMap = void 0;

var _lodash = require("lodash");

var _Symbol$iterator;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Symbol$iterator = Symbol.iterator;

/**
 * Immutable map that ensures entries are always in descending order based on
 * the values 'priority' property.
 */
var PriorityMap =
/*#__PURE__*/
function () {
  function PriorityMap(map) {
    _classCallCheck(this, PriorityMap);

    _defineProperty(this, "map", void 0);

    this.map = map ? new Map(sortEntries(map)) : new Map();
  }

  _createClass(PriorityMap, [{
    key: "add",
    value: function add(key, value) {
      return new PriorityMap(new Map(sortEntries([].concat(_toConsumableArray(this.map), [[key, value]]))));
    }
  }, {
    key: "remove",
    value: function remove(key) {
      return new PriorityMap(new Map(_toConsumableArray(this.map).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            itemKey = _ref2[0];

        return itemKey !== key;
      })));
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.map.has(key);
    }
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return this.map[Symbol.iterator]();
    }
  }, {
    key: "values",
    value: function values() {
      return this.map.values();
    }
  }]);

  return PriorityMap;
}();

exports.PriorityMap = PriorityMap;

var sortEntries = function sortEntries(map) {
  return (0, _lodash.sortBy)(_toConsumableArray(map), '1.priority').reverse();
};