"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalService = void 0;

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _rxjs = require("rxjs");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A ModalRef is a reference to an opened modal. It offers methods to
 * close the modal.
 *
 * @public
 */
var ModalRef =
/*#__PURE__*/
function () {
  function ModalRef() {
    _classCallCheck(this, ModalRef);

    _defineProperty(this, "onClose", void 0);

    _defineProperty(this, "closeSubject", new _rxjs.Subject());

    this.onClose = this.closeSubject.toPromise();
  }
  /**
   * Closes the referenced modal if it's still open which in turn will
   * resolve the `onClose` Promise. If the modal had already been
   * closed this method does nothing.
   */


  _createClass(ModalRef, [{
    key: "close",
    value: function close() {
      if (!this.closeSubject.closed) {
        this.closeSubject.next();
        this.closeSubject.complete();
      }

      return this.onClose;
    }
  }]);

  return ModalRef;
}();
/**
 * @public
 */


/** @internal */
var ModalService =
/*#__PURE__*/
function () {
  function ModalService() {
    _classCallCheck(this, ModalService);

    _defineProperty(this, "activeModal", null);

    _defineProperty(this, "targetDomElement", null);
  }

  _createClass(ModalService, [{
    key: "start",
    value: function start(_ref) {
      var _this = this;

      var i18n = _ref.i18n,
          targetDomElement = _ref.targetDomElement;
      this.targetDomElement = targetDomElement;
      return {
        open: function open(mount) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          // If there is an active modal, close it before opening a new one.
          if (_this.activeModal) {
            _this.activeModal.close();

            _this.cleanupDom();
          }

          var modal = new ModalRef(); // If a modal gets closed through it's ModalRef, remove it from the dom

          modal.onClose.then(function () {
            if (_this.activeModal === modal) {
              _this.cleanupDom();
            }
          });
          _this.activeModal = modal;
          (0, _reactDom.render)(_react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(i18n.Context, null, _react.default.createElement(_eui.EuiModal, _extends({}, options, {
            onClose: function onClose() {
              return modal.close();
            }
          }), _react.default.createElement(_utils.MountWrapper, {
            mount: mount,
            className: "kbnOverlayMountWrapper"
          })))), targetDomElement);
          return modal;
        },
        openConfirm: function openConfirm(message, options) {
          // If there is an active modal, close it before opening a new one.
          if (_this.activeModal) {
            _this.activeModal.close();

            _this.cleanupDom();
          }

          return new Promise(function (resolve, reject) {
            var resolved = false;

            var closeModal = function closeModal(confirmed) {
              resolved = true;
              modal.close();
              resolve(confirmed);
            };

            var modal = new ModalRef();
            modal.onClose.then(function () {
              if (_this.activeModal === modal) {
                _this.cleanupDom();
              } // modal.close can be called when opening a new modal/confirm, so we need to resolve the promise in that case.


              if (!resolved) {
                closeModal(false);
              }
            });
            _this.activeModal = modal;

            var props = _objectSpread({}, options, {
              children: typeof message === 'string' ? message : _react.default.createElement(_utils.MountWrapper, {
                mount: message,
                className: "kbnOverlayMountWrapper"
              }),
              onCancel: function onCancel() {
                return closeModal(false);
              },
              onConfirm: function onConfirm() {
                return closeModal(true);
              },
              cancelButtonText: (options === null || options === void 0 ? void 0 : options.cancelButtonText) || _i18n.i18n.translate('core.overlays.confirm.cancelButton', {
                defaultMessage: 'Cancel'
              }),
              confirmButtonText: (options === null || options === void 0 ? void 0 : options.confirmButtonText) || _i18n.i18n.translate('core.overlays.confirm.okButton', {
                defaultMessage: 'Confirm'
              })
            });

            (0, _reactDom.render)(_react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(i18n.Context, null, _react.default.createElement(_eui.EuiConfirmModal, props))), targetDomElement);
          });
        }
      };
    }
    /**
     * Using React.Render to re-render into a target DOM element will replace
     * the content of the target but won't call unmountComponent on any
     * components inside the target or any of their children. So we properly
     * cleanup the DOM here to prevent subtle bugs in child components which
     * depend on unmounting for cleanup behaviour.
     */

  }, {
    key: "cleanupDom",
    value: function cleanupDom() {
      if (this.targetDomElement != null) {
        (0, _reactDom.unmountComponentAtNode)(this.targetDomElement);
        this.targetDomElement.innerHTML = '';
      }

      this.activeModal = null;
    }
  }]);

  return ModalService;
}();

exports.ModalService = ModalService;