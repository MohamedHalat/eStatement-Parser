"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeResizeChecker = subscribeResizeChecker;

var _public = require("../../../../../../../../../plugins/kibana_utils/public");

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
function subscribeResizeChecker(el) {
  for (var _len = arguments.length, editors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    editors[_key - 1] = arguments[_key];
  }

  var checker = new _public.ResizeChecker(el);
  checker.on('resize', function () {
    return editors.forEach(function (e) {
      if (e.getCoreEditor) {
        e.getCoreEditor().resize();
      } else {
        e.resize();
      }

      if (e.updateActionsBar) {
        e.updateActionsBar();
      }
    });
  });
  return function () {
    return checker.destroy();
  };
}