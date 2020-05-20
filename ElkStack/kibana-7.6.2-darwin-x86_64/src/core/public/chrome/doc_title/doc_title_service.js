"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocTitleService = void 0;

var _lodash = require("lodash");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultTitle = [];
var titleSeparator = ' - ';
/** @internal */

var DocTitleService =
/*#__PURE__*/
function () {
  function DocTitleService() {
    _classCallCheck(this, DocTitleService);

    _defineProperty(this, "document", {
      title: ''
    });

    _defineProperty(this, "baseTitle", '');
  }

  _createClass(DocTitleService, [{
    key: "start",
    value: function start(_ref) {
      var _this = this;

      var document = _ref.document;
      this.document = document;
      this.baseTitle = document.title;
      return {
        change: function change(title) {
          _this.applyTitle(title);
        },
        reset: function reset() {
          _this.applyTitle(defaultTitle);
        },
        __legacy: {
          setBaseTitle: function setBaseTitle(baseTitle) {
            _this.baseTitle = baseTitle;
          }
        }
      };
    }
  }, {
    key: "applyTitle",
    value: function applyTitle(title) {
      this.document.title = this.render(title);
    }
  }, {
    key: "render",
    value: function render(title) {
      var parts = [].concat(_toConsumableArray((0, _lodash.isString)(title) ? [title] : title), [this.baseTitle]); // ensuring compat with legacy that might be passing nested arrays

      return (0, _lodash.compact)((0, _lodash.flattenDeep)(parts)).join(titleSeparator);
    }
  }]);

  return DocTitleService;
}();

exports.DocTitleService = DocTitleService;