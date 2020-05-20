"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInfiniteScrollDirective = createInfiniteScrollDirective;

var _jquery = _interopRequireDefault(require("jquery"));

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
function createInfiniteScrollDirective() {
  return {
    restrict: 'E',
    scope: {
      more: '='
    },
    link: function link($scope, $element) {
      var $window = (0, _jquery.default)(window);
      var checkTimer;

      function onScroll() {
        if (!$scope.more) return;
        var winHeight = Number($window.height());
        var winBottom = Number(winHeight) + Number($window.scrollTop());
        var offset = $element.offset();
        var elTop = offset ? offset.top : 0;
        var remaining = elTop - winBottom;

        if (remaining <= winHeight * 0.5) {
          $scope[$scope.$$phase ? '$eval' : '$apply'](function () {
            $scope.more();
          });
        }
      }

      function scheduleCheck() {
        if (checkTimer) return;
        checkTimer = setTimeout(function () {
          checkTimer = null;
          onScroll();
        }, 50);
      }

      $window.on('scroll', scheduleCheck);
      $scope.$on('$destroy', function () {
        clearTimeout(checkTimer);
        $window.off('scroll', scheduleCheck);
      });
      scheduleCheck();
    }
  };
}