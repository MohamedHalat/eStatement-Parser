"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShardFailureOpenModalButton = ShardFailureOpenModalButton;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _services = require("../../../../../../../plugins/data/public/services");

var _public = require("../../../../../../../plugins/kibana_react/public");

var _shard_failure_modal = require("./shard_failure_modal");

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
function ShardFailureOpenModalButton(_ref) {
  var request = _ref.request,
      response = _ref.response,
      title = _ref.title;

  function onClick() {
    var modal = (0, _services.getOverlays)().openModal((0, _public.toMountPoint)(_react.default.createElement(_shard_failure_modal.ShardFailureModal, {
      request: request,
      response: response,
      title: title,
      onClose: function onClose() {
        return modal.close();
      }
    })), {
      className: 'shardFailureModal'
    });
  }

  return _react.default.createElement(_eui.EuiTextAlign, {
    textAlign: "right"
  }, _react.default.createElement(_eui.EuiButton, {
    color: "warning",
    size: "s",
    onClick: onClick,
    "data-test-subj": "openShardFailureModalBtn"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "data.search.searchSource.fetch.shardsFailedModal.showDetails",
    defaultMessage: "Show details",
    description: "Open the modal to show details"
  })));
}