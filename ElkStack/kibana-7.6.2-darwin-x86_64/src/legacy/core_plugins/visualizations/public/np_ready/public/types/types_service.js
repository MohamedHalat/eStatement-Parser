"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VisTypeAlias", {
  enumerable: true,
  get: function get() {
    return _vis_type_alias_registry.VisTypeAlias;
  }
});
exports.TypesService = void 0;

var _vis_type_alias_registry = require("./vis_type_alias_registry");

var _base_vis_type = require("./base_vis_type");

var _react_vis_type = require("./react_vis_type");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Vis Types Service
 *
 * @internal
 */
var TypesService =
/*#__PURE__*/
function () {
  function TypesService() {
    _classCallCheck(this, TypesService);

    _defineProperty(this, "types", {});

    _defineProperty(this, "unregisteredHiddenTypes", []);
  }

  _createClass(TypesService, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      var registerVisualization = function registerVisualization(registerFn) {
        var visDefinition = registerFn();

        if (_this.unregisteredHiddenTypes.includes(visDefinition.name)) {
          visDefinition.hidden = true;
        }

        if (_this.types[visDefinition.name]) {
          throw new Error('type already exists!');
        }

        _this.types[visDefinition.name] = visDefinition;
      };

      return {
        createBaseVisualization: function createBaseVisualization(config) {
          var vis = new _base_vis_type.BaseVisType(config);
          registerVisualization(function () {
            return vis;
          });
        },
        createReactVisualization: function createReactVisualization(config) {
          var vis = new _react_vis_type.ReactVisType(config);
          registerVisualization(function () {
            return vis;
          });
        },
        registerAlias: _vis_type_alias_registry.visTypeAliasRegistry.add,
        hideTypes: function hideTypes(typeNames) {
          typeNames.forEach(function (name) {
            if (_this.types[name]) {
              _this.types[name].hidden = true;
            } else {
              _this.unregisteredHiddenTypes.push(name);
            }
          });
        }
      };
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      return {
        get: function get(visualization) {
          return _this2.types[visualization];
        },
        all: function all() {
          return _toConsumableArray(Object.values(_this2.types));
        },
        getAliases: _vis_type_alias_registry.visTypeAliasRegistry.get
      };
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here yet
    }
  }]);

  return TypesService;
}();
/** @internal */

/** @public static code */
// TODO once items are moved from ui/vis into this service


exports.TypesService = TypesService;