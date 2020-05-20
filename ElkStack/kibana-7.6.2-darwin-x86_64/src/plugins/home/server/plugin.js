"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeServerPlugin = void 0;

var _services = require("./services");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HomeServerPlugin {
  constructor(initContext) {
    this.initContext = initContext;

    _defineProperty(this, "tutorialsRegistry", new _services.TutorialsRegistry());

    _defineProperty(this, "sampleDataRegistry", new _services.SampleDataRegistry(this.initContext));
  }

  setup(core, plugins) {
    return {
      tutorials: { ...this.tutorialsRegistry.setup(core)
      },
      sampleData: { ...this.sampleDataRegistry.setup(core, plugins.usage_collection)
      }
    };
  }

  start() {
    return {
      tutorials: { ...this.tutorialsRegistry.start()
      },
      sampleData: { ...this.sampleDataRegistry.start()
      }
    };
  }

}
/** @public */


exports.HomeServerPlugin = HomeServerPlugin;