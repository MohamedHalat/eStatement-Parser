"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__reset__ = __reset__;
exports.__setup__ = __setup__;
exports.__start__ = __start__;
exports.legacyAppRegister = exports.npStart = exports.npSetup = void 0;

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
var npSetup = {
  core: null,
  plugins: {}
};
exports.npSetup = npSetup;
var npStart = {
  core: null,
  plugins: {}
};
/**
 * Only used by unit tests
 * @internal
 */

exports.npStart = npStart;

function __reset__() {
  npSetup.core = null;
  npSetup.plugins = {};
  npStart.core = null;
  npStart.plugins = {};
  legacyAppRegistered = false;
}

function __setup__(coreSetup, plugins) {
  npSetup.core = coreSetup;
  npSetup.plugins = plugins; // Setup compatibility layer for AppService in legacy platform

  npSetup.core.application.register = legacyAppRegister;
}

function __start__(coreStart, plugins) {
  npStart.core = coreStart;
  npStart.plugins = plugins;
}
/** Flag used to ensure `legacyAppRegister` is only called once. */


var legacyAppRegistered = false;
/**
 * Exported for testing only. Use `npSetup.core.application.register` in legacy apps.
 * @internal
 */

var legacyAppRegister = function legacyAppRegister(app) {
  if (legacyAppRegistered) {
    throw new Error("core.application.register may only be called once for legacy plugins.");
  }

  legacyAppRegistered = true;

  require('ui/chrome').setRootController(app.id, function ($scope, $element) {
    var element = $element[0]; // Root controller cannot return a Promise so use an internal async function and call it immediately

    (function _callee() {
      var params, unmount;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = {
                element: element,
                appBasePath: npSetup.core.http.basePath.prepend("/app/".concat(app.id)),
                onAppLeave: function onAppLeave() {
                  return undefined;
                }
              };

              if (!isAppMountDeprecated(app.mount)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return regeneratorRuntime.awrap(app.mount({
                core: npStart.core
              }, params));

            case 4:
              _context.t0 = _context.sent;
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return regeneratorRuntime.awrap(app.mount(params));

            case 9:
              _context.t0 = _context.sent;

            case 10:
              unmount = _context.t0;
              $scope.$on('$destroy', function () {
                unmount();
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      });
    })();
  });
};

exports.legacyAppRegister = legacyAppRegister;

function isAppMountDeprecated(mount) {
  // Mount functions with two arguments are assumed to expect deprecated `context` object.
  return mount.length === 2;
}