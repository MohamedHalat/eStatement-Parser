"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SampleDataCard = SampleDataCard;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

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

/*
 * The UI and related logic for the welcome screen that *should* show only
 * when it is enabled (the default) and there is no Kibana-consumed data
 * in Elasticsearch.
 */
function SampleDataCard(_ref) {
  var urlBasePath = _ref.urlBasePath,
      onDecline = _ref.onDecline,
      onConfirm = _ref.onConfirm;
  return _react.default.createElement(_eui.EuiCard, {
    image: "".concat(urlBasePath, "/plugins/kibana/home/assets/illo_dashboard.png"),
    textAlign: "left",
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.home.letsStartTitle",
      defaultMessage: "Let's get started"
    }),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.home.letsStartDescription",
      defaultMessage: "We noticed that you don't have any data in your cluster.\nYou can try our sample data and dashboards or jump in with your own data."
    }),
    footer: _react.default.createElement("footer", null, _react.default.createElement(_eui.EuiButton, {
      fill: true,
      className: "homWelcome__footerAction",
      onClick: onConfirm
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.home.tryButtonLabel",
      defaultMessage: "Try our sample data"
    })), _react.default.createElement(_eui.EuiButtonEmpty, {
      className: "homWelcome__footerAction",
      onClick: onDecline,
      "data-test-subj": "skipWelcomeScreen"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.home.exploreButtonLabel",
      defaultMessage: "Explore on my own"
    })))
  });
}