"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntegrityHashes = getIntegrityHashes;
exports.getIntegrityHash = getIntegrityHash;

var _crypto = require("crypto");

var fs = _interopRequireWildcard(require("fs"));

var _lodash = require("lodash");

var stream = _interopRequireWildcard(require("stream"));

var util = _interopRequireWildcard(require("util"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
const pipeline = util.promisify(stream.pipeline);

async function getIntegrityHashes(filepaths) {
  const hashes = await Promise.all(filepaths.map(getIntegrityHash));
  return (0, _lodash.zipObject)(filepaths, hashes);
}

async function getIntegrityHash(filepath) {
  try {
    const output = (0, _crypto.createHash)('md5');
    await pipeline(fs.createReadStream(filepath), output);
    const data = output.read();

    if (data instanceof Buffer) {
      return data.toString('hex');
    }

    return data;
  } catch (err) {
    return null;
  }
}