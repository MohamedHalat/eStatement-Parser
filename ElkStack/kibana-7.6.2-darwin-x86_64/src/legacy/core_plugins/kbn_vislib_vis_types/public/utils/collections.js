"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAxisModes = exports.getChartModes = exports.getChartTypes = exports.getInterpolationModes = exports.getScaleTypes = exports.getRotateOptions = exports.getPositions = exports.getHeatmapCollections = exports.getGaugeCollections = exports.getConfigCollections = exports.Alignments = exports.ColorModes = exports.GaugeTypes = exports.ThresholdLineStyles = exports.Rotates = exports.AxisModes = exports.ScaleTypes = exports.AxisTypes = exports.InterpolationModes = exports.ChartModes = exports.ChartTypes = exports.Positions = void 0;

var _i18n = require("@kbn/i18n");

var _colormaps = require("ui/vislib/components/color/colormaps");

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
var Positions;
exports.Positions = Positions;

(function (Positions) {
  Positions["RIGHT"] = "right";
  Positions["LEFT"] = "left";
  Positions["TOP"] = "top";
  Positions["BOTTOM"] = "bottom";
})(Positions || (exports.Positions = Positions = {}));

var getPositions = function getPositions() {
  return [{
    text: _i18n.i18n.translate('kbnVislibVisTypes.legendPositions.topText', {
      defaultMessage: 'Top'
    }),
    value: Positions.TOP
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.legendPositions.leftText', {
      defaultMessage: 'Left'
    }),
    value: Positions.LEFT
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.legendPositions.rightText', {
      defaultMessage: 'Right'
    }),
    value: Positions.RIGHT
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.legendPositions.bottomText', {
      defaultMessage: 'Bottom'
    }),
    value: Positions.BOTTOM
  }];
};

exports.getPositions = getPositions;
var ChartTypes;
exports.ChartTypes = ChartTypes;

(function (ChartTypes) {
  ChartTypes["LINE"] = "line";
  ChartTypes["AREA"] = "area";
  ChartTypes["HISTOGRAM"] = "histogram";
})(ChartTypes || (exports.ChartTypes = ChartTypes = {}));

var getChartTypes = function getChartTypes() {
  return [{
    text: _i18n.i18n.translate('kbnVislibVisTypes.chartTypes.lineText', {
      defaultMessage: 'Line'
    }),
    value: ChartTypes.LINE
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.chartTypes.areaText', {
      defaultMessage: 'Area'
    }),
    value: ChartTypes.AREA
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.chartTypes.barText', {
      defaultMessage: 'Bar'
    }),
    value: ChartTypes.HISTOGRAM
  }];
};

exports.getChartTypes = getChartTypes;
var ChartModes;
exports.ChartModes = ChartModes;

(function (ChartModes) {
  ChartModes["NORMAL"] = "normal";
  ChartModes["STACKED"] = "stacked";
})(ChartModes || (exports.ChartModes = ChartModes = {}));

var getChartModes = function getChartModes() {
  return [{
    text: _i18n.i18n.translate('kbnVislibVisTypes.chartModes.normalText', {
      defaultMessage: 'Normal'
    }),
    value: ChartModes.NORMAL
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.chartModes.stackedText', {
      defaultMessage: 'Stacked'
    }),
    value: ChartModes.STACKED
  }];
};

exports.getChartModes = getChartModes;
var InterpolationModes;
exports.InterpolationModes = InterpolationModes;

(function (InterpolationModes) {
  InterpolationModes["LINEAR"] = "linear";
  InterpolationModes["CARDINAL"] = "cardinal";
  InterpolationModes["STEP_AFTER"] = "step-after";
})(InterpolationModes || (exports.InterpolationModes = InterpolationModes = {}));

