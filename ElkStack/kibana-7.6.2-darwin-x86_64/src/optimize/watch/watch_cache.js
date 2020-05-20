"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchCache = void 0;

var _crypto = require("crypto");

var _fs = require("fs");

var _path = _interopRequireWildcard(require("path"));

var _util = require("util");

var _del = _interopRequireDefault(require("del"));

var _normalizePath = _interopRequireDefault(require("normalize-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const readAsync = (0, _util.promisify)(_fs.readFile);
const writeAsync = (0, _util.promisify)(_fs.writeFile);
const readdirAsync = (0, _util.promisify)(_fs.readdir);
const unlinkAsync = (0, _util.promisify)(_fs.unlink);
const rmdirAsync = (0, _util.promisify)(_fs.rmdir);

class WatchCache {
  constructor(params) {
    _defineProperty(this, "logWithMetadata", void 0);

    _defineProperty(this, "outputPath", void 0);

    _defineProperty(this, "dllsPath", void 0);

    _defineProperty(this, "cachePath", void 0);

    _defineProperty(this, "cacheState", void 0);

    _defineProperty(this, "statePath", void 0);

    _defineProperty(this, "diskCacheState", void 0);

    _defineProperty(this, "isInitialized", void 0);

    this.logWithMetadata = params.logWithMetadata;
    this.outputPath = params.outputPath;
    this.dllsPath = params.dllsPath;
    this.cachePath = params.cachePath;
    this.isInitialized = false;
    this.statePath = '';
    this.cacheState = {};
    this.diskCacheState = {};
    this.cacheState.yarnLockSha = '';
    this.cacheState.optimizerConfigSha = '';
  }

  async tryInit() {
    if (!this.isInitialized) {
      this.statePath = (0, _path.resolve)(this.outputPath, 'watch_optimizer_cache_state.json');
      this.diskCacheState = await this.read();
      this.cacheState.yarnLockSha = await this.buildYarnLockSha();
      this.cacheState.optimizerConfigSha = await this.buildOptimizerConfigSha();
      this.isInitialized = true;
    }
  }

  async tryReset() {
    await this.tryInit();

    if (!this.isResetNeeded()) {
      return;
    }

    await this.reset();
  }

  async reset() {
    this.logWithMetadata(['info', 'optimize:watch_cache'], 'The optimizer watch cache will reset'); // start by deleting the state file to lower the
    // amount of time that another process might be able to
    // successfully read it once we decide to delete it

    await (0, _del.default)(this.statePath, {
      force: true
    }); // delete everything in optimize/.cache directory

    await recursiveDelete((0, _normalizePath.default)(this.cachePath)); // delete dlls

    await (0, _del.default)(this.dllsPath); // re-write new cache state file

    await this.write();
    this.logWithMetadata(['info', 'optimize:watch_cache'], 'The optimizer watch cache has reset');
  }

  async buildShaWithMultipleFiles(filePaths) {
    const shaHash = (0, _crypto.createHash)('sha1');

    for (const filePath of filePaths) {
      try {
        shaHash.update((await readAsync(filePath, 'utf8')), 'utf8');
      } catch (e) {
        /* no-op */
      }
    }

    return shaHash.digest('hex');
  }

  async buildYarnLockSha() {
    const kibanaYarnLock = (0, _path.resolve)(__dirname, '../../../yarn.lock');
    return await this.buildShaWithMultipleFiles([kibanaYarnLock]);
  }

  async buildOptimizerConfigSha() {
    const baseOptimizer = (0, _path.resolve)(__dirname, '../base_optimizer.js');
    const dynamicDllConfigModel = (0, _path.resolve)(__dirname, '../dynamic_dll_plugin/dll_config_model.js');
    const dynamicDllPlugin = (0, _path.resolve)(__dirname, '../dynamic_dll_plugin/dynamic_dll_plugin.js');
    return await this.buildShaWithMultipleFiles([baseOptimizer, dynamicDllConfigModel, dynamicDllPlugin]);
  }

  isResetNeeded() {
    return this.hasYarnLockChanged() || this.hasOptimizerConfigChanged();
  }

  hasYarnLockChanged() {
    return this.cacheState.yarnLockSha !== this.diskCacheState.yarnLockSha;
  }

  hasOptimizerConfigChanged() {
    return this.cacheState.optimizerConfigSha !== this.diskCacheState.optimizerConfigSha;
  }

  async write() {
    await writeAsync(this.statePath, JSON.stringify(this.cacheState, null, 2), 'utf8');
    this.diskCacheState = this.cacheState;
  }

  async read() {
    try {
      return JSON.parse((await readAsync(this.statePath, 'utf8')));
    } catch (error) {
      return {};
    }
  }

}
/**
 * Recursively deletes a folder. This is a workaround for a bug in `del` where
 * very large folders (with 84K+ files) cause a stack overflow.
 */


exports.WatchCache = WatchCache;

async function recursiveDelete(directory) {
  try {
    const entries = await readdirAsync(directory, {
      withFileTypes: true
    });
    await Promise.all(entries.map(entry => {
      const absolutePath = _path.default.join(directory, entry.name);

      return entry.isDirectory() ? recursiveDelete(absolutePath) : unlinkAsync(absolutePath);
    }));
    return rmdirAsync(directory);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}