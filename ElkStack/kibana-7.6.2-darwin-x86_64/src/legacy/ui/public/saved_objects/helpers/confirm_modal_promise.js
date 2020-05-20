"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmModalPromise = confirmModalPromise;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _public = require("../../../../../plugins/kibana_react/public");

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
function confirmModalPromise() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var confirmBtnText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var overlays = arguments.length > 3 ? arguments[3] : undefined;
  return new Promise(function (resolve, reject) {
    var cancelButtonText = _i18n.i18n.translate('common.ui.savedObjects.confirmModal.cancelButtonLabel', {
      defaultMessage: 'Cancel'
    });

    var modal = overlays.openModal((0, _public.toMountPoint)(_react.default.createElement(_eui.EuiConfirmModal, {
      onCancel: function onCancel() {
        modal.close();
        reject();
      },
      onConfirm: function onConfirm() {
        modal.close();
        resolve(true);
      },
      confirmButtonText: confirmBtnText,
      cancelButtonText: cancelButtonText,
      title: title
    }, message)));
  });
}