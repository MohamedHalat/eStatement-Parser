"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleHistory = ConsoleHistory;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _eui = require("@elastic/eui");

var _contexts = require("../../contexts");

var _history_viewer = require("./history_viewer");

var _editor_context = require("../../contexts/editor_context");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CHILD_ELEMENT_PREFIX = 'historyReq';

function ConsoleHistory(_ref) {
  var close = _ref.close;

  var _useServicesContext = (0, _contexts.useServicesContext)(),
      history = _useServicesContext.services.history;

  var _useEditorReadContext = (0, _editor_context.useEditorReadContext)(),
      readOnlySettings = _useEditorReadContext.settings;

  var _useState = (0, _react.useState)(history.getHistory()),
      _useState2 = _slicedToArray(_useState, 2),
      requests = _useState2[0],
      setPastRequests = _useState2[1];

  var clearHistory = (0, _react.useCallback)(function () {
    history.clearHistory();
    setPastRequests(history.getHistory());
  }, [history]);
  var listRef = (0, _react.useRef)(null);

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      viewingReq = _useState4[0],
      setViewingReq = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedIndex = _useState6[0],
      setSelectedIndex = _useState6[1];

  var selectedReq = (0, _react.useRef)(null);
  var describeReq = (0, _react.useMemo)(function () {
    var _describeReq = function _describeReq(req) {
      var endpoint = req.endpoint;
      var date = (0, _moment.default)(req.time);
      var formattedDate = date.format('MMM D');

      if (date.diff((0, _moment.default)(), 'days') > -7) {
        formattedDate = date.fromNow();
      }

      return "".concat(endpoint, " (").concat(formattedDate, ")");
    };

    _describeReq.cache = new WeakMap();
    return (0, _lodash.memoize)(_describeReq);
  }, []);
  var scrollIntoView = (0, _react.useCallback)(function (idx) {
    var activeDescendant = listRef.current.querySelector("#".concat(CHILD_ELEMENT_PREFIX).concat(idx));

    if (activeDescendant) {
      activeDescendant.scrollIntoView();
    }
  }, []);
  var initialize = (0, _react.useCallback)(function () {
    var nextSelectedIndex = 0;
    describeReq.cache = new WeakMap();
    setViewingReq(requests[nextSelectedIndex]);
    selectedReq.current = requests[nextSelectedIndex];
    setSelectedIndex(nextSelectedIndex);
    scrollIntoView(nextSelectedIndex);
  }, [describeReq, requests, scrollIntoView]);

  var clear = function clear() {
    clearHistory();
    initialize();
  };

  var restoreRequestFromHistory = (0, _hooks.useRestoreRequestFromHistory)();
  (0, _react.useEffect)(function () {
    initialize();
  }, [initialize]);
  (0, _react.useEffect)(function () {
    var done = history.change(setPastRequests);
    return function () {
      return done();
    };
  }, [history]);
  /* eslint-disable */

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "conHistory"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, _i18n.i18n.translate('console.historyPage.pageTitle', {
    defaultMessage: 'History'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("div", {
    className: "conHistory__body"
  }, _react.default.createElement("ul", {
    ref: listRef,
    onKeyDown: function onKeyDown(ev) {
      if (ev.keyCode === _eui.keyCodes.ENTER) {
        restoreRequestFromHistory(selectedReq.current);
        return;
      }

      var currentIdx = selectedIndex;

      if (ev.keyCode === _eui.keyCodes.UP) {
        ev.preventDefault();
        --currentIdx;
      } else if (ev.keyCode === _eui.keyCodes.DOWN) {
        ev.preventDefault();
        ++currentIdx;
      }

      var nextSelectedIndex = Math.min(Math.max(0, currentIdx), requests.length - 1);
      setViewingReq(requests[nextSelectedIndex]);
      selectedReq.current = requests[nextSelectedIndex];
      setSelectedIndex(nextSelectedIndex);
      scrollIntoView(nextSelectedIndex);
    },
    role: "listbox",
    className: "list-group conHistory__reqs",
    tabIndex: 0,
    "aria-activedescendant": "".concat(CHILD_ELEMENT_PREFIX).concat(selectedIndex),
    "aria-label": _i18n.i18n.translate('console.historyPage.requestListAriaLabel', {
      defaultMessage: 'History of sent requests'
    })
  }, requests.map(function (req, idx) {
    var reqDescription = describeReq(req);
    var isSelected = viewingReq === req;
    return (// Ignore a11y issues on li's
      // eslint-disable-next-line
      _react.default.createElement("li", {
        key: idx,
        id: "".concat(CHILD_ELEMENT_PREFIX).concat(idx),
        className: "list-group-item conHistory__req ".concat(isSelected ? 'conHistory__req-selected' : ''),
        onClick: function onClick() {
          setViewingReq(req);
          selectedReq.current = req;
          setSelectedIndex(idx);
        },
        role: "option",
        onMouseEnter: function onMouseEnter() {
          return setViewingReq(req);
        },
        onMouseLeave: function onMouseLeave() {
          return setViewingReq(selectedReq.current);
        },
        onDoubleClick: function onDoubleClick() {
          return restoreRequestFromHistory(selectedReq.current);
        },
        "aria-label": _i18n.i18n.translate('console.historyPage.itemOfRequestListAriaLabel', {
          defaultMessage: 'Request: {historyItem}',
          values: {
            historyItem: reqDescription
          }
        }),
        "aria-selected": isSelected
      }, reqDescription, _react.default.createElement("span", {
        className: "conHistory__reqIcon"
      }, _react.default.createElement(_eui.EuiIcon, {
        type: "arrowRight"
      })))
    );
  })), _react.default.createElement("div", {
    className: "conHistory__body__spacer"
  }), _react.default.createElement(_history_viewer.HistoryViewer, {
    settings: readOnlySettings,
    req: viewingReq
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "danger",
    onClick: function onClick() {
      return clear();
    }
  }, _i18n.i18n.translate('console.historyPage.clearHistoryButtonLabel', {
    defaultMessage: 'Clear'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "primary",
    onClick: function onClick() {
      return close();
    }
  }, _i18n.i18n.translate('console.historyPage.closehistoryButtonLabel', {
    defaultMessage: 'Close'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    color: "primary",
    disabled: !selectedReq,
    onClick: function onClick() {
      return restoreRequestFromHistory(selectedReq.current);
    }
  }, _i18n.i18n.translate('console.historyPage.applyHistoryButtonLabel', {
    defaultMessage: 'Apply'
  }))))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }));
}