"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getControlFactory = getControlFactory;

var _range_control_factory = require("./range_control_factory");

var _list_control_factory = require("./list_control_factory");

var _editor_utils = require("../editor_utils");

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
function getControlFactory(controlParams) {
  var factory = null;

  switch (controlParams.type) {
    case _editor_utils.CONTROL_TYPES.RANGE:
      factory = _range_control_factory.rangeControlFactory;
      break;

    case _editor_utils.CONTROL_TYPES.LIST:
      factory = _list_control_factory.listControlFactory;
      break;

    default:
      throw new Error("Unhandled control type ".concat(controlParams.type));
  }

  return factory;
}