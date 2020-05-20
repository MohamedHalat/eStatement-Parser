"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFeature = void 0;

var _feature_catalogue = require("ui/registry/feature_catalogue");

var _i18n = require("@kbn/i18n");

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
var registerFeature = function registerFeature() {
  return {
    id: 'timelion',
    title: 'Timelion',
    description: _i18n.i18n.translate('timelion.registerFeatureDescription', {
      defaultMessage: 'Use an expression language to analyze time series data and visualize the results.'
    }),
    icon: 'timelionApp',
    path: '/app/timelion',
    showOnHomePage: false,
    category: _feature_catalogue.FeatureCatalogueCategory.DATA
  };
};

exports.registerFeature = registerFeature;