"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSource = createSource;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _constants = require("ui/saved_objects/constants");

var _confirm_modal_promise = require("./confirm_modal_promise");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Attempts to create the current object using the serialized source. If an object already
 * exists, a warning message requests an overwrite confirmation.
 * @param source - serialized version of this object (return value from this._serialize())
 * What will be indexed into elasticsearch.
 * @param savedObject - savedObject
 * @param esType - type of the saved object
 * @param options - options to pass to the saved object create method
 * @param services - provides Kibana services savedObjectsClient and overlays
 * @returns {Promise} - A promise that is resolved with the objects id if the object is
 * successfully indexed. If the overwrite confirmation was rejected, an error is thrown with
 * a confirmRejected = true parameter so that case can be handled differently than
 * a create or index error.
 * @resolved {SavedObject}
 */
function createSource(source, savedObject, esType) {
  var options,
      services,
      savedObjectsClient,
      overlays,
      confirmMessage,
      title,
      confirmButtonText,
      _args = arguments;
  return regeneratorRuntime.async(function createSource$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
          services = _args.length > 4 ? _args[4] : undefined;
          savedObjectsClient = services.savedObjectsClient, overlays = services.overlays;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(savedObjectsClient.create(esType, source, options));

        case 6:
          return _context.abrupt("return", _context.sent);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);

          if (!(_lodash.default.get(_context.t0, 'res.status') === 409)) {
            _context.next = 16;
            break;
          }

          confirmMessage = _i18n.i18n.translate('common.ui.savedObjects.confirmModal.overwriteConfirmationMessage', {
            defaultMessage: 'Are you sure you want to overwrite {title}?',
            values: {
              title: savedObject.title
            }
          });
          title = _i18n.i18n.translate('common.ui.savedObjects.confirmModal.overwriteTitle', {
            defaultMessage: 'Overwrite {name}?',
            values: {
              name: savedObject.getDisplayName()
            }
          });
          confirmButtonText = _i18n.i18n.translate('common.ui.savedObjects.confirmModal.overwriteButtonLabel', {
            defaultMessage: 'Overwrite'
          });
          return _context.abrupt("return", (0, _confirm_modal_promise.confirmModalPromise)(confirmMessage, title, confirmButtonText, overlays).then(function () {
            return savedObjectsClient.create(esType, source, savedObject.creationOpts(_objectSpread({
              overwrite: true
            }, options)));
          }).catch(function () {
            return Promise.reject(new Error(_constants.OVERWRITE_REJECTED));
          }));

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(Promise.reject(_context.t0));

        case 18:
          return _context.abrupt("return", _context.sent);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 9]]);
}