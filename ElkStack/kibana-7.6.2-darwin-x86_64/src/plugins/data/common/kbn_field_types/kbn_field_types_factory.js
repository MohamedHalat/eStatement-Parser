"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKbnFieldTypes = void 0;

var _kbn_field_type = require("./kbn_field_type");

var _types = require("./types");

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
const createKbnFieldTypes = () => [new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.STRING,
  sortable: true,
  filterable: true,
  esTypes: [_types.ES_FIELD_TYPES.STRING, _types.ES_FIELD_TYPES.TEXT, _types.ES_FIELD_TYPES.KEYWORD, _types.ES_FIELD_TYPES._TYPE, _types.ES_FIELD_TYPES._ID]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.NUMBER,
  sortable: true,
  filterable: true,
  esTypes: [_types.ES_FIELD_TYPES.FLOAT, _types.ES_FIELD_TYPES.HALF_FLOAT, _types.ES_FIELD_TYPES.SCALED_FLOAT, _types.ES_FIELD_TYPES.DOUBLE, _types.ES_FIELD_TYPES.INTEGER, _types.ES_FIELD_TYPES.LONG, _types.ES_FIELD_TYPES.SHORT, _types.ES_FIELD_TYPES.BYTE, _types.ES_FIELD_TYPES.TOKEN_COUNT]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.DATE,
  sortable: true,
  filterable: true,
  esTypes: [_types.ES_FIELD_TYPES.DATE, _types.ES_FIELD_TYPES.DATE_NANOS]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.IP,
  sortable: true,
  filterable: true,
  esTypes: [_types.ES_FIELD_TYPES.IP]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.BOOLEAN,
  sortable: true,
  filterable: true,
  esTypes: [_types.ES_FIELD_TYPES.BOOLEAN]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.OBJECT,
  esTypes: [_types.ES_FIELD_TYPES.OBJECT]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.NESTED,
  esTypes: [_types.ES_FIELD_TYPES.NESTED]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.GEO_POINT,
  esTypes: [_types.ES_FIELD_TYPES.GEO_POINT]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.GEO_SHAPE,
  esTypes: [_types.ES_FIELD_TYPES.GEO_SHAPE]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.ATTACHMENT,
  esTypes: [_types.ES_FIELD_TYPES.ATTACHMENT]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.MURMUR3,
  esTypes: [_types.ES_FIELD_TYPES.MURMUR3]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES._SOURCE,
  esTypes: [_types.ES_FIELD_TYPES._SOURCE]
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.CONFLICT
}), new _kbn_field_type.KbnFieldType({
  name: _types.KBN_FIELD_TYPES.UNKNOWN
})];

exports.createKbnFieldTypes = createKbnFieldTypes;