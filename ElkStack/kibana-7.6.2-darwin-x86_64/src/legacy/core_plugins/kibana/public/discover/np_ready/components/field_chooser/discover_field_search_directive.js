"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFieldSearchDirective = createFieldSearchDirective;

var _kibana_services = require("../../../kibana_services");

var _discover_field_search = require("./discover_field_search");

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
function createFieldSearchDirective(reactDirective) {
  return reactDirective((0, _kibana_services.wrapInI18nContext)(_discover_field_search.DiscoverFieldSearch), [['onChange', {
    watchDepth: 'reference'
  }], ['value', {
    watchDepth: 'value'
  }], ['types', {
    watchDepth: 'value'
  }]]);
}