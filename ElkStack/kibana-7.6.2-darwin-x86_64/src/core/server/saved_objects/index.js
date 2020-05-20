"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SavedObjectsSchema: true,
  SavedObjectsManagement: true,
  getSortedObjectsForExport: true,
  SavedObjectsExportOptions: true,
  SavedObjectsExportResultDetails: true,
  SavedObjectsSerializer: true,
  SavedObjectsRawDoc: true,
  SavedObjectsMigrationLogger: true,
  SavedObjectsService: true,
  InternalSavedObjectsServiceStart: true,
  SavedObjectsServiceStart: true,
  SavedObjectsServiceSetup: true,
  InternalSavedObjectsServiceSetup: true,
  ISavedObjectsRepository: true,
  SavedObjectsIncrementCounterOptions: true,
  SavedObjectsDeleteByNamespaceOptions: true,
  config: true
};
Object.defineProperty(exports, "SavedObjectsSchema", {
  enumerable: true,
  get: function () {
    return _schema.SavedObjectsSchema;
  }
});
Object.defineProperty(exports, "SavedObjectsManagement", {
  enumerable: true,
  get: function () {
    return _management.SavedObjectsManagement;
  }
});
Object.defineProperty(exports, "getSortedObjectsForExport", {
  enumerable: true,
  get: function () {
    return _export.getSortedObjectsForExport;
  }
});
Object.defineProperty(exports, "SavedObjectsExportOptions", {
  enumerable: true,
  get: function () {
    return _export.SavedObjectsExportOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsExportResultDetails", {
  enumerable: true,
  get: function () {
    return _export.SavedObjectsExportResultDetails;
  }
});
Object.defineProperty(exports, "SavedObjectsSerializer", {
  enumerable: true,
  get: function () {
    return _serialization.SavedObjectsSerializer;
  }
});
Object.defineProperty(exports, "SavedObjectsRawDoc", {
  enumerable: true,
  get: function () {
    return _serialization.RawDoc;
  }
});
Object.defineProperty(exports, "SavedObjectsMigrationLogger", {
  enumerable: true,
  get: function () {
    return _migration_logger.SavedObjectsMigrationLogger;
  }
});
Object.defineProperty(exports, "SavedObjectsService", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.SavedObjectsService;
  }
});
Object.defineProperty(exports, "InternalSavedObjectsServiceStart", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.InternalSavedObjectsServiceStart;
  }
});
Object.defineProperty(exports, "SavedObjectsServiceStart", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.SavedObjectsServiceStart;
  }
});
Object.defineProperty(exports, "SavedObjectsServiceSetup", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.SavedObjectsServiceSetup;
  }
});
Object.defineProperty(exports, "InternalSavedObjectsServiceSetup", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.InternalSavedObjectsServiceSetup;
  }
});
Object.defineProperty(exports, "ISavedObjectsRepository", {
  enumerable: true,
  get: function () {
    return _repository.ISavedObjectsRepository;
  }
});
Object.defineProperty(exports, "SavedObjectsIncrementCounterOptions", {
  enumerable: true,
  get: function () {
    return _repository.SavedObjectsIncrementCounterOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsDeleteByNamespaceOptions", {
  enumerable: true,
  get: function () {
    return _repository.SavedObjectsDeleteByNamespaceOptions;
  }
});
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function () {
    return _saved_objects_config.config;
  }
});

var _service = require("./service");

Object.keys(_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _service[key];
    }
  });
});

var _schema = require("./schema");

var _management = require("./management");

var _import = require("./import");

Object.keys(_import).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _import[key];
    }
  });
});

var _export = require("./export");

var _serialization = require("./serialization");

var _migration_logger = require("./migrations/core/migration_logger");

var _saved_objects_service = require("./saved_objects_service");

var _repository = require("./service/lib/repository");

var _saved_objects_config = require("./saved_objects_config");