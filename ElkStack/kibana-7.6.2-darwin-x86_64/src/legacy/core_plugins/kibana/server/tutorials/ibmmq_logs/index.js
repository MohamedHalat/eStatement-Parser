"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ibmmqLogsSpecProvider = ibmmqLogsSpecProvider;

var _i18n = require("@kbn/i18n");

var _tutorial_category = require("../../../common/tutorials/tutorial_category");

var _filebeat_instructions = require("../../../common/tutorials/filebeat_instructions");

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
function ibmmqLogsSpecProvider(server, context) {
  const moduleName = 'ibmmq';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'ibmmqLogs',
    name: _i18n.i18n.translate('kbn.server.tutorials.ibmmqLogs.nameTitle', {
      defaultMessage: 'IBM MQ logs'
    }),
    category: _tutorial_category.TUTORIAL_CATEGORY.LOGGING,
    shortDescription: _i18n.i18n.translate('kbn.server.tutorials.ibmmqLogs.shortDescription', {
      defaultMessage: 'Collect IBM MQ logs with Filebeat.'
    }),
    longDescription: _i18n.i18n.translate('kbn.server.tutorials.ibmmqLogs.longDescription', {
      defaultMessage: 'Collect IBM MQ logs with Filebeat. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-ibmmq.html'
      }
    }),
    euiIconType: '/plugins/kibana/home/tutorial_resources/logos/ibmmq.svg',
    artifacts: {
      dashboards: [{
        id: 'ba1d8830-7c7b-11e9-9645-e37efaf5baff',
        linkLabel: _i18n.i18n.translate('kbn.server.tutorials.ibmmqLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'IBM MQ Events'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-ibmmq.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/ibmmq_logs/screenshot.png',
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context),
    elasticCloud: (0, _filebeat_instructions.cloudInstructions)(moduleName, platforms),
    onPremElasticCloud: (0, _filebeat_instructions.onPremCloudInstructions)(moduleName, platforms)
  };
}