"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayBannersService = void 0;

var _react = _interopRequireDefault(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _priority_map = require("./priority_map");

var _banners_list = require("./banners_list");

var _user_banner_service = require("./user_banner_service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var OverlayBannersService =
/*#__PURE__*/
function () {
  function OverlayBannersService() {
    _classCallCheck(this, OverlayBannersService);

    _defineProperty(this, "userBanner", new _user_banner_service.UserBannerService());
  }

  _createClass(OverlayBannersService, [{
    key: "start",
    value: function start(_ref) {
      var i18n = _ref.i18n,
          uiSettings = _ref.uiSettings;
      var uniqueId = 0;

      var genId = function genId() {
        return "".concat(uniqueId++);
      };

      var banners$ = new _rxjs.BehaviorSubject(new _priority_map.PriorityMap());
      var service = {
        add: function add(mount) {
          var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var id = genId();
          var nextBanner = {
            id: id,
            mount: mount,
            priority: priority
          };
          banners$.next(banners$.value.add(id, nextBanner));
          return id;
        },
        remove: function remove(id) {
          if (!banners$.value.has(id)) {
            return false;
          }

          banners$.next(banners$.value.remove(id));
          return true;
        },
        replace: function replace(id, mount) {
          var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          if (!id || !banners$.value.has(id)) {
            return this.add(mount, priority);
          }

          var nextId = genId();
          var nextBanner = {
            id: nextId,
            mount: mount,
            priority: priority
          };
          banners$.next(banners$.value.remove(id).add(nextId, nextBanner));
          return nextId;
        },
        get$: function get$() {
          return banners$.pipe((0, _operators.map)(function (bannerMap) {
            return _toConsumableArray(bannerMap.values());
          }));
        },
        getComponent: function getComponent() {
          return _react.default.createElement(_banners_list.BannersList, {
            banners$: this.get$()
          });
        }
      };
      this.userBanner.start({
        banners: service,
        i18n: i18n,
        uiSettings: uiSettings
      });
      return service;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.userBanner.stop();
    }
  }]);

  return OverlayBannersService;
}();

exports.OverlayBannersService = OverlayBannersService;