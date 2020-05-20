"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaveQueryForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SaveQueryForm = function SaveQueryForm(_ref) {
  var savedQuery = _ref.savedQuery,
      savedQueryService = _ref.savedQueryService,
      onSave = _ref.onSave,
      onClose = _ref.onClose,
      _ref$showFilterOption = _ref.showFilterOption,
      showFilterOption = _ref$showFilterOption === void 0 ? true : _ref$showFilterOption,
      _ref$showTimeFilterOp = _ref.showTimeFilterOption,
      showTimeFilterOption = _ref$showTimeFilterOp === void 0 ? true : _ref$showTimeFilterOp;

  var _useState = (0, _react.useState)(savedQuery ? savedQuery.title : ''),
      _useState2 = _slicedToArray(_useState, 2),
      title = _useState2[0],
      setTitle = _useState2[1];

  var _useState3 = (0, _react.useState)(savedQuery ? savedQuery.description : ''),
      _useState4 = _slicedToArray(_useState3, 2),
      description = _useState4[0],
      setDescription = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      savedQueries = _useState6[0],
      setSavedQueries = _useState6[1];

  var _useState7 = (0, _react.useState)(savedQuery ? !!savedQuery.filters : true),
      _useState8 = _slicedToArray(_useState7, 2),
      shouldIncludeFilters = _useState8[0],
      setShouldIncludeFilters = _useState8[1]; // Defaults to false because saved queries are meant to be as portable as possible and loading
  // a saved query with a time filter will override whatever the current value of the global timepicker
  // is. We expect this option to be used rarely and only when the user knows they want this behavior.


  var _useState9 = (0, _react.useState)(savedQuery ? !!savedQuery.timefilter : false),
      _useState10 = _slicedToArray(_useState9, 2),
      shouldIncludeTimefilter = _useState10[0],
      setIncludeTimefilter = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      formErrors = _useState12[0],
      setFormErrors = _useState12[1];

  (0, _react.useEffect)(function () {
    var fetchQueries = function fetchQueries() {
      var allSavedQueries, sortedAllSavedQueries;
      return regeneratorRuntime.async(function fetchQueries$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(savedQueryService.getAllSavedQueries());

            case 2:
              allSavedQueries = _context.sent;
              sortedAllSavedQueries = (0, _lodash.sortBy)(allSavedQueries, 'attributes.title');
              setSavedQueries(sortedAllSavedQueries);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    fetchQueries();
  }, [savedQueryService]);

  var savedQueryDescriptionText = _i18n.i18n.translate('data.search.searchBar.savedQueryDescriptionText', {
    defaultMessage: 'Save query text and filters that you want to use again.'
  });

  var titleConflictErrorText = _i18n.i18n.translate('data.search.searchBar.savedQueryForm.titleConflictText', {
    defaultMessage: 'Name conflicts with an existing saved query'
  });

  var titleMissingErrorText = _i18n.i18n.translate('data.search.searchBar.savedQueryForm.titleMissingText', {
    defaultMessage: 'Name is required'
  });

  var whitespaceErrorText = _i18n.i18n.translate('data.search.searchBar.savedQueryForm.whitespaceErrorText', {
    defaultMessage: 'Name cannot contain leading or trailing whitespace'
  });

  var validate = function validate() {
    var errors = [];

    if (!title.length) {
      errors.push(titleMissingErrorText);
    }

    if (title.length > title.trim().length) {
      errors.push(whitespaceErrorText);
    }

    if (!!savedQueries.find(function (existingSavedQuery) {
      return !savedQuery && existingSavedQuery.attributes.title === title;
    })) {
      errors.push(titleConflictErrorText);
    }

    if (!(0, _lodash.isEqual)(errors, formErrors)) {
      setFormErrors(errors);
    }
  };

  var hasErrors = formErrors.length > 0;

  if (hasErrors) {
    validate();
  }

  var saveQueryForm = _react.default.createElement(_eui.EuiForm, {
    isInvalid: hasErrors,
    error: formErrors,
    "data-test-subj": "saveQueryForm"
  }, _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, savedQueryDescriptionText)), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('data.search.searchBar.savedQueryNameLabelText', {
      defaultMessage: 'Name'
    }),
    helpText: _i18n.i18n.translate('data.search.searchBar.savedQueryNameHelpText', {
      defaultMessage: 'Name is required. Name cannot contain leading or trailing whitespace. Name must be unique.'
    }),
    isInvalid: hasErrors
  }, _react.default.createElement(_eui.EuiFieldText, {
    disabled: !!savedQuery,
    value: title,
    name: "title",
    onChange: function onChange(event) {
      setTitle(event.target.value);
    },
    "data-test-subj": "saveQueryFormTitle",
    isInvalid: hasErrors,
    onBlur: validate
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('data.search.searchBar.savedQueryDescriptionLabelText', {
      defaultMessage: 'Description'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: description,
    name: "description",
    onChange: function onChange(event) {
      setDescription(event.target.value);
    },
    "data-test-subj": "saveQueryFormDescription"
  })), showFilterOption && _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
    name: "shouldIncludeFilters",
    label: _i18n.i18n.translate('data.search.searchBar.savedQueryIncludeFiltersLabelText', {
      defaultMessage: 'Include filters'
    }),
    checked: shouldIncludeFilters,
    onChange: function onChange() {
      setShouldIncludeFilters(!shouldIncludeFilters);
    },
    "data-test-subj": "saveQueryFormIncludeFiltersOption"
  })), showTimeFilterOption && _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
    name: "shouldIncludeTimefilter",
    label: _i18n.i18n.translate('data.search.searchBar.savedQueryIncludeTimeFilterLabelText', {
      defaultMessage: 'Include time filter'
    }),
    checked: shouldIncludeTimefilter,
    onChange: function onChange() {
      setIncludeTimefilter(!shouldIncludeTimefilter);
    },
    "data-test-subj": "saveQueryFormIncludeTimeFilterOption"
  })));

  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    onClose: onClose,
    initialFocus: "[name=title]"
  }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _i18n.i18n.translate('data.search.searchBar.savedQueryFormTitle', {
    defaultMessage: 'Save query'
  }))), _react.default.createElement(_eui.EuiModalBody, null, saveQueryForm), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onClose,
    "data-test-subj": "savedQueryFormCancelButton"
  }, _i18n.i18n.translate('data.search.searchBar.savedQueryFormCancelButtonText', {
    defaultMessage: 'Cancel'
  })), _react.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      return onSave({
        title: title,
        description: description,
        shouldIncludeFilters: shouldIncludeFilters,
        shouldIncludeTimefilter: shouldIncludeTimefilter
      });
    },
    fill: true,
    "data-test-subj": "savedQueryFormSaveButton",
    disabled: hasErrors
  }, _i18n.i18n.translate('data.search.searchBar.savedQueryFormSaveButtonText', {
    defaultMessage: 'Save'
  })))));
};

exports.SaveQueryForm = SaveQueryForm;