"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNavLinks = getNavLinks;

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
function legacyAppToNavLink(spec) {
  var _spec$title, _spec$linkToLastSubUr;

  if (!spec.id) {
    throw new Error('Every app must specify an id');
  }

  return {
    id: spec.id,
    title: (_spec$title = spec.title) !== null && _spec$title !== void 0 ? _spec$title : spec.id,
    order: typeof spec.order === 'number' ? spec.order : 0,
    icon: spec.icon,
    euiIconType: spec.euiIconType,
    url: spec.url || `/app/${spec.id}`,
    linkToLastSubUrl: (_spec$linkToLastSubUr = spec.linkToLastSubUrl) !== null && _spec$linkToLastSubUr !== void 0 ? _spec$linkToLastSubUr : true
  };
}

function legacyLinkToNavLink(spec) {
  var _spec$linkToLastSubUr2, _spec$hidden, _spec$disabled, _spec$tooltip;

  return {
    id: spec.id,
    title: spec.title,
    order: typeof spec.order === 'number' ? spec.order : 0,
    url: spec.url,
    subUrlBase: spec.subUrlBase || spec.url,
    disableSubUrlTracking: spec.disableSubUrlTracking,
    icon: spec.icon,
    euiIconType: spec.euiIconType,
    linkToLastSubUrl: (_spec$linkToLastSubUr2 = spec.linkToLastSubUrl) !== null && _spec$linkToLastSubUr2 !== void 0 ? _spec$linkToLastSubUr2 : true,
    hidden: (_spec$hidden = spec.hidden) !== null && _spec$hidden !== void 0 ? _spec$hidden : false,
    disabled: (_spec$disabled = spec.disabled) !== null && _spec$disabled !== void 0 ? _spec$disabled : false,
    tooltip: (_spec$tooltip = spec.tooltip) !== null && _spec$tooltip !== void 0 ? _spec$tooltip : ''
  };
}

function isHidden(app) {
  return app.listed === false || app.hidden === true;
}

function getNavLinks(uiExports, pluginSpecs) {
  const navLinkSpecs = uiExports.navLinkSpecs || [];
  const appSpecs = (uiExports.uiAppSpecs || []).filter(app => app !== undefined && !isHidden(app));
  const pluginIds = (pluginSpecs || []).map(spec => spec.getId());
  appSpecs.forEach(spec => {
    if (spec.pluginId && !pluginIds.includes(spec.pluginId)) {
      throw new Error(`Unknown plugin id "${spec.pluginId}"`);
    }
  });
  return [...navLinkSpecs.map(legacyLinkToNavLink), ...appSpecs.map(legacyAppToNavLink)].sort((a, b) => a.order - b.order);
}