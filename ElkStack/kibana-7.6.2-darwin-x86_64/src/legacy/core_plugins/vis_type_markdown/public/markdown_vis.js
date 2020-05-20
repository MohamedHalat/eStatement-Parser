"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markdownVisDefinition = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../visualizations/public");

var _markdown_vis_controller = require("./markdown_vis_controller");

var _markdown_options = require("./markdown_options");

var _settings_options = require("./settings_options");

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
var markdownVisDefinition = {
  name: 'markdown',
  title: 'Markdown',
  isAccessible: true,
  icon: 'visText',
  description: _i18n.i18n.translate('visTypeMarkdown.markdownDescription', {
    defaultMessage: 'Create a document using markdown syntax'
  }),
  visConfig: {
    component: _markdown_vis_controller.MarkdownVisWrapper,
    defaults: {
      fontSize: 12,
      openLinksInNewTab: false,
      markdown: ''
    }
  },
  editorConfig: {
    optionTabs: [{
      name: 'advanced',
      title: _i18n.i18n.translate('visTypeMarkdown.tabs.dataText', {
        defaultMessage: 'Data'
      }),
      editor: _markdown_options.MarkdownOptions
    }, {
      name: 'options',
      title: _i18n.i18n.translate('visTypeMarkdown.tabs.optionsText', {
        defaultMessage: 'Options'
      }),
      editor: _settings_options.SettingsOptions
    }],
    enableAutoApply: true,
    defaultSize: _public.DefaultEditorSize.LARGE
  },
  options: {
    showTimePicker: false,
    showFilterBar: false
  },
  requestHandler: 'none',
  responseHandler: 'none'
};
exports.markdownVisDefinition = markdownVisDefinition;