"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryBarTopRow = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _ = require("../..");

var _public = require("../../../../kibana_react/public");

var _query_string_input = require("./query_string_input");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function QueryBarTopRowUI(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDateRangeInvalid = _useState2[0],
      setIsDateRangeInvalid = _useState2[1];

  var kibana = (0, _public.useKibana)();
  var _kibana$services = kibana.services,
      uiSettings = _kibana$services.uiSettings,
      notifications = _kibana$services.notifications,
      storage = _kibana$services.storage,
      appName = _kibana$services.appName,
      docLinks = _kibana$services.docLinks;
  var kueryQuerySyntaxLink = docLinks.links.query.kueryQuerySyntax;
  var queryLanguage = props.query && props.query.language;

  var persistedLog = _react.default.useMemo(function () {
    return queryLanguage && uiSettings && storage && appName ? (0, _.getQueryLog)(uiSettings, storage, appName, queryLanguage) : undefined;
  }, [appName, queryLanguage, uiSettings, storage]);

  function onClickSubmitButton(event) {
    if (persistedLog && props.query) {
      persistedLog.add(props.query.query);
    }

    event.preventDefault();
    onSubmit({
      query: props.query,
      dateRange: getDateRange()
    });
  }

  function getDateRange() {
    var defaultTimeSetting = uiSettings.get('timepicker:timeDefaults');
    return {
      from: props.dateRangeFrom || defaultTimeSetting.from,
      to: props.dateRangeTo || defaultTimeSetting.to
    };
  }

  function onQueryChange(query) {
    props.onChange({
      query: query,
      dateRange: getDateRange()
    });
  }

  function onTimeChange(_ref) {
    var start = _ref.start,
        end = _ref.end,
        isInvalid = _ref.isInvalid,
        isQuickSelection = _ref.isQuickSelection;
    setIsDateRangeInvalid(isInvalid);
    var retVal = {
      query: props.query,
      dateRange: {
        from: start,
        to: end
      }
    };

    if (isQuickSelection) {
      props.onSubmit(retVal);
    } else {
      props.onChange(retVal);
    }
  }

  function onRefresh(_ref2) {
    var start = _ref2.start,
        end = _ref2.end;
    var retVal = {
      dateRange: {
        from: start,
        to: end
      }
    };

    if (props.onRefresh) {
      props.onRefresh(retVal);
    }
  }

  function onSubmit(_ref3) {
    var query = _ref3.query,
        dateRange = _ref3.dateRange;
    handleLuceneSyntaxWarning();

    if (props.timeHistory) {
      props.timeHistory.add(dateRange);
    }

    props.onSubmit({
      query: query,
      dateRange: dateRange
    });
  }

  function onInputSubmit(query) {
    onSubmit({
      query: query,
      dateRange: getDateRange()
    });
  }

  function toAbsoluteString(value) {
    var roundUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var valueAsMoment = _datemath.default.parse(value, {
      roundUp: roundUp
    });

    if (!valueAsMoment) {
      return value;
    }

    return valueAsMoment.toISOString();
  }

  function renderQueryInput() {
    if (!shouldRenderQueryInput()) return;
    return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_query_string_input.QueryStringInput, {
      disableAutoFocus: props.disableAutoFocus,
      indexPatterns: props.indexPatterns,
      prepend: props.prepend,
      query: props.query,
      screenTitle: props.screenTitle,
      onChange: onQueryChange,
      onSubmit: onInputSubmit,
      persistedLog: persistedLog,
      dataTestSubj: props.dataTestSubj
    }));
  }

  function renderSharingMetaFields() {
    var _getDateRange = getDateRange(),
        from = _getDateRange.from,
        to = _getDateRange.to;

    var dateRangePretty = (0, _eui.prettyDuration)(toAbsoluteString(from), toAbsoluteString(to), [], uiSettings.get('dateFormat'));
    return _react.default.createElement("div", {
      "data-shared-timefilter-duration": dateRangePretty,
      "data-test-subj": "dataSharedTimefilterDuration"
    });
  }

  function shouldRenderDatePicker() {
    return Boolean(props.showDatePicker || props.showAutoRefreshOnly);
  }

  function shouldRenderQueryInput() {
    return Boolean(props.showQueryInput && props.indexPatterns && props.query && storage);
  }

  function renderUpdateButton() {
    var button = props.customSubmitButton ? _react.default.cloneElement(props.customSubmitButton, {
      onClick: onClickSubmitButton
    }) : _react.default.createElement(_eui.EuiSuperUpdateButton, {
      needsUpdate: props.isDirty,
      isDisabled: isDateRangeInvalid,
      isLoading: props.isLoading,
      onClick: onClickSubmitButton,
      "data-test-subj": "querySubmitButton"
    });

    if (!shouldRenderDatePicker()) {
      return button;
    }

    return _react.default.createElement(_eui.EuiFlexGroup, {
      responsive: false,
      gutterSize: "s"
    }, renderDatePicker(), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, button));
  }

  function renderDatePicker() {
    if (!shouldRenderDatePicker()) {
      return null;
    }

    var recentlyUsedRanges;

    if (props.timeHistory) {
      recentlyUsedRanges = props.timeHistory.get().map(function (_ref4) {
        var from = _ref4.from,
            to = _ref4.to;
        return {
          start: from,
          end: to
        };
      });
    }

    var commonlyUsedRanges = uiSettings.get('timepicker:quickRanges').map(function (_ref5) {
      var from = _ref5.from,
          to = _ref5.to,
          display = _ref5.display;
      return {
        start: from,
        end: to,
        label: display
      };
    });
    return _react.default.createElement(_eui.EuiFlexItem, {
      className: "kbnQueryBar__datePickerWrapper"
    }, _react.default.createElement(_eui.EuiSuperDatePicker, {
      start: props.dateRangeFrom,
      end: props.dateRangeTo,
      isPaused: props.isRefreshPaused,
      refreshInterval: props.refreshInterval,
      onTimeChange: onTimeChange,
      onRefresh: onRefresh,
      onRefreshChange: props.onRefreshChange,
      showUpdateButton: false,
      recentlyUsedRanges: recentlyUsedRanges,
      commonlyUsedRanges: commonlyUsedRanges,
      dateFormat: uiSettings.get('dateFormat'),
      isAutoRefreshOnly: props.showAutoRefreshOnly
    }));
  }

  function handleLuceneSyntaxWarning() {
    if (!props.query) return;
    var intl = props.intl;
    var _props$query = props.query,
        query = _props$query.query,
        language = _props$query.language;

    if (language === 'kuery' && typeof query === 'string' && (!storage || !storage.get('kibana.luceneSyntaxWarningOptOut')) && _.esKuery.doesKueryExpressionHaveLuceneSyntaxError(query)) {
      var toast = notifications.toasts.addWarning({
        title: intl.formatMessage({
          id: 'data.query.queryBar.luceneSyntaxWarningTitle',
          defaultMessage: 'Lucene syntax warning'
        }),
        text: (0, _public.toMountPoint)(_react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "data.query.queryBar.luceneSyntaxWarningMessage",
          defaultMessage: "It looks like you may be trying to use Lucene query syntax, although you have Kibana Query Language (KQL) selected. Please review the KQL docs {link}.",
          values: {
            link: _react.default.createElement(_eui.EuiLink, {
              href: kueryQuerySyntaxLink,
              target: "_blank"
            }, _react.default.createElement(_react2.FormattedMessage, {
              id: "data.query.queryBar.syntaxOptionsDescription.docsLinkText",
              defaultMessage: "here"
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
            return onLuceneSyntaxWarningOptOut(toast);
          }
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "data.query.queryBar.luceneSyntaxWarningOptOutText",
          defaultMessage: "Don't show again"
        }))))))
      });
    }
  }

  function onLuceneSyntaxWarningOptOut(toast) {
    if (!storage) return;
    storage.set('kibana.luceneSyntaxWarningOptOut', true);
    notifications.toasts.remove(toast);
  }

  var classes = (0, _classnames.default)('kbnQueryBar', {
    'kbnQueryBar--withDatePicker': props.showDatePicker
  });
  return _react.default.createElement(_eui.EuiFlexGroup, {
    className: classes,
    responsive: !!props.showDatePicker,
    gutterSize: "s",
    justifyContent: "flexEnd"
  }, renderQueryInput(), renderSharingMetaFields(), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, renderUpdateButton()));
}

QueryBarTopRowUI.defaultProps = {
  showQueryInput: true,
  showDatePicker: true,
  showAutoRefreshOnly: false
};
var QueryBarTopRow = (0, _react2.injectI18n)(QueryBarTopRowUI);
exports.QueryBarTopRow = QueryBarTopRow;