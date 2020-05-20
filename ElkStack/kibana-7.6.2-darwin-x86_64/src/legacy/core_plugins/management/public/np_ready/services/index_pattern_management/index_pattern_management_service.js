"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternManagementService = void 0;

var _creation = require("./creation");

var _list = require("./list");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Index patterns management service
 *
 * @internal
 */
var IndexPatternManagementService =
/*#__PURE__*/
function () {
  function IndexPatternManagementService() {
    _classCallCheck(this, IndexPatternManagementService);
  }

  _createClass(IndexPatternManagementService, [{
    key: "setup",
    value: function setup(_ref) {
      var httpClient = _ref.httpClient;
      var creation = new _creation.IndexPatternCreationManager(httpClient);
      var list = new _list.IndexPatternListManager();
      creation.add(_creation.IndexPatternCreationConfig);
      list.add(_list.IndexPatternListConfig);
      return {
        creation: creation,
        list: list
      };
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here yet.
    }
  }]);

  return IndexPatternManagementService;
}();
/** @internal */


exports.IndexPatternManagementService = IndexPatternManagementService;