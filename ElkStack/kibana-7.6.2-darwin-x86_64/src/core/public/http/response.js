"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpResponse = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var HttpResponse = function HttpResponse(_ref) {
  var request = _ref.request,
      response = _ref.response,
      body = _ref.body;

  _classCallCheck(this, HttpResponse);

  _defineProperty(this, "request", void 0);

  _defineProperty(this, "response", void 0);

  _defineProperty(this, "body", void 0);

  this.request = request;
  this.response = response;
  this.body = body;
};

exports.HttpResponse = HttpResponse;