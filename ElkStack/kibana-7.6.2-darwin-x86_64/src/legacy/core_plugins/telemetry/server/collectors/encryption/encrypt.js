"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKID = getKID;
exports.encryptTelemetry = encryptTelemetry;

var _requestCrypto = require("@elastic/request-crypto");

var _telemetry_jwks = require("./telemetry_jwks");

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
function getKID(isProd = false) {
  return isProd ? 'kibana' : 'kibana_dev';
}

async function encryptTelemetry(payload, isProd = false) {
  const kid = getKID(isProd);
  const encryptor = await (0, _requestCrypto.createRequestEncryptor)(_telemetry_jwks.telemetryJWKS);
  const clusters = [].concat(payload);
  return Promise.all(clusters.map(cluster => encryptor.encrypt(kid, cluster)));
}