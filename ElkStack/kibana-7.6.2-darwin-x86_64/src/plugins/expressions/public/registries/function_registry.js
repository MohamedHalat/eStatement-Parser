"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionsRegistry = exports.Function = exports.FunctionParameter = void 0;

var _registry = require("./registry");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FunctionParameter =
/*#__PURE__*/
function () {
  function FunctionParameter(name, arg) {
    _classCallCheck(this, FunctionParameter);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "required", void 0);

    _defineProperty(this, "help", void 0);

    _defineProperty(this, "types", void 0);

    _defineProperty(this, "default", void 0);

    _defineProperty(this, "aliases", void 0);

    _defineProperty(this, "multi", void 0);

    _defineProperty(this, "resolve", void 0);

    _defineProperty(this, "options", void 0);

    var required = arg.required,
        help = arg.help,
        types = arg.types,
        aliases = arg.aliases,
        multi = arg.multi,
        resolve = arg.resolve,
        options = arg.options;

    if (name === '_') {
      throw Error('Arg names must not be _. Use it in aliases instead.');
    }

    this.name = name;
    this.required = !!required;
    this.help = help || '';
    this.types = types || [];
    this.default = arg.default;
    this.aliases = aliases || [];
    this.multi = !!multi;
    this.resolve = resolve == null ? true : resolve;
    this.options = options || [];
  }

  _createClass(FunctionParameter, [{
    key: "accepts",
    value: function accepts(type) {
      if (!this.types.length) return true;
      return this.types.indexOf(type) > -1;
    }
  }]);

  return FunctionParameter;
}();

exports.FunctionParameter = FunctionParameter;

var Function =
/**
 * Name of function
 */

/**
 * Aliases that can be used instead of `name`.
 */

/**
 * Return type of function. This SHOULD be supplied. We use it for UI
 * and autocomplete hinting. We may also use it for optimizations in
 * the future.
 */

/**
 * Function to run function (context, args)
 */

/**
 * A short help text.
 */
function Function(functionDefinition) {
  var _this = this;

  _classCallCheck(this, Function);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "aliases", void 0);

  _defineProperty(this, "type", void 0);

  _defineProperty(this, "fn", void 0);

  _defineProperty(this, "help", void 0);

  _defineProperty(this, "args", {});

  _defineProperty(this, "context", void 0);

  _defineProperty(this, "accepts", function (type) {
    // If you don't tell us about context, we'll assume you don't care what you get.
    if (!_this.context.types) return true;
    return _this.context.types.indexOf(type) > -1;
  });

  var name = functionDefinition.name,
      _type = functionDefinition.type,
      aliases = functionDefinition.aliases,
      fn = functionDefinition.fn,
      help = functionDefinition.help,
      args = functionDefinition.args,
      context = functionDefinition.context;
  this.name = name;
  this.type = _type;
  this.aliases = aliases || [];

  this.fn = function (input, params, handlers) {
    return Promise.resolve(fn(input, params, handlers));
  };

  this.help = help || '';
  this.context = context || {};

  for (var _i = 0, _Object$entries = Object.entries(args || {}); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        arg = _Object$entries$_i[1];

    this.args[key] = new FunctionParameter(key, arg);
  }
};

exports.Function = Function;

var FunctionsRegistry =
/*#__PURE__*/
function (_Registry) {
  _inherits(FunctionsRegistry, _Registry);

  function FunctionsRegistry() {
    _classCallCheck(this, FunctionsRegistry);

    return _possibleConstructorReturn(this, _getPrototypeOf(FunctionsRegistry).apply(this, arguments));
  }

  _createClass(FunctionsRegistry, [{
    key: "register",
    value: function register(functionDefinition) {
      var fn = new Function(_typeof(functionDefinition) === 'object' ? functionDefinition : functionDefinition());
      this.set(fn.name, fn);
    }
  }]);

  return FunctionsRegistry;
}(_registry.Registry);

exports.FunctionsRegistry = FunctionsRegistry;