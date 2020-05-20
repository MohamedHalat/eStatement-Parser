"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShardFailureModal = ShardFailureModal;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _shard_failure_table = require("./shard_failure_table");

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
function ShardFailureModal(_ref) {
  var request = _ref.request,
      response = _ref.response,
      title = _ref.title,
      onClose = _ref.onClose;

  if (!response || !response._shards || !Array.isArray(response._shards.failures) || !request) {
    // this should never ever happen, but just in case
    return _react.default.createElement(_eui.EuiCallOut, {
      title: "Sorry, there was an error",
      color: "danger",
      iconType: "alert"
    }, "The ShardFailureModal component received invalid properties");
  }

  var requestJSON = JSON.stringify(request, null, 2);
  var responseJSON = JSON.stringify(response, null, 2);
  var failures = response._shards.failures;
  var tabs = [{
    id: 'table',
    name: _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.tabHeaderShardFailures', {
      defaultMessage: 'Shard failures',
      description: 'Name of the tab displaying shard failures'
    }),
    content: _react.default.createElement(_shard_failure_table.ShardFailureTable, {
      failures: failures
    })
  }, {
    id: 'json-request',
    name: _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.tabHeaderRequest', {
      defaultMessage: 'Request',
      description: 'Name of the tab displaying the JSON request'
    }),
    content: _react.default.createElement(_eui.EuiCodeBlock, {
      language: "json",
      isCopyable: true
    }, requestJSON)
  }, {
    id: 'json-response',
    name: _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.tabHeaderResponse', {
      defaultMessage: 'Response',
      description: 'Name of the tab displaying the JSON response'
    }),
    content: _react.default.createElement(_eui.EuiCodeBlock, {
      language: "json",
      isCopyable: true
    }, responseJSON)
  }];
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, title)), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiTabbedContent, {
    tabs: tabs,
    initialSelectedTab: tabs[0],
    autoFocus: "selected"
  })), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiCopy, {
    textToCopy: responseJSON
  }, function (copy) {
    return _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: copy
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "data.search.searchSource.fetch.shardsFailedModal.copyToClipboard",
      defaultMessage: "Copy response to clipboard"
    }));
  }), _react.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      return onClose();
    },
    fill: true,
    "data-test-sub": "closeShardFailureModal"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "data.search.searchSource.fetch.shardsFailedModal.close",
    defaultMessage: "Close",
    description: "Closing the Modal"
  }))));
}