"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Panel = function Panel(name, config) {
  _classCallCheck(this, Panel);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "help", void 0);

  _defineProperty(this, "render", void 0);

  this.name = name;
  this.help = config.help || '';
  this.render = config.render;

  if (!config.render) {
    throw new Error(_i18n.i18n.translate('timelion.panels.noRenderFunctionErrorMessage', {
      defaultMessage: 'Panel must have a rendering function'
    }));
  }
};

exports.Panel = Panel;