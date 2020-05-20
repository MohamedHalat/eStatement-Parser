"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternListConfig = void 0;

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IndexPatternListConfig =
/*#__PURE__*/
function () {
  function IndexPatternListConfig() {
    _classCallCheck(this, IndexPatternListConfig);

    _defineProperty(this, "key", 'default');
  }

  _createClass(IndexPatternListConfig, [{
    key: "getIndexPatternTags",
    value: function getIndexPatternTags(indexPattern, isDefault) {
      return isDefault ? [{
        key: 'default',
        name: _i18n.i18n.translate('management.editIndexPattern.list.defaultIndexPatternListName', {
          defaultMessage: 'Default'
        })
      }] : [];
    }
  }, {
    key: "getFieldInfo",
    value: function getFieldInfo(indexPattern, field) {
      return [];
    }
  }, {
    key: "areScriptedFieldsEnabled",
    value: function areScriptedFieldsEnabled(indexPattern) {
      return true;
    }
  }]);

  return IndexPatternListConfig;
}();

exports.IndexPatternListConfig = IndexPatternListConfig;