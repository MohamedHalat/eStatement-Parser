"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsfeedNavButton = exports.NewsfeedContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _flyout_list = require("./flyout_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var NewsfeedContext = _react.default.createContext({});

exports.NewsfeedContext = NewsfeedContext;

var NewsfeedNavButton = function NewsfeedNavButton(_ref) {
  var apiFetchResult = _ref.apiFetchResult;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showBadge = _useState2[0],
      setShowBadge = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      flyoutVisible = _useState4[0],
      setFlyoutVisible = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      newsFetchResult = _useState6[0],
      setNewsFetchResult = _useState6[1];

  (0, _react.useEffect)(function () {
    function handleStatusChange(fetchResult) {
      if (fetchResult) {
        setShowBadge(fetchResult.hasNew);
      }

      setNewsFetchResult(fetchResult);
    }

    var subscription = apiFetchResult.subscribe(function (res) {
      return handleStatusChange(res);
    });
    return function () {
      return subscription.unsubscribe();
    };
  }, [apiFetchResult]);

  function showFlyout() {
    setShowBadge(false);
    setFlyoutVisible(!flyoutVisible);
  }

  return _react.default.createElement(NewsfeedContext.Provider, {
    value: {
      setFlyoutVisible: setFlyoutVisible,
      newsFetchResult: newsFetchResult
    }
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHeaderSectionItemButton, {
    "data-test-subj": "newsfeed",
    "aria-controls": "keyPadMenu",
    "aria-expanded": flyoutVisible,
    "aria-haspopup": "true",
    "aria-label": "Newsfeed\xA0menu",
    onClick: showFlyout
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "email",
    size: "m"
  }), showBadge ? _react.default.createElement(_eui.EuiNotificationBadge, {
    className: "euiHeaderNotification",
    "data-test-subj": "showBadgeNews"
  }, "\u25AA") : null), flyoutVisible ? _react.default.createElement(_flyout_list.NewsfeedFlyout, null) : null));
};

exports.NewsfeedNavButton = NewsfeedNavButton;