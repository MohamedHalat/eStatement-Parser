"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUrlTracker = useUrlTracker;

var _react = require("react");

var _public = require("../../../kibana_utils/public/");

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
 * State management url_tracker in react hook form
 *
 * Replicates what src/legacy/ui/public/chrome/api/nav.ts did
 * Persists the url in sessionStorage so it could be restored if navigated back to the app
 *
 * @param key - key to use in storage
 * @param history - history instance to use
 * @param shouldRestoreUrl - cb if url should be restored
 * @param storage - storage to use. window.sessionStorage is default
 */
function useUrlTracker(key, history) {
  var shouldRestoreUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return true;
  };
  var storage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : sessionStorage;
  (0, _react.useLayoutEffect)(function () {
    var urlTracker = (0, _public.createUrlTracker)(key, storage);
    var urlToRestore = urlTracker.getTrackedUrl();

    if (urlToRestore && shouldRestoreUrl(urlToRestore)) {
      history.replace(urlToRestore);
    }

    var stopTrackingUrl = urlTracker.startTrackingUrl(history);
    return function () {
      stopTrackingUrl();
    };
  }, [key, history]);
}