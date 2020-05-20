"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureCatalogueRegistry = exports.FeatureCatalogueCategory = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

/** @public */
var FeatureCatalogueCategory;
/** @public */

exports.FeatureCatalogueCategory = FeatureCatalogueCategory;

(function (FeatureCatalogueCategory) {
  FeatureCatalogueCategory["ADMIN"] = "admin";
  FeatureCatalogueCategory["DATA"] = "data";
  FeatureCatalogueCategory["OTHER"] = "other";
})(FeatureCatalogueCategory || (exports.FeatureCatalogueCategory = FeatureCatalogueCategory = {}));

var FeatureCatalogueRegistry =
/*#__PURE__*/
function () {
  function FeatureCatalogueRegistry() {
    _classCallCheck(this, FeatureCatalogueRegistry);

    _defineProperty(this, "features", new Map());
  }

  _createClass(FeatureCatalogueRegistry, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      return {
        register: function register(feature) {
          if (_this.features.has(feature.id)) {
            throw new Error("Feature with id [".concat(feature.id, "] has already been registered. Use a unique id."));
          }

          _this.features.set(feature.id, feature);
        }
      };
    }
  }, {
    key: "start",
    value: function start(_ref) {
      var _this2 = this;

      var capabilities = _ref.capabilities;
      return {
        get: function get() {
          return _toConsumableArray(_this2.features.values()).filter(function (entry) {
            return capabilities.catalogue[entry.id] !== false;
          }).sort(compareByKey('title'));
        }
      };
    }
  }]);

  return FeatureCatalogueRegistry;
}();

exports.FeatureCatalogueRegistry = FeatureCatalogueRegistry;

var compareByKey = function compareByKey(key) {
  return function (left, right) {
    if (left[key] < right[key]) {
      return -1;
    } else if (left[key] > right[key]) {
      return 1;
    } else {
      return 0;
    }
  };
};