"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BannersList = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * BannersList is a list of "banners". A banner something that is displayed at the top of Kibana that may or may not
 * disappear.
 *
 * Whether or not a banner can be closed is completely up to the author of the banner. Some banners make sense to be
 * static, such as banners meant to indicate the sensitivity (e.g., classification) of the information being
 * represented.
 */
var BannersList = function BannersList(_ref) {
  var banners$ = _ref.banners$;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      banners = _useState2[0],
      setBanners = _useState2[1];

  (0, _react.useEffect)(function () {
    var subscription = banners$.subscribe(setBanners);
    return function () {
      return subscription.unsubscribe();
    };
  }, [banners$]); // Only un/re-subscribe if the Observable changes

  if (banners.length === 0) {
    return null;
  }

  return _react.default.createElement("div", {
    className: "kbnGlobalBannerList"
  }, banners.map(function (banner) {
    return _react.default.createElement(BannerItem, {
      key: banner.id,
      banner: banner
    });
  }));
};

exports.BannersList = BannersList;

var BannerItem = function BannerItem(_ref2) {
  var banner = _ref2.banner;
  var element = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    return banner.mount(element.current);
  }, [banner]); // Only unmount / remount if banner object changed.

  return _react.default.createElement("div", {
    "data-test-priority": banner.priority,
    className: "kbnGlobalBannerList__item",
    ref: element
  });
};