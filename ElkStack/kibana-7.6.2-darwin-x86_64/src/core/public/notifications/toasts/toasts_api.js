"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastsApi = void 0;

var _react = _interopRequireDefault(require("react"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _error_toast = require("./error_toast");

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var normalizeToast = function normalizeToast(toastOrTitle) {
  if (typeof toastOrTitle === 'string') {
    return {
      title: toastOrTitle
    };
  }

  return toastOrTitle;
};
/**
 * Methods for adding and removing global toast messages. See {@link ToastsApi}.
 * @public
 */


/**
 * Methods for adding and removing global toast messages.
 * @public
 */
var ToastsApi =
/*#__PURE__*/
function () {
  function ToastsApi(deps) {
    _classCallCheck(this, ToastsApi);

    _defineProperty(this, "toasts$", new Rx.BehaviorSubject([]));

    _defineProperty(this, "idCounter", 0);

    _defineProperty(this, "uiSettings", void 0);

    _defineProperty(this, "overlays", void 0);

    _defineProperty(this, "i18n", void 0);

    this.uiSettings = deps.uiSettings;
  }
  /** @internal */


  _createClass(ToastsApi, [{
    key: "start",
    value: function start(_ref) {
      var overlays = _ref.overlays,
          i18n = _ref.i18n;
      this.overlays = overlays;
      this.i18n = i18n;
    }
    /** Observable of the toast messages to show to the user. */

  }, {
    key: "get$",
    value: function get$() {
      return this.toasts$.asObservable();
    }
    /**
     * Adds a new toast to current array of toast.
     *
     * @param toastOrTitle - a {@link ToastInput}
     * @returns a {@link Toast}
     */

  }, {
    key: "add",
    value: function add(toastOrTitle) {
      var toast = _objectSpread({
        id: String(this.idCounter++),
        toastLifeTimeMs: this.uiSettings.get('notifications:lifetime:info')
      }, normalizeToast(toastOrTitle));

      this.toasts$.next([].concat(_toConsumableArray(this.toasts$.getValue()), [toast]));
      return toast;
    }
    /**
     * Removes a toast from the current array of toasts if present.
     * @param toastOrId - a {@link Toast} returned by {@link ToastsApi.add} or its id
     */

  }, {
    key: "remove",
    value: function remove(toastOrId) {
      var toRemove = typeof toastOrId === 'string' ? toastOrId : toastOrId.id;
      var list = this.toasts$.getValue();
      var listWithoutToast = list.filter(function (t) {
        return t.id !== toRemove;
      });

      if (listWithoutToast.length !== list.length) {
        this.toasts$.next(listWithoutToast);
      }
    }
    /**
     * Adds a new toast pre-configured with the success color and check icon.
     *
     * @param toastOrTitle - a {@link ToastInput}
     * @returns a {@link Toast}
     */

  }, {
    key: "addSuccess",
    value: function addSuccess(toastOrTitle) {
      return this.add(_objectSpread({
        color: 'success',
        iconType: 'check'
      }, normalizeToast(toastOrTitle)));
    }
    /**
     * Adds a new toast pre-configured with the warning color and help icon.
     *
     * @param toastOrTitle - a {@link ToastInput}
     * @returns a {@link Toast}
     */

  }, {
    key: "addWarning",
    value: function addWarning(toastOrTitle) {
      return this.add(_objectSpread({
        color: 'warning',
        iconType: 'help',
        toastLifeTimeMs: this.uiSettings.get('notifications:lifetime:warning')
      }, normalizeToast(toastOrTitle)));
    }
    /**
     * Adds a new toast pre-configured with the danger color and alert icon.
     *
     * @param toastOrTitle - a {@link ToastInput}
     * @returns a {@link Toast}
     */

  }, {
    key: "addDanger",
    value: function addDanger(toastOrTitle) {
      return this.add(_objectSpread({
        color: 'danger',
        iconType: 'alert',
        toastLifeTimeMs: this.uiSettings.get('notifications:lifetime:warning')
      }, normalizeToast(toastOrTitle)));
    }
    /**
     * Adds a new toast that displays an exception message with a button to open the full stacktrace in a modal.
     *
     * @param error - an `Error` instance.
     * @param options - {@link ErrorToastOptions}
     * @returns a {@link Toast}
     */

  }, {
    key: "addError",
    value: function addError(error, options) {
      var _this = this;

      var message = options.toastMessage || error.message;
      return this.add({
        color: 'danger',
        iconType: 'alert',
        title: options.title,
        toastLifeTimeMs: this.uiSettings.get('notifications:lifetime:error'),
        text: (0, _utils.mountReactNode)(_react.default.createElement(_error_toast.ErrorToast, {
          openModal: this.openModal.bind(this),
          error: error,
          title: options.title,
          toastMessage: message,
          i18nContext: function i18nContext() {
            return _this.i18n.Context;
          }
        }))
      });
    }
  }, {
    key: "openModal",
    value: function openModal() {
      var _this$overlays;

      if (!this.overlays) {
        // This case should never happen because no rendering should be occurring
        // before the ToastService is started.
        throw new Error("Modal opened before ToastService was started.");
      }

      return (_this$overlays = this.overlays).openModal.apply(_this$overlays, arguments);
    }
  }]);

  return ToastsApi;
}();

exports.ToastsApi = ToastsApi;