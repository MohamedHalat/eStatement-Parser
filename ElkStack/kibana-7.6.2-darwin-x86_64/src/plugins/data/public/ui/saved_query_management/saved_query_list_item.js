"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedQueryListItem = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SavedQueryListItem = function SavedQueryListItem(_ref) {
  var savedQuery = _ref.savedQuery,
      isSelected = _ref.isSelected,
      onSelect = _ref.onSelect,
      onDelete = _ref.onDelete,
      showWriteOperations = _ref.showWriteOperations;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDeletionConfirmationModal = _useState2[0],
      setShowDeletionConfirmationModal = _useState2[1];

  var selectButtonAriaLabelText = isSelected ? _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverSavedQueryListItemSelectedButtonAriaLabel', {
    defaultMessage: 'Saved query button selected {savedQueryName}. Press to clear any changes.',
    values: {
      savedQueryName: savedQuery.attributes.title
    }
  }) : _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverSavedQueryListItemButtonAriaLabel', {
    defaultMessage: 'Saved query button {savedQueryName}',
    values: {
      savedQueryName: savedQuery.attributes.title
    }
  });
  var selectButtonDataTestSubj = isSelected ? "load-saved-query-".concat(savedQuery.attributes.title, "-button saved-query-list-item-selected") : "load-saved-query-".concat(savedQuery.attributes.title, "-button");
  var classes = (0, _classnames.default)('kbnSavedQueryListItem', {
    'kbnSavedQueryListItem-selected': isSelected
  });

  var label = _react.default.createElement("span", {
    className: "kbnSavedQueryListItem__label"
  }, _react.default.createElement("span", {
    className: "kbnSavedQueryListItem__labelText"
  }, savedQuery.attributes.title), ' ', savedQuery.attributes.description && _react.default.createElement(_eui.EuiIconTip, {
    type: "iInCircle",
    content: savedQuery.attributes.description,
    "aria-label": _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverSavedQueryListItemDescriptionAriaLabel', {
      defaultMessage: '{savedQueryName} description',
      values: {
        savedQueryName: savedQuery.attributes.title
      }
    })
  }));

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiListGroupItem, {
    className: classes,
    key: savedQuery.id,
    "data-test-subj": "saved-query-list-item ".concat(selectButtonDataTestSubj, " ").concat(isSelected ? 'saved-query-list-item-selected' : ''),
    isActive: isSelected,
    onClick: function onClick() {
      onSelect(savedQuery);
    },
    "aria-label": selectButtonAriaLabelText,
    label: label,
    iconType: isSelected ? 'check' : undefined,
    extraAction: showWriteOperations ? {
      color: 'danger',
      onClick: function onClick() {
        return setShowDeletionConfirmationModal(true);
      },
      iconType: 'trash',
      iconSize: 's',
      'aria-label': _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverDeleteButtonAriaLabel', {
        defaultMessage: 'Delete saved query {savedQueryName}',
        values: {
          savedQueryName: savedQuery.attributes.title
        }
      }),
      title: _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverDeleteButtonAriaLabel', {
        defaultMessage: 'Delete saved query {savedQueryName}',
        values: {
          savedQueryName: savedQuery.attributes.title
        }
      }),
      'data-test-subj': "delete-saved-query-".concat(savedQuery.attributes.title, "-button")
    } : undefined
  }), showDeletionConfirmationModal && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverConfirmDeletionTitle', {
      defaultMessage: 'Delete "{savedQueryName}"?',
      values: {
        savedQueryName: savedQuery.attributes.title
      }
    }),
    confirmButtonText: _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverConfirmDeletionConfirmButtonText', {
      defaultMessage: 'Delete'
    }),
    cancelButtonText: _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverConfirmDeletionCancelButtonText', {
      defaultMessage: 'Cancel'
    }),
    onConfirm: function onConfirm() {
      onDelete(savedQuery);
      setShowDeletionConfirmationModal(false);
    },
    buttonColor: "danger",
    onCancel: function onCancel() {
      setShowDeletionConfirmationModal(false);
    }
  })));
};

exports.SavedQueryListItem = SavedQueryListItem;