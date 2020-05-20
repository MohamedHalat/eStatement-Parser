"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.organizeBy = organizeBy;

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
 * Like _.groupBy, but allows specifying multiple groups for a
 * single object.
 *
 * organizeBy([{ a: [1, 2, 3] }, { b: true, a: [1, 4] }], 'a')
 * // Object {1: Array[2], 2: Array[1], 3: Array[1], 4: Array[1]}
 *
 * _.groupBy([{ a: [1, 2, 3] }, { b: true, a: [1, 4] }], 'a')
 * // Object {'1,2,3': Array[1], '1,4': Array[1]}
 *
 * @param  {array} collection - the list of values to organize
 * @param  {Function} callback - either a property name, or a callback.
 * @return {object}
 */
function organizeBy(collection, callback) {
  var buckets = {};

  function add(key, obj) {
    if (!buckets[key]) {
      buckets[key] = [];
    }

    buckets[key].push(obj);
  }

  (0, _lodash.each)(collection, function (obj) {
    var keys = (0, _lodash.isFunction)(callback) ? callback(obj) : obj[callback];

    if (!Array.isArray(keys)) {
      add(keys, obj);
      return;
    }

    var length = keys.length;

    while (length-- > 0) {
      add(keys[length], obj);
    }
  });
  return buckets;
}