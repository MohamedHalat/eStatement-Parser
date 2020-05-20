"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeValueInput = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../../../kibana_react/public");

var _value_input_type = require("./value_input_type");

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
function RangeValueInputUI(props) {
  var kibana = (0, _public.useKibana)();
  var dataMathDocLink = kibana.services.docLinks.links.date.dateMath;
  var type = props.field ? props.field.type : 'string';

  var onFromChange = function onFromChange(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Error('Range params must be a string or number');
    }

    props.onChange({
      from: value,
      to: (0, _lodash.get)(props, 'value.to')
    });
  };

  var onToChange = function onToChange(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Error('Range params must be a string or number');
    }

    props.onChange({
      from: (0, _lodash.get)(props, 'value.from'),
      to: value
    });
  };

  return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiFormControlLayoutDelimited, {
    "aria-label": props.intl.formatMessage({
      id: 'data.filter.filterEditor.rangeInputLabel',
      defaultMessage: 'Range'
    }),
    startControl: _react2.default.createElement(_value_input_type.ValueInputType, {
      controlOnly: true,
      type: type,
      value: props.value ? props.value.from : undefined,
      onChange: onFromChange,
      placeholder: props.intl.formatMessage({
        id: 'data.filter.filterEditor.rangeStartInputPlaceholder',
        defaultMessage: 'Start of the range'
      })
    }),
    endControl: _react2.default.createElement(_value_input_type.ValueInputType, {
      controlOnly: true,
      type: type,
      value: props.value ? props.value.to : undefined,
      onChange: onToChange,
      placeholder: props.intl.formatMessage({
        id: 'data.filter.filterEditor.rangeEndInputPlaceholder',
        defaultMessage: 'End of the range'
      })
    })
  }), type === 'date' ? _react2.default.createElement(_eui.EuiFormHelpText, null, _react2.default.createElement(_eui.EuiLink, {
    target: "_blank",
    href: dataMathDocLink
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "data.filter.filterEditor.dateFormatHelpLinkLabel",
    defaultMessage: "Accepted date formats"
  }), ' ', _react2.default.createElement(_eui.EuiIcon, {
    type: "popout",
    size: "s"
  }))) : '');
}

var RangeValueInput = (0, _react.injectI18n)(RangeValueInputUI);
exports.RangeValueInput = RangeValueInput;