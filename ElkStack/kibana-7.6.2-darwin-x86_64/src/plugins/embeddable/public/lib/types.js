"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Adapters", {
  enumerable: true,
  get: function get() {
    return _inspector.Adapters;
  }
});
exports.ViewMode = void 0;

var _inspector = require("./inspector");

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
var ViewMode;
exports.ViewMode = ViewMode;

(function (ViewMode) {
  ViewMode["EDIT"] = "edit";
  ViewMode["VIEW"] = "view";
})(ViewMode || (exports.ViewMode = ViewMode = {})); // import { SavedObjectMetaData } from 'ui/saved_objects/components/saved_object_finder';
// TODO: Figure out how to do this import in New Platform.