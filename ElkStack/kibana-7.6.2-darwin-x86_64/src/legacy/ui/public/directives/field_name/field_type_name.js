"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldTypeName = getFieldTypeName;

var _i18n = require("@kbn/i18n");

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
function getFieldTypeName(type) {
  switch (type) {
    case 'boolean':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.booleanAriaLabel', {
        defaultMessage: 'Boolean field'
      });

    case 'conflict':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.conflictFieldAriaLabel', {
        defaultMessage: 'Conflicting field'
      });

    case 'date':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.dateFieldAriaLabel', {
        defaultMessage: 'Date field'
      });

    case 'geo_point':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.geoPointFieldAriaLabel', {
        defaultMessage: 'Geo point field'
      });

    case 'geo_shape':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.geoShapeFieldAriaLabel', {
        defaultMessage: 'Geo shape field'
      });

    case 'ip':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.ipAddressFieldAriaLabel', {
        defaultMessage: 'IP address field'
      });

    case 'murmur3':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.murmur3FieldAriaLabel', {
        defaultMessage: 'Murmur3 field'
      });

    case 'number':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.numberFieldAriaLabel', {
        defaultMessage: 'Number field'
      });

    case 'source':
      // Note that this type is currently not provided, type for _source is undefined
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.sourceFieldAriaLabel', {
        defaultMessage: 'Source field'
      });

    case 'string':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.stringFieldAriaLabel', {
        defaultMessage: 'String field'
      });

    case 'nested':
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.nestedFieldAriaLabel', {
        defaultMessage: 'Nested field'
      });

    default:
      return _i18n.i18n.translate('common.ui.directives.fieldNameIcons.unknownFieldAriaLabel', {
        defaultMessage: 'Unknown field'
      });
  }
}