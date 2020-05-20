"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VegaHelpMenu = VegaHelpMenu;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function VegaHelpMenu() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var onButtonClick = (0, _react.useCallback)(function () {
    return setIsPopoverOpen(!isPopoverOpen);
  }, [isPopoverOpen]);
  var closePopover = (0, _react.useCallback)(function () {
    return setIsPopoverOpen(false);
  }, []);

  var button = _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "questionInCircle",
    onClick: onButtonClick,
    "aria-label": _i18n.i18n.translate('visTypeVega.editor.vegaHelpButtonAriaLabel', {
      defaultMessage: 'Vega help'
    })
  });

  var items = [_react.default.createElement(_eui.EuiContextMenuItem, {
    key: "vegaHelp",
    href: "https://www.elastic.co/guide/en/kibana/master/vega-graph.html",
    target: "_blank",
    onClick: closePopover
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeVega.editor.vegaHelpLinkText",
    defaultMessage: "Kibana Vega help"
  })), _react.default.createElement(_eui.EuiContextMenuItem, {
    key: "vegaLiteDocs",
    href: "https://vega.github.io/vega-lite/docs/",
    target: "_blank",
    onClick: closePopover
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeVega.editor.vegaLiteDocumentationLinkText",
    defaultMessage: "Vega-Lite documentation"
  })), _react.default.createElement(_eui.EuiContextMenuItem, {
    key: "vegaDoc",
    href: "https://vega.github.io/vega/docs/",
    target: "_blank",
    onClick: closePopover
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeVega.editor.vegaDocumentationLinkText",
    defaultMessage: "Vega documentation"
  }))];
  return _react.default.createElement(_eui.EuiPopover, {
    id: "helpMenu",
    button: button,
    isOpen: isPopoverOpen,
    closePopover: closePopover,
    panelPaddingSize: "none",
    anchorPosition: "downLeft"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: items
  }));
}