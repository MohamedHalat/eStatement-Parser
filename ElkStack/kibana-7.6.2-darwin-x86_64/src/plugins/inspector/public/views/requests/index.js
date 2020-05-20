"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequestsViewDescription = void 0;

var _i18n = require("@kbn/i18n");

var _requests_view = require("./components/requests_view");

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
var getRequestsViewDescription = function getRequestsViewDescription() {
  return {
    title: _i18n.i18n.translate('inspector.requests.requestsTitle', {
      defaultMessage: 'Requests'
    }),
    order: 20,
    help: _i18n.i18n.translate('inspector.requests.requestsDescriptionTooltip', {
      defaultMessage: 'View the requests that collected the data'
    }),
    shouldShow: function shouldShow(adapters) {
      return Boolean(adapters.requests);
    },
    component: _requests_view.RequestsViewComponent
  };
};

exports.getRequestsViewDescription = getRequestsViewDescription;