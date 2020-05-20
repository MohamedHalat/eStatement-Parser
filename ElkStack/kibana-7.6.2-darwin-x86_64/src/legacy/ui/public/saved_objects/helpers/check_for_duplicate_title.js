"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForDuplicateTitle = checkForDuplicateTitle;

var _find_object_by_title = require("./find_object_by_title");

var _constants = require("../constants");

var _display_duplicate_title_confirm_modal = require("./display_duplicate_title_confirm_modal");

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
 * check for an existing SavedObject with the same title in ES
 * returns Promise<true> when it's no duplicate, or the modal displaying the warning
 * that's there's a duplicate is confirmed, else it returns a rejected Promise<ErrorMsg>
 * @param savedObject
 * @param isTitleDuplicateConfirmed
 * @param onTitleDuplicate
 * @param services
 */
function checkForDuplicateTitle(savedObject, isTitleDuplicateConfirmed, onTitleDuplicate, services) {
  var savedObjectsClient, overlays, duplicate;
  return regeneratorRuntime.async(function checkForDuplicateTitle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          savedObjectsClient = services.savedObjectsClient, overlays = services.overlays; // Don't check for duplicates if user has already confirmed save with duplicate title

          if (!isTitleDuplicateConfirmed) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", true);

        case 3:
          if (!(savedObject.title === savedObject.lastSavedTitle && !savedObject.copyOnSave)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", true);

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _find_object_by_title.findObjectByTitle)(savedObjectsClient, savedObject.getEsType(), savedObject.title));

        case 7:
          duplicate = _context.sent;

          if (!(!duplicate || duplicate.id === savedObject.id)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", true);

        case 10:
          if (!onTitleDuplicate) {
            _context.next = 13;
            break;
          }

          onTitleDuplicate();
          return _context.abrupt("return", Promise.reject(new Error(_constants.SAVE_DUPLICATE_REJECTED)));

        case 13:
          return _context.abrupt("return", (0, _display_duplicate_title_confirm_modal.displayDuplicateTitleConfirmModal)(savedObject, overlays));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
}