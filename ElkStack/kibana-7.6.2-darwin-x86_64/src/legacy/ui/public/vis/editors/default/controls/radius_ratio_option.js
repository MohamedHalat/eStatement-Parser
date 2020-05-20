"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadiusRatioOptionControl = RadiusRatioOptionControl;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

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
var DEFAULT_VALUE = 50;
var PARAM_NAME = 'radiusRatio';

function RadiusRatioOptionControl(_ref) {
  var editorStateParams = _ref.editorStateParams,
      setValue = _ref.setValue;

  var label = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.defaultEditor.controls.dotSizeRatioLabel",
    defaultMessage: "Dot size ratio"
  }), ' ', _react.default.createElement(_eui.EuiIconTip, {
    content: _i18n.i18n.translate('common.ui.vis.defaultEditor.controls.dotSizeRatioHelpText', {
      defaultMessage: 'Change the ratio of the radius of the smallest point to the largest point.'
    }),
    position: "right"
  }));

  (0, _react.useEffect)(function () {
    if (!editorStateParams.radiusRatio) {
      setValue(editorStateParams, PARAM_NAME, DEFAULT_VALUE);
    }
  }, []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: label,
    compressed: true
  }, _react.default.createElement(_eui.EuiRange, {
    compressed: true,
    fullWidth: true,
    min: 1,
    max: 100,
    value: editorStateParams.radiusRatio || DEFAULT_VALUE,
    onChange: function onChange(e) {
      return setValue(editorStateParams, PARAM_NAME, parseFloat(e.currentTarget.value));
    },
    showRange: true,
    showValue: true,
    valueAppend: "%"
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
}