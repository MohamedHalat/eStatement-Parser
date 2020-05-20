"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlVars = getUrlVars;
exports.addEmbeddableToDashboardUrl = addEmbeddableToDashboardUrl;
exports.getLensUrlFromDashboardAbsoluteUrl = getLensUrlFromDashboardAbsoluteUrl;

var _url = require("url");

var _legacy_imports = require("../legacy_imports");

var _dashboard_constants = require("./dashboard_constants");

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
 * Return query params from URL
 * @param url given url
 */
function getUrlVars(url) {
  var vars = {}; // @ts-ignore

  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (_, key, value) {
    // @ts-ignore
    vars[key] = decodeURIComponent(value);
  });
  return vars;
}
/** *
 * Returns dashboard URL with added embeddableType and embeddableId query params
 * eg.
 * input: url: http://localhost:5601/lib/app/kibana#/dashboard?_g=(refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now)), embeddableId: 12345, embeddableType: 'lens'
 * output: http://localhost:5601/lib/app/kibana#dashboard?addEmbeddableType=lens&addEmbeddableId=12345&_g=(refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))
 * @param url dasbhoard absolute url
 * @param embeddableId id of the saved visualization
 * @param basePath current base path
 * @param urlVars url query params (optional)
 * @param embeddableType 'lens' or 'visualization' (optional, default is 'lens')
 */


function addEmbeddableToDashboardUrl(url, basePath, embeddableId, urlVars, embeddableType) {
  if (!url) {
    return null;
  }

  var dashboardUrl = getUrlWithoutQueryParams(url);
  var dashboardParsedUrl = (0, _legacy_imports.absoluteToParsedUrl)(dashboardUrl, basePath);

  if (urlVars) {
    var keys = Object.keys(urlVars).sort();
    keys.forEach(function (key) {
      dashboardParsedUrl.addQueryParameter(key, urlVars[key]);
    });
  }

  dashboardParsedUrl.addQueryParameter(_dashboard_constants.DashboardConstants.ADD_EMBEDDABLE_TYPE, embeddableType || 'lens');
  dashboardParsedUrl.addQueryParameter(_dashboard_constants.DashboardConstants.ADD_EMBEDDABLE_ID, embeddableId);
  return dashboardParsedUrl.getAbsoluteUrl();
}
/**
 * Return Lens URL from dashboard absolute URL
 * @param dashboardAbsoluteUrl
 * @param basePath current base path
 * @param id Lens id
 */


function getLensUrlFromDashboardAbsoluteUrl(dashboardAbsoluteUrl, basePath, id) {
  if (!dashboardAbsoluteUrl || basePath === null || basePath === undefined) {
    return null;
  }

  var _parse = (0, _url.parse)(dashboardAbsoluteUrl),
      host = _parse.host,
      protocol = _parse.protocol;

  return "".concat(protocol, "//").concat(host).concat(basePath, "/app/kibana#/lens/edit/").concat(id);
}
/**
 * Returns the portion of the URL without query params
 * eg.
 * input: http://localhost:5601/lib/app/kibana#/dashboard?param1=x&param2=y&param3=z
 * output:http://localhost:5601/lib/app/kibana#/dashboard
 * input: http://localhost:5601/lib/app/kibana#/dashboard/39292992?param1=x&param2=y&param3=z
 * output: http://localhost:5601/lib/app/kibana#/dashboard/39292992
 * @param url url to parse
 */


function getUrlWithoutQueryParams(url) {
  return url.split('?')[0];
}