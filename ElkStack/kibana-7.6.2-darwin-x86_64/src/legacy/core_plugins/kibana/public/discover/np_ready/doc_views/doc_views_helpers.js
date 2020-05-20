"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectAngularElement = injectAngularElement;
exports.convertDirectiveToRenderFn = convertDirectiveToRenderFn;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _angular = _interopRequireDefault(require("angular"));

var _doc_viewer_render_error = require("../components/doc_viewer/doc_viewer_render_error");

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

/**
 * Compiles and injects the give angular template into the given dom node
 * returns a function to cleanup the injected angular element
 */
function injectAngularElement(domNode, template, scopeProps, Controller, chrome) {
  var $injector, rootScope, $compile, newScope, $target, $element;
  return regeneratorRuntime.async(function injectAngularElement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(chrome.dangerouslyGetActiveInjector());

        case 2:
          $injector = _context.sent;
          rootScope = $injector.get('$rootScope');
          $compile = $injector.get('$compile');
          newScope = Object.assign(rootScope.$new(), scopeProps);

          if (typeof Controller === 'function') {
            // when a controller is defined, expose the value it produces to the view as `$ctrl`
            // see: https://docs.angularjs.org/api/ng/provider/$compileProvider#component
            newScope.$ctrl = $injector.instantiate(Controller, {
              $scope: newScope
            });
          }

          $target = _angular.default.element(domNode);
          $element = _angular.default.element(template);
          newScope.$apply(function () {
            var linkFn = $compile($element);
            $target.empty().append($element);
            linkFn(newScope);
          });
          return _context.abrupt("return", function () {
            newScope.$destroy();
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}
/**
 * Converts a given legacy angular directive to a render function
 * for usage in a react component. Note that the rendering is async
 */


function convertDirectiveToRenderFn(directive, chrome) {
  return function (domNode, props) {
    var rejected = false;
    var cleanupFnPromise = injectAngularElement(domNode, directive.template, props, directive.controller, chrome);
    cleanupFnPromise.catch(function (e) {
      rejected = true;
      (0, _reactDom.render)(_react.default.createElement(_doc_viewer_render_error.DocViewerError, {
        error: e
      }), domNode);
    });
    return function () {
      if (!rejected) {
        // for cleanup
        // http://roubenmeschian.com/rubo/?p=51
        cleanupFnPromise.then(function (cleanup) {
          return cleanup();
        });
      }
    };
  };
}