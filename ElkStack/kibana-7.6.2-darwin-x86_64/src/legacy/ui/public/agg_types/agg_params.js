"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeParams = exports.initParams = void 0;

var _agg = require("./param_types/agg");

var _field = require("./param_types/field");

var _optioned = require("./param_types/optioned");

var _string = require("./param_types/string");

var _json = require("./param_types/json");

var _base = require("./param_types/base");

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
var paramTypeMap = {
  field: _field.FieldParamType,
  optioned: _optioned.OptionedParamType,
  string: _string.StringParamType,
  json: _json.JsonParamType,
  agg: _agg.AggParamType,
  _default: _base.BaseParamType
};

var initParams = function initParams(params) {
  return params.map(function (config) {
    var Class = paramTypeMap[config.type] || paramTypeMap._default;
    return new Class(config);
  });
};
/**
 * Reads an aggConfigs
 *
 * @method write
 * @param  {AggConfig} aggConfig
 *         the AggConfig object who's type owns these aggParams and contains the param values for our param defs
 * @param  {object} [locals]
 *         an array of locals that will be available to the write function (can be used to enhance
 *         the quality of things like date_histogram's "auto" interval)
 * @return {object} output
 *         output of the write calls, reduced into a single object. A `params: {}` property is exposed on the
 *         output object which is used to create the agg dsl for the search request. All other properties
 *         are dependent on the AggParam#write methods which should be studied for each AggType.
 */


exports.initParams = initParams;

var writeParams = function writeParams() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var aggConfig = arguments.length > 1 ? arguments[1] : undefined;
  var aggs = arguments.length > 2 ? arguments[2] : undefined;
  var locals = arguments.length > 3 ? arguments[3] : undefined;
  var output = {
    params: {}
  };
  locals = locals || {};
  params.forEach(function (param) {
    if (param.write) {
      param.write(aggConfig, output, aggs, locals);
    } else {
      if (param && param.name) {
        output.params[param.name] = aggConfig.params[param.name];
      }
    }
  });
  return output;
};

exports.writeParams = writeParams;