"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpService = void 0;

var _base_path = require("./base_path");

var _anonymous_paths_service = require("./anonymous_paths_service");

var _loading_count_service = require("./loading_count_service");

var _fetch = require("./fetch");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var HttpService =
/*#__PURE__*/
function () {
  function HttpService() {
    _classCallCheck(this, HttpService);

    _defineProperty(this, "anonymousPaths", new _anonymous_paths_service.AnonymousPathsService());

    _defineProperty(this, "loadingCount", new _loading_count_service.LoadingCountService());

    _defineProperty(this, "service", void 0);
  }

  _createClass(HttpService, [{
    key: "setup",
    value: function setup(_ref) {
      var injectedMetadata = _ref.injectedMetadata,
          fatalErrors = _ref.fatalErrors;
      var kibanaVersion = injectedMetadata.getKibanaVersion();
      var basePath = new _base_path.BasePath(injectedMetadata.getBasePath());
      var fetchService = new _fetch.Fetch({
        basePath: basePath,
        kibanaVersion: kibanaVersion
      });
      var loadingCount = this.loadingCount.setup({
        fatalErrors: fatalErrors
      });
      this.service = _objectSpread({
        basePath: basePath,
        anonymousPaths: this.anonymousPaths.setup({
          basePath: basePath
        }),
        intercept: fetchService.intercept.bind(fetchService),
        fetch: fetchService.fetch.bind(fetchService),
        delete: fetchService.delete.bind(fetchService),
        get: fetchService.get.bind(fetchService),
        head: fetchService.head.bind(fetchService),
        options: fetchService.options.bind(fetchService),
        patch: fetchService.patch.bind(fetchService),
        post: fetchService.post.bind(fetchService),
        put: fetchService.put.bind(fetchService)
      }, loadingCount);
      return this.service;
    }
  }, {
    key: "start",
    value: function start() {
      if (!this.service) {
        throw new Error("HttpService#setup() must be called first!");
      }

      return this.service;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.loadingCount.stop();
    }
  }]);

  return HttpService;
}();

exports.HttpService = HttpService;