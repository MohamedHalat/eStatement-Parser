"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intervalOptions = void 0;

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
var intervalOptions = [{
  display: _i18n.i18n.translate('common.ui.aggTypes.buckets.intervalOptions.autoDisplayName', {
    defaultMessage: 'Auto'
  }),
  val: 'auto',
  enabled: function enabled(agg) {
    // not only do we need a time field, but the selected field needs
    // to be the time field. (see #3028)
    return agg.fieldIsTimeField();
  }
}, {
  display: _i18n.i18n.translate('common.ui.aggTypes.buckets.intervalOptions.millisecondDisplayName', {
    defaultMessage: 'Millisecond'
  }),
  val: 'ms'
}, {
  display: _i18n.i18n.translate('common.ui.aggTypes.buckets.intervalOptions.secondDisplayName', {
    defaultMessage: 'Second'
  }),
  val: 's'
}, {
  display: _i18n.i18n.translate('common.ui.aggTypes.buckets.intervalOptions.minuteDisplayName', {
    defaultMessage: 'Minute'
  }),
  val: 'm'
}, {
  display: _i18n.i18n.translate('common.ui.aggTypes.buckets.intervalOptions.hourlyDisplayName', {
    defaultMessage: 'Hourly'
  }),
  val: 'h'
}, {
  display: _i18n.i18n.translate('common.ui.aggTypes.buckets.intervalOptions.dailyDisplayName', {
    defaultMessage: 'Daily'
  }),
  val: 'd'
}, {
  display: _i18n.i18n.translate('common.ui.aggTypes.buckets.intervalOptions.weeklyDisplayName', {
    defaultMessage: 'Weekly'
  }),
  val: 'w'
}, {
  display: _i18n.i18n.translate('common.ui.aggTypes.buckets.intervalOptions.monthlyDisplayName', {
    defaultMessage: 'Monthly'
  }),
  val: 'M'
}, {
  display: _i18n.i18n.translate('common.ui.aggTypes.buckets.intervalOptions.yearlyDisplayName', {
    defaultMessage: 'Yearly'
  }),
  val: 'y'
}];
exports.intervalOptions = intervalOptions;