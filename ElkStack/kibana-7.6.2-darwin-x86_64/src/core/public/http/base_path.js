"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePath = void 0;

var _utils = require("../../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BasePath = function BasePath() {
  var _this = this;

  var basePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  _classCallCheck(this, BasePath);

  this.basePath = basePath;

  _defineProperty(this, "get", function () {
    return _this.basePath;
  });

  _defineProperty(this, "prepend", function (path) {
    if (!_this.basePath) return path;
    return (0, _utils.modifyUrl)(path, function (parts) {
      if (!parts.hostname && parts.pathname && parts.pathname.startsWith('/')) {
        parts.pathname = "".concat(_this.basePath).concat(parts.pathname);
      }
    });
  });

  _defineProperty(this, "remove", function (path) {
    if (!_this.basePath) {
      return path;
    }

    if (path === _this.basePath) {
      return '/';
    }

    if (path.startsWith("".concat(_this.basePath, "/"))) {
      return path.slice(_this.basePath.length);
    }

    return path;
  });
};

exports.BasePath = BasePath;