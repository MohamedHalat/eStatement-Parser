"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esVersionCompatibleWithKibana = esVersionCompatibleWithKibana;
exports.esVersionEqualsKibana = esVersionEqualsKibana;

var _semver = _interopRequireWildcard(require("semver"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
 * Checks for the compatibilitiy between Elasticsearch and Kibana versions
 * 1. Major version differences will never work together.
 * 2. Older versions of ES won't work with newer versions of Kibana.
 */
function esVersionCompatibleWithKibana(esVersion, kibanaVersion) {
  const esVersionNumbers = {
    major: _semver.default.major(esVersion),
    minor: _semver.default.minor(esVersion),
    patch: _semver.default.patch(esVersion)
  };
  const kibanaVersionNumbers = {
    major: _semver.default.major(kibanaVersion),
    minor: _semver.default.minor(kibanaVersion),
    patch: _semver.default.patch(kibanaVersion)
  }; // Reject mismatching major version numbers.

  if (esVersionNumbers.major !== kibanaVersionNumbers.major) {
    return false;
  } // Reject older minor versions of ES.


  if (esVersionNumbers.minor < kibanaVersionNumbers.minor) {
    return false;
  }

  return true;
}

function esVersionEqualsKibana(nodeVersion, kibanaVersion) {
  const nodeSemVer = (0, _semver.coerce)(nodeVersion);
  const kibanaSemver = (0, _semver.coerce)(kibanaVersion);
  return nodeSemVer && kibanaSemver && nodeSemVer.version === kibanaSemver.version;
}