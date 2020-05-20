"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHttpServer = void 0;

var _rxjs = require("rxjs");

var _configSchema = require("@kbn/config-schema");

var _config = require("../config");

var _env = require("../config/__mocks__/env");

var _http_service = require("./http_service");

var _config_service = require("../config/config_service.mock");

var _logging_service = require("../logging/logging_service.mock");

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
const coreId = Symbol('core');

const env = _config.Env.createDefault((0, _env.getEnvOptions)());

const logger = _logging_service.loggingServiceMock.create();

const configService = _config_service.configServiceMock.create();

configService.atPath.mockReturnValue(new _rxjs.BehaviorSubject({
  hosts: ['localhost'],
  maxPayload: new _configSchema.ByteSizeValue(1024),
  autoListen: true,
  ssl: {
    enabled: false
  },
  compression: {
    enabled: true
  },
  xsrf: {
    disableProtection: true,
    whitelist: []
  }
}));
const defaultContext = {
  coreId,
  env,
  logger,
  configService
};
/**
 * Creates a concrete HttpServer with a mocked context.
 */

const createHttpServer = (overrides = {}) => {
  const context = { ...defaultContext,
    ...overrides
  };
  return new _http_service.HttpService(context);
};

exports.createHttpServer = createHttpServer;