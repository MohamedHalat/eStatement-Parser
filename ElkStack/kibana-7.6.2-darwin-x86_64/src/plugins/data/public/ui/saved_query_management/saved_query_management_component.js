"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedQueryManagementComponent = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _saved_query_list_item = require("./saved_query_list_item");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var perPage = 50;

var SavedQueryManagementComponent = function SavedQueryManagementComponent(_ref) {
  var showSaveQuery = _ref.showSaveQuery,
      loadedSavedQuery = _ref.loadedSavedQuery,
      onSave = _ref.onSave,
      onSaveAsNew = _ref.onSaveAsNew,
      onLoad = _ref.onLoad,
      onClearSavedQuery = _ref.onClearSavedQuery,
      savedQueryService = _ref.savedQueryService;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      savedQueries = _useState4[0],
      setSavedQueries = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      count = _useState6[0],
      setTotalCount = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = _slicedToArray(_useState7, 2),
      activePage = _useState8[0],
      setActivePage = _useState8[1];

  (0, _react.useEffect)(function () {
    var fetchCountAndSavedQueries = function fetchCountAndSavedQueries() {
      var savedQueryCount, savedQueryItems, sortedSavedQueryItems;
      return regeneratorRuntime.async(function fetchCountAndSavedQueries$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(savedQueryService.getSavedQueryCount());

            case 2:
              savedQueryCount = _context.sent;
              setTotalCount(savedQueryCount);
              _context.next = 6;
              return regeneratorRuntime.awrap(savedQueryService.findSavedQueries('', perPage, activePage + 1));

            case 6:
              savedQueryItems = _context.sent;
              sortedSavedQueryItems = (0, _lodash.sortBy)(savedQueryItems, 'attributes.title');
              setSavedQueries(sortedSavedQueryItems);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    if (isOpen) {
      fetchCountAndSavedQueries();
    }
  }, [isOpen, activePage, savedQueryService]);

  var goToPage = function goToPage(pageNumber) {
    setActivePage(pageNumber);
  };

  var savedQueryDescriptionText = _i18n.i18n.translate('data.search.searchBar.savedQueryDescriptionText', {
    defaultMessage: 'Save query text and filters that you want to use again.'
  });

  var noSavedQueriesDescriptionText = _i18n.i18n.translate('data.search.searchBar.savedQueryNoSavedQueriesText', {
    defaultMessage: 'There are no saved queries.'
  }) + ' ' + savedQueryDescriptionText;

  var savedQueryPopoverTitleText = _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverTitleText', {
    defaultMessage: 'Saved Queries'
  });

  var onDeleteSavedQuery = function onDeleteSavedQuery(savedQuery) {
    return regeneratorRuntime.async(function onDeleteSavedQuery$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            setSavedQueries(savedQueries.filter(function (currentSavedQuery) {
              return currentSavedQuery.id !== savedQuery.id;
            }));

            if (loadedSavedQuery && loadedSavedQuery.id === savedQuery.id) {
              onClearSavedQuery();
            }

            _context2.next = 4;
            return regeneratorRuntime.awrap(savedQueryService.deleteSavedQuery(savedQuery.id));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  var savedQueryPopoverButton = _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: function onClick() {
      setIsOpen(!isOpen);
    },
    "aria-label": _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverButtonText', {
      defaultMessage: 'See saved queries'
    }),
    title: _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverButtonText', {
      defaultMessage: 'See saved queries'
    }),
    "data-test-subj": "saved-query-management-popover-button"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "save",
    className: "euiQuickSelectPopover__buttonText"
  }), _react.default.createElement(_eui.EuiIcon, {
    type: "arrowDown"
  }));

  var savedQueryRows = function savedQueryRows() {
    var savedQueriesWithoutCurrent = savedQueries.filter(function (savedQuery) {
      if (!loadedSavedQuery) return true;
      return savedQuery.id !== loadedSavedQuery.id;
    });
    var savedQueriesReordered = loadedSavedQuery && savedQueriesWithoutCurrent.length !== savedQueries.length ? [loadedSavedQuery].concat(_toConsumableArray(savedQueriesWithoutCurrent)) : _toConsumableArray(savedQueriesWithoutCurrent);
    return savedQueriesReordered.map(function (savedQuery) {
      return _react.default.createElement(_saved_query_list_item.SavedQueryListItem, {
        key: savedQuery.id,
        savedQuery: savedQuery,
        isSelected: !!loadedSavedQuery && loadedSavedQuery.id === savedQuery.id,
        onSelect: function onSelect(savedQueryToSelect) {
          onLoad(savedQueryToSelect);
          setIsOpen(false);
        },
        onDelete: function onDelete(savedQueryToDelete) {
          return onDeleteSavedQuery(savedQueryToDelete);
        },
        showWriteOperations: !!showSaveQuery
      });
    });
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiPopover, {
    id: "savedQueryPopover",
    button: savedQueryPopoverButton,
    isOpen: isOpen,
    closePopover: function closePopover() {
      setIsOpen(false);
    },
    anchorPosition: "downLeft",
    panelPaddingSize: "none",
    ownFocus: true
  }, _react.default.createElement("div", {
    className: "kbnSavedQueryManagement__popover",
    "data-test-subj": "saved-query-management-popover"
  }, _react.default.createElement(_eui.EuiPopoverTitle, {
    id: 'savedQueryManagementPopoverTitle'
  }, savedQueryPopoverTitleText), savedQueries.length > 0 ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued",
    className: "kbnSavedQueryManagement__text"
  }, _react.default.createElement("p", null, savedQueryDescriptionText)), _react.default.createElement("div", {
    className: "kbnSavedQueryManagement__listWrapper"
  }, _react.default.createElement(_eui.EuiListGroup, {
    flush: true,
    className: "kbnSavedQueryManagement__list",
    "aria-labelledby": 'savedQueryManagementPopoverTitle'
  }, savedQueryRows())), _react.default.createElement(_eui.EuiPagination, {
    className: "kbnSavedQueryManagement__pagination",
    pageCount: Math.ceil(count / perPage),
    activePage: activePage,
    onPageClick: goToPage
  })) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued",
    className: "kbnSavedQueryManagement__text"
  }, _react.default.createElement("p", null, noSavedQueriesDescriptionText)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })), _react.default.createElement(_eui.EuiPopoverFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "rowReverse",
    gutterSize: "s",
    alignItems: "center",
    justifyContent: "flexEnd",
    responsive: false,
    wrap: true
  }, showSaveQuery && loadedSavedQuery && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    size: "s",
    fill: true,
    onClick: function onClick() {
      return onSave();
    },
    "aria-label": _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverSaveChangesButtonAriaLabel', {
      defaultMessage: 'Save changes to {title}',
      values: {
        title: loadedSavedQuery.attributes.title
      }
    }),
    "data-test-subj": "saved-query-management-save-changes-button"
  }, _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverSaveChangesButtonText', {
    defaultMessage: 'Save changes'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    size: "s",
    onClick: function onClick() {
      return onSaveAsNew();
    },
    "aria-label": _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverSaveAsNewButtonAriaLabel', {
      defaultMessage: 'Save as new saved query'
    }),
    "data-test-subj": "saved-query-management-save-as-new-button"
  }, _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverSaveAsNewButtonText', {
    defaultMessage: 'Save as new'
  })))), showSaveQuery && !loadedSavedQuery && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    size: "s",
    fill: true,
    onClick: function onClick() {
      return onSave();
    },
    "aria-label": _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverSaveButtonAriaLabel', {
      defaultMessage: 'Save a new saved query'
    }),
    "data-test-subj": "saved-query-management-save-button"
  }, _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverSaveButtonText', {
    defaultMessage: 'Save current query'
  }))), _react.default.createElement(_eui.EuiFlexItem, null), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, loadedSavedQuery && _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "left",
    onClick: function onClick() {
      return onClearSavedQuery();
    },
    "aria-label": _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverClearButtonAriaLabel', {
      defaultMessage: 'Clear current saved query'
    }),
    "data-test-subj": "saved-query-management-clear-button"
  }, _i18n.i18n.translate('data.search.searchBar.savedQueryPopoverClearButtonText', {
    defaultMessage: 'Clear'
  }))))))));
};

exports.SavedQueryManagementComponent = SavedQueryManagementComponent;