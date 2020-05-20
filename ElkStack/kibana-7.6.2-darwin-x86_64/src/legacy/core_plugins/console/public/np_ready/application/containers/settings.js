"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settings = Settings;

var _react = _interopRequireDefault(require("react"));

var _components = require("../components");

var _mappings = _interopRequireDefault(require("../../lib/mappings/mappings"));

var _contexts = require("../contexts");

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
var getAutocompleteDiff = function getAutocompleteDiff(newSettings, prevSettings) {
  return Object.keys(newSettings.autocomplete).filter(function (key) {
    // @ts-ignore
    return prevSettings.autocomplete[key] !== newSettings.autocomplete[key];
  });
};

var refreshAutocompleteSettings = function refreshAutocompleteSettings(selectedSettings) {
  _mappings.default.retrieveAutoCompleteInfo(selectedSettings);
};

var fetchAutocompleteSettingsIfNeeded = function fetchAutocompleteSettingsIfNeeded(newSettings, prevSettings) {
  // We'll only retrieve settings if polling is on. The expectation here is that if the user
  // disables polling it's because they want manual control over the fetch request (possibly
  // because it's a very expensive request given their cluster and bandwidth). In that case,
  // they would be unhappy with any request that's sent automatically.
  if (newSettings.polling) {
    var autocompleteDiff = getAutocompleteDiff(newSettings, prevSettings);
    var isSettingsChanged = autocompleteDiff.length > 0;
    var isPollingChanged = prevSettings.polling !== newSettings.polling;

    if (isSettingsChanged) {
      // If the user has changed one of the autocomplete settings, then we'll fetch just the
      // ones which have changed.
      var changedSettings = autocompleteDiff.reduce(function (changedSettingsAccum, setting) {
        changedSettingsAccum[setting] = newSettings.autocomplete[setting];
        return changedSettingsAccum;
      }, {});

      _mappings.default.retrieveAutoCompleteInfo(changedSettings.autocomplete);
    } else if (isPollingChanged) {
      // If the user has turned polling on, then we'll fetch all selected autocomplete settings.
      _mappings.default.retrieveAutoCompleteInfo();
    }
  }
};

function Settings(_ref) {
  var onClose = _ref.onClose;

  var _useServicesContext = (0, _contexts.useServicesContext)(),
      settings = _useServicesContext.services.settings;

  var dispatch = (0, _contexts.useEditorActionContext)();

  var onSaveSettings = function onSaveSettings(newSettings) {
    var prevSettings = settings.toJSON();
    fetchAutocompleteSettingsIfNeeded(newSettings, prevSettings); // Update the new settings in localStorage

    settings.updateSettings(newSettings); // Let the rest of the application know settings have updated.

    dispatch({
      type: 'updateSettings',
      payload: newSettings
    });
    onClose();
  };

  return _react.default.createElement(_components.DevToolsSettingsModal, {
    onClose: onClose,
    onSaveSettings: onSaveSettings,
    refreshAutocompleteSettings: refreshAutocompleteSettings,
    settings: settings.toJSON()
  });
}