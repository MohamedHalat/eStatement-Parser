"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableListView = exports.EMPTY_FILTER = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EMPTY_FILTER = '';
exports.EMPTY_FILTER = EMPTY_FILTER;

// saved object client does not support sorting by title because title is only mapped as analyzed
// the legacy implementation got around this by pulling `listingLimit` items and doing client side sorting
// and not supporting server-side paging.
// This component does not try to tackle these problems (yet) and is just feature matching the legacy component
// TODO support server side sorting/paging once title and description are sortable on the server.
var TableListView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TableListView, _React$Component);

  function TableListView(props) {
    var _this;

    _classCallCheck(this, TableListView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableListView).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "pagination", {});

    _defineProperty(_assertThisInitialized(_this), "_isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "debouncedFetch", (0, _lodash.debounce)(function _callee(filter) {
      var response;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_this.props.findItems(filter));

            case 2:
              response = _context.sent;

              if (_this._isMounted) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              // We need this check to handle the case where search results come back in a different
              // order than they were sent out. Only load results for the most recent search.
              // Also, in case filter is empty, items are being pre-sorted alphabetically.
              if (filter === _this.state.filter) {
                _this.setState({
                  hasInitialFetchReturned: true,
                  isFetchingItems: false,
                  items: !filter ? (0, _lodash.sortBy)(response.hits, 'title') : response.hits,
                  totalItems: response.total,
                  showLimitError: response.total > _this.props.listingLimit
                });
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }, 300));

    _defineProperty(_assertThisInitialized(_this), "fetchItems", function () {
      _this.setState({
        isFetchingItems: true
      }, _this.debouncedFetch.bind(null, _this.state.filter));
    });

    _defineProperty(_assertThisInitialized(_this), "deleteSelectedItems", function _callee2() {
      var itemsById;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this.state.isDeletingItems || !_this.props.deleteItems)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _this.setState({
                isDeletingItems: true
              });

              _context2.prev = 3;
              itemsById = (0, _lodash.indexBy)(_this.state.items, 'id');
              _context2.next = 7;
              return regeneratorRuntime.awrap(_this.props.deleteItems(_this.state.selectedIds.map(function (id) {
                return itemsById[id];
              })));

            case 7:
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](3);

              _this.props.toastNotifications.addDanger({
                title: (0, _util.toMountPoint)(_react.default.createElement(_react2.FormattedMessage, {
                  id: "kibana-react.tableListView.listing.unableToDeleteDangerMessage",
                  defaultMessage: "Unable to delete {entityName}(s)",
                  values: {
                    entityName: _this.props.entityName
                  }
                })),
                text: "".concat(_context2.t0)
              });

            case 12:
              _this.fetchItems();

              _this.setState({
                isDeletingItems: false,
                selectedIds: []
              });

              _this.closeDeleteModal();

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[3, 9]]);
    });

    _defineProperty(_assertThisInitialized(_this), "closeDeleteModal", function () {
      _this.setState({
        showDeleteModal: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "openDeleteModal", function () {
      _this.setState({
        showDeleteModal: true
      });
    });

    var initialPageSize = props.uiSettings.get('savedObjects:perPage');
    _this.pagination = {
      initialPageIndex: 0,
      initialPageSize: initialPageSize,
      pageSizeOptions: (0, _lodash.uniq)([10, 20, 50, initialPageSize]).sort()
    };
    _this.state = {
      items: [],
      totalItems: 0,
      hasInitialFetchReturned: false,
      isFetchingItems: false,
      isDeletingItems: false,
      showDeleteModal: false,
      showLimitError: false,
      filter: props.initialFilter,
      selectedIds: []
    };
    return _this;
  }

  _createClass(TableListView, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this._isMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
      this.debouncedFetch.cancel();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchItems();
    }
  }, {
    key: "setFilter",
    value: function setFilter(_ref) {
      var queryText = _ref.queryText;
      // If the user is searching, we want to clear the sort order so that
      // results are ordered by Elasticsearch's relevance.
      this.setState({
        filter: queryText
      }, this.fetchItems);
    }
  }, {
    key: "hasNoItems",
    value: function hasNoItems() {
      if (!this.state.isFetchingItems && this.state.items.length === 0 && !this.state.filter) {
        return true;
      }

      return false;
    }
  }, {
    key: "renderConfirmDeleteModal",
    value: function renderConfirmDeleteModal() {
      var deleteButton = _react.default.createElement(_react2.FormattedMessage, {
        id: "kibana-react.tableListView.listing.deleteSelectedItemsConfirmModal.confirmButtonLabel",
        defaultMessage: "Delete"
      });

      if (this.state.isDeletingItems) {
        deleteButton = _react.default.createElement(_react2.FormattedMessage, {
          id: "kibana-react.tableListView.listing.deleteSelectedItemsConfirmModal.confirmButtonLabelDeleting",
          defaultMessage: "Deleting"
        });
      }

      return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "kibana-react.tableListView.listing.deleteSelectedConfirmModal.title",
          defaultMessage: "Delete {itemCount} {entityName}?",
          values: {
            itemCount: this.state.selectedIds.length,
            entityName: this.state.selectedIds.length === 1 ? this.props.entityName : this.props.entityNamePlural
          }
        }),
        buttonColor: "danger",
        onCancel: this.closeDeleteModal,
        onConfirm: this.deleteSelectedItems,
        cancelButtonText: _react.default.createElement(_react2.FormattedMessage, {
          id: "kibana-react.tableListView.listing.deleteSelectedItemsConfirmModal.cancelButtonLabel",
          defaultMessage: "Cancel"
        }),
        confirmButtonText: deleteButton,
        defaultFocusedButton: "cancel"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "kibana-react.tableListView.listing.deleteConfirmModalDescription",
        defaultMessage: "You can't recover deleted {entityNamePlural}.",
        values: {
          entityNamePlural: this.props.entityNamePlural
        }
      }))));
    }
  }, {
    key: "renderListingLimitWarning",
    value: function renderListingLimitWarning() {
      if (this.state.showLimitError) {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
          title: _react.default.createElement(_react2.FormattedMessage, {
            id: "kibana-react.tableListView.listing.listingLimitExceededTitle",
            defaultMessage: "Listing limit exceeded"
          }),
          color: "warning",
          iconType: "help"
        }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "kibana-react.tableListView.listing.listingLimitExceededDescription",
          defaultMessage: "You have {totalItems} {entityNamePlural}, but your {listingLimitText} setting prevents the table below from displaying more than {listingLimitValue}. You can change this setting under {advancedSettingsLink}.",
          values: {
            entityNamePlural: this.props.entityNamePlural,
            totalItems: this.state.totalItems,
            listingLimitValue: this.props.listingLimit,
            listingLimitText: _react.default.createElement("strong", null, "listingLimit"),
            advancedSettingsLink: _react.default.createElement(_eui.EuiLink, {
              href: "#/management/kibana/settings"
            }, _react.default.createElement(_react2.FormattedMessage, {
              id: "kibana-react.tableListView.listing.listingLimitExceeded.advancedSettingsLinkText",
              defaultMessage: "Advanced Settings"
            }))
          }
        }))), _react.default.createElement(_eui.EuiSpacer, {
          size: "m"
        }));
      }
    }
  }, {
    key: "renderNoItemsMessage",
    value: function renderNoItemsMessage() {
      if (this.props.noItemsFragment) {
        return this.props.noItemsFragment;
      } else {
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "kibana-react.tableListView.listing.noAvailableItemsMessage",
          defaultMessage: "No {entityNamePlural} available.",
          values: {
            entityNamePlural: this.props.entityNamePlural
          }
        });
      }
    }
  }, {
    key: "renderToolsLeft",
    value: function renderToolsLeft() {
      var _this2 = this;

      var selection = this.state.selectedIds;

      if (selection.length === 0) {
        return;
      }

      var onClick = function onClick() {
        _this2.openDeleteModal();
      };

      return _react.default.createElement(_eui.EuiButton, {
        color: "danger",
        iconType: "trash",
        onClick: onClick,
        "data-test-subj": "deleteSelectedItems"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kibana-react.tableListView.listing.deleteButtonMessage",
        defaultMessage: "Delete {itemCount} {entityName}",
        values: {
          itemCount: selection.length,
          entityName: selection.length === 1 ? this.props.entityName : this.props.entityNamePlural
        }
      }));
    }
  }, {
    key: "renderTable",
    value: function renderTable() {
      var _this3 = this;

      var selection = this.props.deleteItems ? {
        onSelectionChange: function onSelectionChange(obj) {
          _this3.setState({
            selectedIds: obj.map(function (item) {
              return item.id;
            }).filter(function (id) {
              return Boolean(id);
            })
          });
        }
      } : undefined;
      var actions = [{
        name: _i18n.i18n.translate('kibana-react.tableListView.listing.table.editActionName', {
          defaultMessage: 'Edit'
        }),
        description: _i18n.i18n.translate('kibana-react.tableListView.listing.table.editActionDescription', {
          defaultMessage: 'Edit'
        }),
        icon: 'pencil',
        type: 'icon',
        onClick: this.props.editItem
      }];
      var search = {
        onChange: this.setFilter.bind(this),
        toolsLeft: this.renderToolsLeft(),
        defaultQuery: this.state.filter,
        box: {
          incremental: true
        }
      };
      var columns = this.props.tableColumns.slice();

      if (this.props.editItem) {
        columns.push({
          name: _i18n.i18n.translate('kibana-react.tableListView.listing.table.actionTitle', {
            defaultMessage: 'Actions'
          }),
          width: '100px',
          actions: actions
        });
      }

      var noItemsMessage = _react.default.createElement(_react2.FormattedMessage, {
        id: "kibana-react.tableListView.listing.noMatchedItemsMessage",
        defaultMessage: "No {entityNamePlural} matched your search.",
        values: {
          entityNamePlural: this.props.entityNamePlural
        }
      });

      return _react.default.createElement(_eui.EuiInMemoryTable, {
        itemId: "id",
        items: this.state.items,
        columns: columns // EuiBasicTableColumn is stricter than Column
        ,
        pagination: this.pagination,
        loading: this.state.isFetchingItems,
        message: noItemsMessage,
        selection: selection,
        search: search,
        sorting: true,
        "data-test-subj": "itemsInMemTable"
      });
    }
  }, {
    key: "renderListingOrEmptyState",
    value: function renderListingOrEmptyState() {
      if (this.hasNoItems()) {
        return this.renderNoItemsMessage();
      }

      return this.renderListing();
    }
  }, {
    key: "renderListing",
    value: function renderListing() {
      var createButton;

      if (this.props.createItem) {
        createButton = _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiButton, {
          onClick: this.props.createItem,
          "data-test-subj": "newItemButton",
          iconType: "plusInCircle",
          fill: true
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "kibana-react.tableListView.listing.createNewItemButtonLabel",
          defaultMessage: "Create {entityName}",
          values: {
            entityName: this.props.entityName
          }
        })));
      }

      return _react.default.createElement("div", null, this.state.showDeleteModal && this.renderConfirmDeleteModal(), _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween",
        alignItems: "flexEnd",
        "data-test-subj": "top-nav"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "l"
      }, _react.default.createElement("h1", {
        id: this.props.headingId
      }, this.props.tableListTitle))), createButton), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), this.renderListingLimitWarning(), this.renderTable());
    }
  }, {
    key: "renderPageContent",
    value: function renderPageContent() {
      if (!this.state.hasInitialFetchReturned) {
        return;
      }

      return _react.default.createElement(_eui.EuiPageContent, {
        horizontalPosition: "center"
      }, this.renderListingOrEmptyState());
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_eui.EuiPage, {
        "data-test-subj": this.props.entityName + 'LandingPage',
        className: "itemListing__page",
        restrictWidth: true
      }, _react.default.createElement(_eui.EuiPageBody, {
        "aria-labelledby": this.state.hasInitialFetchReturned ? this.props.headingId : undefined
      }, this.renderPageContent()));
    }
  }]);

  return TableListView;
}(_react.default.Component);

exports.TableListView = TableListView;