var getInterpolationModes = function getInterpolationModes() {
  return [{
    text: _i18n.i18n.translate('kbnVislibVisTypes.interpolationModes.straightText', {
      defaultMessage: 'Straight'
    }),
    value: InterpolationModes.LINEAR
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.interpolationModes.smoothedText', {
      defaultMessage: 'Smoothed'
    }),
    value: InterpolationModes.CARDINAL
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.interpolationModes.steppedText', {
      defaultMessage: 'Stepped'
    }),
    value: InterpolationModes.STEP_AFTER
  }];
};

exports.getInterpolationModes = getInterpolationModes;
var AxisTypes;
exports.AxisTypes = AxisTypes;

(function (AxisTypes) {
  AxisTypes["CATEGORY"] = "category";
  AxisTypes["VALUE"] = "value";
})(AxisTypes || (exports.AxisTypes = AxisTypes = {}));

var ScaleTypes;
exports.ScaleTypes = ScaleTypes;

(function (ScaleTypes) {
  ScaleTypes["LINEAR"] = "linear";
  ScaleTypes["LOG"] = "log";
  ScaleTypes["SQUARE_ROOT"] = "square root";
})(ScaleTypes || (exports.ScaleTypes = ScaleTypes = {}));

var getScaleTypes = function getScaleTypes() {
  return [{
    text: _i18n.i18n.translate('kbnVislibVisTypes.scaleTypes.linearText', {
      defaultMessage: 'Linear'
    }),
    value: ScaleTypes.LINEAR
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.scaleTypes.logText', {
      defaultMessage: 'Log'
    }),
    value: ScaleTypes.LOG
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.scaleTypes.squareRootText', {
      defaultMessage: 'Square root'
    }),
    value: ScaleTypes.SQUARE_ROOT
  }];
};

exports.getScaleTypes = getScaleTypes;
var AxisModes;
exports.AxisModes = AxisModes;

(function (AxisModes) {
  AxisModes["NORMAL"] = "normal";
  AxisModes["PERCENTAGE"] = "percentage";
  AxisModes["WIGGLE"] = "wiggle";
  AxisModes["SILHOUETTE"] = "silhouette";
})(AxisModes || (exports.AxisModes = AxisModes = {}));

var getAxisModes = function getAxisModes() {
  return [{
    text: _i18n.i18n.translate('kbnVislibVisTypes.axisModes.normalText', {
      defaultMessage: 'Normal'
    }),
    value: AxisModes.NORMAL
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.axisModes.percentageText', {
      defaultMessage: 'Percentage'
    }),
    value: AxisModes.PERCENTAGE
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.axisModes.wiggleText', {
      defaultMessage: 'Wiggle'
    }),
    value: AxisModes.WIGGLE
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.axisModes.silhouetteText', {
      defaultMessage: 'Silhouette'
    }),
    value: AxisModes.SILHOUETTE
  }];
};

exports.getAxisModes = getAxisModes;
var Rotates;
exports.Rotates = Rotates;

(function (Rotates) {
  Rotates[Rotates["HORIZONTAL"] = 0] = "HORIZONTAL";
  Rotates[Rotates["VERTICAL"] = 90] = "VERTICAL";
  Rotates[Rotates["ANGLED"] = 75] = "ANGLED";
})(Rotates || (exports.Rotates = Rotates = {}));

var ThresholdLineStyles;
exports.ThresholdLineStyles = ThresholdLineStyles;

(function (ThresholdLineStyles) {
  ThresholdLineStyles["FULL"] = "full";
  ThresholdLineStyles["DASHED"] = "dashed";
  ThresholdLineStyles["DOT_DASHED"] = "dot-dashed";
})(ThresholdLineStyles || (exports.ThresholdLineStyles = ThresholdLineStyles = {}));

var getThresholdLineStyles = function getThresholdLineStyles() {
  return [{
    value: ThresholdLineStyles.FULL,
    text: _i18n.i18n.translate('kbnVislibVisTypes.thresholdLine.style.fullText', {
      defaultMessage: 'Full'
    })
  }, {
    value: ThresholdLineStyles.DASHED,
    text: _i18n.i18n.translate('kbnVislibVisTypes.thresholdLine.style.dashedText', {
      defaultMessage: 'Dashed'
    })
  }, {
    value: ThresholdLineStyles.DOT_DASHED,
    text: _i18n.i18n.translate('kbnVislibVisTypes.thresholdLine.style.dotdashedText', {
      defaultMessage: 'Dot-dashed'
    })
  }];
};

