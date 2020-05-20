"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAreaOptionTabs = getAreaOptionTabs;
exports.countLabel = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _options = require("../components/options");

var _common = require("../components/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function getAreaOptionTabs() {
  return [{
    name: 'advanced',
    title: _i18n.i18n.translate('kbnVislibVisTypes.area.tabs.metricsAxesTitle', {
      defaultMessage: 'Metrics & axes'
    }),
    editor: function editor(props) {
      return _react.default.createElement(_common.ValidationWrapper, _extends({}, props, {
        component: _options.MetricsAxisOptions
      }));
    }
  }, {
    name: 'options',
    title: _i18n.i18n.translate('kbnVislibVisTypes.area.tabs.panelSettingsTitle', {
      defaultMessage: 'Panel settings'
    }),
    editor: function editor(props) {
      return _react.default.createElement(_common.ValidationWrapper, _extends({}, props, {
        component: _options.PointSeriesOptions
      }));
    }
  }];
}

var countLabel = _i18n.i18n.translate('kbnVislibVisTypes.area.countText', {
  defaultMessage: 'Count'
});

exports.countLabel = countLabel;