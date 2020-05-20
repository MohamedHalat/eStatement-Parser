"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewVisHelp = NewVisHelp;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

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
function NewVisHelp(props) {
  return _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.visualize.newVisWizard.helpText",
    defaultMessage: "Start creating your visualization by selecting a type for that visualization."
  })), props.promotedTypes.map(function (t) {
    return _react2.default.createElement(_react2.Fragment, {
      key: t.name
    }, _react2.default.createElement("p", null, _react2.default.createElement("strong", null, t.promotion.description)), _react2.default.createElement(_eui.EuiButton, {
      onClick: function onClick() {
        return props.onPromotionClicked(t);
      },
      fill: true,
      size: "s",
      iconType: "popout",
      iconSide: "right"
    }, t.promotion.buttonText));
  }));
}