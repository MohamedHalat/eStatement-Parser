"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorAggSelect = DefaultEditorAggSelect;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _documentation_links = require("../../../../documentation_links/documentation_links");

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
function DefaultEditorAggSelect(_ref) {
  var aggError = _ref.aggError,
      id = _ref.id,
      indexPattern = _ref.indexPattern,
      value = _ref.value,
      setValue = _ref.setValue,
      aggTypeOptions = _ref.aggTypeOptions,
      showValidation = _ref.showValidation,
      isSubAggregation = _ref.isSubAggregation,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity;
  var selectedOptions = value ? [{
    label: value.title,
    target: value
  }] : [];
  var label = isSubAggregation ? _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.defaultEditor.aggSelect.subAggregationLabel",
    defaultMessage: "Sub aggregation"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.defaultEditor.aggSelect.aggregationLabel",
    defaultMessage: "Aggregation"
  });
  var aggHelpLink;

  if ((0, _lodash.has)(value, 'name')) {
    aggHelpLink = (0, _lodash.get)(_documentation_links.documentationLinks, ['aggs', value.name]);
  }

  var helpLink = value && aggHelpLink && _react.default.createElement(_eui.EuiLink, {
    href: aggHelpLink,
    target: "_blank",
    rel: "noopener"
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.defaultEditor.aggSelect.helpLinkLabel",
    defaultMessage: "{aggTitle} help",
    values: {
      aggTitle: value ? value.title : ''
    }
  })));

  var errors = aggError ? [aggError] : [];

  if (!aggTypeOptions.length) {
    errors.push(_i18n.i18n.translate('common.ui.vis.defaultEditor.aggSelect.noCompatibleAggsDescription', {
      defaultMessage: 'The index pattern {indexPatternTitle} does not have any aggregatable fields.',
      values: {
        indexPatternTitle: indexPattern && indexPattern.title
      }
    }));
  }

  var isValid = !!value && !errors.length;
  (0, _react.useEffect)(function () {
    setValidity(isValid);
  }, [isValid]);
  (0, _react.useEffect)(function () {
    if (errors.length) {
      setTouched();
    }
  }, [errors.length]);

  var onChange = function onChange(options) {
    var selectedOption = (0, _lodash.get)(options, '0.target');

    if (selectedOption) {
      setValue(selectedOption);
    }
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    labelAppend: helpLink,
    error: errors,
    isInvalid: showValidation ? !isValid : false,
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_eui.EuiComboBox, {
    placeholder: _i18n.i18n.translate('common.ui.vis.defaultEditor.aggSelect.selectAggPlaceholder', {
      defaultMessage: 'Select an aggregation'
    }),
    id: "visDefaultEditorAggSelect".concat(id),
    isDisabled: !aggTypeOptions.length,
    options: aggTypeOptions,
    selectedOptions: selectedOptions,
    singleSelection: {
      asPlainText: true
    },
    onBlur: setTouched,
    onChange: onChange,
    "data-test-subj": "defaultEditorAggSelect",
    isClearable: false,
    isInvalid: showValidation ? !isValid : false,
    fullWidth: true,
    compressed: true
  }));
}