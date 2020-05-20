"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initChromeNavApi = initChromeNavApi;

var _absolute_to_parsed_url = require("../../url/absolute_to_parsed_url");

var _new_platform = require("../../new_platform");

var _relative_to_absolute = require("../../url/relative_to_absolute");

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
function initChromeNavApi(chrome, internals) {
  var coreNavLinks = _new_platform.npStart.core.chrome.navLinks;
  /**
   * Clear last url for deleted saved objects to avoid loading pages with "Could not locate..."
   */

  chrome.untrackNavLinksForDeletedSavedObjects = function (deletedIds) {
    function urlContainsDeletedId(url) {
      var includedId = deletedIds.find(function (deletedId) {
        return url.includes(deletedId);
      });
      return includedId !== undefined;
    }

    coreNavLinks.getAll().forEach(function (link) {
      if (link.linkToLastSubUrl && urlContainsDeletedId(link.url)) {
        setLastUrl(link, link.baseUrl);
      }
    });
  };
  /**
   * Manually sets the last url for the given app. The last url for a given app is updated automatically during
   * normal page navigation, so this should only need to be called to insert a last url that was not actually
   * navigated to. For instance, when saving an object and redirecting to another page, the last url of the app
   * should be the saved instance, but because of the redirect to a different page (e.g. `Save and Add to Dashboard`
   * on visualize tab), it won't be tracked automatically and will need to be inserted manually. See
   * https://github.com/elastic/kibana/pull/11932 for more background on why this was added.
   *
   * @param id {String} - an id that represents the navigation link.
   * @param kibanaParsedUrl {KibanaParsedUrl} the url to track
   */


  chrome.trackSubUrlForApp = function (id, kibanaParsedUrl) {
    var navLink = coreNavLinks.get(id);

    if (navLink) {
      setLastUrl(navLink, kibanaParsedUrl.getAbsoluteUrl());
    }
  };

  internals.trackPossibleSubUrl = function _callee(url) {
    var kibanaParsedUrl;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            kibanaParsedUrl = (0, _absolute_to_parsed_url.absoluteToParsedUrl)(url, chrome.getBasePath());
            coreNavLinks.getAll() // Filter only legacy links
            .filter(function (link) {
              return link.legacy;
            }).forEach(function (link) {
              var active = url.startsWith(link.subUrlBase);
              link = coreNavLinks.update(link.id, {
                active: active
              });

              if (active) {
                setLastUrl(link, url);
                return;
              }

              link = refreshLastUrl(link);
              var newGlobalState = kibanaParsedUrl.getGlobalState();

              if (newGlobalState) {
                injectNewGlobalState(link, kibanaParsedUrl.appId, newGlobalState);
              }
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  function lastSubUrlKey(link) {
    return "lastSubUrl:".concat(link.baseUrl);
  }

  function getLastUrl(link) {
    return internals.appUrlStore.getItem(lastSubUrlKey(link));
  }

  function setLastUrl(link, url) {
    if (link.linkToLastSubUrl === false) {
      return;
    }

    internals.appUrlStore.setItem(lastSubUrlKey(link), url);
    refreshLastUrl(link);
  }

  function refreshLastUrl(link) {
    var lastSubUrl = getLastUrl(link);
    return coreNavLinks.update(link.id, {
      url: lastSubUrl || link.url || link.baseUrl
    });
  }

  function injectNewGlobalState(link, fromAppId, newGlobalState) {
    var kibanaParsedUrl = (0, _absolute_to_parsed_url.absoluteToParsedUrl)(getLastUrl(link) || link.url || link.baseUrl, chrome.getBasePath()); // don't copy global state if links are for different apps

    if (fromAppId !== kibanaParsedUrl.appId) return;
    kibanaParsedUrl.setGlobalState(newGlobalState);
    coreNavLinks.update(link.id, {
      url: kibanaParsedUrl.getAbsoluteUrl()
    });
  } // simulate a possible change in url to initialize the
  // link.active and link.lastUrl properties


  coreNavLinks.getAll().filter(function (link) {
    return link.subUrlBase;
  }).forEach(function (link) {
    coreNavLinks.update(link.id, {
      subUrlBase: (0, _relative_to_absolute.relativeToAbsolute)(chrome.addBasePath(link.subUrlBase))
    });
  });
  internals.trackPossibleSubUrl(document.location.href);
}