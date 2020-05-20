"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapNodesVersionCompatibility = mapNodesVersionCompatibility;
exports.pollEsNodesVersion = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _es_kibana_version_compatability = require("./es_kibana_version_compatability");

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

/**
 * ES and Kibana versions are locked, so Kibana should require that ES has the same version as
 * that defined in Kibana's package.json.
 */
function getHumanizedNodeName(node) {
  var _node$http;

  const publishAddress = (node === null || node === void 0 ? void 0 : (_node$http = node.http) === null || _node$http === void 0 ? void 0 : _node$http.publish_address) + ' ' || '';
  return 'v' + node.version + ' @ ' + publishAddress + '(' + node.ip + ')';
}

function mapNodesVersionCompatibility(nodesInfo, kibanaVersion, ignoreVersionMismatch) {
  if (Object.keys(nodesInfo.nodes).length === 0) {
    return {
      isCompatible: false,
      message: 'Unable to retrieve version information from Elasticsearch nodes.',
      incompatibleNodes: [],
      warningNodes: [],
      kibanaVersion
    };
  }

  const nodes = Object.keys(nodesInfo.nodes).sort() // Sorting ensures a stable node ordering for comparison
  .map(key => nodesInfo.nodes[key]).map(node => Object.assign({}, node, {
    name: getHumanizedNodeName(node)
  })); // Aggregate incompatible ES nodes.

  const incompatibleNodes = nodes.filter(node => !(0, _es_kibana_version_compatability.esVersionCompatibleWithKibana)(node.version, kibanaVersion)); // Aggregate ES nodes which should prompt a Kibana upgrade. It's acceptable
  // if ES and Kibana versions are not the same as long as they are not
  // incompatible, but we should warn about it.
  // Ignore version qualifiers https://github.com/elastic/elasticsearch/issues/36859

  const warningNodes = nodes.filter(node => !(0, _es_kibana_version_compatability.esVersionEqualsKibana)(node.version, kibanaVersion)); // Note: If incompatible and warning nodes are present `message` only contains
  // an incompatibility notice.

  let message;

  if (incompatibleNodes.length > 0) {
    const incompatibleNodeNames = incompatibleNodes.map(node => node.name).join(', ');

    if (ignoreVersionMismatch) {
      message = `Ignoring version incompatibility between Kibana v${kibanaVersion} and the following Elasticsearch nodes: ${incompatibleNodeNames}`;
    } else {
      message = `This version of Kibana (v${kibanaVersion}) is incompatible with the following Elasticsearch nodes in your cluster: ${incompatibleNodeNames}`;
    }
  } else if (warningNodes.length > 0) {
    const warningNodeNames = warningNodes.map(node => node.name).join(', ');
    message = `You're running Kibana ${kibanaVersion} with some different versions of ` + 'Elasticsearch. Update Kibana or Elasticsearch to the same ' + `version to prevent compatibility issues: ${warningNodeNames}`;
  }

  return {
    isCompatible: ignoreVersionMismatch || incompatibleNodes.length === 0,
    message,
    incompatibleNodes,
    warningNodes,
    kibanaVersion
  };
} // Returns true if two NodesVersionCompatibility entries match


function compareNodes(prev, curr) {
  const nodesEqual = (n, m) => n.ip === m.ip && n.version === m.version;

  return curr.isCompatible === prev.isCompatible && curr.incompatibleNodes.length === prev.incompatibleNodes.length && curr.warningNodes.length === prev.warningNodes.length && curr.incompatibleNodes.every((node, i) => nodesEqual(node, prev.incompatibleNodes[i])) && curr.warningNodes.every((node, i) => nodesEqual(node, prev.warningNodes[i]));
}

const pollEsNodesVersion = ({
  callWithInternalUser,
  log,
  kibanaVersion,
  ignoreVersionMismatch,
  esVersionCheckInterval: healthCheckInterval
}) => {
  log.debug('Checking Elasticsearch version');
  return (0, _rxjs.timer)(0, healthCheckInterval).pipe((0, _operators.exhaustMap)(() => {
    return (0, _rxjs.from)(callWithInternalUser('nodes.info', {
      filterPath: ['nodes.*.version', 'nodes.*.http.publish_address', 'nodes.*.ip']
    })).pipe((0, _operators.catchError)(_err => {
      return (0, _rxjs.of)({
        nodes: {}
      });
    }));
  }), (0, _operators.map)(nodesInfo => mapNodesVersionCompatibility(nodesInfo, kibanaVersion, ignoreVersionMismatch)), (0, _operators.distinctUntilChanged)(compareNodes) // Only emit if there are new nodes or versions
  );
};

exports.pollEsNodesVersion = pollEsNodesVersion;