"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSettingsClient = void 0;

var _lodash = require("lodash");

var _saved_objects = require("../saved_objects");

var _create_or_upgrade_saved_config = require("./create_or_upgrade_saved_config");

var _ui_settings_errors = require("./ui_settings_errors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UiSettingsClient {
  constructor(options) {
    _defineProperty(this, "type", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "buildNum", void 0);

    _defineProperty(this, "savedObjectsClient", void 0);

    _defineProperty(this, "overrides", void 0);

    _defineProperty(this, "defaults", void 0);

    _defineProperty(this, "log", void 0);

    const {
      type,
      id,
      buildNum,
      savedObjectsClient,
      log,
      defaults = {},
      overrides = {}
    } = options;
    this.type = type;
    this.id = id;
    this.buildNum = buildNum;
    this.savedObjectsClient = savedObjectsClient;
    this.defaults = defaults;
    this.overrides = overrides;
    this.log = log;
  }

  getRegistered() {
    return this.defaults;
  }

  async get(key) {
    const all = await this.getAll();
    return all[key];
  }

  async getAll() {
    const raw = await this.getRaw();
    return Object.keys(raw).reduce((all, key) => {
      const item = raw[key];
      all[key] = 'userValue' in item ? item.userValue : item.value;
      return all;
    }, {});
  }

  async getUserProvided() {
    const userProvided = {}; // write the userValue for each key stored in the saved object that is not overridden

    for (const [key, userValue] of Object.entries((await this.read()))) {
      if (userValue !== null && !this.isOverridden(key)) {
        userProvided[key] = {
          userValue
        };
      }
    } // write all overridden keys, dropping the userValue is override is null and
    // adding keys for overrides that are not in saved object


    for (const [key, userValue] of Object.entries(this.overrides)) {
      userProvided[key] = userValue === null ? {
        isOverridden: true
      } : {
        isOverridden: true,
        userValue
      };
    }

    return userProvided;
  }

  async setMany(changes) {
    await this.write({
      changes
    });
  }

  async set(key, value) {
    await this.setMany({
      [key]: value
    });
  }

  async remove(key) {
    await this.set(key, null);
  }

  async removeMany(keys) {
    const changes = {};
    keys.forEach(key => {
      changes[key] = null;
    });
    await this.setMany(changes);
  }

  isOverridden(key) {
    return this.overrides.hasOwnProperty(key);
  }

  assertUpdateAllowed(key) {
    if (this.isOverridden(key)) {
      throw new _ui_settings_errors.CannotOverrideError(`Unable to update "${key}" because it is overridden`);
    }
  }

  async getRaw() {
    const userProvided = await this.getUserProvided();
    return (0, _lodash.defaultsDeep)(userProvided, this.defaults);
  }

  async write({
    changes,
    autoCreateOrUpgradeIfMissing = true
  }) {
    for (const key of Object.keys(changes)) {
      this.assertUpdateAllowed(key);
    }

    try {
      await this.savedObjectsClient.update(this.type, this.id, changes);
    } catch (error) {
      if (!_saved_objects.SavedObjectsErrorHelpers.isNotFoundError(error) || !autoCreateOrUpgradeIfMissing) {
        throw error;
      }

      await (0, _create_or_upgrade_saved_config.createOrUpgradeSavedConfig)({
        savedObjectsClient: this.savedObjectsClient,
        version: this.id,
        buildNum: this.buildNum,
        log: this.log,
        handleWriteErrors: false
      });
      await this.write({
        changes,
        autoCreateOrUpgradeIfMissing: false
      });
    }
  }

  async read({
    ignore401Errors = false,
    autoCreateOrUpgradeIfMissing = true
  } = {}) {
    try {
      const resp = await this.savedObjectsClient.get(this.type, this.id);
      return resp.attributes;
    } catch (error) {
      if (_saved_objects.SavedObjectsErrorHelpers.isNotFoundError(error) && autoCreateOrUpgradeIfMissing) {
        const failedUpgradeAttributes = await (0, _create_or_upgrade_saved_config.createOrUpgradeSavedConfig)({
          savedObjectsClient: this.savedObjectsClient,
          version: this.id,
          buildNum: this.buildNum,
          log: this.log,
          handleWriteErrors: true
        });

        if (!failedUpgradeAttributes) {
          return await this.read({
            ignore401Errors,
            autoCreateOrUpgradeIfMissing: false
          });
        }

        return failedUpgradeAttributes;
      }

      if (this.isIgnorableError(error, ignore401Errors)) {
        return {};
      }

      throw error;
    }
  }

  isIgnorableError(error, ignore401Errors) {
    const {
      isForbiddenError,
      isEsUnavailableError,
      isNotAuthorizedError
    } = this.savedObjectsClient.errors;
    return isForbiddenError(error) || isEsUnavailableError(error) || ignore401Errors && isNotAuthorizedError(error);
  }

}

exports.UiSettingsClient = UiSettingsClient;