"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRootBreadcrumbs = getRootBreadcrumbs;
exports.getSavedSearchBreadcrumbs = getSavedSearchBreadcrumbs;

var _i18n = require("@kbn/i18n");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getRootBreadcrumbs() {
  return [{
    text: _i18n.i18n.translate('kbn.discover.rootBreadcrumb', {
      defaultMessage: 'Discover'
    }),
    href: '#/discover'
  }];
}

function getSavedSearchBreadcrumbs($route) {
  return [].concat(_toConsumableArray(getRootBreadcrumbs()), [{
    text: $route.current.locals.savedObjects.savedSearch.id
  }]);
}