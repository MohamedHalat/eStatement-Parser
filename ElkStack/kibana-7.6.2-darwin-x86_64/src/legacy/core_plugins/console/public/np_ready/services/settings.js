"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSettings = createSettings;
exports.Settings = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Settings =
/*#__PURE__*/
function () {
  function Settings(storage) {
    _classCallCheck(this, Settings);

    this.storage = storage;
  }

  _createClass(Settings, [{
    key: "getFontSize",
    value: function getFontSize() {
      return this.storage.get('font_size', 14);
    }
  }, {
    key: "setFontSize",
    value: function setFontSize(size) {
      this.storage.set('font_size', size);
      return true;
    }
  }, {
    key: "getWrapMode",
    value: function getWrapMode() {
      return this.storage.get('wrap_mode', true);
    }
  }, {
    key: "setWrapMode",
    value: function setWrapMode(mode) {
      this.storage.set('wrap_mode', mode);
      return true;
    }
  }, {
    key: "setTripleQuotes",
    value: function setTripleQuotes(tripleQuotes) {
      this.storage.set('triple_quotes', tripleQuotes);
      return true;
    }
  }, {
    key: "getTripleQuotes",
    value: function getTripleQuotes() {
      return this.storage.get('triple_quotes', true);
    }
  }, {
    key: "getAutocomplete",
    value: function getAutocomplete() {
      return this.storage.get('autocomplete_settings', {
        fields: true,
        indices: true,
        templates: true
      });
    }
  }, {
    key: "setAutocomplete",
    value: function setAutocomplete(settings) {
      this.storage.set('autocomplete_settings', settings);
      return true;
    }
  }, {
    key: "getPolling",
    value: function getPolling() {
      return this.storage.get('console_polling', true);
    }
  }, {
    key: "setPolling",
    value: function setPolling(polling) {
      this.storage.set('console_polling', polling);
      return true;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        autocomplete: this.getAutocomplete(),
        wrapMode: this.getWrapMode(),
        tripleQuotes: this.getTripleQuotes(),
        fontSize: parseFloat(this.getFontSize()),
        polling: Boolean(this.getPolling())
      };
    }
  }, {
    key: "updateSettings",
    value: function updateSettings(_ref) {
      var fontSize = _ref.fontSize,
          wrapMode = _ref.wrapMode,
          tripleQuotes = _ref.tripleQuotes,
          autocomplete = _ref.autocomplete,
          polling = _ref.polling;
      this.setFontSize(fontSize);
      this.setWrapMode(wrapMode);
      this.setTripleQuotes(tripleQuotes);
      this.setAutocomplete(autocomplete);
      this.setPolling(polling);
    }
  }]);

  return Settings;
}();

exports.Settings = Settings;

function createSettings(_ref2) {
  var storage = _ref2.storage;
  return new Settings(storage);
}