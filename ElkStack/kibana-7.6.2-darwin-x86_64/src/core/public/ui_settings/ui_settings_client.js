"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSettingsClient = void 0;

var _lodash = require("lodash");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UiSettingsClient =
/*#__PURE__*/
function () {
  function UiSettingsClient(params) {
    var _this = this;

    _classCallCheck(this, UiSettingsClient);

    _defineProperty(this, "update$", new _rxjs.Subject());

    _defineProperty(this, "saved$", new _rxjs.Subject());

    _defineProperty(this, "updateErrors$", new _rxjs.Subject());

    _defineProperty(this, "api", void 0);

    _defineProperty(this, "defaults", void 0);

    _defineProperty(this, "cache", void 0);

    this.api = params.api;
    this.defaults = (0, _lodash.cloneDeep)(params.defaults);
    this.cache = (0, _lodash.defaultsDeep)({}, this.defaults, (0, _lodash.cloneDeep)(params.initialSettings));
    params.done$.subscribe({
      complete: function complete() {
        _this.update$.complete();

        _this.saved$.complete();

        _this.updateErrors$.complete();
      }
    });
  }

  _createClass(UiSettingsClient, [{
    key: "getAll",
    value: function getAll() {
      return (0, _lodash.cloneDeep)(this.cache);
    }
  }, {
    key: "get",
    value: function get(key, defaultOverride) {
      var declared = this.isDeclared(key);

      if (!declared && defaultOverride !== undefined) {
        return defaultOverride;
      }

      if (!declared) {
        throw new Error("Unexpected `IUiSettingsClient.get(\"".concat(key, "\")` call on unrecognized configuration setting \"").concat(key, "\".\nSetting an initial value via `IUiSettingsClient.set(\"").concat(key, "\", value)` before attempting to retrieve\nany custom setting value for \"").concat(key, "\" may fix this issue.\nYou can use `IUiSettingsClient.get(\"").concat(key, "\", defaultValue)`, which will just return\n`defaultValue` when the key is unrecognized."));
      }

      var type = this.cache[key].type;
      var userValue = this.cache[key].userValue;
      var defaultValue = defaultOverride !== undefined ? defaultOverride : this.cache[key].value;
      var value = userValue == null ? defaultValue : userValue;

      if (type === 'json') {
        return JSON.parse(value);
      }

      if (type === 'number') {
        return parseFloat(value);
      }

      return value;
    }
  }, {
    key: "get$",
    value: function get$(key, defaultOverride) {
      var _this2 = this;

      return (0, _rxjs.concat)((0, _rxjs.defer)(function () {
        return (0, _rxjs.of)(_this2.get(key, defaultOverride));
      }), this.update$.pipe((0, _operators.filter)(function (update) {
        return update.key === key;
      }), (0, _operators.map)(function () {
        return _this2.get(key, defaultOverride);
      })));
    }
  }, {
    key: "set",
    value: function set(key, value) {
      return regeneratorRuntime.async(function set$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.update(key, value));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      return regeneratorRuntime.async(function remove$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.update(key, null));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "isDeclared",
    value: function isDeclared(key) {
      return key in this.cache;
    }
  }, {
    key: "isDefault",
    value: function isDefault(key) {
      return !this.isDeclared(key) || this.cache[key].userValue == null;
    }
  }, {
    key: "isCustom",
    value: function isCustom(key) {
      return this.isDeclared(key) && !('value' in this.cache[key]);
    }
  }, {
    key: "isOverridden",
    value: function isOverridden(key) {
      return this.isDeclared(key) && Boolean(this.cache[key].isOverridden);
    }
  }, {
    key: "overrideLocalDefault",
    value: function overrideLocalDefault(key, newDefault) {
      // capture the previous value
      var prevDefault = this.defaults[key] ? this.defaults[key].value : undefined; // update defaults map

      this.defaults[key] = _objectSpread({}, this.defaults[key] || {}, {
        value: newDefault
      }); // update cached default value

      this.cache[key] = _objectSpread({}, this.cache[key] || {}, {
        value: newDefault
      }); // don't broadcast change if userValue was already overriding the default

      if (this.cache[key].userValue == null) {
        this.update$.next({
          key: key,
          newValue: newDefault,
          oldValue: prevDefault
        });
        this.saved$.next({
          key: key,
          newValue: newDefault,
          oldValue: prevDefault
        });
      }
    }
  }, {
    key: "getUpdate$",
    value: function getUpdate$() {
      return this.update$.asObservable();
    }
  }, {
    key: "getSaved$",
    value: function getSaved$() {
      return this.saved$.asObservable();
    }
  }, {
    key: "getUpdateErrors$",
    value: function getUpdateErrors$() {
      return this.updateErrors$.asObservable();
    }
  }, {
    key: "assertUpdateAllowed",
    value: function assertUpdateAllowed(key) {
      if (this.isOverridden(key)) {
        throw new Error("Unable to update \"".concat(key, "\" because its value is overridden by the Kibana server"));
      }
    }
  }, {
    key: "update",
    value: function update(key, newVal) {
      var declared, defaults, oldVal, unchanged, initialVal, _ref, settings;

      return regeneratorRuntime.async(function update$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.assertUpdateAllowed(key);
              declared = this.isDeclared(key);
              defaults = this.defaults;
              oldVal = declared ? this.cache[key].userValue : undefined;
              unchanged = oldVal === newVal;

              if (!unchanged) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", true);

            case 7:
              initialVal = declared ? this.get(key) : undefined;
              this.setLocally(key, newVal);
              _context3.prev = 9;
              _context3.next = 12;
              return regeneratorRuntime.awrap(this.api.batchSet(key, newVal));

            case 12:
              _ref = _context3.sent;
              settings = _ref.settings;
              this.cache = (0, _lodash.defaultsDeep)({}, defaults, settings);
              this.saved$.next({
                key: key,
                newValue: newVal,
                oldValue: initialVal
              });
              return _context3.abrupt("return", true);

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](9);
              this.setLocally(key, initialVal);
              this.updateErrors$.next(_context3.t0);
              return _context3.abrupt("return", false);

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[9, 19]]);
    }
  }, {
    key: "setLocally",
    value: function setLocally(key, newValue) {
      this.assertUpdateAllowed(key);

      if (!this.isDeclared(key)) {
        this.cache[key] = {};
      }

      var oldValue = this.get(key);

      if (newValue === null) {
        delete this.cache[key].userValue;
      } else {
        var type = this.cache[key].type;

        if (type === 'json' && typeof newValue !== 'string') {
          this.cache[key].userValue = JSON.stringify(newValue);
        } else {
          this.cache[key].userValue = newValue;
        }
      }

      this.update$.next({
        key: key,
        newValue: newValue,
        oldValue: oldValue
      });
    }
  }]);

  return UiSettingsClient;
}();

exports.UiSettingsClient = UiSettingsClient;