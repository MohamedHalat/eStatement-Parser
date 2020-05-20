"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showCloneModal = showCloneModal;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _clone_modal = require("./clone_modal");

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
function showCloneModal(onClone, title) {
  var container = document.createElement('div');

  var closeModal = function closeModal() {
    _reactDom.default.unmountComponentAtNode(container);

    document.body.removeChild(container);
  };

  var onCloneConfirmed = function onCloneConfirmed(newTitle, isTitleDuplicateConfirmed, onTitleDuplicate) {
    return regeneratorRuntime.async(function onCloneConfirmed$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onClone(newTitle, isTitleDuplicateConfirmed, onTitleDuplicate).then(function (response) {
              // The only time you don't want to close the modal is if it's asking you
              // to confirm a duplicate title, in which case there will be no error and no id.
              if (response.error || response.id) {
                closeModal();
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  document.body.appendChild(container);

  var element = _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_clone_modal.DashboardCloneModal, {
    onClone: onCloneConfirmed,
    onClose: closeModal,
    title: _i18n.i18n.translate('kbn.dashboard.topNav.showCloneModal.dashboardCopyTitle', {
      defaultMessage: '{title} Copy',
      values: {
        title: title
      }
    })
  }));

  _reactDom.default.render(element, container);
}