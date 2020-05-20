"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoHashBucketAgg = void 0;

var _i18n = require("@kbn/i18n");

var _decode_geo_hash = require("ui/vis/map/decode_geo_hash");

var _chrome = _interopRequireDefault(require("../../chrome"));

var _bucket_agg_type = require("./_bucket_agg_type");

var _auto_precision = require("../../vis/editors/default/controls/auto_precision");

var _use_geocentroid = require("../../vis/editors/default/controls/use_geocentroid");

var _is_filtered_by_collar = require("../../vis/editors/default/controls/is_filtered_by_collar");

var _precision = require("../../vis/editors/default/controls/precision");

var _agg_groups = require("../../vis/editors/default/agg_groups");

var _public = require("../../../../../plugins/data/public");

var _geo_utils = require("./lib/geo_utils");

var _bucket_agg_types = require("./bucket_agg_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var config = _chrome.default.getUiSettingsClient();

var defaultPrecision = 2;
var maxPrecision = parseInt(config.get('visualization:tileMap:maxPrecision'), 10) || 12;
/**
 * Map Leaflet zoom levels to geohash precision levels.
 * The size of a geohash column-width on the map should be at least `minGeohashPixels` pixels wide.
 */

var zoomPrecision = {};
var minGeohashPixels = 16;

for (var zoom = 0; zoom <= 21; zoom += 1) {
  var worldPixels = 256 * Math.pow(2, zoom);
  zoomPrecision[zoom] = 1;

  for (var precision = 2; precision <= maxPrecision; precision += 1) {
    var columns = (0, _decode_geo_hash.geohashColumns)(precision);

    if (worldPixels / columns >= minGeohashPixels) {
      zoomPrecision[zoom] = precision;
    } else {
      break;
    }
  }
}

function getPrecision(val) {
  var precision = parseInt(val, 10);

  if (Number.isNaN(precision)) {
    precision = defaultPrecision;
  }

  if (precision > maxPrecision) {
    return maxPrecision;
  }

  return precision;
}

var isOutsideCollar = function isOutsideCollar(bounds, collar) {
  return bounds && collar && !(0, _geo_utils.geoContains)(collar, bounds);
};

var geohashGridTitle = _i18n.i18n.translate('common.ui.aggTypes.buckets.geohashGridTitle', {
  defaultMessage: 'Geohash'
});

var geoHashBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.GEOHASH_GRID,
  title: geohashGridTitle,
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: _public.KBN_FIELD_TYPES.GEO_POINT
  }, {
    name: 'autoPrecision',
    editorComponent: _auto_precision.AutoPrecisionParamEditor,
    default: true,
    write: function write() {}
  }, {
    name: 'precision',
    editorComponent: _precision.PrecisionParamEditor,
    default: defaultPrecision,
    deserialize: getPrecision,
    write: function write(aggConfig, output) {
      var currZoom = aggConfig.params.mapZoom;
      var autoPrecisionVal = zoomPrecision[currZoom];
      output.params.precision = aggConfig.params.autoPrecision ? autoPrecisionVal : getPrecision(aggConfig.params.precision);
    }
  }, {
    name: 'useGeocentroid',
    editorComponent: _use_geocentroid.UseGeocentroidParamEditor,
    default: true,
    write: function write() {}
  }, {
    name: 'isFilteredByCollar',
    editorComponent: _is_filtered_by_collar.IsFilteredByCollarParamEditor,
    default: true,
    write: function write() {}
  }, {
    name: 'mapZoom',
    default: 2,
    write: function write() {}
  }, {
    name: 'mapCenter',
    default: [0, 0],
    write: function write() {}
  }, {
    name: 'mapBounds',
    default: null,
    write: function write() {}
  }],
  getRequestAggs: function getRequestAggs(agg) {
    var aggs = [];
    var params = agg.params;

    if (params.isFilteredByCollar && agg.getField()) {
      var mapBounds = params.mapBounds,
          mapZoom = params.mapZoom;

      if (mapBounds) {
        var mapCollar;

        if (mapBounds && (!agg.lastMapCollar || agg.lastMapCollar.zoom !== mapZoom || isOutsideCollar(mapBounds, agg.lastMapCollar))) {
          mapCollar = (0, _geo_utils.scaleBounds)(mapBounds);
          mapCollar.zoom = mapZoom;
          agg.lastMapCollar = mapCollar;
        } else {
          mapCollar = agg.lastMapCollar;
        }

        var boundingBox = _defineProperty({
          ignore_unmapped: true
        }, agg.getField().name, {
          top_left: mapCollar.top_left,
          bottom_right: mapCollar.bottom_right
        });

        aggs.push(agg.aggConfigs.createAggConfig({
          type: 'filter',
          id: 'filter_agg',
          enabled: true,
          params: {
            geo_bounding_box: boundingBox
          },
          schema: {
            group: _agg_groups.AggGroupNames.Buckets
          }
        }, {
          addToAggConfigs: false
        }));
      }
    }

    aggs.push(agg);

    if (params.useGeocentroid) {
      aggs.push(agg.aggConfigs.createAggConfig({
        type: 'geo_centroid',
        enabled: true,
        params: {
          field: agg.getField()
        }
      }, {
        addToAggConfigs: false
      }));
    }

    return aggs;
  }
});
exports.geoHashBucketAgg = geoHashBucketAgg;