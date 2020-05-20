"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedObjectClass = createSavedObjectClass;
exports.SavedObjectProvider = SavedObjectProvider;

var _new_platform = require("ui/new_platform");

var _build_saved_object = require("./helpers/build_saved_object");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createSavedObjectClass(services) {
  /**
   * The SavedObject class is a base class for saved objects loaded from the server and
   * provides additional functionality besides loading/saving/deleting/etc.
   *
   * It is overloaded and configured to provide type-aware functionality.
   * To just retrieve the attributes of saved objects, it is recommended to use SavedObjectLoader
   * which returns instances of SimpleSavedObject which don't introduce additional type-specific complexity.
   * @param {*} config
   */
  var SavedObjectClass = function SavedObjectClass() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SavedObjectClass);

    // @ts-ignore
    var self = this;
    (0, _build_saved_object.buildSavedObject)(self, config, services);
  };

  return SavedObjectClass;
} // the old angular way, should be removed once no longer used


function SavedObjectProvider() {
  var services = {
    savedObjectsClient: _new_platform.npStart.core.savedObjects.client,
    indexPatterns: _new_platform.npStart.plugins.data.indexPatterns,
    chrome: _new_platform.npStart.core.chrome,
    overlays: _new_platform.npStart.core.overlays
  };
  return createSavedObjectClass(services);
}