"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  Plugin: true,
  PluginSetup: true,
  IRequestTypesMap: true,
  IResponseTypesMap: true,
  FIELD_FORMAT_IDS: true,
  IFieldFormat: true,
  IFieldFormatId: true,
  IFieldFormatType: true,
  IIndexPattern: true,
  IFieldType: true,
  IFieldSubType: true,
  ES_FIELD_TYPES: true,
  KBN_FIELD_TYPES: true,
  Query: true,
  RefreshInterval: true,
  TimeRange: true,
  parseInterval: true,
  isNestedField: true,
  esFilters: true,
  esKuery: true,
  esQuery: true,
  BoolFormat: true,
  BytesFormat: true,
  ColorFormat: true,
  DateNanosFormat: true,
  DEFAULT_CONVERTER_COLOR: true,
  DurationFormat: true,
  FieldFormat: true,
  IpFormat: true,
  NumberFormat: true,
  PercentFormat: true,
  RelativeDateFormat: true,
  SourceFormat: true,
  StaticLookupFormat: true,
  StringFormat: true,
  TruncateFormat: true,
  UrlFormat: true,
  isFilterable: true,
  castEsToKbnFieldTypeName: true,
  getKbnFieldType: true,
  getKbnTypeNames: true,
  IndexPatternsFetcher: true,
  FieldDescriptor: true,
  shouldReadFieldFromDocValues: true,
  indexPatterns: true,
  DateFormat: true
};
exports.plugin = plugin;
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function () {
    return _plugin.DataServerPlugin;
  }
});
Object.defineProperty(exports, "PluginSetup", {
  enumerable: true,
  get: function () {
    return _plugin.DataPluginSetup;
  }
});
Object.defineProperty(exports, "IRequestTypesMap", {
  enumerable: true,
  get: function () {
    return _search.IRequestTypesMap;
  }
});
Object.defineProperty(exports, "IResponseTypesMap", {
  enumerable: true,
  get: function () {
    return _search.IResponseTypesMap;
  }
});
Object.defineProperty(exports, "FIELD_FORMAT_IDS", {
  enumerable: true,
  get: function () {
    return _common.FIELD_FORMAT_IDS;
  }
});
Object.defineProperty(exports, "IFieldFormat", {
  enumerable: true,
  get: function () {
    return _common.IFieldFormat;
  }
});
Object.defineProperty(exports, "IFieldFormatId", {
  enumerable: true,
  get: function () {
    return _common.IFieldFormatId;
  }
});
Object.defineProperty(exports, "IFieldFormatType", {
  enumerable: true,
  get: function () {
    return _common.IFieldFormatType;
  }
});
Object.defineProperty(exports, "IIndexPattern", {
  enumerable: true,
  get: function () {
    return _common.IIndexPattern;
  }
});
Object.defineProperty(exports, "IFieldType", {
  enumerable: true,
  get: function () {
    return _common.IFieldType;
  }
});
Object.defineProperty(exports, "IFieldSubType", {
  enumerable: true,
  get: function () {
    return _common.IFieldSubType;
  }
});
Object.defineProperty(exports, "ES_FIELD_TYPES", {
  enumerable: true,
  get: function () {
    return _common.ES_FIELD_TYPES;
  }
});
Object.defineProperty(exports, "KBN_FIELD_TYPES", {
  enumerable: true,
  get: function () {
    return _common.KBN_FIELD_TYPES;
  }
});
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function () {
    return _common.Query;
  }
});
Object.defineProperty(exports, "RefreshInterval", {
  enumerable: true,
  get: function () {
    return _common.RefreshInterval;
  }
});
Object.defineProperty(exports, "TimeRange", {
  enumerable: true,
  get: function () {
    return _common.TimeRange;
  }
});
Object.defineProperty(exports, "parseInterval", {
  enumerable: true,
  get: function () {
    return _common.parseInterval;
  }
});
Object.defineProperty(exports, "isNestedField", {
  enumerable: true,
  get: function () {
    return _common.isNestedField;
  }
});
Object.defineProperty(exports, "esFilters", {
  enumerable: true,
  get: function () {
    return _common.esFilters;
  }
});
Object.defineProperty(exports, "esKuery", {
  enumerable: true,
  get: function () {
    return _common.esKuery;
  }
});
Object.defineProperty(exports, "esQuery", {
  enumerable: true,
  get: function () {
    return _common.esQuery;
  }
});
Object.defineProperty(exports, "BoolFormat", {
  enumerable: true,
  get: function () {
    return _common.BoolFormat;
  }
});
Object.defineProperty(exports, "BytesFormat", {
  enumerable: true,
  get: function () {
    return _common.BytesFormat;
  }
});
Object.defineProperty(exports, "ColorFormat", {
  enumerable: true,
  get: function () {
    return _common.ColorFormat;
  }
});
Object.defineProperty(exports, "DateNanosFormat", {
  enumerable: true,
  get: function () {
    return _common.DateNanosFormat;
  }
});
Object.defineProperty(exports, "DEFAULT_CONVERTER_COLOR", {
  enumerable: true,
  get: function () {
    return _common.DEFAULT_CONVERTER_COLOR;
  }
});
Object.defineProperty(exports, "DurationFormat", {
  enumerable: true,
  get: function () {
    return _common.DurationFormat;
  }
});
Object.defineProperty(exports, "FieldFormat", {
  enumerable: true,
  get: function () {
    return _common.FieldFormat;
  }
});
Object.defineProperty(exports, "IpFormat", {
  enumerable: true,
  get: function () {
    return _common.IpFormat;
  }
});
Object.defineProperty(exports, "NumberFormat", {
  enumerable: true,
  get: function () {
    return _common.NumberFormat;
  }
});
Object.defineProperty(exports, "PercentFormat", {
  enumerable: true,
  get: function () {
    return _common.PercentFormat;
  }
});
Object.defineProperty(exports, "RelativeDateFormat", {
  enumerable: true,
  get: function () {
    return _common.RelativeDateFormat;
  }
});
Object.defineProperty(exports, "SourceFormat", {
  enumerable: true,
  get: function () {
    return _common.SourceFormat;
  }
});
Object.defineProperty(exports, "StaticLookupFormat", {
  enumerable: true,
  get: function () {
    return _common.StaticLookupFormat;
  }
});
Object.defineProperty(exports, "StringFormat", {
  enumerable: true,
  get: function () {
    return _common.StringFormat;
  }
});
Object.defineProperty(exports, "TruncateFormat", {
  enumerable: true,
  get: function () {
    return _common.TruncateFormat;
  }
});
Object.defineProperty(exports, "UrlFormat", {
  enumerable: true,
  get: function () {
    return _common.UrlFormat;
  }
});
Object.defineProperty(exports, "isFilterable", {
  enumerable: true,
  get: function () {
    return _common.isFilterable;
  }
});
Object.defineProperty(exports, "castEsToKbnFieldTypeName", {
  enumerable: true,
  get: function () {
    return _common.castEsToKbnFieldTypeName;
  }
});
Object.defineProperty(exports, "getKbnFieldType", {
  enumerable: true,
  get: function () {
    return _common.getKbnFieldType;
  }
});
Object.defineProperty(exports, "getKbnTypeNames", {
  enumerable: true,
  get: function () {
    return _common.getKbnTypeNames;
  }
});
Object.defineProperty(exports, "IndexPatternsFetcher", {
  enumerable: true,
  get: function () {
    return _index_patterns.IndexPatternsFetcher;
  }
});
Object.defineProperty(exports, "FieldDescriptor", {
  enumerable: true,
  get: function () {
    return _index_patterns.FieldDescriptor;
  }
});
Object.defineProperty(exports, "shouldReadFieldFromDocValues", {
  enumerable: true,
  get: function () {
    return _index_patterns.shouldReadFieldFromDocValues;
  }
});
Object.defineProperty(exports, "indexPatterns", {
  enumerable: true,
  get: function () {
    return _index_patterns.indexPatterns;
  }
});
Object.defineProperty(exports, "DateFormat", {
  enumerable: true,
  get: function () {
    return _converters.DateFormat;
  }
});

var _plugin = require("./plugin");

var _search = require("./search");

Object.keys(_search).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _search[key];
    }
  });
});

var _common = require("../common");

var _index_patterns = require("./index_patterns");

var _converters = require("./field_formats/converters");

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
function plugin(initializerContext) {
  return new _plugin.DataServerPlugin(initializerContext);
}
/**
 * Types to be shared externally
 * @public
 */