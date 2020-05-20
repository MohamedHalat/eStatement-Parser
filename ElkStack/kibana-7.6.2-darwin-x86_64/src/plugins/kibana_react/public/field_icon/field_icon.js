"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldIcon = FieldIcon;
exports.typeToEuiIconMap = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

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
var colors = (0, _eui.euiPaletteColorBlind)(); // defaultIcon => a unknown datatype

var defaultIcon = {
  icon: 'questionInCircle',
  color: colors[0]
};
var typeToEuiIconMap = {
  boolean: {
    icon: 'invert',
    color: colors[5]
  },
  // icon for an index pattern mapping conflict in discover
  conflict: {
    icon: 'alert',
    color: colors[8]
  },
  date: {
    icon: 'calendar',
    color: colors[7]
  },
  geo_point: {
    icon: 'globe',
    color: colors[2]
  },
  geo_shape: {
    icon: 'globe',
    color: colors[2]
  },
  ip: {
    icon: 'storage',
    color: colors[8]
  },
  // is a plugin's data type https://www.elastic.co/guide/en/elasticsearch/plugins/current/mapper-murmur3-usage.html
  murmur3: {
    icon: 'document',
    color: colors[1]
  },
  number: {
    icon: 'number',
    color: colors[0]
  },
  _source: {
    icon: 'editorCodeBlock',
    color: colors[3]
  },
  string: {
    icon: 'string',
    color: colors[4]
  },
  nested: {
    icon: 'nested',
    color: colors[2]
  }
};
/**
 * Field icon used across the app
 */

exports.typeToEuiIconMap = typeToEuiIconMap;

function FieldIcon(_ref) {
  var type = _ref.type,
      label = _ref.label,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 's' : _ref$size,
      _ref$useColor = _ref.useColor,
      useColor = _ref$useColor === void 0 ? false : _ref$useColor,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? undefined : _ref$className;
  var euiIcon = typeToEuiIconMap[type] || defaultIcon;
  return _react.default.createElement(_eui.EuiIcon, {
    type: euiIcon.icon,
    "aria-label": label || type,
    size: size,
    color: useColor || type === 'conflict' ? euiIcon.color : undefined,
    className: className
  });
}