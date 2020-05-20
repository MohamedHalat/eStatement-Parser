"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldFormatsService = void 0;

var _field_formats = require("./field_formats");

var _common = require("../../common/");

var _converters = require("../field_formats/converters");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FieldFormatsService =
/*#__PURE__*/
function () {
  function FieldFormatsService() {
    _classCallCheck(this, FieldFormatsService);

    _defineProperty(this, "fieldFormats", new _field_formats.FieldFormatRegisty());
  }

  _createClass(FieldFormatsService, [{
    key: "setup",
    value: function setup(core) {
      this.fieldFormats.init(core);
      this.fieldFormats.register([_common.BoolFormat, _common.BytesFormat, _common.ColorFormat, _converters.DateFormat, _common.DateNanosFormat, _common.DurationFormat, _common.IpFormat, _common.NumberFormat, _common.PercentFormat, _common.RelativeDateFormat, _common.SourceFormat, _common.StaticLookupFormat, _common.StringFormat, _common.TruncateFormat, _common.UrlFormat]);
      return this.fieldFormats;
    }
  }, {
    key: "start",
    value: function start() {
      return this.fieldFormats;
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here yet
    }
  }]);

  return FieldFormatsService;
}();
/** @public */


exports.FieldFormatsService = FieldFormatsService;