var getRotateOptions = function getRotateOptions() {
  return [{
    text: _i18n.i18n.translate('kbnVislibVisTypes.categoryAxis.rotate.horizontalText', {
      defaultMessage: 'Horizontal'
    }),
    value: Rotates.HORIZONTAL
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.categoryAxis.rotate.verticalText', {
      defaultMessage: 'Vertical'
    }),
    value: Rotates.VERTICAL
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.categoryAxis.rotate.angledText', {
      defaultMessage: 'Angled'
    }),
    value: Rotates.ANGLED
  }];
};

exports.getRotateOptions = getRotateOptions;
var GaugeTypes;
exports.GaugeTypes = GaugeTypes;

(function (GaugeTypes) {
  GaugeTypes["ARC"] = "Arc";
  GaugeTypes["CIRCLE"] = "Circle";
})(GaugeTypes || (exports.GaugeTypes = GaugeTypes = {}));

var ColorModes;
exports.ColorModes = ColorModes;

(function (ColorModes) {
  ColorModes["BACKGROUND"] = "Background";
  ColorModes["LABELS"] = "Labels";
  ColorModes["NONE"] = "None";
})(ColorModes || (exports.ColorModes = ColorModes = {}));

var getGaugeTypes = function getGaugeTypes() {
  return [{
    text: _i18n.i18n.translate('kbnVislibVisTypes.gauge.gaugeTypes.arcText', {
      defaultMessage: 'Arc'
    }),
    value: GaugeTypes.ARC
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.gauge.gaugeTypes.circleText', {
      defaultMessage: 'Circle'
    }),
    value: GaugeTypes.CIRCLE
  }];
};

var Alignments;
exports.Alignments = Alignments;

(function (Alignments) {
  Alignments["AUTOMATIC"] = "automatic";
  Alignments["HORIZONTAL"] = "horizontal";
  Alignments["VERTICAL"] = "vertical";
})(Alignments || (exports.Alignments = Alignments = {}));

var getAlignments = function getAlignments() {
  return [{
    text: _i18n.i18n.translate('kbnVislibVisTypes.gauge.alignmentAutomaticTitle', {
      defaultMessage: 'Automatic'
    }),
    value: Alignments.AUTOMATIC
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.gauge.alignmentHorizontalTitle', {
      defaultMessage: 'Horizontal'
    }),
    value: Alignments.HORIZONTAL
  }, {
    text: _i18n.i18n.translate('kbnVislibVisTypes.gauge.alignmentVerticalTitle', {
      defaultMessage: 'Vertical'
    }),
    value: Alignments.VERTICAL
  }];
};

var getConfigCollections = function getConfigCollections() {
  return {
    legendPositions: getPositions(),
    positions: getPositions(),
    chartTypes: getChartTypes(),
    axisModes: getAxisModes(),
    scaleTypes: getScaleTypes(),
    chartModes: getChartModes(),
    interpolationModes: getInterpolationModes(),
    thresholdLineStyles: getThresholdLineStyles()
  };
};

exports.getConfigCollections = getConfigCollections;

var getGaugeCollections = function getGaugeCollections() {
  return {
    gaugeTypes: getGaugeTypes(),
    alignments: getAlignments(),
    colorSchemas: _colormaps.colorSchemas
  };
};

exports.getGaugeCollections = getGaugeCollections;

var getHeatmapCollections = function getHeatmapCollections() {
  return {
    legendPositions: getPositions(),
    scales: getScaleTypes(),
    colorSchemas: _colormaps.colorSchemas
  };
};

exports.getHeatmapCollections = getHeatmapCollections;