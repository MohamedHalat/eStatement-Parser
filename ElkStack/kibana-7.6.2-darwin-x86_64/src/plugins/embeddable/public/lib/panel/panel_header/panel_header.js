"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeader = PanelHeader;

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _panel_options_menu = require("./panel_options_menu");

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
function renderBadges(badges, embeddable) {
  return badges.map(function (badge) {
    return _react.default.createElement(_eui.EuiBadge, {
      key: badge.id,
      className: "embPanel__headerBadge",
      iconType: badge.getIconType({
        embeddable: embeddable
      }),
      onClick: function onClick() {
        return badge.execute({
          embeddable: embeddable
        });
      },
      onClickAriaLabel: badge.getDisplayName({
        embeddable: embeddable
      })
    }, badge.getDisplayName({
      embeddable: embeddable
    }));
  });
}

function renderTooltip(description) {
  return description !== '' && _react.default.createElement(_eui.EuiToolTip, {
    content: description,
    delay: "regular",
    position: "right"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "iInCircle"
  }));
}

var VISUALIZE_EMBEDDABLE_TYPE = 'visualization';

function getViewDescription(embeddable) {
  if (embeddable.type === VISUALIZE_EMBEDDABLE_TYPE) {
    var description = embeddable.getVisualizationDescription();

    if (description) {
      return description;
    }
  }

  return '';
}

function PanelHeader(_ref) {
  var title = _ref.title,
      isViewMode = _ref.isViewMode,
      hidePanelTitles = _ref.hidePanelTitles,
      getActionContextMenuPanel = _ref.getActionContextMenuPanel,
      closeContextMenu = _ref.closeContextMenu,
      badges = _ref.badges,
      embeddable = _ref.embeddable,
      headerId = _ref.headerId;
  var viewDescription = getViewDescription(embeddable);
  var showTitle = !isViewMode || title && !hidePanelTitles || viewDescription !== '';
  var showPanelBar = badges.length > 0 || showTitle;
  var classes = (0, _classnames.default)('embPanel__header', {
    'embPanel__header--floater': !showPanelBar
  });

  if (!showPanelBar) {
    return _react.default.createElement("div", {
      className: classes
    }, _react.default.createElement(_panel_options_menu.PanelOptionsMenu, {
      getActionContextMenuPanel: getActionContextMenuPanel,
      isViewMode: isViewMode,
      closeContextMenu: closeContextMenu,
      title: title
    }));
  }

  return _react.default.createElement("figcaption", {
    className: classes,
    "data-test-subj": "embeddablePanelHeading-".concat((title || '').replace(/\s/g, ''))
  }, _react.default.createElement("h2", {
    id: headerId,
    "data-test-subj": "dashboardPanelTitle",
    className: "embPanel__title embPanel__dragger"
  }, showTitle ? _react.default.createElement("span", {
    className: "embPanel__titleInner"
  }, _react.default.createElement("span", {
    className: "embPanel__titleText",
    "aria-hidden": "true"
  }, title), _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("span", null, _i18n.i18n.translate('embeddableApi.panel.enhancedDashboardPanelAriaLabel', {
    defaultMessage: 'Dashboard panel: {title}',
    values: {
      title: title
    }
  }))), renderTooltip(viewDescription)) : _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("span", null, _i18n.i18n.translate('embeddableApi.panel.dashboardPanelAriaLabel', {
    defaultMessage: 'Dashboard panel'
  }))), renderBadges(badges, embeddable)), _react.default.createElement(_panel_options_menu.PanelOptionsMenu, {
    isViewMode: isViewMode,
    getActionContextMenuPanel: getActionContextMenuPanel,
    closeContextMenu: closeContextMenu,
    title: title
  }));
}