"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VegaVisEditor = VegaVisEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _jsonStringifyPrettyCompact = _interopRequireDefault(require("json-stringify-pretty-compact"));

var _hjson = _interopRequireDefault(require("hjson"));

var _i18n = require("@kbn/i18n");

var _notify = require("ui/notify");

var _vega_help_menu = require("./vega_help_menu");

var _vega_actions_menu = require("./vega_actions_menu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// @ts-ignore
var aceOptions = {
  maxLines: Infinity,
  highlightActiveLine: false,
  showPrintMargin: false,
  tabSize: 2,
  useSoftTabs: true,
  wrap: true
};
var hjsonStringifyOptions = {
  bracesSameLine: true,
  keepWsc: true
};

function format(value, stringify, options) {
  try {
    var spec = _hjson.default.parse(value, {
      legacyRoot: false,
      keepWsc: true
    });

    return stringify(spec, options);
  } catch (err) {
    // This is a common case - user tries to format an invalid HJSON text
    _notify.toastNotifications.addError(err, {
      title: _i18n.i18n.translate('visTypeVega.editor.formatError', {
        defaultMessage: 'Error formatting spec'
      })
    });

    return value;
  }
}

function VegaVisEditor(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue;
  var onChange = (0, _react.useCallback)(function (value) {
    setValue('spec', value);
  }, [setValue]);
  var formatJson = (0, _react.useCallback)(function () {
    return setValue('spec', format(stateParams.spec, _jsonStringifyPrettyCompact.default));
  }, [setValue, stateParams.spec]);
  var formatHJson = (0, _react.useCallback)(function () {
    return setValue('spec', format(stateParams.spec, _hjson.default.stringify, hjsonStringifyOptions));
  }, [setValue, stateParams.spec]);
  return _react.default.createElement("div", {
    className: "vgaEditor"
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    "data-test-subj": "vega-editor",
    mode: "hjson",
    theme: "textmate",
    width: "100%",
    height: "auto",
    onChange: onChange,
    value: stateParams.spec,
    setOptions: aceOptions
  }), _react.default.createElement("div", {
    className: "vgaEditor__aceEditorActions"
  }, _react.default.createElement(_vega_help_menu.VegaHelpMenu, null), _react.default.createElement(_vega_actions_menu.VegaActionsMenu, {
    formatHJson: formatHJson,
    formatJson: formatJson
  })));
}