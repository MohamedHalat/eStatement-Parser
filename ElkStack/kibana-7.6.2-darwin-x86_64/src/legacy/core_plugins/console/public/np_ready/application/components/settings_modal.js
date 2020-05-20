"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevToolsSettingsModal = DevToolsSettingsModal;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DevToolsSettingsModal(props) {
  var _useState = (0, _react.useState)(props.settings.fontSize),
      _useState2 = _slicedToArray(_useState, 2),
      fontSize = _useState2[0],
      setFontSize = _useState2[1];

  var _useState3 = (0, _react.useState)(props.settings.wrapMode),
      _useState4 = _slicedToArray(_useState3, 2),
      wrapMode = _useState4[0],
      setWrapMode = _useState4[1];

  var _useState5 = (0, _react.useState)(props.settings.autocomplete.fields),
      _useState6 = _slicedToArray(_useState5, 2),
      fields = _useState6[0],
      setFields = _useState6[1];

  var _useState7 = (0, _react.useState)(props.settings.autocomplete.indices),
      _useState8 = _slicedToArray(_useState7, 2),
      indices = _useState8[0],
      setIndices = _useState8[1];

  var _useState9 = (0, _react.useState)(props.settings.autocomplete.templates),
      _useState10 = _slicedToArray(_useState9, 2),
      templates = _useState10[0],
      setTemplates = _useState10[1];

  var _useState11 = (0, _react.useState)(props.settings.polling),
      _useState12 = _slicedToArray(_useState11, 2),
      polling = _useState12[0],
      setPolling = _useState12[1];

  var _useState13 = (0, _react.useState)(props.settings.tripleQuotes),
      _useState14 = _slicedToArray(_useState13, 2),
      tripleQuotes = _useState14[0],
      setTripleQuotes = _useState14[1];

  var autoCompleteCheckboxes = [{
    id: 'fields',
    label: _i18n.i18n.translate('console.settingsPage.fieldsLabelText', {
      defaultMessage: 'Fields'
    }),
    stateSetter: setFields
  }, {
    id: 'indices',
    label: _i18n.i18n.translate('console.settingsPage.indicesAndAliasesLabelText', {
      defaultMessage: 'Indices & Aliases'
    }),
    stateSetter: setIndices
  }, {
    id: 'templates',
    label: _i18n.i18n.translate('console.settingsPage.templatesLabelText', {
      defaultMessage: 'Templates'
    }),
    stateSetter: setTemplates
  }];
  var checkboxIdToSelectedMap = {
    fields: fields,
    indices: indices,
    templates: templates
  };

  var onAutocompleteChange = function onAutocompleteChange(optionId) {
    var option = _.find(autoCompleteCheckboxes, function (item) {
      return item.id === optionId;
    });

    if (option) {
      option.stateSetter(!checkboxIdToSelectedMap[optionId]);
    }
  };

  function saveSettings() {
    props.onSaveSettings({
      fontSize: fontSize,
      wrapMode: wrapMode,
      autocomplete: {
        fields: fields,
        indices: indices,
        templates: templates
      },
      polling: polling,
      tripleQuotes: tripleQuotes
    });
  } // It only makes sense to show polling options if the user needs to fetch any data.


  var pollingFields = fields || indices || templates ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "console.settingsPage.refreshingDataLabel",
      defaultMessage: "Refreshing autocomplete suggestions"
    }),
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "console.settingsPage.refreshingDataDescription",
      defaultMessage: "Console refreshes autocomplete suggestions by querying Elasticsearch. Automatic refreshes may be an issue if you have a large cluster or if you have network limitations."
    })
  }, _react.default.createElement(_eui.EuiSwitch, {
    checked: polling,
    "data-test-subj": "autocompletePolling",
    id: "autocompletePolling",
    label: _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "Automatically refresh autocomplete suggestions",
      id: "console.settingsPage.pollingLabelText"
    }),
    onChange: function onChange(e) {
      return setPolling(e.target.checked);
    }
  })), _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "autocompletePolling",
    id: "autocompletePolling",
    onClick: function onClick() {
      // Only refresh the currently selected settings.
      props.refreshAutocompleteSettings({
        fields: fields,
        indices: indices,
        templates: templates
      });
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Refresh autocomplete suggestions",
    id: "console.settingsPage.refreshButtonLabel"
  }))) : undefined;
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    "data-test-subj": "devToolsSettingsModal",
    className: "conApp__settingsModal",
    onClose: props.onClose
  }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.settingsPage.pageTitle",
    defaultMessage: "Console Settings"
  }))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "console.settingsPage.fontSizeLabel",
      defaultMessage: "Font Size"
    })
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    autoFocus: true,
    "data-test-subj": "setting-font-size-input",
    value: fontSize,
    min: 6,
    max: 50,
    onChange: function onChange(e) {
      var val = parseInt(e.target.value, 10);
      if (!val) return;
      setFontSize(val);
    }
  })), _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
    checked: wrapMode,
    "data-test-subj": "settingsWrapLines",
    id: "wrapLines",
    label: _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "Wrap long lines",
      id: "console.settingsPage.wrapLongLinesLabelText"
    }),
    onChange: function onChange(e) {
      return setWrapMode(e.target.checked);
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "console.settingsPage.jsonSyntaxLabel",
      defaultMessage: "JSON syntax"
    })
  }, _react.default.createElement(_eui.EuiSwitch, {
    checked: tripleQuotes,
    "data-test-subj": "tripleQuotes",
    id: "tripleQuotes",
    label: _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "Use triple quotes in output pane",
      id: "console.settingsPage.tripleQuotesMessage"
    }),
    onChange: function onChange(e) {
      return setTripleQuotes(e.target.checked);
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    labelType: "legend",
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "console.settingsPage.autocompleteLabel",
      defaultMessage: "Autocomplete"
    })
  }, _react.default.createElement(_eui.EuiCheckboxGroup, {
    options: autoCompleteCheckboxes,
    idToSelectedMap: checkboxIdToSelectedMap,
    onChange: function onChange(e) {
      onAutocompleteChange(e);
    }
  })), pollingFields), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "settingsCancelButton",
    onClick: props.onClose
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.settingsPage.cancelButtonLabel",
    defaultMessage: "Cancel"
  })), _react.default.createElement(_eui.EuiButton, {
    fill: true,
    "data-test-subj": "settings-save-button",
    onClick: saveSettings
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.settingsPage.saveButtonLabel",
    defaultMessage: "Save"
  })))));
}