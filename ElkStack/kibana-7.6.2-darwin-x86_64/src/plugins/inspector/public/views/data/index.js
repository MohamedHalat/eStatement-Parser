"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataViewDescription = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _data_view = require("./components/data_view");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getDataViewDescription = function getDataViewDescription(uiSettings) {
  return {
    title: _i18n.i18n.translate('inspector.data.dataTitle', {
      defaultMessage: 'Data'
    }),
    order: 10,
    help: _i18n.i18n.translate('inspector.data.dataDescriptionTooltip', {
      defaultMessage: 'View the data behind the visualization'
    }),
    shouldShow: function shouldShow(adapters) {
      return Boolean(adapters.data);
    },
    component: function component(props) {
      return _react.default.createElement(_data_view.DataViewComponent, _extends({}, props, {
        uiSettings: uiSettings
      }));
    }
  };
};

exports.getDataViewDescription = getDataViewDescription;