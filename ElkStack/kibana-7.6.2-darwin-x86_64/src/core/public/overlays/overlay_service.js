"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayService = void 0;

var _banners = require("./banners");

var _flyout = require("./flyout");

var _modal = require("./modal");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var OverlayService =
/*#__PURE__*/
function () {
  function OverlayService() {
    _classCallCheck(this, OverlayService);

    _defineProperty(this, "bannersService", new _banners.OverlayBannersService());

    _defineProperty(this, "modalService", new _modal.ModalService());

    _defineProperty(this, "flyoutService", new _flyout.FlyoutService());
  }

  _createClass(OverlayService, [{
    key: "start",
    value: function start(_ref) {
      var i18n = _ref.i18n,
          targetDomElement = _ref.targetDomElement,
          uiSettings = _ref.uiSettings;
      var flyoutElement = document.createElement('div');
      targetDomElement.appendChild(flyoutElement);
      var flyouts = this.flyoutService.start({
        i18n: i18n,
        targetDomElement: flyoutElement
      });
      var banners = this.bannersService.start({
        i18n: i18n,
        uiSettings: uiSettings
      });
      var modalElement = document.createElement('div');
      targetDomElement.appendChild(modalElement);
      var modals = this.modalService.start({
        i18n: i18n,
        targetDomElement: modalElement
      });
      return {
        banners: banners,
        openFlyout: flyouts.open.bind(flyouts),
        openModal: modals.open.bind(modals),
        openConfirm: modals.openConfirm.bind(modals)
      };
    }
  }]);

  return OverlayService;
}();
/** @public */


exports.OverlayService = OverlayService;