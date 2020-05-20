"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryStringInput = exports.QueryStringInputUI = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _ = require("../..");

var _public = require("../../../../kibana_react/public");

var _fetch_index_patterns = require("./fetch_index_patterns");

var _language_switcher = require("./language_switcher");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var KEY_CODES = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  ESC: 27,
  TAB: 9,
  HOME: 36,
  END: 35
};
var recentSearchType = 'recentSearch';

var QueryStringInputUI =
/*#__PURE__*/
function (_Component) {
  _inherits(QueryStringInputUI, _Component);

  function QueryStringInputUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, QueryStringInputUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(QueryStringInputUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isSuggestionsVisible: false,
      index: null,
      suggestions: [],
      suggestionLimit: 50,
      selectionStart: null,
      selectionEnd: null,
      indexPatterns: []
    });

    _defineProperty(_assertThisInitialized(_this), "inputRef", null);

    _defineProperty(_assertThisInitialized(_this), "persistedLog", void 0);

    _defineProperty(_assertThisInitialized(_this), "abortController", void 0);

    _defineProperty(_assertThisInitialized(_this), "services", _this.props.kibana.services);

    _defineProperty(_assertThisInitialized(_this), "componentIsUnmounting", false);

    _defineProperty(_assertThisInitialized(_this), "getQueryString", function () {
      return (0, _.toUser)(_this.props.query.query);
    });

    _defineProperty(_assertThisInitialized(_this), "fetchIndexPatterns", function _callee() {
      var stringPatterns, objectPatterns, objectPatternsFromStrings;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              stringPatterns = _this.props.indexPatterns.filter(function (indexPattern) {
                return typeof indexPattern === 'string';
              });
              objectPatterns = _this.props.indexPatterns.filter(function (indexPattern) {
                return typeof indexPattern !== 'string';
              });
              _context.next = 4;
              return regeneratorRuntime.awrap((0, _fetch_index_patterns.fetchIndexPatterns)(_this.services.savedObjects.client, stringPatterns, _this.services.uiSettings));

            case 4:
              objectPatternsFromStrings = _context.sent;

              _this.setState({
                indexPatterns: [].concat(_toConsumableArray(objectPatterns), _toConsumableArray(objectPatternsFromStrings))
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getSuggestions", function _callee2() {
      var uiSettings, language, queryString, recentSearchSuggestions, autocompleteProvider, indexPatterns, getAutocompleteSuggestions, _this$inputRef, selectionStart, selectionEnd, suggestions;

      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this.inputRef) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              uiSettings = _this.services.uiSettings;
              language = _this.props.query.language;
              queryString = _this.getQueryString();
              recentSearchSuggestions = _this.getRecentSearchSuggestions(queryString);
              autocompleteProvider = _this.services.data.autocomplete.getProvider(language);

              if (!(!autocompleteProvider || !Array.isArray(_this.state.indexPatterns) || (0, _lodash.compact)(_this.state.indexPatterns).length === 0)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", recentSearchSuggestions);

            case 9:
              indexPatterns = _this.state.indexPatterns;
              getAutocompleteSuggestions = autocompleteProvider({
                config: uiSettings,
                indexPatterns: indexPatterns
              });
              _this$inputRef = _this.inputRef, selectionStart = _this$inputRef.selectionStart, selectionEnd = _this$inputRef.selectionEnd;

              if (!(selectionStart === null || selectionEnd === null)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return");

            case 14:
              _context2.prev = 14;
              if (_this.abortController) _this.abortController.abort();
              _this.abortController = new AbortController();
              _context2.next = 19;
              return regeneratorRuntime.awrap(getAutocompleteSuggestions({
                query: queryString,
                selectionStart: selectionStart,
                selectionEnd: selectionEnd,
                signal: _this.abortController.signal
              }));

            case 19:
              suggestions = _context2.sent;
              return _context2.abrupt("return", [].concat(_toConsumableArray(suggestions), _toConsumableArray(recentSearchSuggestions)));

            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](14);

              if (!(_context2.t0.message === 'The user aborted a request.')) {
                _context2.next = 27;
                break;
              }

              return _context2.abrupt("return");

            case 27:
              throw _context2.t0;

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[14, 23]]);
    });

    _defineProperty(_assertThisInitialized(_this), "getRecentSearchSuggestions", function (query) {
      if (!_this.persistedLog) {
        return [];
      }

      var recentSearches = _this.persistedLog.get();

      var matchingRecentSearches = recentSearches.filter(function (recentQuery) {
        var recentQueryString = _typeof(recentQuery) === 'object' ? (0, _.toUser)(recentQuery) : recentQuery;
        return recentQueryString.includes(query);
      });
      return matchingRecentSearches.map(function (recentSearch) {
        var text = (0, _.toUser)(recentSearch);
        var start = 0;
        var end = query.length;
        return {
          type: recentSearchType,
          text: text,
          start: start,
          end: end
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateSuggestions", (0, _lodash.debounce)(function _callee3() {
      var suggestions;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_this.getSuggestions());

            case 2:
              _context3.t0 = _context3.sent;

              if (_context3.t0) {
                _context3.next = 5;
                break;
              }

              _context3.t0 = [];

            case 5:
              suggestions = _context3.t0;

              if (!_this.componentIsUnmounting) {
                _this.setState({
                  suggestions: suggestions
                });
              }

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    }, 100));

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (query) {
      if (_this.props.onSubmit) {
        if (_this.persistedLog) {
          _this.persistedLog.add(query.query);
        }

        _this.props.onSubmit({
          query: (0, _.fromUser)(query.query),
          language: query.language
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (query) {
      _this.updateSuggestions();

      if (_this.props.onChange) {
        _this.props.onChange({
          query: (0, _.fromUser)(query.query),
          language: query.language
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onQueryStringChange", function (value) {
      _this.setState({
        isSuggestionsVisible: true,
        index: null,
        suggestionLimit: 50
      });

      _this.onChange({
        query: value,
        language: _this.props.query.language
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (event) {
      _this.onQueryStringChange(event.target.value);
    });

    _defineProperty(_assertThisInitialized(_this), "onClickInput", function (event) {
      if (event.target instanceof HTMLInputElement) {
        _this.onQueryStringChange(event.target.value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      if ([KEY_CODES.LEFT, KEY_CODES.RIGHT, KEY_CODES.HOME, KEY_CODES.END].includes(event.keyCode)) {
        _this.setState({
          isSuggestionsVisible: true
        });

        if (event.target instanceof HTMLInputElement) {
          _this.onQueryStringChange(event.target.value);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      if (event.target instanceof HTMLInputElement) {
        var _this$state = _this.state,
            isSuggestionsVisible = _this$state.isSuggestionsVisible,
            index = _this$state.index;
        var preventDefault = event.preventDefault.bind(event);
        var target = event.target,
            key = event.key,
            metaKey = event.metaKey;
        var value = target.value,
            _selectionStart = target.selectionStart,
            _selectionEnd = target.selectionEnd;

        var updateQuery = function updateQuery(query, newSelectionStart, newSelectionEnd) {
          _this.onQueryStringChange(query);

          _this.setState({
            selectionStart: newSelectionStart,
            selectionEnd: newSelectionEnd
          });
        };

        switch (event.keyCode) {
          case KEY_CODES.DOWN:
            event.preventDefault();

            if (isSuggestionsVisible && index !== null) {
              _this.incrementIndex(index);
            } else {
              _this.setState({
                isSuggestionsVisible: true,
                index: 0
              });
            }

            break;

          case KEY_CODES.UP:
            event.preventDefault();

            if (isSuggestionsVisible && index !== null) {
              _this.decrementIndex(index);
            }

            break;

          case KEY_CODES.ENTER:
            if (!_this.props.bubbleSubmitEvent) {
              event.preventDefault();
            }

            if (isSuggestionsVisible && index !== null && _this.state.suggestions[index]) {
              event.preventDefault();

              _this.selectSuggestion(_this.state.suggestions[index]);
            } else {
              _this.onSubmit(_this.props.query);

              _this.setState({
                isSuggestionsVisible: false
              });
            }

            break;

          case KEY_CODES.ESC:
            event.preventDefault();

            _this.setState({
              isSuggestionsVisible: false,
              index: null
            });

            break;

          case KEY_CODES.TAB:
            _this.setState({
              isSuggestionsVisible: false,
              index: null
            });

            break;

          default:
            if (_selectionStart !== null && _selectionEnd !== null) {
              (0, _.matchPairs)({
                value: value,
                selectionStart: _selectionStart,
                selectionEnd: _selectionEnd,
                key: key,
                metaKey: metaKey,
                updateQuery: updateQuery,
                preventDefault: preventDefault
              });
            }

            break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectSuggestion", function (suggestion) {
      if (!_this.inputRef) {
        return;
      }

      var type = suggestion.type,
          text = suggestion.text,
          start = suggestion.start,
          end = suggestion.end,
          cursorIndex = suggestion.cursorIndex;

      _this.handleNestedFieldSyntaxNotification(suggestion);

      var query = _this.getQueryString();

      var _this$inputRef2 = _this.inputRef,
          selectionStart = _this$inputRef2.selectionStart,
          selectionEnd = _this$inputRef2.selectionEnd;

      if (selectionStart === null || selectionEnd === null) {
        return;
      }

      var value = query.substr(0, selectionStart) + query.substr(selectionEnd);
      var newQueryString = value.substr(0, start) + text + value.substr(end);

      _this.onQueryStringChange(newQueryString);

      _this.setState({
        selectionStart: start + (cursorIndex ? cursorIndex : text.length),
        selectionEnd: start + (cursorIndex ? cursorIndex : text.length)
      });

      if (type === recentSearchType) {
        _this.setState({
          isSuggestionsVisible: false,
          index: null
        });

        _this.onSubmit({
          query: newQueryString,
          language: _this.props.query.language
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleNestedFieldSyntaxNotification", function (suggestion) {
      if ('field' in suggestion && suggestion.field.subType && suggestion.field.subType.nested && !_this.services.storage.get('kibana.KQLNestedQuerySyntaxInfoOptOut')) {
        var _this$services = _this.services,
            notifications = _this$services.notifications,
            docLinks = _this$services.docLinks;

        var onKQLNestedQuerySyntaxInfoOptOut = function onKQLNestedQuerySyntaxInfoOptOut(toast) {
          if (!_this.services.storage) return;

          _this.services.storage.set('kibana.KQLNestedQuerySyntaxInfoOptOut', true);

          notifications.toasts.remove(toast);
        };

        if (notifications && docLinks) {
          var toast = notifications.toasts.add({
            title: _this.props.intl.formatMessage({
              id: 'data.query.queryBar.KQLNestedQuerySyntaxInfoTitle',
              defaultMessage: 'KQL nested query syntax'
            }),
            text: (0, _public.toMountPoint)(_react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
              id: "data.query.queryBar.KQLNestedQuerySyntaxInfoText",
              defaultMessage: "It looks like you're querying on a nested field. You can construct KQL syntax for nested queries in different ways, depending on the results you want. Learn more in our {link}.",
              values: {
                link: _react.default.createElement(_eui.EuiLink, {
                  href: docLinks.links.query.kueryQuerySyntax,
                  target: "_blank"
                }, _react.default.createElement(_react2.FormattedMessage, {
                  id: "data.query.queryBar.KQLNestedQuerySyntaxInfoDocLinkText",
                  defaultMessage: "docs"
                }))
              }
            })), _react.default.createElement(_eui.EuiFlexGroup, {
              justifyContent: "flexEnd",
              gutterSize: "s"
            }, _react.default.createElement(_eui.EuiFlexItem, {
              grow: false
            }, _react.default.createElement(_eui.EuiButton, {
              size: "s",
              onClick: function onClick() {
                return onKQLNestedQuerySyntaxInfoOptOut(toast);
              }
            }, _react.default.createElement(_react2.FormattedMessage, {
              id: "data.query.queryBar.KQLNestedQuerySyntaxInfoOptOutText",
              defaultMessage: "Don't show again"
            }))))))
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "increaseLimit", function () {
      _this.setState({
        suggestionLimit: _this.state.suggestionLimit + 50
      });
    });

    _defineProperty(_assertThisInitialized(_this), "incrementIndex", function (currentIndex) {
      var nextIndex = currentIndex + 1;

      if (currentIndex === null || nextIndex >= _this.state.suggestions.length) {
        nextIndex = 0;
      }

      _this.setState({
        index: nextIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "decrementIndex", function (currentIndex) {
      var previousIndex = currentIndex - 1;

      if (previousIndex < 0) {
        _this.setState({
          index: _this.state.suggestions.length - 1
        });
      } else {
        _this.setState({
          index: previousIndex
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectLanguage", function (language) {
      // Send telemetry info every time the user opts in or out of kuery
      // As a result it is important this function only ever gets called in the
      // UI component's change handler.
      _this.services.http.post('/api/kibana/kql_opt_in_telemetry', {
        body: JSON.stringify({
          opt_in: language === 'kuery'
        })
      });

      _this.services.storage.set('kibana.userQueryLanguage', language);

      var newQuery = {
        query: '',
        language: language
      };

      _this.onChange(newQuery);

      _this.onSubmit(newQuery);
    });

    _defineProperty(_assertThisInitialized(_this), "onOutsideClick", function () {
      if (_this.state.isSuggestionsVisible) {
        _this.setState({
          isSuggestionsVisible: false,
          index: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickSuggestion", function (suggestion) {
      if (!_this.inputRef) {
        return;
      }

      _this.selectSuggestion(suggestion);

      _this.inputRef.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "initPersistedLog", function () {
      var _this$services2 = _this.services,
          uiSettings = _this$services2.uiSettings,
          storage = _this$services2.storage,
          appName = _this$services2.appName;
      _this.persistedLog = _this.props.persistedLog ? _this.props.persistedLog : (0, _.getQueryLog)(uiSettings, storage, appName, _this.props.query.language);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnterSuggestion", function (index) {
      _this.setState({
        index: index
      });
    });

    return _this;
  }

  _createClass(QueryStringInputUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var parsedQuery = (0, _.fromUser)((0, _.toUser)(this.props.query.query));

      if (!(0, _lodash.isEqual)(this.props.query.query, parsedQuery)) {
        this.onChange(_objectSpread({}, this.props.query, {
          query: parsedQuery
        }));
      }

      this.initPersistedLog();
      this.fetchIndexPatterns().then(this.updateSuggestions);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var parsedQuery = (0, _.fromUser)((0, _.toUser)(this.props.query.query));

      if (!(0, _lodash.isEqual)(this.props.query.query, parsedQuery)) {
        this.onChange(_objectSpread({}, this.props.query, {
          query: parsedQuery
        }));
      }

      this.initPersistedLog();

      if (!(0, _lodash.isEqual)(prevProps.indexPatterns, this.props.indexPatterns)) {
        this.fetchIndexPatterns().then(this.updateSuggestions);
      } else if (!(0, _lodash.isEqual)(prevProps.query, this.props.query)) {
        this.updateSuggestions();
      }

      if (this.state.selectionStart !== null && this.state.selectionEnd !== null) {
        if (this.inputRef) {
          // For some reason the type guard above does not make the compiler happy
          // @ts-ignore
          this.inputRef.setSelectionRange(this.state.selectionStart, this.state.selectionEnd);
        }

        this.setState({
          selectionStart: null,
          selectionEnd: null
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.updateSuggestions.cancel();
      this.componentIsUnmounting = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var isSuggestionsVisible = this.state.isSuggestionsVisible && {
        'aria-controls': 'kbnTypeahead__items',
        'aria-owns': 'kbnTypeahead__items'
      };

      var ariaCombobox = _objectSpread({}, isSuggestionsVisible, {
        role: 'combobox'
      });

      return _react.default.createElement(_eui.EuiOutsideClickDetector, {
        onOutsideClick: this.onOutsideClick
      }, _react.default.createElement("div", _extends({}, ariaCombobox, {
        style: {
          position: 'relative'
        },
        "aria-label": _i18n.i18n.translate('data.query.queryBar.comboboxAriaLabel', {
          defaultMessage: 'Search and filter the {pageType} page',
          values: {
            pageType: this.services.appName
          }
        }),
        "aria-haspopup": "true",
        "aria-expanded": this.state.isSuggestionsVisible
      }), _react.default.createElement("div", {
        role: "search"
      }, _react.default.createElement("div", {
        className: "kuiLocalSearchAssistedInput"
      }, _react.default.createElement(_eui.EuiFieldText, {
        placeholder: this.props.placeholder || _i18n.i18n.translate('data.query.queryBar.searchInputPlaceholder', {
          defaultMessage: 'Search'
        }),
        value: this.getQueryString(),
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        onChange: this.onInputChange,
        onClick: this.onClickInput,
        fullWidth: true,
        autoFocus: !this.props.disableAutoFocus,
        inputRef: function inputRef(node) {
          if (node) {
            _this2.inputRef = node;
          }
        },
        autoComplete: "off",
        spellCheck: false,
        "aria-label": _i18n.i18n.translate('data.query.queryBar.searchInputAriaLabel', {
          defaultMessage: 'Start typing to search and filter the {pageType} page',
          values: {
            pageType: this.services.appName
          }
        }),
        type: "text",
        "aria-autocomplete": "list",
        "aria-controls": this.state.isSuggestionsVisible ? 'kbnTypeahead__items' : undefined,
        "aria-activedescendant": this.state.isSuggestionsVisible && typeof this.state.index === 'number' ? "suggestion-".concat(this.state.index) : undefined,
        role: "textbox",
        prepend: this.props.prepend,
        append: _react.default.createElement(_language_switcher.QueryLanguageSwitcher, {
          language: this.props.query.language,
          anchorPosition: this.props.languageSwitcherPopoverAnchorPosition,
          onSelectLanguage: this.onSelectLanguage
        }),
        "data-test-subj": this.props.dataTestSubj || 'queryInput'
      }))), _react.default.createElement(_.SuggestionsComponent, {
        show: this.state.isSuggestionsVisible,
        suggestions: this.state.suggestions.slice(0, this.state.suggestionLimit),
        index: this.state.index,
        onClick: this.onClickSuggestion,
        onMouseEnter: this.onMouseEnterSuggestion,
        loadMore: this.increaseLimit
      })));
    }
  }]);

  return QueryStringInputUI;
}(_react.Component);

exports.QueryStringInputUI = QueryStringInputUI;
var QueryStringInput = (0, _react2.injectI18n)((0, _public.withKibana)(QueryStringInputUI));
exports.QueryStringInput = QueryStringInput;