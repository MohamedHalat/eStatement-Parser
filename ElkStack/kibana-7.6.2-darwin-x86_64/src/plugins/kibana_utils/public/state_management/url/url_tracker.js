"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUrlTracker = createUrlTracker;

var _history = require("history");

var _kbn_url_storage = require("./kbn_url_storage");

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
 * Replicates what src/legacy/ui/public/chrome/api/nav.ts did
 * Persists the url in sessionStorage so it could be restored if navigated back to the app
 */
function createUrlTracker(key) {
  var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sessionStorage;
  return {
    startTrackingUrl: function startTrackingUrl() {
      var history = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _history.createBrowserHistory)();

      var track = function track(location) {
        var url = (0, _kbn_url_storage.getRelativeToHistoryPath)(history.createHref(location), history);
        storage.setItem(key, url);
      };

      track(history.location);
      return history.listen(track);
    },
    getTrackedUrl: function getTrackedUrl() {
      return storage.getItem(key);
    },
    trackUrl: function trackUrl(url) {
      storage.setItem(key, url);
    }
  };
}