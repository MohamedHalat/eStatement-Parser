"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldParamType = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../plugins/kibana_utils/public");

var _field = require("../../vis/editors/default/controls/field");

var _base = require("./base");

var _notify = require("../../notify");

var _filter = require("../filter");

var _public2 = require("../../../../../plugins/data/public");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filterByType = (0, _filter.propFilter)('type');

var FieldParamType =
/*#__PURE__*/
function (_BaseParamType) {
  _inherits(FieldParamType, _BaseParamType);

  function FieldParamType(config) {
    var _this;

    _classCallCheck(this, FieldParamType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FieldParamType).call(this, config));

    _defineProperty(_assertThisInitialized(_this), "editorComponent", _field.FieldParamEditor);

    _defineProperty(_assertThisInitialized(_this), "required", true);

    _defineProperty(_assertThisInitialized(_this), "scriptable", true);

    _defineProperty(_assertThisInitialized(_this), "filterFieldTypes", void 0);

    _defineProperty(_assertThisInitialized(_this), "onlyAggregatable", void 0);

    _defineProperty(_assertThisInitialized(_this), "getAvailableFields", function (fields) {
      var filteredFields = fields.filter(function (field) {
        var _assertThisInitialize = _assertThisInitialized(_this),
            onlyAggregatable = _assertThisInitialize.onlyAggregatable,
            scriptable = _assertThisInitialize.scriptable,
            filterFieldTypes = _assertThisInitialize.filterFieldTypes;

        if (onlyAggregatable && (!field.aggregatable || (0, _public2.isNestedField)(field)) || !scriptable && field.scripted) {
          return false;
        }

        if (!filterFieldTypes) {
          return true;
        }

        return filterByType([field], filterFieldTypes).length !== 0;
      });
      return filteredFields;
    });

    _this.filterFieldTypes = config.filterFieldTypes || '*';
    _this.onlyAggregatable = config.onlyAggregatable !== false;

    if (!config.write) {
      _this.write = function (aggConfig, output) {
        var field = aggConfig.getField();

        if (!field) {
          throw new TypeError(_i18n.i18n.translate('common.ui.aggTypes.paramTypes.field.requiredFieldParameterErrorMessage', {
            defaultMessage: '{fieldParameter} is a required parameter',
            values: {
              fieldParameter: '"field"'
            }
          }));
        }

        if (field.scripted) {
          output.params.script = {
            source: field.script,
            lang: field.lang
          };
        } else {
          output.params.field = field.name;
        }
      };
    }

    _this.serialize = function (field) {
      return field.name;
    };

    _this.deserialize = function (fieldName, aggConfig) {
      if (!aggConfig) {
        throw new Error('aggConfig was not provided to FieldParamType deserialize function');
      }

      var field = aggConfig.getIndexPattern().fields.getByName(fieldName);

      if (!field) {
        throw new _public.SavedObjectNotFound('index-pattern-field', fieldName);
      } // @ts-ignore


      var validField = _this.getAvailableFields(aggConfig.getIndexPattern().fields).find(function (f) {
        return f.name === fieldName;
      });

      if (!validField) {
        _notify.toastNotifications.addDanger(_i18n.i18n.translate('common.ui.aggTypes.paramTypes.field.invalidSavedFieldParameterErrorMessage', {
          defaultMessage: 'Saved {fieldParameter} parameter is now invalid. Please select a new field.',
          values: {
            fieldParameter: '"field"'
          }
        }));
      }

      return validField;
    };

    return _this;
  }
  /**
   * filter the fields to the available ones
   */


  return FieldParamType;
}(_base.BaseParamType);

exports.FieldParamType = FieldParamType;