"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSaveModal = showSaveModal;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _i18n = require("ui/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function isSuccess(result) {
  return 'id' in result;
}

function showSaveModal(saveModal) {
  var container = document.createElement('div');

  var closeModal = function closeModal() {
    _reactDom.default.unmountComponentAtNode(container);

    document.body.removeChild(container);
  };

  var onSave = saveModal.props.onSave;

  var onSaveConfirmed = function onSaveConfirmed() {
    var response,
        _args = arguments;
    return regeneratorRuntime.async(function onSaveConfirmed$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(onSave.apply(void 0, _args));

          case 2:
            response = _context.sent;

            // close modal if we either hit an error or the saved object got an id
            if (Boolean(isSuccess(response) ? response.id : response.error)) {
              closeModal();
            }

            return _context.abrupt("return", response);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  document.body.appendChild(container);

  var element = _react.default.cloneElement(saveModal, {
    onSave: onSaveConfirmed,
    onClose: closeModal
  });

  _reactDom.default.render(_react.default.createElement(_i18n.I18nContext, null, element), container);
}