"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsfeedFlyout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _header_alert = require("../../../../legacy/core_plugins/newsfeed/public/np_ready/components/header_alert/header_alert");

var _newsfeed_header_nav_button = require("./newsfeed_header_nav_button");

var _empty_news = require("./empty_news");

var _loading_news = require("./loading_news");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var NewsfeedFlyout = function NewsfeedFlyout() {
  var _useContext = (0, _react.useContext)(_newsfeed_header_nav_button.NewsfeedContext),
      newsFetchResult = _useContext.newsFetchResult,
      setFlyoutVisible = _useContext.setFlyoutVisible;

  var closeFlyout = (0, _react.useCallback)(function () {
    return setFlyoutVisible(false);
  }, [setFlyoutVisible]);
  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: closeFlyout,
    size: "s",
    "aria-labelledby": "flyoutSmallTitle",
    className: "kbnNews__flyout",
    "data-test-subj": "NewsfeedFlyout"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", {
    id: "flyoutSmallTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "newsfeed.flyoutList.whatsNewTitle",
    defaultMessage: "What's new"
  })))), _react.default.createElement(_eui.EuiFlyoutBody, {
    className: 'kbnNews__flyoutAlerts'
  }, !newsFetchResult ? _react.default.createElement(_loading_news.NewsLoadingPrompt, null) : newsFetchResult.feedItems.length > 0 ? newsFetchResult.feedItems.map(function (item) {
    return _react.default.createElement(_header_alert.EuiHeaderAlert, {
      key: item.hash,
      title: item.title,
      text: item.description,
      "data-test-subj": "newsHeadAlert",
      action: _react.default.createElement(_eui.EuiLink, {
        target: "_blank",
        href: item.linkUrl
      }, item.linkText, _react.default.createElement(_eui.EuiIcon, {
        type: "popout",
        size: "s"
      })),
      date: item.publishOn.format('DD MMMM YYYY'),
      badge: _react.default.createElement(_eui.EuiBadge, {
        color: "hollow"
      }, item.badge)
    });
  }) : _react.default.createElement(_empty_news.NewsEmptyPrompt, null)), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    onClick: closeFlyout,
    flush: "left"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "newsfeed.flyoutList.closeButtonLabel",
    defaultMessage: "Close"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, newsFetchResult ? _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "s"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "newsfeed.flyoutList.versionTextLabel",
    defaultMessage: "{version}",
    values: {
      version: "Version\xA0".concat(newsFetchResult.kibanaVersion)
    }
  }))) : null))));
};

exports.NewsfeedFlyout = NewsfeedFlyout;