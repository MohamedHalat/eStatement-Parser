"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = void 0;

var _i18n = require("@kbn/i18n");

var _obj_define = require("./obj_define");

var _services = require("../../services");

var _common = require("../../../common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Field = // esTypes might be undefined on old index patterns that have not been refreshed since we added
// this prop. It is also undefined on scripted fields.
function Field(indexPattern, spec) {
  var shortDotsEnable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  _classCallCheck(this, Field);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "type", void 0);

  _defineProperty(this, "script", void 0);

  _defineProperty(this, "lang", void 0);

  _defineProperty(this, "count", void 0);

  _defineProperty(this, "esTypes", void 0);

  _defineProperty(this, "aggregatable", void 0);

  _defineProperty(this, "filterable", void 0);

  _defineProperty(this, "searchable", void 0);

  _defineProperty(this, "sortable", void 0);

  _defineProperty(this, "visualizable", void 0);

  _defineProperty(this, "scripted", void 0);

  _defineProperty(this, "subType", void 0);

  _defineProperty(this, "displayName", void 0);

  _defineProperty(this, "format", void 0);

  _defineProperty(this, "routes", {
    edit: '/management/kibana/index_patterns/{{indexPattern.id}}/field/{{name}}'
  });

  _defineProperty(this, "$$spec", void 0);

  // unwrap old instances of Field
  if (spec instanceof Field) spec = spec.$$spec; // construct this object using ObjDefine class, which
  // extends the Field.prototype but gets it's properties
  // defined using the logic below

  var obj = new _obj_define.ObjDefine(spec, Field.prototype);

  if (spec.name === '_source') {
    spec.type = '_source';
  } // find the type for this field, fallback to unknown type


  var type = (0, _common.getKbnFieldType)(spec.type);

  if (spec.type && !type) {
    var title = _i18n.i18n.translate('data.indexPatterns.unknownFieldHeader', {
      values: {
        type: spec.type
      },
      defaultMessage: 'Unknown field type {type}'
    });

    var text = _i18n.i18n.translate('data.indexPatterns.unknownFieldErrorMessage', {
      values: {
        name: spec.name,
        title: indexPattern.title
      },
      defaultMessage: 'Field {name} in indexPattern {title} is using an unknown field type.'
    });

    var _getNotifications = (0, _services.getNotifications)(),
        toasts = _getNotifications.toasts;

    toasts.addDanger({
      title: title,
      text: text
    });
  }

  if (!type) type = (0, _common.getKbnFieldType)('unknown');
  var format = spec.format;

  if (!_common.FieldFormat.isInstanceOfFieldFormat(format)) {
    var fieldFormats = (0, _services.getFieldFormats)();
    format = indexPattern.fieldFormatMap[spec.name] || fieldFormats.getDefaultInstance(spec.type, spec.esTypes);
  }

  var indexed = !!spec.indexed;
  var scripted = !!spec.scripted;
  var searchable = !!spec.searchable || scripted;
  var aggregatable = !!spec.aggregatable || scripted;
  var readFromDocValues = !!spec.readFromDocValues && !scripted;
  var sortable = spec.name === '_score' || (indexed || aggregatable) && type && type.sortable;
  var filterable = spec.name === '_id' || scripted || (indexed || searchable) && type && type.filterable;
  var visualizable = aggregatable;
  this.name = '';
  obj.fact('name');
  this.type = '';
  obj.fact('type');
  obj.fact('esTypes');
  obj.writ('count', spec.count || 0); // scripted objs

  obj.fact('scripted', scripted);
  obj.writ('script', scripted ? spec.script : null);
  obj.writ('lang', scripted ? spec.lang || 'painless' : null); // stats

  obj.fact('searchable', searchable);
  obj.fact('aggregatable', aggregatable);
  obj.fact('readFromDocValues', readFromDocValues); // usage flags, read-only and won't be saved

  obj.comp('format', format);
  obj.comp('sortable', sortable);
  obj.comp('filterable', filterable);
  obj.comp('visualizable', visualizable); // computed values

  obj.comp('indexPattern', indexPattern);
  obj.comp('displayName', shortDotsEnable ? (0, _common.shortenDottedString)(spec.name) : spec.name);
  this.$$spec = spec;
  obj.comp('$$spec', spec); // conflict info

  obj.writ('conflictDescriptions'); // multi info

  obj.fact('subType');
  return obj.create();
};

exports.Field = Field;
Field.prototype.routes = {
  edit: '/management/kibana/index_patterns/{{indexPattern.id}}/field/{{name}}'
};