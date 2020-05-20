"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceFormat = void 0;

var _lodash = require("lodash");

var _no_white_space = require("../../../../../legacy/core_plugins/kibana/common/utils/no_white_space");

var _utils = require("../../utils");

var _types = require("../../kbn_field_types/types");

var _field_format = require("../field_format");

var _types2 = require("../types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const templateHtml = `
  <dl class="source truncate-by-height">
    <% defPairs.forEach(function (def) { %>
      <dt><%- def[0] %>:</dt>
      <dd><%= def[1] %></dd>
      <%= ' ' %>
    <% }); %>
  </dl>`;
const doTemplate = (0, _lodash.template)((0, _no_white_space.noWhiteSpace)(templateHtml));

class SourceFormat extends _field_format.FieldFormat {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "textConvert", value => JSON.stringify(value));

    _defineProperty(this, "htmlConvert", (value, options = {}) => {
      const {
        field,
        hit
      } = options;

      if (!field) {
        const converter = this.getConverterFor('text');
        return (0, _lodash.escape)(converter(value));
      }

      const highlights = hit && hit.highlight || {};
      const formatted = field.indexPattern.formatHit(hit);
      const highlightPairs = [];
      const sourcePairs = [];
      const isShortDots = this.getConfig('shortDots:enable');
      (0, _lodash.keys)(formatted).forEach(key => {
        const pairs = highlights[key] ? highlightPairs : sourcePairs;
        const newField = isShortDots ? (0, _utils.shortenDottedString)(key) : key;
        const val = formatted[key];
        pairs.push([newField, val]);
      }, []);
      return doTemplate({
        defPairs: highlightPairs.concat(sourcePairs)
      });
    });
  }

}

exports.SourceFormat = SourceFormat;

_defineProperty(SourceFormat, "id", _types2.FIELD_FORMAT_IDS._SOURCE);

_defineProperty(SourceFormat, "title", '_source');

_defineProperty(SourceFormat, "fieldType", _types.KBN_FIELD_TYPES._SOURCE);