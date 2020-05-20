"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldFormatsService = void 0;

var _lodash = require("lodash");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FieldFormatsService {
  constructor(fieldFormatClasses, getConfig) {
    _defineProperty(this, "getConfig", void 0);

    _defineProperty(this, "_fieldFormats", void 0);

    this._fieldFormats = (0, _lodash.indexBy)(fieldFormatClasses, 'id');
    this.getConfig = getConfig;
  }
  /**
   * Get the id of the default type for this field type
   * using the format:defaultTypeMap config map
   *
   * @param  {String} fieldType - the field type
   * @return {FieldFormatConfig}
   */


  getDefaultConfig(fieldType) {
    const defaultMap = this.getConfig('format:defaultTypeMap');
    return defaultMap[fieldType] || defaultMap._default_;
  }
  /**
   * Get the default fieldFormat instance for a field type.
   *
   * @param  {String} fieldType
   * @return {FieldFormat}
   */


  getDefaultInstance(fieldType) {
    return this.getInstance(this.getDefaultConfig(fieldType));
  }
  /**
   * Get the fieldFormat instance for a field format configuration.
   *
   * @param  {FieldFormatConfig} field format config
   * @return {FieldFormat}
   */


  getInstance(conf) {
    // @ts-ignore
    return new this._fieldFormats[conf.id](conf.params, this.getConfig);
  }
  /**
   * Get a FieldFormat type (class) by it's id.
   *
   * @param  {String} fieldFormatId - the FieldFormat id
   * @return {FieldFormat}
   */


  getType(fieldFormatId) {
    return this._fieldFormats[fieldFormatId];
  }

}

exports.FieldFormatsService = FieldFormatsService;