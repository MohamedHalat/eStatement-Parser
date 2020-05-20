"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStorage = createStorage;
exports.Storage = exports.StorageKeys = void 0;

var _lodash = require("lodash");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StorageKeys;
exports.StorageKeys = StorageKeys;

(function (StorageKeys) {
  StorageKeys["WIDTH"] = "widths";
})(StorageKeys || (exports.StorageKeys = StorageKeys = {}));

var Storage =
/*#__PURE__*/
function () {
  function Storage(engine, prefix) {
    _classCallCheck(this, Storage);

    this.engine = engine;
    this.prefix = prefix;
  }

  _createClass(Storage, [{
    key: "encode",
    value: function encode(val) {
      return JSON.stringify(val);
    }
  }, {
    key: "decode",
    value: function decode(val) {
      if (typeof val === 'string') {
        return JSON.parse(val);
      }
    }
  }, {
    key: "encodeKey",
    value: function encodeKey(key) {
      return "".concat(this.prefix).concat(key);
    }
  }, {
    key: "decodeKey",
    value: function decodeKey(key) {
      if ((0, _lodash.startsWith)(key, this.prefix)) {
        return "".concat(key.slice(this.prefix.length));
      }
    }
  }, {
    key: "set",
    value: function set(key, val) {
      this.engine.setItem(this.encodeKey(key), this.encode(val));
      return val;
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.engine.getItem(this.encodeKey(key)) != null;
    }
  }, {
    key: "get",
    value: function get(key, _default) {
      if (this.has(key)) {
        return this.decode(this.engine.getItem(this.encodeKey(key)));
      } else {
        return _default;
      }
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return this.engine.removeItem(this.encodeKey(key));
    }
  }, {
    key: "keys",
    value: function keys() {
      var _this = this;

      return (0, _lodash.transform)((0, _lodash.keys)(this.engine), function (ours, key) {
        var ourKey = _this.decodeKey(key);

        if (ourKey != null) ours.push(ourKey);
      });
    }
  }]);

  return Storage;
}();

exports.Storage = Storage;

function createStorage(deps) {
  return new Storage(deps.engine, deps.prefix);
}