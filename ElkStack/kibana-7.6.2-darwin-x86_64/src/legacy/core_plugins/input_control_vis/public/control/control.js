"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noValuesDisableMsg = noValuesDisableMsg;
exports.noIndexPatternMsg = noIndexPatternMsg;
exports.Control = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noValuesDisableMsg(fieldName, indexPatternName) {
  return _i18n.i18n.translate('inputControl.control.noValuesDisableTooltip', {
    defaultMessage: 'Filtering occurs on the "{fieldName}" field, which doesn\'t exist on any documents in the "{indexPatternName}" \
index pattern. Choose a different field or index documents that contain values for this field.',
    values: {
      fieldName: fieldName,
      indexPatternName: indexPatternName
    }
  });
}

function noIndexPatternMsg(indexPatternId) {
  return _i18n.i18n.translate('inputControl.control.noIndexPatternTooltip', {
    defaultMessage: 'Could not locate index-pattern id: {indexPatternId}.',
    values: {
      indexPatternId: indexPatternId
    }
  });
}

var Control =
/*#__PURE__*/
function () {
  function Control(controlParams, filterManager, useTimeFilter, SearchSource) {
    var _this = this;

    _classCallCheck(this, Control);

    this.controlParams = controlParams;
    this.filterManager = filterManager;
    this.useTimeFilter = useTimeFilter;
    this.SearchSource = SearchSource;

    _defineProperty(this, "kbnFilter", null);

    _defineProperty(this, "enable", false);

    _defineProperty(this, "disabledReason", '');

    _defineProperty(this, "value", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "label", void 0);

    _defineProperty(this, "ancestors", []);

    _defineProperty(this, "format", function (value) {
      var _field$format;

      var field = _this.filterManager.getField();

      if (field === null || field === void 0 ? void 0 : (_field$format = field.format) === null || _field$format === void 0 ? void 0 : _field$format.convert) {
        return field.format.convert(value);
      }

      return value;
    });

    this.id = controlParams.id;
    this.controlParams = controlParams;
    this.options = controlParams.options;
    this.type = controlParams.type;
    this.label = controlParams.label ? controlParams.label : controlParams.fieldName; // restore state from kibana filter context

    this.reset(); // disable until initialized

    this.disable(_i18n.i18n.translate('inputControl.control.notInitializedTooltip', {
      defaultMessage: 'Control has not been initialized'
    }));
  }

  _createClass(Control, [{
    key: "setAncestors",
    value: function setAncestors(ancestors) {
      this.ancestors = ancestors;
    }
  }, {
    key: "hasAncestors",
    value: function hasAncestors() {
      return this.ancestors && this.ancestors.length > 0;
    }
  }, {
    key: "hasUnsetAncestor",
    value: function hasUnsetAncestor() {
      return this.ancestors.reduce(function (accumulator, ancestor) {
        return accumulator || !ancestor.hasValue();
      }, false);
    }
  }, {
    key: "getAncestorValues",
    value: function getAncestorValues() {
      return this.ancestors.map(function (ancestor) {
        return ancestor.value;
      });
    }
  }, {
    key: "getAncestorFilters",
    value: function getAncestorFilters() {
      return this.ancestors.map(function (ancestor) {
        return ancestor.filterManager.createFilter(ancestor.value);
      });
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.enable;
    }
  }, {
    key: "disable",
    value: function disable(reason) {
      this.enable = false;
      this.disabledReason = reason;
    }
  }, {
    key: "set",
    value: function set(newValue) {
      this.value = newValue;

      if (this.hasValue()) {
        this.kbnFilter = this.filterManager.createFilter(this.value);
      } else {
        this.kbnFilter = null;
      }
    }
    /*
     * Remove any user changes to value by resetting value to that as provided by Kibana filter pills
     */

  }, {
    key: "reset",
    value: function reset() {
      this.kbnFilter = null;
      this.value = this.filterManager.getValueFromFilterBar();
    }
    /*
     * Clear any filter on the field by setting the control value to undefined.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.value = undefined;
    }
  }, {
    key: "hasChanged",
    value: function hasChanged() {
      return !_lodash.default.isEqual(this.value, this.filterManager.getValueFromFilterBar());
    }
  }, {
    key: "hasKbnFilter",
    value: function hasKbnFilter() {
      if (this.kbnFilter) {
        return true;
      }

      return false;
    }
  }, {
    key: "getKbnFilter",
    value: function getKbnFilter() {
      return this.kbnFilter;
    }
  }, {
    key: "hasValue",
    value: function hasValue() {
      return this.value !== undefined;
    }
  }]);

  return Control;
}();

exports.Control = Control;