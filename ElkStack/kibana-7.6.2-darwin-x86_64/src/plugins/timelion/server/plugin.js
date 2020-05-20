"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _operators = require("rxjs/operators");

var _utils = require("../../../../src/core/utils");

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
 * Represents Timelion Plugin instance that will be managed by the Kibana plugin system.
 */
class Plugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;
  }

  async setup() {
    const config = await this.initializerContext.config.create().pipe((0, _operators.first)()).toPromise();
    return (0, _utils.deepFreeze)({
      uiEnabled: config.ui.enabled
    });
  }

  start() {
    this.initializerContext.logger.get().debug('Starting plugin');
  }

  stop() {
    this.initializerContext.logger.get().debug('Stopping plugin');
  }

}

exports.Plugin = Plugin;