"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFailurePropsForSummary = getFailurePropsForSummary;
exports.getFailureSummaryText = getFailureSummaryText;
exports.getFailureSummaryDetailsText = getFailureSummaryDetailsText;
exports.ShardFailureDescriptionHeader = ShardFailureDescriptionHeader;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

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
function getFailurePropsForSummary(failure) {
  var failureDetailProps = ['shard', 'index', 'node'];
  return failureDetailProps.filter(function (key) {
    return typeof failure[key] === 'number' || typeof failure[key] === 'string';
  }).map(function (key) {
    return {
      key: key,
      value: String(failure[key])
    };
  });
}

function getFailureSummaryText(failure, failureDetails) {
  var failureName = failure.reason.type;
  var displayDetails = typeof failureDetails === 'string' ? failureDetails : getFailureSummaryDetailsText(failure);
  return _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.failureHeader', {
    defaultMessage: '{failureName} at {failureDetails}',
    values: {
      failureName: failureName,
      failureDetails: displayDetails
    },
    description: 'Summary of shard failures, e.g. "IllegalArgumentException at shard 0 node xyz"'
  });
}

function getFailureSummaryDetailsText(failure) {
  return getFailurePropsForSummary(failure).map(function (_ref) {
    var key = _ref.key,
        value = _ref.value;
    return "".concat(key, ": ").concat(value);
  }).join(', ');
}

function ShardFailureDescriptionHeader(props) {
  var failureDetails = getFailurePropsForSummary(props).map(function (kv) {
    return _react.default.createElement("span", {
      className: "shardFailureModal__keyValueTitle",
      key: kv.key
    }, _react.default.createElement(_eui.EuiCode, null, kv.key), " ", kv.value);
  });
  return _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h2", null, getFailureSummaryText(props, ''), failureDetails));
}