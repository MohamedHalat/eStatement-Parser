"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BfetchPublicPlugin = void 0;

var _streaming = require("./streaming");

var _common = require("../common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BfetchPublicPlugin =
/*#__PURE__*/
function () {
  function BfetchPublicPlugin(initializerContext) {
    _classCallCheck(this, BfetchPublicPlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "api", void 0);

    _defineProperty(this, "fetchStreaming", function (version, basePath) {
      return function (params) {
        return (0, _streaming.fetchStreaming)(_objectSpread({}, params, {
          url: "".concat(basePath, "/").concat((0, _common.removeLeadingSlash)(params.url)),
          headers: _objectSpread({
            'Content-Type': 'application/json',
            'kbn-version': version
          }, params.headers || {})
        }));
      };
    });
  }

  _createClass(BfetchPublicPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      var version = this.initializerContext.env.packageInfo.version;
      var basePath = core.http.basePath.get();
      var fetchStreaming = this.fetchStreaming(version, basePath);
      this.api = {
        fetchStreaming: fetchStreaming
      };
      return this.api;
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      return this.api;
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return BfetchPublicPlugin;
}();

exports.BfetchPublicPlugin = BfetchPublicPlugin;