"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _i18n = require("@kbn/i18n");

var _home_app = require("./components/home_app");

var _kibana_services = require("../kibana_services");

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
var renderApp = function renderApp(element) {
  var homeTitle, _getServices, getFeatureCatalogueEntries, chrome, directories;

  return regeneratorRuntime.async(function renderApp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          homeTitle = _i18n.i18n.translate('kbn.home.breadcrumbs.homeTitle', {
            defaultMessage: 'Home'
          });
          _getServices = (0, _kibana_services.getServices)(), getFeatureCatalogueEntries = _getServices.getFeatureCatalogueEntries, chrome = _getServices.chrome;
          _context.next = 4;
          return regeneratorRuntime.awrap(getFeatureCatalogueEntries());

        case 4:
          directories = _context.sent;
          chrome.setBreadcrumbs([{
            text: homeTitle
          }]);
          (0, _reactDom.render)(_react.default.createElement(_home_app.HomeApp, {
            directories: directories
          }), element);
          return _context.abrupt("return", function () {
            (0, _reactDom.unmountComponentAtNode)(element);
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.renderApp = renderApp;