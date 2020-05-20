"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocViewer = DocViewer;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _kibana_services = require("../../../kibana_services");

var _doc_viewer_tab = require("./doc_viewer_tab");

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

/**
 * Rendering tabs with different views of 1 Elasticsearch hit in Discover.
 * The tabs are provided by the `docs_views` registry.
 * A view can contain a React `component`, or any JS framework by using
 * a `render` function.
 */
function DocViewer(renderProps) {
  var _getServices = (0, _kibana_services.getServices)(),
      docViewsRegistry = _getServices.docViewsRegistry;

  var tabs = docViewsRegistry.getDocViewsSorted(renderProps.hit).map(function (_ref, idx) {
    var title = _ref.title,
        render = _ref.render,
        component = _ref.component;
    return {
      id: title,
      name: title,
      content: _react.default.createElement(_doc_viewer_tab.DocViewerTab, {
        id: idx,
        title: title,
        component: component,
        renderProps: renderProps,
        render: render
      })
    };
  });

  if (!tabs.length) {
    // There there's a minimum of 2 tabs active in Discover.
    // This condition takes care of unit tests with 0 tabs.
    return null;
  }

  return _react.default.createElement("div", {
    className: "kbnDocViewer"
  }, _react.default.createElement(_eui.EuiTabbedContent, {
    tabs: tabs
  }));
}