"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelContextProvider = PanelContextProvider;
exports.usePanelContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _registry = require("./registry");

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
var PanelContext = (0, _react.createContext)({
  registry: new _registry.PanelRegistry()
});

function PanelContextProvider(_ref) {
  var children = _ref.children,
      registry = _ref.registry;
  return _react.default.createElement(PanelContext.Provider, {
    value: {
      registry: registry
    }
  }, children);
}

var usePanelContext = function usePanelContext() {
  var context = (0, _react.useContext)(PanelContext);

  if (context === undefined) {
    throw new Error('usePanelContext must be used within a <PanelContextProvider />');
  }

  return context;
};

exports.usePanelContext = usePanelContext;