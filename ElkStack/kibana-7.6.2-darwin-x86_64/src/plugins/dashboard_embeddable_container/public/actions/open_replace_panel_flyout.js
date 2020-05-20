"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openReplacePanelFlyout = openReplacePanelFlyout;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../plugins/kibana_react/public");

var _replace_panel_flyout = require("./replace_panel_flyout");

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
function openReplacePanelFlyout(options) {
  var embeddable, core, panelToRemove, savedObjectFinder, notifications, getEmbeddableFactories, flyoutSession;
  return regeneratorRuntime.async(function openReplacePanelFlyout$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          embeddable = options.embeddable, core = options.core, panelToRemove = options.panelToRemove, savedObjectFinder = options.savedObjectFinder, notifications = options.notifications, getEmbeddableFactories = options.getEmbeddableFactories;
          flyoutSession = core.overlays.openFlyout((0, _public.toMountPoint)(_react.default.createElement(_replace_panel_flyout.ReplacePanelFlyout, {
            container: embeddable,
            onClose: function onClose() {
              if (flyoutSession) {
                flyoutSession.close();
              }
            },
            panelToRemove: panelToRemove,
            savedObjectsFinder: savedObjectFinder,
            notifications: notifications,
            getEmbeddableFactories: getEmbeddableFactories
          })), {
            'data-test-subj': 'replacePanelFlyout'
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}