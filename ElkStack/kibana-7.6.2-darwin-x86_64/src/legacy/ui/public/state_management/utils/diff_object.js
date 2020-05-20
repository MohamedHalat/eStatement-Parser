"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDiff = applyDiff;

var _lodash = require("lodash");

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
 * Filter the private vars
 * @param {string} key The keys
 * @returns {boolean}
 */
var filterPrivateAndMethods = function filterPrivateAndMethods(obj) {
  return function (key) {
    if ((0, _lodash.isFunction)(obj[key])) return false;
    if (key.charAt(0) === '$') return false;
    return key.charAt(0) !== '_';
  };
};

function applyDiff(target, source) {
  var diff = {
    removed: [],
    added: [],
    changed: [],
    keys: []
  };
  var targetKeys = (0, _lodash.keys)(target).filter(filterPrivateAndMethods(target));
  var sourceKeys = (0, _lodash.keys)(source).filter(filterPrivateAndMethods(source)); // Find the keys to be removed

  diff.removed = (0, _lodash.difference)(targetKeys, sourceKeys); // Find the keys to be added

  diff.added = (0, _lodash.difference)(sourceKeys, targetKeys); // Find the keys that will be changed

  diff.changed = (0, _lodash.filter)(sourceKeys, function (key) {
    return !(0, _lodash.isEqual)(target[key], source[key]);
  }); // Make a list of all the keys that are changing

  diff.keys = (0, _lodash.union)(diff.changed, diff.removed, diff.added); // Remove all the keys

  (0, _lodash.each)(diff.removed, function (key) {
    delete target[key];
  }); // Assign the changed to the source to the target

  (0, _lodash.assign)(target, (0, _lodash.pick)(source, diff.changed)); // Assign the added to the source to the target

  (0, _lodash.assign)(target, (0, _lodash.pick)(source, diff.added));
  return diff;
}