"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternListManager = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var IndexPatternListManager =
/*#__PURE__*/
function () {
  function IndexPatternListManager() {
    _classCallCheck(this, IndexPatternListManager);

    _defineProperty(this, "configs", void 0);

    this.configs = [];
  }

  _createClass(IndexPatternListManager, [{
    key: "add",
    value: function add(Config) {
      var config = new Config();

      if (this.configs.findIndex(function (c) {
        return c.key === config.key;
      }) !== -1) {
        throw new Error("".concat(config.key, " exists in IndexPatternListManager."));
      }

      this.configs.push(config);
    }
  }, {
    key: "getIndexPatternTags",
    value: function getIndexPatternTags(indexPattern, isDefault) {
      return this.configs.reduce(function (tags, config) {
        return config.getIndexPatternTags ? tags.concat(config.getIndexPatternTags(indexPattern, isDefault)) : tags;
      }, []);
    }
  }, {
    key: "getFieldInfo",
    value: function getFieldInfo(indexPattern, field) {
      return this.configs.reduce(function (info, config) {
        return config.getFieldInfo ? info.concat(config.getFieldInfo(indexPattern, field)) : info;
      }, []);
    }
  }, {
    key: "areScriptedFieldsEnabled",
    value: function areScriptedFieldsEnabled(indexPattern) {
      return this.configs.every(function (config) {
        return config.areScriptedFieldsEnabled ? config.areScriptedFieldsEnabled(indexPattern) : true;
      });
    }
  }]);

  return IndexPatternListManager;
}();

exports.IndexPatternListManager = IndexPatternListManager;