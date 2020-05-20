"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverIndexPatternWrapper = DiscoverIndexPatternWrapper;
exports.createIndexPatternSelectDirective = createIndexPatternSelectDirective;

var _react = _interopRequireDefault(require("react"));

var _kibana_services = require("../../../kibana_services");

var _discover_index_pattern = require("./discover_index_pattern");

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

/**
 * At initial rendering the angular directive the selectedIndexPattern prop is undefined
 * This wrapper catches this, had to be introduced to satisfy eslint
 */
function DiscoverIndexPatternWrapper(props) {
  if (!props.selectedIndexPattern || !Array.isArray(props.indexPatternList)) {
    return null;
  }

  return _react.default.createElement(_discover_index_pattern.DiscoverIndexPattern, props);
}

function createIndexPatternSelectDirective(reactDirective) {
  return reactDirective((0, _kibana_services.wrapInI18nContext)(DiscoverIndexPatternWrapper), [['indexPatternList', {
    watchDepth: 'reference'
  }], ['selectedIndexPattern', {
    watchDepth: 'reference'
  }], ['setIndexPattern', {
    watchDepth: 'reference'
  }]]);
}