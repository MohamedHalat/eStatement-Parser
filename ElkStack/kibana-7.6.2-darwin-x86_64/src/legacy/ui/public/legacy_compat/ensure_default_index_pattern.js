"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureDefaultIndexPattern = ensureDefaultIndexPattern;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

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
var bannerId;
var timeoutId;
/**
 * Checks whether a default index pattern is set and exists and defines
 * one otherwise.
 *
 * If there are no index patterns, redirect to management page and show
 * banner. In this case the promise returned from this function will never
 * resolve to wait for the URL change to happen.
 */

function ensureDefaultIndexPattern(newPlatform, data, $rootScope, kbnUrl) {
  var patterns, defaultId, defined, exists, canManageIndexPatterns, redirectTarget;
  return regeneratorRuntime.async(function ensureDefaultIndexPattern$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(data.indexPatterns.getIds());

        case 2:
          patterns = _context.sent;
          defaultId = newPlatform.uiSettings.get('defaultIndex');
          defined = !!defaultId;
          exists = (0, _lodash.contains)(patterns, defaultId);

          if (defined && !exists) {
            newPlatform.uiSettings.remove('defaultIndex');
            defaultId = defined = false;
          }

          if (!defined) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return");

        case 9:
          if (!(patterns.length >= 1)) {
            _context.next = 14;
            break;
          }

          defaultId = patterns[0];
          newPlatform.uiSettings.set('defaultIndex', defaultId);
          _context.next = 22;
          break;

        case 14:
          canManageIndexPatterns = newPlatform.application.capabilities.management.kibana.index_patterns;
          redirectTarget = canManageIndexPatterns ? '/management/kibana/index_pattern' : '/home';

          if (timeoutId) {
            clearTimeout(timeoutId);
          } // Avoid being hostile to new users who don't have an index pattern setup yet
          // give them a friendly info message instead of a terse error message


          bannerId = newPlatform.overlays.banners.replace(bannerId, function (element) {
            _reactDom.default.render(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_eui.EuiCallOut, {
              color: "warning",
              iconType: "iInCircle",
              title: _i18n.i18n.translate('common.ui.indexPattern.bannerLabel', {
                defaultMessage: "In order to visualize and explore data in Kibana, you'll need to create an index pattern to retrieve data from Elasticsearch."
              })
            })), element);

            return function () {
              return _reactDom.default.unmountComponentAtNode(element);
            };
          }); // hide the message after the user has had a chance to acknowledge it -- so it doesn't permanently stick around

          timeoutId = setTimeout(function () {
            newPlatform.overlays.banners.remove(bannerId);
            timeoutId = undefined;
          }, 15000);
          kbnUrl.change(redirectTarget);
          $rootScope.$digest(); // return never-resolving promise to stop resolving and wait for the url change

          return _context.abrupt("return", new Promise(function () {}));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
}