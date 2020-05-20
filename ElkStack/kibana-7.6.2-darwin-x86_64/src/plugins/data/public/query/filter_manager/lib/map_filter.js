"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapFilter = mapFilter;

var _lodash = require("lodash");

var _map_spatial_filter = require("./mappers/map_spatial_filter");

var _map_match_all = require("./mappers/map_match_all");

var _map_phrase = require("./mappers/map_phrase");

var _map_phrases = require("./mappers/map_phrases");

var _map_range = require("./mappers/map_range");

var _map_exists = require("./mappers/map_exists");

var _map_missing = require("./mappers/map_missing");

var _map_query_string = require("./mappers/map_query_string");

var _map_geo_bounding_box = require("./mappers/map_geo_bounding_box");

var _map_geo_polygon = require("./mappers/map_geo_polygon");

var _map_default = require("./mappers/map_default");

var _generate_mapping_chain = require("./generate_mapping_chain");

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
function mapFilter(filter) {
  /** Mappers **/
  // Each mapper is a simple promise function that test if the mapper can
  // handle the mapping or not. If it handles it then it will resolve with
  // and object that has the key and value for the filter. Otherwise it will
  // reject it with the original filter. We had to go down the promise interface
  // because mapTerms and mapRange need access to the indexPatterns to format
  // the values and that's only available through the field formatters.
  // The mappers to apply. Each mapper will either return
  // a result object with a key and value attribute or
  // undefined. If undefined is return then the next
  // mapper will get the opportunity to map the filter.
  // To create a new mapper you just need to create a function
  // that either handles the mapping operation or not
  // and add it here. ProTip: These are executed in order listed
  var mappers = [_map_spatial_filter.mapSpatialFilter, _map_match_all.mapMatchAll, _map_range.mapRange, _map_phrase.mapPhrase, _map_phrases.mapPhrases, _map_exists.mapExists, _map_missing.mapMissing, _map_query_string.mapQueryString, _map_geo_bounding_box.mapGeoBoundingBox, _map_geo_polygon.mapGeoPolygon, _map_default.mapDefault];

  var noop = function noop() {
    throw new Error('No mappings have been found for filter.');
  }; // Create a chain of responsibility by reducing all the
  // mappers down into one function.


  var mapFn = (0, _lodash.reduceRight)(mappers, function (memo, map) {
    return (0, _generate_mapping_chain.generateMappingChain)(map, memo);
  }, noop);
  var mapped = mapFn(filter); // Map the filter into an object with the key and value exposed so it's
  // easier to work with in the template

  filter.meta = filter.meta || {};
  filter.meta.type = mapped.type;
  filter.meta.key = mapped.key; // Display value or formatter function.

  filter.meta.value = mapped.value;
  filter.meta.params = mapped.params;
  filter.meta.disabled = Boolean(filter.meta.disabled);
  filter.meta.negate = Boolean(filter.meta.negate);
  filter.meta.alias = filter.meta.alias || null;
  return filter;
}