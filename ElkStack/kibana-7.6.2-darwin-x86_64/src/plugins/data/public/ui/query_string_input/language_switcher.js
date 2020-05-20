"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryLanguageSwitcher = QueryLanguageSwitcher;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _public = require("../../../../kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function QueryLanguageSwitcher(props) {
  var kibana = (0, _public.useKibana)();
  var kueryQuerySyntaxDocs = kibana.services.docLinks.links.query.kueryQuerySyntax;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var luceneLabel = _react2.default.createElement(_react.FormattedMessage, {
    id: "data.query.queryBar.luceneLanguageName",
    defaultMessage: "Lucene"
  });

  var kqlLabel = _react2.default.createElement(_react.FormattedMessage, {
    id: "data.query.queryBar.kqlLanguageName",
    defaultMessage: "KQL"
  });

  var kqlFullName = _react2.default.createElement(_react.FormattedMessage, {
    id: "data.query.queryBar.kqlFullLanguageName",
    defaultMessage: "Kibana Query Language"
  });

  var button = _react2.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    onClick: function onClick() {
      return setIsPopoverOpen(!isPopoverOpen);
    },
    className: "euiFormControlLayout__append"
  }, props.language === 'lucene' ? luceneLabel : kqlLabel);

  return _react2.default.createElement(_eui.EuiPopover, {
    id: "popover",
    anchorClassName: "euiFormControlLayout__append",
    ownFocus: true,
    anchorPosition: props.anchorPosition || 'downRight',
    button: button,
    isOpen: isPopoverOpen,
    closePopover: function closePopover() {
      return setIsPopoverOpen(false);
    },
    withTitle: true
  }, _react2.default.createElement(_eui.EuiPopoverTitle, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "data.query.queryBar.syntaxOptionsTitle",
    defaultMessage: "Syntax options"
  })), _react2.default.createElement("div", {
    style: {
      width: '350px'
    }
  }, _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "data.query.queryBar.syntaxOptionsDescription",
    defaultMessage: "The {docsLink} (KQL) offers a simplified query syntax and support for scripted fields. KQL also provides autocomplete if you have a Basic license or above. If you turn off KQL, Kibana uses Lucene.",
    values: {
      docsLink: _react2.default.createElement(_eui.EuiLink, {
        href: kueryQuerySyntaxDocs,
        target: "_blank"
      }, kqlFullName)
    }
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_eui.EuiFormRow, {
    label: kqlFullName
  }, _react2.default.createElement(_eui.EuiSwitch, {
    id: "queryEnhancementOptIn",
    name: "popswitch",
    label: props.language === 'kuery' ? _react2.default.createElement(_react.FormattedMessage, {
      id: "data.query.queryBar.kqlOnLabel",
      defaultMessage: "On"
    }) : _react2.default.createElement(_react.FormattedMessage, {
      id: "data.query.queryBar.kqlOffLabel",
      defaultMessage: "Off"
    }),
    checked: props.language === 'kuery',
    onChange: function onChange() {
      var newLanguage = props.language === 'lucene' ? 'kuery' : 'lucene';
      props.onSelectLanguage(newLanguage);
    },
    "data-test-subj": "languageToggle"
  })))));
}