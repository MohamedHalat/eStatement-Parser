"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WmsInternalOptions = WmsInternalOptions;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _components = require("../../../kbn_vislib_vis_types/public/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function WmsInternalOptions(_ref) {
  var wms = _ref.wms,
      setValue = _ref.setValue;

  var wmsLink = _react.default.createElement(_eui.EuiLink, {
    href: "http://www.opengeospatial.org/standards/wms",
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "tileMap.wmsOptions.wmsLinkText",
    defaultMessage: "OGC standard"
  }));

  var footnoteText = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", {
    "aria-hidden": "true"
  }, "*"), _react.default.createElement(_react2.FormattedMessage, {
    id: "tileMap.wmsOptions.mapLoadFailDescription",
    defaultMessage: "If this parameter is incorrect, maps will fail to load."
  }));

  var footnote = _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("p", null, footnoteText));

  var setOptions = function setOptions(paramName, value) {
    return setValue('options', _objectSpread({}, wms.options, _defineProperty({}, paramName, value)));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "tileMap.wmsOptions.wmsDescription",
    defaultMessage: "WMS is an {wmsLink} for map image services.",
    values: {
      wmsLink: wmsLink
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_components.TextInputOption, {
    label: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.wmsUrlLabel",
      defaultMessage: "WMS url"
    }), _react.default.createElement("span", {
      "aria-hidden": "true"
    }, "*")),
    helpText: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.urlOfWMSWebServiceTip",
      defaultMessage: "The URL of the WMS web service."
    }), footnote),
    paramName: "url",
    value: wms.url,
    setValue: setValue
  }), _react.default.createElement(_components.TextInputOption, {
    label: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.wmsLayersLabel",
      defaultMessage: "WMS layers"
    }), _react.default.createElement("span", {
      "aria-hidden": "true"
    }, "*")),
    helpText: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.listOfLayersToUseTip",
      defaultMessage: "A comma separated list of layers to use."
    }), footnote),
    paramName: "layers",
    value: wms.options.layers,
    setValue: setOptions
  }), _react.default.createElement(_components.TextInputOption, {
    label: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.wmsVersionLabel",
      defaultMessage: "WMS version"
    }), _react.default.createElement("span", {
      "aria-hidden": "true"
    }, "*")),
    helpText: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.versionOfWMSserverSupportsTip",
      defaultMessage: "The version of WMS the server supports."
    }), footnote),
    paramName: "version",
    value: wms.options.version,
    setValue: setOptions
  }), _react.default.createElement(_components.TextInputOption, {
    label: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.wmsFormatLabel",
      defaultMessage: "WMS format"
    }), _react.default.createElement("span", {
      "aria-hidden": "true"
    }, "*")),
    helpText: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.imageFormatToUseTip",
      defaultMessage: "Usually image/png or image/jpeg. Use png if the server will return transparent layers."
    }), footnote),
    paramName: "format",
    value: wms.options.format,
    setValue: setOptions
  }), _react.default.createElement(_components.TextInputOption, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.wmsAttributionLabel",
      defaultMessage: "WMS attribution"
    }),
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.attributionStringTip",
      defaultMessage: "Attribution string for the lower right corner."
    }),
    paramName: "attribution",
    value: wms.options.attribution,
    setValue: setOptions
  }), _react.default.createElement(_components.TextInputOption, {
    label: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.wmsStylesLabel",
      defaultMessage: "WMS styles"
    }), _react.default.createElement("span", {
      "aria-hidden": "true"
    }, "*")),
    helpText: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "tileMap.wmsOptions.wmsServerSupportedStylesListTip",
      defaultMessage: "A comma separated list of WMS server supported styles to use. Blank in most cases."
    }), footnote),
    paramName: "styles",
    value: wms.options.styles,
    setValue: setOptions
  }), _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement("p", {
    "aria-hidden": "true"
  }, footnoteText)));
}