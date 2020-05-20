"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Env = void 0;

var _path = require("path");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// `require` is necessary for this to work inside x-pack code as well
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../../../package.json');
/** @internal */


class Env {
  /**
   * @internal
   */
  static createDefault(options) {
    const repoRoot = (0, _path.dirname)(require.resolve('../../../../package.json'));
    return new Env(repoRoot, options);
  }
  /** @internal */


  /**
   * @internal
   */
  constructor(homeDir, options) {
    this.homeDir = homeDir;

    _defineProperty(this, "configDir", void 0);

    _defineProperty(this, "binDir", void 0);

    _defineProperty(this, "logDir", void 0);

    _defineProperty(this, "pluginSearchPaths", void 0);

    _defineProperty(this, "packageInfo", void 0);

    _defineProperty(this, "mode", void 0);

    _defineProperty(this, "cliArgs", void 0);

    _defineProperty(this, "configs", void 0);

    _defineProperty(this, "isDevClusterMaster", void 0);

    this.configDir = (0, _path.resolve)(this.homeDir, 'config');
    this.binDir = (0, _path.resolve)(this.homeDir, 'bin');
    this.logDir = (0, _path.resolve)(this.homeDir, 'log');
    this.pluginSearchPaths = [(0, _path.resolve)(this.homeDir, 'src', 'plugins'), ...(options.cliArgs.oss ? [] : [(0, _path.resolve)(this.homeDir, 'x-pack', 'plugins')]), (0, _path.resolve)(this.homeDir, 'plugins'), ...(options.cliArgs.runExamples ? [(0, _path.resolve)(this.homeDir, 'examples')] : []), (0, _path.resolve)(this.homeDir, '..', 'kibana-extra')];
    this.cliArgs = Object.freeze(options.cliArgs);
    this.configs = Object.freeze(options.configs);
    this.isDevClusterMaster = options.isDevClusterMaster;
    const isDevMode = this.cliArgs.dev || this.cliArgs.envName === 'development';
    this.mode = Object.freeze({
      dev: isDevMode,
      name: isDevMode ? 'development' : 'production',
      prod: !isDevMode
    });
    const isKibanaDistributable = Boolean(pkg.build && pkg.build.distributable === true);
    this.packageInfo = Object.freeze({
      branch: pkg.branch,
      buildNum: isKibanaDistributable ? pkg.build.number : Number.MAX_SAFE_INTEGER,
      buildSha: isKibanaDistributable ? pkg.build.sha : 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      version: pkg.version,
      dist: isKibanaDistributable
    });
  }

}

exports.Env = Env;