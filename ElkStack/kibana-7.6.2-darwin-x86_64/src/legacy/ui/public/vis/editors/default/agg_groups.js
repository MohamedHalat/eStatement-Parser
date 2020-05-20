"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggGroupNamesMap = exports.AggGroupNames = void 0;

var _i18n = require("@kbn/i18n");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AggGroupNames;
exports.AggGroupNames = AggGroupNames;

(function (AggGroupNames) {
  AggGroupNames["Buckets"] = "buckets";
  AggGroupNames["Metrics"] = "metrics";
})(AggGroupNames || (exports.AggGroupNames = AggGroupNames = {}));

var aggGroupNamesMap = function aggGroupNamesMap() {
  var _ref;

  return _ref = {}, _defineProperty(_ref, AggGroupNames.Metrics, _i18n.i18n.translate('common.ui.vis.editors.aggGroups.metricsText', {
    defaultMessage: 'Metrics'
  })), _defineProperty(_ref, AggGroupNames.Buckets, _i18n.i18n.translate('common.ui.vis.editors.aggGroups.bucketsText', {
    defaultMessage: 'Buckets'
  })), _ref;
};

exports.aggGroupNamesMap = aggGroupNamesMap;