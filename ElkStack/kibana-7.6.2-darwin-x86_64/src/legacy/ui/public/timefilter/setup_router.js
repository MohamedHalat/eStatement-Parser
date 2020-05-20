"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimefilterConfig = getTimefilterConfig;
exports.registerTimefilterWithGlobalState = exports.registerTimefilterWithGlobalStateFactory = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _subscribe_with_scope = require("ui/utils/subscribe_with_scope");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _rxjs = require("rxjs");

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
// TODO
// remove everything underneath once globalState is no longer an angular service
// and listener can be registered without angular.
function convertISO8601(stringTime) {
  var obj = (0, _moment.default)(stringTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true);
  return obj.isValid() ? obj.toISOString() : stringTime;
}

function getTimefilterConfig() {
  var settings = _chrome.default.getUiSettingsClient();

  return {
    timeDefaults: settings.get('timepicker:timeDefaults'),
    refreshIntervalDefaults: settings.get('timepicker:refreshIntervalDefaults')
  };
}

var registerTimefilterWithGlobalStateFactory = function registerTimefilterWithGlobalStateFactory(timefilter, globalState, $rootScope) {
  // settings have to be re-fetched here, to make sure that settings changed by overrideLocalDefault are taken into account.
  var config = getTimefilterConfig();
  timefilter.setTime(_lodash.default.defaults(globalState.time || {}, config.timeDefaults));
  timefilter.setRefreshInterval(_lodash.default.defaults(globalState.refreshInterval || {}, config.refreshIntervalDefaults));
  globalState.on('fetch_with_changes', function () {
    // clone and default to {} in one
    var newTime = _lodash.default.defaults({}, globalState.time, config.timeDefaults);

    var newRefreshInterval = _lodash.default.defaults({}, globalState.refreshInterval, config.refreshIntervalDefaults);

    if (newTime) {
      if (newTime.to) newTime.to = convertISO8601(newTime.to);
      if (newTime.from) newTime.from = convertISO8601(newTime.from);
    }

    timefilter.setTime(newTime);
    timefilter.setRefreshInterval(newRefreshInterval);
  });

  var updateGlobalStateWithTime = function updateGlobalStateWithTime() {
    globalState.time = timefilter.getTime();
    globalState.refreshInterval = timefilter.getRefreshInterval();
    globalState.save();
  };

  var subscriptions = new _rxjs.Subscription();
  subscriptions.add((0, _subscribe_with_scope.subscribeWithScope)($rootScope, timefilter.getRefreshIntervalUpdate$(), {
    next: updateGlobalStateWithTime
  }));
  subscriptions.add((0, _subscribe_with_scope.subscribeWithScope)($rootScope, timefilter.getTimeUpdate$(), {
    next: updateGlobalStateWithTime
  }));
  $rootScope.$on('$destroy', function () {
    subscriptions.unsubscribe();
  });
}; // Currently some parts of Kibana (index patterns, timefilter) rely on addSetupWork in the uiRouter
// and require it to be executed to properly function.
// This function is exposed for applications that do not use uiRoutes like APM
// Kibana issue https://github.com/elastic/kibana/issues/19110 tracks the removal of this dependency on uiRouter


exports.registerTimefilterWithGlobalStateFactory = registerTimefilterWithGlobalStateFactory;

var registerTimefilterWithGlobalState = _lodash.default.once(registerTimefilterWithGlobalStateFactory);

exports.registerTimefilterWithGlobalState = registerTimefilterWithGlobalState;