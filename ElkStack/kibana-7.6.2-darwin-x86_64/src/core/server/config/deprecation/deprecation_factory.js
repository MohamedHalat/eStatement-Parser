"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDeprecationFactory = void 0;

var _lodash = require("lodash");

var _utils = require("../../../utils");

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
const _rename = (config, rootPath, log, oldKey, newKey) => {
  const fullOldPath = getPath(rootPath, oldKey);
  const oldValue = (0, _lodash.get)(config, fullOldPath);

  if (oldValue === undefined) {
    return config;
  }

  (0, _utils.unset)(config, fullOldPath);
  const fullNewPath = getPath(rootPath, newKey);
  const newValue = (0, _lodash.get)(config, fullNewPath);

  if (newValue === undefined) {
    (0, _lodash.set)(config, fullNewPath, oldValue);
    log(`"${fullOldPath}" is deprecated and has been replaced by "${fullNewPath}"`);
  } else {
    log(`"${fullOldPath}" is deprecated and has been replaced by "${fullNewPath}". However both key are present, ignoring "${fullOldPath}"`);
  }

  return config;
};

const _unused = (config, rootPath, log, unusedKey) => {
  const fullPath = getPath(rootPath, unusedKey);

  if ((0, _lodash.get)(config, fullPath) === undefined) {
    return config;
  }

  (0, _utils.unset)(config, fullPath);
  log(`${fullPath} is deprecated and is no longer used`);
  return config;
};

const rename = (oldKey, newKey) => (config, rootPath, log) => _rename(config, rootPath, log, oldKey, newKey);

const renameFromRoot = (oldKey, newKey) => (config, rootPath, log) => _rename(config, '', log, oldKey, newKey);

const unused = unusedKey => (config, rootPath, log) => _unused(config, rootPath, log, unusedKey);

const unusedFromRoot = unusedKey => (config, rootPath, log) => _unused(config, '', log, unusedKey);

const getPath = (rootPath, subPath) => rootPath !== '' ? `${rootPath}.${subPath}` : subPath;
/**
 * The actual platform implementation of {@link ConfigDeprecationFactory}
 *
 * @internal
 */


const configDeprecationFactory = {
  rename,
  renameFromRoot,
  unused,
  unusedFromRoot
};
exports.configDeprecationFactory = configDeprecationFactory;