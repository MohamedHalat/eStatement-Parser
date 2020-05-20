"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisLegendItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _models = require("./models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var VisLegendItemComponent = function VisLegendItemComponent(_ref) {
  var item = _ref.item,
      legendId = _ref.legendId,
      selected = _ref.selected,
      canFilter = _ref.canFilter,
      anchorPosition = _ref.anchorPosition,
      onFilter = _ref.onFilter,
      onSelect = _ref.onSelect,
      onHighlight = _ref.onHighlight,
      onUnhighlight = _ref.onUnhighlight,
      setColor = _ref.setColor,
      getColor = _ref.getColor;

  /**
   * Keydown listener for a legend entry.
   * This will close the details panel of this legend entry when pressing Escape.
   */
  var onLegendEntryKeydown = function onLegendEntryKeydown(event) {
    if (event.keyCode === _eui.keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      onSelect(null)();
    }
  };

  var filterOptions = [{
    id: 'filterIn',
    label: _i18n.i18n.translate('common.ui.vis.visTypes.legend.filterForValueButtonAriaLabel', {
      defaultMessage: 'Filter for value {legendDataLabel}',
      values: {
        legendDataLabel: item.label
      }
    }),
    iconType: 'plusInCircle',
    'data-test-subj': "legend-".concat(item.label, "-filterIn")
  }, {
    id: 'filterOut',
    label: _i18n.i18n.translate('common.ui.vis.visTypes.legend.filterOutValueButtonAriaLabel', {
      defaultMessage: 'Filter out value {legendDataLabel}',
      values: {
        legendDataLabel: item.label
      }
    }),
    iconType: 'minusInCircle',
    'data-test-subj': "legend-".concat(item.label, "-filterOut")
  }];

  var handleFilterChange = function handleFilterChange(id) {
    onFilter(item, id !== 'filterIn');
  };

  var renderFilterBar = function renderFilterBar() {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiButtonGroup, {
      type: "multi",
      isIconOnly: true,
      isFullWidth: true,
      legend: _i18n.i18n.translate('common.ui.vis.visTypes.legend.filterOptionsLegend', {
        defaultMessage: '{legendDataLabel}, filter options',
        values: {
          legendDataLabel: item.label
        }
      }),
      options: filterOptions,
      onChange: handleFilterChange,
      "data-test-subj": "legend-".concat(item.label, "-filters")
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  };

  var button = _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    color: "text",
    flush: "left",
    className: "visLegend__button",
    onKeyDown: onLegendEntryKeydown,
    onMouseEnter: onHighlight,
    onFocus: onHighlight,
    onClick: onSelect(item.label),
    onMouseLeave: onUnhighlight,
    onBlur: onUnhighlight,
    "data-label": item.label,
    title: item.label,
    "aria-label": _i18n.i18n.translate('common.ui.vis.visTypes.legend.toggleOptionsButtonAriaLabel', {
      defaultMessage: '{legendDataLabel}, toggle options',
      values: {
        legendDataLabel: item.label
      }
    }),
    "data-test-subj": "legend-".concat(item.label)
  }, _react.default.createElement(_eui.EuiIcon, {
    size: "l",
    type: "dot",
    color: getColor(item.label),
    "data-test-subj": "legendSelectedColor-".concat(getColor(item.label))
  }), _react.default.createElement("span", {
    className: "visLegend__valueTitle"
  }, item.label));

  var renderDetails = function renderDetails() {
    return _react.default.createElement(_eui.EuiPopover, {
      ownFocus: true,
      display: "block",
      button: button,
      isOpen: selected,
      anchorPosition: anchorPosition,
      closePopover: onSelect(null),
      panelPaddingSize: "s"
    }, _react.default.createElement("div", {
      className: "visLegend__valueDetails"
    }, canFilter && renderFilterBar(), _react.default.createElement("div", {
      className: "visLegend__valueColorPicker",
      role: "listbox"
    }, _react.default.createElement("span", {
      id: "".concat(legendId, "ColorPickerDesc"),
      className: "euiScreenReaderOnly"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "common.ui.vis.visTypes.legend.setColorScreenReaderDescription",
      defaultMessage: "Set color for value {legendDataLabel}",
      values: {
        legendDataLabel: item.label
      }
    })), _models.legendColors.map(function (color) {
      return _react.default.createElement(_eui.EuiIcon, {
        role: "option",
        tabIndex: 0,
        type: "dot",
        size: "l",
        color: getColor(item.label),
        key: color,
        "aria-label": color,
        "aria-describedby": "".concat(legendId, "ColorPickerDesc"),
        "aria-selected": color === getColor(item.label),
        onClick: setColor(item.label, color),
        onKeyPress: setColor(item.label, color),
        className: (0, _classnames.default)('visLegend__valueColorPickerDot', {
          'visLegend__valueColorPickerDot-isSelected': color === getColor(item.label)
        }),
        style: {
          color: color
        },
        "data-test-subj": "legendSelectColor-".concat(color)
      });
    }))));
  };

  return _react.default.createElement("li", {
    key: item.label,
    className: "visLegend__value"
  }, renderDetails());
};

var VisLegendItem = (0, _react.memo)(VisLegendItemComponent);
exports.VisLegendItem = VisLegendItem;