"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homePluginMock = void 0;

var _feature_catalogue_registry = require("../services/feature_catalogue/feature_catalogue_registry.mock");

var _environment = require("../services/environment/environment.mock");

var _tutorial_service = require("../services/tutorials/tutorial_service.mock");

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
var createSetupContract = function createSetupContract() {
  return {
    featureCatalogue: _feature_catalogue_registry.featureCatalogueRegistryMock.createSetup(),
    environment: _environment.environmentServiceMock.createSetup(),
    tutorials: _tutorial_service.tutorialServiceMock.createSetup()
  };
};

var createStartContract = function createStartContract() {
  return {
    featureCatalogue: _feature_catalogue_registry.featureCatalogueRegistryMock.createStart(),
    environment: _environment.environmentServiceMock.createStart(),
    tutorials: _tutorial_service.tutorialServiceMock.createStart()
  };
};

var homePluginMock = {
  createSetupContract: createSetupContract,
  createStartContract: createStartContract
};
exports.homePluginMock = homePluginMock;