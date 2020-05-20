"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PercentFormat = void 0;

var _numeral = require("./numeral");

var _types = require("../types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PercentFormat extends _numeral.NumeralFormat {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "id", PercentFormat.id);

    _defineProperty(this, "title", PercentFormat.title);

    _defineProperty(this, "allowsNumericalAggregations", true);

    _defineProperty(this, "getParamDefaults", () => ({
      pattern: this.getConfig('format:percent:defaultPattern'),
      fractional: true
    }));

    _defineProperty(this, "textConvert", val => {
      const formatted = super.getConvertedValue(val);

      if (this.param('fractional')) {
        return formatted;
      }

      return String(Number(formatted) / 100);
    });
  }

}

exports.PercentFormat = PercentFormat;

_defineProperty(PercentFormat, "id", _types.FIELD_FORMAT_IDS.PERCENT);

_defineProperty(PercentFormat, "title", 'Percentage');