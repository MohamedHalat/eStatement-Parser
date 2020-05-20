"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionMapOptions = RegionMapOptions;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _components = require("../../../kbn_vislib_vis_types/public/components");

var _wms_options = require("../../../tile_map/public/components/wms_options");

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
var mapLayerForOption = function mapLayerForOption(_ref) {
  var layerId = _ref.layerId,
      name = _ref.name;
  return {
    text: name,
    value: layerId
  };
};

var mapFieldForOption = function mapFieldForOption(_ref2) {
  var description = _ref2.description,
      name = _ref2.name;
  return {
    text: description,
    value: name
  };
};

function RegionMapOptions(props) {
  var serviceSettings = props.serviceSettings,
      stateParams = props.stateParams,
      vis = props.vis,
      setValue = props.setValue;
  var vectorLayers = vis.type.editorConfig.collections.vectorLayers;
  var vectorLayerOptions = (0, _react.useMemo)(function () {
    return vectorLayers.map(mapLayerForOption);
  }, [vectorLayers]);
  var fieldOptions = (0, _react.useMemo)(function () {
    return (stateParams.selectedLayer && stateParams.selectedLayer.fields || []).map(mapFieldForOption);
  }, [stateParams.selectedLayer]);
  var setEmsHotLink = (0, _react.useCallback)(function _callee(layer) {
    var emsHotLink;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(serviceSettings.getEMSHotLink(layer));

          case 2:
            emsHotLink = _context.sent;
            setValue('emsHotLink', emsHotLink);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }, [setValue, serviceSettings]);
  var setLayer = (0, _react.useCallback)(function _callee2(paramName, value) {
    var newLayer;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newLayer = vectorLayers.find(function (_ref3) {
              var layerId = _ref3.layerId;
              return layerId === value;
            });

            if (newLayer) {
              setValue(paramName, newLayer);
              setValue('selectedJoinField', newLayer.fields[0]);
              setEmsHotLink(newLayer);
            }

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }, [vectorLayers, setEmsHotLink, setValue]);
  var setField = (0, _react.useCallback)(function (paramName, value) {
    if (stateParams.selectedLayer) {
      setValue(paramName, stateParams.selectedLayer.fields.find(function (f) {
        return f.name === value;
      }));
    }
  }, [setValue, stateParams.selectedLayer]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "regionMap.visParams.layerSettingsTitle",
    defaultMessage: "Layer settings"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_components.SelectOption, {
    id: "regionMapOptionsSelectLayer",
    label: _i18n.i18n.translate('regionMap.visParams.vectorMapLabel', {
      defaultMessage: 'Vector map'
    }),
    labelAppend: stateParams.emsHotLink && _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement(_eui.EuiLink, {
      href: stateParams.emsHotLink,
      target: "_blank",
      title: _i18n.i18n.translate('regionMap.visParams.previewOnEMSLinkTitle', {
        defaultMessage: 'Preview {selectedLayerName} on the Elastic Maps Service',
        values: {
          selectedLayerName: stateParams.selectedLayer && stateParams.selectedLayer.name
        }
      })
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "regionMap.visParams.previewOnEMSLinkText",
      defaultMessage: "Preview on EMS"
    }), ' ', _react.default.createElement(_eui.EuiIcon, {
      type: "popout",
      size: "s"
    }))),
    options: vectorLayerOptions,
    paramName: "selectedLayer",
    value: stateParams.selectedLayer && stateParams.selectedLayer.layerId,
    setValue: setLayer
  }), _react.default.createElement(_components.SelectOption, {
    id: "regionMapOptionsSelectJoinField",
    label: _i18n.i18n.translate('regionMap.visParams.joinFieldLabel', {
      defaultMessage: 'Join field'
    }),
    options: fieldOptions,
    paramName: "selectedJoinField",
    value: stateParams.selectedJoinField && stateParams.selectedJoinField.name,
    setValue: setField
  }), _react.default.createElement(_components.SwitchOption, {
    label: _i18n.i18n.translate('regionMap.visParams.displayWarningsLabel', {
      defaultMessage: 'Display warnings'
    }),
    tooltip: _i18n.i18n.translate('regionMap.visParams.switchWarningsTipText', {
      defaultMessage: 'Turns on/off warnings. When turned on, warning will be shown for each term that cannot be matched to a shape in the vector layer based on the join field. When turned off, these warnings will be turned off.'
    }),
    paramName: "isDisplayWarning",
    value: stateParams.isDisplayWarning,
    setValue: setValue
  }), _react.default.createElement(_components.SwitchOption, {
    label: _i18n.i18n.translate('regionMap.visParams.showAllShapesLabel', {
      defaultMessage: 'Show all shapes'
    }),
    tooltip: _i18n.i18n.translate('regionMap.visParams.turnOffShowingAllShapesTipText', {
      defaultMessage: 'Turning this off only shows the shapes that were matched with a corresponding term.'
    }),
    paramName: "showAllShapes",
    value: stateParams.showAllShapes,
    setValue: setValue
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "regionMap.visParams.styleSettingsLabel",
    defaultMessage: "Style settings"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_components.SelectOption, {
    label: _i18n.i18n.translate('regionMap.visParams.colorSchemaLabel', {
      defaultMessage: 'Color schema'
    }),
    options: vis.type.editorConfig.collections.colorSchemas,
    paramName: "colorSchema",
    value: stateParams.colorSchema,
    setValue: setValue
  }), _react.default.createElement(_components.NumberInputOption, {
    label: _i18n.i18n.translate('regionMap.visParams.outlineWeightLabel', {
      defaultMessage: 'Border thickness'
    }),
    min: 0,
    paramName: "outlineWeight",
    value: stateParams.outlineWeight,
    setValue: setValue
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_wms_options.WmsOptions, props));
}