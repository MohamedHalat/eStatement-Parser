"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelionServerPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _load_functions = _interopRequireDefault(require("./lib/load_functions"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getFunction(functions, name) {
  if (functions[name]) {
    return functions[name];
  }

  throw new Error(_i18n.i18n.translate('timelion.noFunctionErrorMessage', {
    defaultMessage: 'No such function: {name}',
    values: {
      name
    }
  }));
} // TODO: Remove as CoreSetup is completed.


class TimelionServerPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  setup(core) {
    const {
      server
    } = core.http;
    const functions = (0, _load_functions.default)('series_functions');
    server.expose('functions', functions);
    server.expose('getFunction', name => getFunction(functions, name));
    (0, _routes.initRoutes)(server);
  }

}

exports.TimelionServerPlugin = TimelionServerPlugin;