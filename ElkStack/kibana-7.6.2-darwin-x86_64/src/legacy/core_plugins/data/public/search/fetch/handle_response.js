"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleResponse = handleResponse;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _shard_failure_open_modal_button = require("./components/shard_failure_open_modal_button");

var _public = require("../../../../../../plugins/kibana_react/public");

var _services = require("../../../../../../plugins/data/public/services");

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
function handleResponse(request, response) {
  if (response.timed_out) {
    (0, _services.getNotifications)().toasts.addWarning({
      title: _i18n.i18n.translate('data.search.searchSource.fetch.requestTimedOutNotificationMessage', {
        defaultMessage: 'Data might be incomplete because your request timed out'
      })
    });
  }

  if (response._shards && response._shards.failed) {
    var title = _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedNotificationMessage', {
      defaultMessage: '{shardsFailed} of {shardsTotal} shards failed',
      values: {
        shardsFailed: response._shards.failed,
        shardsTotal: response._shards.total
      }
    });

    var description = _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedNotificationDescription', {
      defaultMessage: 'The data you are seeing might be incomplete or wrong.'
    });

    var text = (0, _public.toMountPoint)(_react.default.createElement(_react.default.Fragment, null, description, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_shard_failure_open_modal_button.ShardFailureOpenModalButton, {
      request: request.body,
      response: response,
      title: title
    })));
    (0, _services.getNotifications)().toasts.addWarning({
      title: title,
      text: text
    });
  }

  return response;
}