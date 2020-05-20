"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryOptInProvider = TelemetryOptInProvider;

var _moment = _interopRequireDefault(require("moment"));

var _notify = require("ui/notify");

var _new_platform = require("ui/new_platform");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// @ts-ignore
var bannerId = null;
var optInBannerNoticeId = null;
var currentOptInStatus = false;
var telemetryNotifyUserAboutOptInDefault = true;

function sendOptInStatus($injector, chrome, enabled) {
  var telemetryOptInStatusUrl, $http, optInStatus;
  return regeneratorRuntime.async(function sendOptInStatus$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          telemetryOptInStatusUrl = _new_platform.npStart.core.injectedMetadata.getInjectedVar('telemetryOptInStatusUrl');
          $http = $injector.get('$http');
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap($http.post(chrome.addBasePath('/api/telemetry/v2/clusters/_opt_in_stats'), {
            enabled: enabled,
            unencrypted: false
          }));

        case 5:
          optInStatus = _context.sent;

          if (!(optInStatus.data && optInStatus.data.length)) {
            _context.next = 10;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(fetch(telemetryOptInStatusUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(optInStatus.data)
          }));

        case 9:
          return _context.abrupt("return", _context.sent);

        case 10:
          _context.next = 14;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

function TelemetryOptInProvider($injector, chrome) {
  var sendOptInStatusChange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  currentOptInStatus = _new_platform.npStart.core.injectedMetadata.getInjectedVar('telemetryOptedIn');

  var allowChangingOptInStatus = _new_platform.npStart.core.injectedMetadata.getInjectedVar('allowChangingOptInStatus');

  telemetryNotifyUserAboutOptInDefault = _new_platform.npStart.core.injectedMetadata.getInjectedVar('telemetryNotifyUserAboutOptInDefault');
  var provider = {
    getBannerId: function getBannerId() {
      return bannerId;
    },
    getOptInBannerNoticeId: function getOptInBannerNoticeId() {
      return optInBannerNoticeId;
    },
    getOptIn: function getOptIn() {
      return currentOptInStatus;
    },
    canChangeOptInStatus: function canChangeOptInStatus() {
      return allowChangingOptInStatus;
    },
    notifyUserAboutOptInDefault: function notifyUserAboutOptInDefault() {
      return telemetryNotifyUserAboutOptInDefault;
    },
    setBannerId: function setBannerId(id) {
      bannerId = id;
    },
    setOptInBannerNoticeId: function setOptInBannerNoticeId(id) {
      optInBannerNoticeId = id;
    },
    setOptInNoticeSeen: function setOptInNoticeSeen() {
      var $http;
      return regeneratorRuntime.async(function setOptInNoticeSeen$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              $http = $injector.get('$http'); // If they've seen the notice don't spam the API

              if (telemetryNotifyUserAboutOptInDefault) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", telemetryNotifyUserAboutOptInDefault);

            case 3:
              if (optInBannerNoticeId) {
                _notify.banners.remove(optInBannerNoticeId);
              }

              _context2.prev = 4;
              _context2.next = 7;
              return regeneratorRuntime.awrap($http.put(chrome.addBasePath('/api/telemetry/v2/userHasSeenNotice')));

            case 7:
              telemetryNotifyUserAboutOptInDefault = false;
              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](4);

              _notify.toastNotifications.addError(_context2.t0, {
                title: _i18n.i18n.translate('telemetry.optInNoticeSeenErrorTitle', {
                  defaultMessage: 'Error'
                }),
                toastMessage: _i18n.i18n.translate('telemetry.optInNoticeSeenErrorToastText', {
                  defaultMessage: 'An error occurred dismissing the notice'
                })
              });

              telemetryNotifyUserAboutOptInDefault = true;

            case 14:
              return _context2.abrupt("return", telemetryNotifyUserAboutOptInDefault);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[4, 10]]);
    },
    setOptIn: function setOptIn(enabled) {
      var $http;
      return regeneratorRuntime.async(function setOptIn$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (allowChangingOptInStatus) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              $http = $injector.get('$http');
              _context3.prev = 3;
              _context3.next = 6;
              return regeneratorRuntime.awrap($http.post(chrome.addBasePath('/api/telemetry/v2/optIn'), {
                enabled: enabled
              }));

            case 6:
              if (!sendOptInStatusChange) {
                _context3.next = 9;
                break;
              }

              _context3.next = 9;
              return regeneratorRuntime.awrap(sendOptInStatus($injector, chrome, enabled));

            case 9:
              currentOptInStatus = enabled;
              _context3.next = 16;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](3);

              _notify.toastNotifications.addError(_context3.t0, {
                title: _i18n.i18n.translate('telemetry.optInErrorToastTitle', {
                  defaultMessage: 'Error'
                }),
                toastMessage: _i18n.i18n.translate('telemetry.optInErrorToastText', {
                  defaultMessage: 'An error occurred while trying to set the usage statistics preference.'
                })
              });

              return _context3.abrupt("return", false);

            case 16:
              return _context3.abrupt("return", true);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[3, 12]]);
    },
    fetchExample: function fetchExample() {
      var $http;
      return regeneratorRuntime.async(function fetchExample$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              $http = $injector.get('$http');
              return _context4.abrupt("return", $http.post(chrome.addBasePath("/api/telemetry/v2/clusters/_stats"), {
                unencrypted: true,
                timeRange: {
                  min: (0, _moment.default)().subtract(20, 'minutes').toISOString(),
                  max: (0, _moment.default)().toISOString()
                }
              }));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  };
  return provider;
}