"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFetchErrorDirective = createFetchErrorDirective;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _kibana_services = require("../../../kibana_services");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
var DiscoverFetchError = function DiscoverFetchError(_ref) {
  var fetchError = _ref.fetchError;

  if (!fetchError) {
    return null;
  }

  var body;

  if (fetchError.lang === 'painless') {
    var _getServices = (0, _kibana_services.getServices)(),
        chrome = _getServices.chrome;

    var mangagementUrlObj = chrome.navLinks.get('kibana:management');
    var managementUrl = mangagementUrlObj ? mangagementUrlObj.url : '';
    var url = "".concat(managementUrl, "/kibana/index_patterns");
    body = _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.discover.fetchError.howToAddressErrorDescription",
      defaultMessage: "You can address this error by editing the {fetchErrorScript} field in {managementLink}, under the {scriptedFields} tab.",
      values: {
        fetchErrorScript: "'".concat(fetchError.script, "'"),
        scriptedFields: _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.discover.fetchError.scriptedFieldsText",
          defaultMessage: "\u201CScripted fields\u201D"
        }),
        managementLink: _react.default.createElement("a", {
          href: url
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.discover.fetchError.managmentLinkText",
          defaultMessage: "Management > Index Patterns"
        }))
      }
    }));
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    "data-test-subj": "discoverFetchError"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "discoverFetchError"
  }, _react.default.createElement(_eui.EuiCallOut, {
    title: fetchError.message,
    color: "danger",
    iconType: "cross"
  }, body, _react.default.createElement(_eui.EuiCodeBlock, null, fetchError.error)))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }));
};

function createFetchErrorDirective(reactDirective) {
  return reactDirective((0, _kibana_services.wrapInI18nContext)(DiscoverFetchError));
}

(0, _kibana_services.getAngularModule)().directive('discoverFetchError', createFetchErrorDirective);