"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNotifications = void 0;

var React = _interopRequireWildcard(require("react"));

var _util = require("../util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createNotifications = function createNotifications(services) {
  var show = function show(_ref) {
    var title = _ref.title,
        body = _ref.body,
        color = _ref.color,
        iconType = _ref.iconType,
        toastLifeTimeMs = _ref.toastLifeTimeMs,
        onClose = _ref.onClose;

    if (!services.notifications) {
      throw new TypeError('Could not show notification as notifications service is not available.');
    }

    services.notifications.toasts.add({
      title: (0, _util.toMountPoint)(title),
      text: (0, _util.toMountPoint)(React.createElement(React.Fragment, null, body || null)),
      color: color,
      iconType: iconType,
      toastLifeTimeMs: toastLifeTimeMs,
      onClose: onClose
    });
  };

  var success = function success(input) {
    return show(_objectSpread({
      color: 'success',
      iconType: 'check'
    }, input));
  };

  var warning = function warning(input) {
    return show(_objectSpread({
      color: 'warning',
      iconType: 'help'
    }, input));
  };

  var danger = function danger(input) {
    return show(_objectSpread({
      color: 'danger',
      iconType: 'alert'
    }, input));
  };

  var notifications = {
    toasts: {
      show: show,
      success: success,
      warning: warning,
      danger: danger
    }
  };
  return notifications;
};

exports.createNotifications = createNotifications;