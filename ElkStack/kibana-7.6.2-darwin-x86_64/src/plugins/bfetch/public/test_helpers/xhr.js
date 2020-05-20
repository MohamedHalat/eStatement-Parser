"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockXMLHttpRequest = void 0;

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

/* eslint-disable max-classes-per-file */
var mockXMLHttpRequest = function mockXMLHttpRequest() {
  var MockXMLHttpRequest = function MockXMLHttpRequest() {
    _classCallCheck(this, MockXMLHttpRequest);

    _defineProperty(this, "DONE", 0);

    _defineProperty(this, "HEADERS_RECEIVED", 0);

    _defineProperty(this, "LOADING", 0);

    _defineProperty(this, "OPENED", 0);

    _defineProperty(this, "UNSENT", 0);

    _defineProperty(this, "abort", jest.fn());

    _defineProperty(this, "addEventListener", jest.fn());

    _defineProperty(this, "dispatchEvent", jest.fn());

    _defineProperty(this, "getAllResponseHeaders", jest.fn());

    _defineProperty(this, "getResponseHeader", jest.fn());

    _defineProperty(this, "onabort", jest.fn());

    _defineProperty(this, "onerror", jest.fn());

    _defineProperty(this, "onload", jest.fn());

    _defineProperty(this, "onloadend", jest.fn());

    _defineProperty(this, "onloadstart", jest.fn());

    _defineProperty(this, "onprogress", jest.fn());

    _defineProperty(this, "onreadystatechange", jest.fn());

    _defineProperty(this, "ontimeout", jest.fn());

    _defineProperty(this, "open", jest.fn());

    _defineProperty(this, "overrideMimeType", jest.fn());

    _defineProperty(this, "readyState", 0);

    _defineProperty(this, "removeEventListener", jest.fn());

    _defineProperty(this, "response", null);

    _defineProperty(this, "responseText", '');

    _defineProperty(this, "responseType", null);

    _defineProperty(this, "responseURL", '');

    _defineProperty(this, "responseXML", null);

    _defineProperty(this, "send", jest.fn());

    _defineProperty(this, "setRequestHeader", jest.fn());

    _defineProperty(this, "status", 0);

    _defineProperty(this, "statusText", '');

    _defineProperty(this, "timeout", 0);

    _defineProperty(this, "upload", null);

    _defineProperty(this, "withCredentials", false);
  };

  var xhr = new MockXMLHttpRequest();
  return {
    xhr: xhr,
    XMLHttpRequest: function XMLHttpRequest() {
      _classCallCheck(this, XMLHttpRequest);

      return xhr;
    }
  };
};

exports.mockXMLHttpRequest = mockXMLHttpRequest;