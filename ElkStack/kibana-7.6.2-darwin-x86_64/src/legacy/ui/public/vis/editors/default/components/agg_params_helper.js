"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAggParamsToRender = getAggParamsToRender;
exports.getError = getError;
exports.getAggTypeOptions = getAggTypeOptions;
exports.isInvalidParamsTouched = isInvalidParamsTouched;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _filter = require("ui/agg_types/filter");

var _agg_types = require("ui/agg_types");

var _filter2 = require("ui/agg_types/param_types/filter");

var _utils = require("../utils");

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
function getAggParamsToRender(_ref) {
  var agg = _ref.agg,
      editorConfig = _ref.editorConfig,
      metricAggs = _ref.metricAggs,
      state = _ref.state;
  var params = {
    basic: [],
    advanced: []
  };
  var paramsToRender = agg.type && agg.type.params // Filter out, i.e. don't render, any parameter that is hidden via the editor config.
  .filter(function (param) {
    return !(0, _lodash.get)(editorConfig, [param.name, 'hidden'], false);
  }) || []; // build collection of agg params components

  paramsToRender.forEach(function (param, index) {
    var indexedFields = [];
    var fields;

    if (agg.schema.hideCustomLabel && param.name === 'customLabel') {
      return;
    } // if field param exists, compute allowed fields


    if (param.type === 'field') {
      var availableFields = param.getAvailableFields(agg.getIndexPattern().fields);
      fields = _filter2.aggTypeFieldFilters.filter(availableFields, agg);
      indexedFields = (0, _utils.groupAndSortBy)(fields, 'type', 'name');

      if (fields && !indexedFields.length && index > 0) {
        // don't draw the rest of the options if there are no indexed fields and it's an extra param (index > 0).
        return;
      }
    }

    var type = param.advanced ? 'advanced' : 'basic'; // show params with an editor component

    if (param.editorComponent) {
      params[type].push({
        agg: agg,
        aggParam: param,
        editorConfig: editorConfig,
        indexedFields: indexedFields,
        paramEditor: param.editorComponent,
        metricAggs: metricAggs,
        state: state,
        value: agg.params[param.name]
      });
    }
  });
  return params;
}

function getError(agg, aggIsTooLow) {
  var errors = [];

  if (aggIsTooLow) {
    errors.push(_i18n.i18n.translate('common.ui.vis.editors.aggParams.errors.aggWrongRunOrderErrorMessage', {
      defaultMessage: '"{schema}" aggs must run before all other buckets!',
      values: {
        schema: agg.schema.title
      }
    }));
  }

  return errors;
}

function getAggTypeOptions(agg, indexPattern, groupName) {
  var aggTypeOptions = _filter.aggTypeFilters.filter(_agg_types.aggTypes[groupName], indexPattern, agg);

  return (0, _utils.groupAndSortBy)(aggTypeOptions, 'subtype', 'title');
}
/**
 * Calculates a ngModel touched state.
 * If an aggregation is not selected, it returns a value of touched agg selector state.
 * Else if there are no invalid agg params, it returns false.
 * Otherwise it returns true if each invalid param is touched.
 * @param aggType Selected aggregation.
 * @param aggTypeState State of aggregation selector.
 * @param aggParams State of aggregation parameters.
 */


function isInvalidParamsTouched(aggType, aggTypeState, aggParams) {
  if (!aggType) {
    return aggTypeState.touched;
  }

  var invalidParams = Object.values(aggParams).filter(function (param) {
    return !param.valid;
  });

  if ((0, _lodash.isEmpty)(invalidParams)) {
    return false;
  }

  return invalidParams.every(function (param) {
    return param.touched;
  });
}