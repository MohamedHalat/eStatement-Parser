"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TileMapOptions = TileMapOptions;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _components = require("../../../kbn_vislib_vis_types/public/components");

var _wms_options = require("./wms_options");

var _map_types = require("../map_types");

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
function TileMapOptions(props) {
  var stateParams = props.stateParams,
      setValue = props.setValue,
      vis = props.vis;
  (0, _react.useEffect)(function () {
    if (!stateParams.mapType) {
      setValue('mapType', vis.type.editorConfig.collections.mapTypes[0]);
    }
  }, [setValue, stateParams.mapType, vis.type.editorConfig.collections.mapTypes]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_components.SelectOption, {
    label: _i18n.i18n.translate('tileMap.visParams.mapTypeLabel', {
      defaultMessage: 'Map type'
    }),
    options: vis.type.editorConfig.collections.mapTypes,
    paramName: "mapType",
    value: stateParams.mapType,
    setValue: setValue
  }), stateParams.mapType === _map_types.MapTypes.Heatmap ? _react.default.createElement(_components.RangeOption, {
    label: _i18n.i18n.translate('tileMap.visParams.clusterSizeLabel', {
      defaultMessage: 'Cluster size'
    }),
    max: 3,
    min: 1,
    paramName: "heatClusterSize",
    step: 0.1,
    value: stateParams.heatClusterSize,
    setValue: setValue
  }) : _react.default.createElement(_components.SelectOption, {
    label: _i18n.i18n.translate('tileMap.visParams.colorSchemaLabel', {
      defaultMessage: 'Color schema'
    }),
    options: vis.type.editorConfig.collections.colorSchemas,
    paramName: "colorSchema",
    value: stateParams.colorSchema,
    setValue: setValue
  }), _react.default.createElement(_components.BasicOptions, props), _react.default.createElement(_components.SwitchOption, {
    disabled: !vis.type.visConfig.canDesaturate,
    label: _i18n.i18n.translate('tileMap.visParams.desaturateTilesLabel', {
      defaultMessage: 'Desaturate tiles'
    }),
    tooltip: _i18n.i18n.translate('tileMap.visParams.reduceVibrancyOfTileColorsTip', {
      defaultMessage: 'Reduce the vibrancy of tile colors. This does not work in any version of Internet Explorer.'
    }),
    paramName: "isDesaturated",
    value: stateParams.isDesaturated,
    setValue: setValue
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_wms_options.WmsOptions, props));
}