"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataPlugin = void 0;

var _search = require("./search");

var _services = require("../../../../plugins/data/public/services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Data Plugin - public
 *
 * This is the entry point for the entire client-side public contract of the plugin.
 * If something is not explicitly exported here, you can safely assume it is private
 * to the plugin and not considered stable.
 *
 * All stateful contracts will be injected by the platform at runtime, and are defined
 * in the setup/start interfaces. The remaining items exported here are either types,
 * or static code.
 */
var DataPlugin =
/*#__PURE__*/
function () {
  function DataPlugin() {
    _classCallCheck(this, DataPlugin);

    _defineProperty(this, "search", new _search.SearchService());
  }

  _createClass(DataPlugin, [{
    key: "setup",
    value: function setup(core) {}
  }, {
    key: "start",
    value: function start(core, _ref) {
      var data = _ref.data;

      /**
       * We need to call all of the same setters in the legacy world, because instances
       * set in the new platform `data/public/services` are not accessible in legacy.
       * This can cause legacy code which relies on services utilizing these to fail.
       */
      (0, _services.setHttp)(core.http);
      (0, _services.setNotifications)(core.notifications);
      (0, _services.setOverlays)(core.overlays);
      (0, _services.setFieldFormats)(data.fieldFormats);
      (0, _services.setIndexPatterns)(data.indexPatterns);
      (0, _services.setQueryService)(data.query);
      return {
        search: this.search.start(core)
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      this.search.stop();
    }
  }]);

  return DataPlugin;
}();

exports.DataPlugin = DataPlugin;