"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountReactNode = exports.MountWrapper = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

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
var defaultWrapperClass = 'kbnMountWrapper';
/**
 * MountWrapper is a react component to mount a {@link MountPoint} inside a react tree.
 */

var MountWrapper = function MountWrapper(_ref) {
  var mount = _ref.mount,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? defaultWrapperClass : _ref$className;
  var element = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    return mount(element.current);
  }, [mount]);
  return _react.default.createElement("div", {
    className: className,
    ref: element
  });
};
/**
 * Mount converter for react node.
 *
 * @param node to get a mount for
 */


exports.MountWrapper = MountWrapper;

var mountReactNode = function mountReactNode(node) {
  return function (element) {
    (0, _reactDom.render)(_react.default.createElement(_react2.I18nProvider, null, node), element);
    return function () {
      return (0, _reactDom.unmountComponentAtNode)(element);
    };
  };
};

exports.mountReactNode = mountReactNode;