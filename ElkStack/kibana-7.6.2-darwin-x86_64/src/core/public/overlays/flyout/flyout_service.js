"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyoutService = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _rxjs = require("rxjs");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A FlyoutRef is a reference to an opened flyout panel. It offers methods to
 * close the flyout panel again. If you open a flyout panel you should make
 * sure you call `close()` when it should be closed.
 * Since a flyout could also be closed by a user or from another flyout being
 * opened, you must bind to the `onClose` Promise on the FlyoutRef instance.
 * The Promise will resolve whenever the flyout was closed at which point you
 * should discard the FlyoutRef.
 *
 * @public
 */
var FlyoutRef =
/*#__PURE__*/
function () {
  /**
   * An Promise that will resolve once this flyout is closed.
   *
   * Flyouts can close from user interaction, calling `close()` on the flyout
   * reference or another call to `openFlyout()` replacing your flyout.
   */
  function FlyoutRef() {
    _classCallCheck(this, FlyoutRef);

    _defineProperty(this, "onClose", void 0);

    _defineProperty(this, "closeSubject", new _rxjs.Subject());

    this.onClose = this.closeSubject.toPromise();
  }
  /**
   * Closes the referenced flyout if it's still open which in turn will
   * resolve the `onClose` Promise. If the flyout had already been
   * closed this method does nothing.
   */


  _createClass(FlyoutRef, [{
    key: "close",
    value: function close() {
      if (!this.closeSubject.closed) {
        this.closeSubject.next();
        this.closeSubject.complete();
      }

      return this.onClose;
    }
  }]);

  return FlyoutRef;
}();
/**
 * APIs to open and manage fly-out dialogs.
 *
 * @public
 */


/** @internal */
var FlyoutService =
/*#__PURE__*/
function () {
  function FlyoutService() {
    _classCallCheck(this, FlyoutService);

    _defineProperty(this, "activeFlyout", null);

    _defineProperty(this, "targetDomElement", null);
  }

  _createClass(FlyoutService, [{
    key: "start",
    value: function start(_ref) {
      var _this = this;

      var i18n = _ref.i18n,
          targetDomElement = _ref.targetDomElement;
      this.targetDomElement = targetDomElement;
      return {
        open: function open(mount) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          // If there is an active flyout session close it before opening a new one.
          if (_this.activeFlyout) {
            _this.activeFlyout.close();

            _this.cleanupDom();
          }

          var flyout = new FlyoutRef(); // If a flyout gets closed through it's FlyoutRef, remove it from the dom

          flyout.onClose.then(function () {
            if (_this.activeFlyout === flyout) {
              _this.cleanupDom();
            }
          });
          _this.activeFlyout = flyout;
          (0, _reactDom.render)(_react.default.createElement(i18n.Context, null, _react.default.createElement(_eui.EuiFlyout, _extends({}, options, {
            onClose: function onClose() {
              return flyout.close();
            }
          }), _react.default.createElement(_utils.MountWrapper, {
            mount: mount,
            className: "kbnOverlayMountWrapper"
          }))), _this.targetDomElement);
          return flyout;
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

      this.activeFlyout = null;
    }
  }]);

  return FlyoutService;
}();

exports.FlyoutService = FlyoutService;