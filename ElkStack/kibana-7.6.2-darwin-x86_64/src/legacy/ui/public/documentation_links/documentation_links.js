"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentationLinks = exports.ELASTIC_WEBSITE_URL = exports.DOC_LINK_VERSION = void 0;

var _new_platform = require("ui/new_platform");

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

/*
  WARNING: The links in this file are validated during the docs build. This is accomplished with some regex magic that
  looks for these particular constants. As a result, we should not add new constants or change the existing ones.
  If you absolutely must make a change, talk to Clinton Gormley first so he can update his Perl scripts.
 */
var DOC_LINK_VERSION = _new_platform.npStart.core.docLinks.DOC_LINK_VERSION;
exports.DOC_LINK_VERSION = DOC_LINK_VERSION;
var ELASTIC_WEBSITE_URL = _new_platform.npStart.core.docLinks.ELASTIC_WEBSITE_URL;
exports.ELASTIC_WEBSITE_URL = ELASTIC_WEBSITE_URL;
var documentationLinks = _new_platform.npStart.core.docLinks.links;
exports.documentationLinks = documentationLinks;