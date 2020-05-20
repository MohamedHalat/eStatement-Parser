"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAngularModule = getAngularModule;
exports.getInnerAngular = getInnerAngular;

var _angular = _interopRequireDefault(require("angular"));

require("ui/angular-bootstrap");

require("angular-recursion");

var _angular2 = require("@kbn/i18n/angular");

var _legacy_imports = require("./legacy_imports");

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
// inner angular imports
// these are necessary to bootstrap the local angular.
// They can stay even after NP cutover
var thirdPartyAngularDependencies = ['ngSanitize', 'ui.bootstrap', 'RecursionHelper'];

function getAngularModule(name, core) {
  var uiModule = getInnerAngular(name, core);
  (0, _legacy_imports.configureAppAngularModule)(uiModule, core, true);
  return uiModule;
}

var initialized = false;

function getInnerAngular() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'kibana/table_vis';
  var core = arguments.length > 1 ? arguments[1] : undefined;

  if (!initialized) {
    createLocalPrivateModule();
    createLocalI18nModule();
    createLocalConfigModule(core.uiSettings);
    createLocalPaginateModule();
    initialized = true;
  }

  return _angular.default.module(name, [].concat(thirdPartyAngularDependencies, ['tableVisPaginate', 'tableVisConfig', 'tableVisPrivate', 'tableVisI18n'])).config(_legacy_imports.watchMultiDecorator).directive('kbnAccessibleClick', _legacy_imports.KbnAccessibleClickProvider);
}

function createLocalPrivateModule() {
  _angular.default.module('tableVisPrivate', []).provider('Private', _legacy_imports.PrivateProvider);
}

function createLocalConfigModule(uiSettings) {
  _angular.default.module('tableVisConfig', ['tableVisPrivate']).provider('stateManagementConfig', _legacy_imports.StateManagementConfigProvider).provider('config', function () {
    return {
      $get: function $get() {
        return {
          get: function get(value) {
            return uiSettings ? uiSettings.get(value) : undefined;
          },
          // set method is used in agg_table mocha test
          set: function set(key, value) {
            return uiSettings ? uiSettings.set(key, value) : undefined;
          }
        };
      }
    };
  });
}

function createLocalI18nModule() {
  _angular.default.module('tableVisI18n', []).provider('i18n', _angular2.I18nProvider).filter('i18n', _angular2.i18nFilter).directive('i18nId', _angular2.i18nDirective);
}

function createLocalPaginateModule() {
  _angular.default.module('tableVisPaginate', []).directive('paginate', _legacy_imports.PaginateDirectiveProvider).directive('paginateControls', _legacy_imports.PaginateControlsDirectiveProvider);
}