"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoomToPrecision = zoomToPrecision;

var _decode_geo_hash = require("./decode_geo_hash");

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
var defaultMaxPrecision = 12;
var minGeoHashPixels = 16;

var calculateZoomToPrecisionMap = function calculateZoomToPrecisionMap(maxZoom) {
  /**
   * Map Leaflet zoom levels to geohash precision levels.
   * The size of a geohash column-width on the map should be at least `minGeohashPixels` pixels wide.
   */
  var zoomPrecisionMap = new Map();

  for (var zoom = 0; zoom <= maxZoom; zoom += 1) {
    if (typeof zoomPrecisionMap.get(zoom) === 'number') {
      continue;
    }

    var worldPixels = 256 * Math.pow(2, zoom);
    zoomPrecisionMap.set(zoom, 1);

    for (var precision = 2; precision <= defaultMaxPrecision; precision += 1) {
      var columns = (0, _decode_geo_hash.geohashColumns)(precision);

      if (worldPixels / columns >= minGeoHashPixels) {
        zoomPrecisionMap.set(zoom, precision);
      } else {
        break;
      }
    }
  }

  return zoomPrecisionMap;
};

function zoomToPrecision(mapZoom, maxPrecision, maxZoom) {
  var zoomPrecisionMap = calculateZoomToPrecisionMap(typeof maxZoom === 'number' ? maxZoom : 21);
  var precision = zoomPrecisionMap.get(mapZoom);
  return precision ? Math.min(precision, maxPrecision) : maxPrecision;
}