"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UuidService = void 0;

var _resolve_uuid = require("./resolve_uuid");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
class UuidService {
  constructor(core) {
    _defineProperty(this, "log", void 0);

    _defineProperty(this, "configService", void 0);

    _defineProperty(this, "cliArgs", void 0);

    _defineProperty(this, "uuid", '');

    this.log = core.logger.get('uuid');
    this.configService = core.configService;
    this.cliArgs = core.env.cliArgs;
  }

  async setup() {
    this.uuid = await (0, _resolve_uuid.resolveInstanceUuid)({
      configService: this.configService,
      syncToFile: !this.cliArgs.optimize,
      logger: this.log
    });
    return {
      getInstanceUuid: () => this.uuid
    };
  }

}

exports.UuidService = UuidService;