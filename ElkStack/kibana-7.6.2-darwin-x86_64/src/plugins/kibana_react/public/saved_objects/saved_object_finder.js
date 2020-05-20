"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectFinderUi = exports.SavedObjectFinder = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _context2 = require("../context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO the typings for EuiListGroup are incorrect - maxWidth is missing. This can be removed when the types are adjusted
var FixedEuiListGroup = _eui.EuiListGroup; // TODO the typings for EuiContextMenuPanel are incorrect - watchedItemProps is missing. This can be removed when the types are adjusted

var FixedEuiContextMenuPanel = _eui.EuiContextMenuPanel;

var SavedObjectFinderUi =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SavedObjectFinderUi, _React$Component);

  function SavedObjectFinderUi(props) {
    var _this;

    _classCallCheck(this, SavedObjectFinderUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SavedObjectFinderUi).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isComponentMounted", false);

    _defineProperty(_assertThisInitialized(_this), "debouncedFetch", _lodash.default.debounce(function _callee(query) {
      var metaDataMap, fields, perPage, resp;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              metaDataMap = _this.getSavedObjectMetaDataMap();
              fields = Object.values(metaDataMap).map(function (metaData) {
                return metaData.includeFields || [];
              }).reduce(function (allFields, currentFields) {
                return allFields.concat(currentFields);
              }, ['title']);
              perPage = _this.props.uiSettings.get('savedObjects:listingLimit');
              _context.next = 5;
              return regeneratorRuntime.awrap(_this.props.savedObjects.client.find({
                type: Object.keys(metaDataMap),
                fields: _toConsumableArray(new Set(fields)),
                search: query ? "".concat(query, "*") : undefined,
                page: 1,
                perPage: perPage,
                searchFields: ['title^3', 'description'],
                defaultSearchOperator: 'AND'
              }));

            case 5:
              resp = _context.sent;
              resp.savedObjects = resp.savedObjects.filter(function (savedObject) {
                var metaData = metaDataMap[savedObject.type];

                if (metaData.showSavedObject) {
                  return metaData.showSavedObject(savedObject);
                } else {
                  return true;
                }
              });

              if (_this.isComponentMounted) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return");

            case 9:
              // We need this check to handle the case where search results come back in a different
              // order than they were sent out. Only load results for the most recent search.
              if (query === _this.state.query) {
                _this.setState({
                  isFetchingItems: false,
                  page: 0,
                  items: resp.savedObjects.map(function (savedObject) {
                    var title = savedObject.attributes.title,
                        id = savedObject.id,
                        type = savedObject.type;
                    return {
                      title: typeof title === 'string' ? title : '',
                      id: id,
                      type: type,
                      savedObject: savedObject
                    };
                  })
                });
              }

            case 10:
            case "end":
              return _context.stop();
          }
        }
      });
    }, 300));

    _defineProperty(_assertThisInitialized(_this), "getPageOfItems", function () {
      // do not sort original list to preserve elasticsearch ranking order
      var items = _this.state.items.slice();

      var sortDirection = _this.state.sortDirection;

      if (sortDirection || !_this.state.query) {
        items.sort(function (_ref, _ref2) {
          var titleA = _ref.title;
          var titleB = _ref2.title;
          var order = 1;

          if (sortDirection === 'desc') {
            order = -1;
          }

          return order * (titleA || '').toLowerCase().localeCompare((titleB || '').toLowerCase());
        });
      } // If begin is greater than the length of the sequence, an empty array is returned.


      var startIndex = _this.state.page * _this.state.perPage; // If end is greater than the length of the sequence, slice extracts through to the end of the sequence (arr.length).

      var lastIndex = startIndex + _this.state.perPage;
      return items.filter(function (item) {
        return _this.state.filteredTypes.length === 0 || _this.state.filteredTypes.includes(item.type);
      }).slice(startIndex, lastIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "fetchItems", function () {
      _this.setState({
        isFetchingItems: true
      }, _this.debouncedFetch.bind(null, _this.state.query));
    });

    _this.state = {
      items: [],
      isFetchingItems: false,
      page: 0,
      perPage: props.initialPageSize || props.fixedPageSize || 10,
      query: '',
      filterOpen: false,
      filteredTypes: [],
      sortOpen: false
    };
    return _this;
  }

  _createClass(SavedObjectFinderUi, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isComponentMounted = false;
      this.debouncedFetch.cancel();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isComponentMounted = true;
      this.fetchItems();
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, this.renderSearchBar(), this.renderListing());
    }
  }, {
    key: "getSavedObjectMetaDataMap",
    value: function getSavedObjectMetaDataMap() {
      return this.props.savedObjectMetaData.reduce(function (map, metaData) {
        return _objectSpread({}, map, _defineProperty({}, metaData.type, metaData));
      }, {});
    }
  }, {
    key: "getPageCount",
    value: function getPageCount() {
      var _this2 = this;

      return Math.ceil((this.state.filteredTypes.length === 0 ? this.state.items.length : this.state.items.filter(function (item) {
        return _this2.state.filteredTypes.length === 0 || _this2.state.filteredTypes.includes(item.type);
      }).length) / this.state.perPage);
    } // server-side paging not supported
    // 1) saved object client does not support sorting by title because title is only mapped as analyzed
    // 2) can not search on anything other than title because all other fields are stored in opaque JSON strings,
    //    for example, visualizations need to be search by isLab but this is not possible in Elasticsearch side
    //    with the current mappings

  }, {
    key: "getAvailableSavedObjectMetaData",
    value: function getAvailableSavedObjectMetaData() {
      var typesInItems = new Set();
      this.state.items.forEach(function (item) {
        typesInItems.add(item.type);
      });
      return this.props.savedObjectMetaData.filter(function (metaData) {
        return typesInItems.has(metaData.type);
      });
    }
  }, {
    key: "getSortOptions",
    value: function getSortOptions() {
      var _this3 = this;

      var sortOptions = [_react.default.createElement(_eui.EuiContextMenuItem, {
        key: "asc",
        icon: this.state.sortDirection === 'asc' || this.state.query === '' && this.state.sortDirection !== 'desc' ? 'check' : 'empty',
        onClick: function onClick() {
          _this3.setState({
            sortDirection: 'asc'
          });
        }
      }, _i18n.i18n.translate('kibana-react.savedObjects.finder.sortAsc', {
        defaultMessage: 'Ascending'
      })), _react.default.createElement(_eui.EuiContextMenuItem, {
        key: "desc",
        icon: this.state.sortDirection === 'desc' ? 'check' : 'empty',
        onClick: function onClick() {
          _this3.setState({
            sortDirection: 'desc'
          });
        }
      }, _i18n.i18n.translate('kibana-react.savedObjects.finder.sortDesc', {
        defaultMessage: 'Descending'
      }))];

      if (this.state.query) {
        sortOptions.push(_react.default.createElement(_eui.EuiContextMenuItem, {
          key: "auto",
          icon: !this.state.sortDirection ? 'check' : 'empty',
          onClick: function onClick() {
            _this3.setState({
              sortDirection: undefined
            });
          }
        }, _i18n.i18n.translate('kibana-react.savedObjects.finder.sortAuto', {
          defaultMessage: 'Best match'
        })));
      }

      return sortOptions;
    }
  }, {
    key: "renderSearchBar",
    value: function renderSearchBar() {
      var _this4 = this;

      var availableSavedObjectMetaData = this.getAvailableSavedObjectMetaData();
      return _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "m"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }, _react.default.createElement(_eui.EuiFieldSearch, {
        placeholder: _i18n.i18n.translate('kibana-react.savedObjects.finder.searchPlaceholder', {
          defaultMessage: 'Search…'
        }),
        "aria-label": _i18n.i18n.translate('kibana-react.savedObjects.finder.searchPlaceholder', {
          defaultMessage: 'Search…'
        }),
        fullWidth: true,
        value: this.state.query,
        onChange: function onChange(e) {
          _this4.setState({
            query: e.target.value
          }, _this4.fetchItems);
        },
        "data-test-subj": "savedObjectFinderSearchInput",
        isLoading: this.state.isFetchingItems
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiPopover, {
        id: "addPanelSortPopover",
        panelClassName: "euiFilterGroup__popoverPanel",
        panelPaddingSize: "none",
        isOpen: this.state.sortOpen,
        closePopover: function closePopover() {
          return _this4.setState({
            sortOpen: false
          });
        },
        button: _react.default.createElement(_eui.EuiFilterButton, {
          onClick: function onClick() {
            return _this4.setState(function (_ref3) {
              var sortOpen = _ref3.sortOpen;
              return {
                sortOpen: !sortOpen
              };
            });
          },
          iconType: "arrowDown",
          isSelected: this.state.sortOpen,
          "data-test-subj": "savedObjectFinderSortButton"
        }, _i18n.i18n.translate('kibana-react.savedObjects.finder.sortButtonLabel', {
          defaultMessage: 'Sort'
        }))
      }, _react.default.createElement(FixedEuiContextMenuPanel, {
        watchedItemProps: ['icon', 'disabled'],
        items: this.getSortOptions()
      })), this.props.showFilter && _react.default.createElement(_eui.EuiPopover, {
        id: "addPanelFilterPopover",
        panelClassName: "euiFilterGroup__popoverPanel",
        panelPaddingSize: "none",
        isOpen: this.state.filterOpen,
        closePopover: function closePopover() {
          return _this4.setState({
            filterOpen: false
          });
        },
        button: _react.default.createElement(_eui.EuiFilterButton, {
          onClick: function onClick() {
            return _this4.setState(function (_ref4) {
              var filterOpen = _ref4.filterOpen;
              return {
                filterOpen: !filterOpen
              };
            });
          },
          iconType: "arrowDown",
          "data-test-subj": "savedObjectFinderFilterButton",
          isSelected: this.state.filterOpen,
          numFilters: this.props.savedObjectMetaData.length,
          hasActiveFilters: this.state.filteredTypes.length > 0,
          numActiveFilters: this.state.filteredTypes.length
        }, _i18n.i18n.translate('kibana-react.savedObjects.finder.filterButtonLabel', {
          defaultMessage: 'Types'
        }))
      }, _react.default.createElement(FixedEuiContextMenuPanel, {
        watchedItemProps: ['icon', 'disabled'],
        items: this.props.savedObjectMetaData.map(function (metaData) {
          return _react.default.createElement(_eui.EuiContextMenuItem, {
            key: metaData.type,
            disabled: !availableSavedObjectMetaData.includes(metaData),
            icon: _this4.state.filteredTypes.includes(metaData.type) ? 'check' : 'empty',
            "data-test-subj": "savedObjectFinderFilter-".concat(metaData.type),
            onClick: function onClick() {
              _this4.setState(function (_ref5) {
                var filteredTypes = _ref5.filteredTypes;
                return {
                  filteredTypes: filteredTypes.includes(metaData.type) ? filteredTypes.filter(function (t) {
                    return t !== metaData.type;
                  }) : [].concat(_toConsumableArray(filteredTypes), [metaData.type]),
                  page: 0
                };
              });
            }
          }, metaData.name);
        })
      })))));
    }
  }, {
    key: "renderListing",
    value: function renderListing() {
      var _this5 = this;

      var items = this.state.items.length === 0 ? [] : this.getPageOfItems();
      var _this$props = this.props,
          onChoose = _this$props.onChoose,
          savedObjectMetaData = _this$props.savedObjectMetaData;
      return _react.default.createElement(_react.default.Fragment, null, this.state.isFetchingItems && this.state.items.length === 0 && _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiLoadingSpinner, {
        "data-test-subj": "savedObjectFinderLoadingIndicator"
      }))), items.length > 0 ? _react.default.createElement(FixedEuiListGroup, {
        "data-test-subj": "savedObjectFinderItemList",
        maxWidth: false
      }, items.map(function (item) {
        var currentSavedObjectMetaData = savedObjectMetaData.find(function (metaData) {
          return metaData.type === item.type;
        });
        var fullName = currentSavedObjectMetaData.getTooltipForSavedObject ? currentSavedObjectMetaData.getTooltipForSavedObject(item.savedObject) : "".concat(item.title, " (").concat(currentSavedObjectMetaData.name, ")");
        var iconType = (currentSavedObjectMetaData || {
          getIconForSavedObject: function getIconForSavedObject() {
            return 'document';
          }
        }).getIconForSavedObject(item.savedObject);
        return _react.default.createElement(_eui.EuiListGroupItem, {
          key: item.id,
          iconType: iconType,
          label: item.title,
          onClick: onChoose ? function () {
            onChoose(item.id, item.type, fullName, item.savedObject);
          } : undefined,
          title: fullName,
          "data-test-subj": "savedObjectTitle".concat((item.title || '').split(' ').join('-'))
        });
      })) : !this.state.isFetchingItems && _react.default.createElement(_eui.EuiEmptyPrompt, {
        body: this.props.noItemsMessage
      }), this.getPageCount() > 1 && (this.props.fixedPageSize ? _react.default.createElement(_eui.EuiPagination, {
        activePage: this.state.page,
        pageCount: this.getPageCount(),
        onPageClick: function onPageClick(page) {
          _this5.setState({
            page: page
          });
        }
      }) : _react.default.createElement(_eui.EuiTablePagination, {
        activePage: this.state.page,
        pageCount: this.getPageCount(),
        onChangePage: function onChangePage(page) {
          _this5.setState({
            page: page
          });
        },
        onChangeItemsPerPage: function onChangeItemsPerPage(perPage) {
          _this5.setState({
            perPage: perPage
          });
        },
        itemsPerPage: this.state.perPage,
        itemsPerPageOptions: [5, 10, 15, 25]
      })));
    }
  }]);

  return SavedObjectFinderUi;
}(_react.default.Component);

exports.SavedObjectFinderUi = SavedObjectFinderUi;

_defineProperty(SavedObjectFinderUi, "propTypes", {
  onChoose: _propTypes.default.func,
  noItemsMessage: _propTypes.default.node,
  savedObjectMetaData: _propTypes.default.array.isRequired,
  initialPageSize: _propTypes.default.oneOf([5, 10, 15, 25]),
  fixedPageSize: _propTypes.default.number,
  showFilter: _propTypes.default.bool
});

var SavedObjectFinder = function SavedObjectFinder(props) {
  var _useKibana = (0, _context2.useKibana)(),
      services = _useKibana.services;

  return _react.default.createElement(SavedObjectFinderUi, _extends({}, props, {
    savedObjects: services.savedObject,
    uiSettings: services.uiSettings
  }));
};

exports.SavedObjectFinder = SavedObjectFinder;