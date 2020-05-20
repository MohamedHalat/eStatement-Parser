"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initBreadcrumbsApi = initBreadcrumbsApi;

var _new_platform = require("ui/new_platform");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var newPlatformChrome = _new_platform.npStart.core.chrome;

function createBreadcrumbsApi(chrome) {
  var currentBreadcrumbs = []; // reset breadcrumbSetSinceRouteChange any time the breadcrumbs change, even
  // if it was done directly through the new platform

  newPlatformChrome.getBreadcrumbs$().subscribe({
    next: function next(nextBreadcrumbs) {
      currentBreadcrumbs = nextBreadcrumbs;
    }
  });
  return {
    breadcrumbs: {
      /**
       * Get an observerable that emits the current list of breadcrumbs
       * and emits each update to the breadcrumbs
       */
      get$: function get$() {
        return newPlatformChrome.getBreadcrumbs$();
      },

      /**
       * Replace the set of breadcrumbs with a new set
       */
      set: function set(newBreadcrumbs) {
        newPlatformChrome.setBreadcrumbs(newBreadcrumbs);
      },

      /**
       * Add a breadcrumb to the end of the list of breadcrumbs
       */
      push: function push(breadcrumb) {
        newPlatformChrome.setBreadcrumbs([].concat(_toConsumableArray(currentBreadcrumbs), [breadcrumb]));
      },

      /**
       * Filter the current set of breadcrumbs with a function. Works like Array#filter()
       */
      filter: function filter(fn) {
        newPlatformChrome.setBreadcrumbs(currentBreadcrumbs.filter(fn));
      },

      /**
       * Remove last element of the breadcrumb
       */
      pop: function pop() {
        newPlatformChrome.setBreadcrumbs(currentBreadcrumbs.slice(0, -1));
      }
    }
  };
}

function initBreadcrumbsApi(chrome, internals) {
  var _createBreadcrumbsApi = createBreadcrumbsApi(chrome),
      breadcrumbs = _createBreadcrumbsApi.breadcrumbs;

  chrome.breadcrumbs = breadcrumbs;
}