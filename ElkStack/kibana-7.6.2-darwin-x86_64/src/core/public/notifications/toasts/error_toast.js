"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorToast = ErrorToast;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

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

/**
 * This should instead be replaced by the overlay service once it's available.
 * This does not use React portals so that if the parent toast times out, this modal
 * does not disappear. NOTE: this should use a global modal in the overlay service
 * in the future.
 */
function showErrorDialog(_ref) {
  var title = _ref.title,
      error = _ref.error,
      openModal = _ref.openModal,
      i18nContext = _ref.i18nContext;
  var I18nContext = i18nContext();
  var modal = openModal(mount(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(I18nContext, null, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, title)), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiCallOut, {
    size: "s",
    color: "danger",
    iconType: "alert",
    title: error.message
  }), error.stack && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiCodeBlock, {
    isCopyable: true,
    paddingSize: "s"
  }, error.stack))), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      return modal.close();
    },
    fill: true
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "core.notifications.errorToast.closeModal",
    defaultMessage: "Close"
  })))))));
}

function ErrorToast(_ref2) {
  var title = _ref2.title,
      error = _ref2.error,
      toastMessage = _ref2.toastMessage,
      openModal = _ref2.openModal,
      i18nContext = _ref2.i18nContext;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", {
    "data-test-subj": "errorToastMessage"
  }, toastMessage), _react.default.createElement("div", {
    className: "eui-textRight"
  }, _react.default.createElement(_eui.EuiButton, {
    size: "s",
    color: "danger",
    onClick: function onClick() {
      return showErrorDialog({
        title: title,
        error: error,
        openModal: openModal,
        i18nContext: i18nContext
      });
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "core.toasts.errorToast.seeFullError",
    defaultMessage: "See the full error"
  }))));
}

var mount = function mount(component) {
  return function (container) {
    _reactDom.default.render(component, container);

    return function () {
      return _reactDom.default.unmountComponentAtNode(container);
    };
  };
};