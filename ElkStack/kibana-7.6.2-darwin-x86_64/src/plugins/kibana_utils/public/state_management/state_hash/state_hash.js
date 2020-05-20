"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStateHash = createStateHash;
exports.isStateHash = isStateHash;
exports.retrieveState = retrieveState;
exports.persistState = persistState;

var _i18n = require("@kbn/i18n");

var _utils = require("../../../../../core/public/utils");

var _hashed_item_store = require("../../storage/hashed_item_store");

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
// This prefix is used to identify hash strings that have been encoded in the URL.
var HASH_PREFIX = 'h@';

function createStateHash(json, existingJsonProvider) // TODO: temp while state.js relies on this in tests
{
  if (typeof json !== 'string') {
    throw new Error('createHash only accepts strings (JSON).');
  }

  var hash = new _utils.Sha256().update(json, 'utf8').digest('hex');
  var shortenedHash; // Shorten the hash to at minimum 7 characters. We just need to make sure that it either:
  // a) hasn't been used yet
  // b) or has been used already, but with the JSON we're currently hashing.

  for (var i = 7; i < hash.length; i++) {
    shortenedHash = hash.slice(0, i);
    var existingJson = existingJsonProvider ? existingJsonProvider(shortenedHash) : _hashed_item_store.hashedItemStore.getItem(shortenedHash);
    if (existingJson === null || existingJson === json) break;
  }

  return "".concat(HASH_PREFIX).concat(shortenedHash);
}

function isStateHash(str) {
  return String(str).indexOf(HASH_PREFIX) === 0;
}

function retrieveState(stateHash) {
  var json = _hashed_item_store.hashedItemStore.getItem(stateHash);

  var throwUnableToRestoreUrlError = function throwUnableToRestoreUrlError() {
    throw new Error(_i18n.i18n.translate('kibana_utils.stateManagement.stateHash.unableToRestoreUrlErrorMessage', {
      defaultMessage: 'Unable to completely restore the URL, be sure to use the share functionality.'
    }));
  };

  if (json === null) {
    return throwUnableToRestoreUrlError();
  }

  try {
    return JSON.parse(json);
  } catch (e) {
    return throwUnableToRestoreUrlError();
  }
}

function persistState(state) {
  var json = JSON.stringify(state);
  var hash = createStateHash(json);

  var isItemSet = _hashed_item_store.hashedItemStore.setItem(hash, json);

  if (isItemSet) return hash; // If we ran out of space trying to persist the state, notify the user.

  var message = _i18n.i18n.translate('kibana_utils.stateManagement.stateHash.unableToStoreHistoryInSessionErrorMessage', {
    defaultMessage: 'Kibana is unable to store history items in your session ' + "because it is full and there don't seem to be items any items safe " + 'to delete.\n\n' + 'This can usually be fixed by moving to a fresh tab, but could ' + 'be caused by a larger issue. If you are seeing this message regularly, ' + 'please file an issue at {gitHubIssuesUrl}.',
    values: {
      gitHubIssuesUrl: 'https://github.com/elastic/kibana/issues'
    }
  });

  throw new Error(message);
}