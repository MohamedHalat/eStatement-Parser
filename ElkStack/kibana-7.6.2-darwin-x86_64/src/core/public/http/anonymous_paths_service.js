"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnonymousPathsService = void 0;

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
var AnonymousPathsService =
/*#__PURE__*/
function () {
  function AnonymousPathsService() {
    _classCallCheck(this, AnonymousPathsService);

    _defineProperty(this, "paths", new Set());
  }

  _createClass(AnonymousPathsService, [{
    key: "setup",
    value: function setup(_ref) {
      var _this = this;

      var basePath = _ref.basePath;
      return {
        isAnonymous: function isAnonymous(path) {
          var pathWithoutBasePath = basePath.remove(path);
          return _this.paths.has(normalizePath(pathWithoutBasePath));
        },
        register: function register(path) {
          _this.paths.add(normalizePath(path));
        },
        normalizePath: normalizePath
      };
    }
  }, {
    key: "start",
    value: function start(deps) {
      return this.setup(deps);
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return AnonymousPathsService;
}();

exports.AnonymousPathsService = AnonymousPathsService;

var normalizePath = function normalizePath(path) {
  // always lower-case it
  var normalized = path.toLowerCase(); // remove the slash from the end

  if (normalized.endsWith('/')) {
    normalized = normalized.slice(0, normalized.length - 1);
  } // put a slash at the start


  if (!normalized.startsWith('/')) {
    normalized = "/".concat(normalized);
  } // it's normalized!!!


  return normalized;
};