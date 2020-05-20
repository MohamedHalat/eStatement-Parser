"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsService = void 0;

var _saved_objects_client = require("./saved_objects_client");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SavedObjectsService =
/*#__PURE__*/
function () {
  function SavedObjectsService() {
    _classCallCheck(this, SavedObjectsService);
  }

  _createClass(SavedObjectsService, [{
    key: "setup",
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start(_ref) {
      var http;
      return regeneratorRuntime.async(function start$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              http = _ref.http;
              return _context2.abrupt("return", {
                client: new _saved_objects_client.SavedObjectsClient(http)
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      return regeneratorRuntime.async(function stop$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return SavedObjectsService;
}();

exports.SavedObjectsService = SavedObjectsService;