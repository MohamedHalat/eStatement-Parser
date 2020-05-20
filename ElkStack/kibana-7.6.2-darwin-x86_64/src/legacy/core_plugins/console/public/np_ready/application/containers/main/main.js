"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = Main;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _console_history = require("../console_history");

var _editor = require("../editor");

var _settings = require("../settings");

var _components = require("../../components");

var _contexts = require("../../contexts");

var _get_top_nav = require("./get_top_nav");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Main() {
  var _useServicesContext = (0, _contexts.useServicesContext)(),
      storage = _useServicesContext.services.storage;

  var _useEditorReadContext = (0, _contexts.useEditorReadContext)(),
      editorsReady = _useEditorReadContext.ready;

  var _useState = (0, _react.useState)(function () {
    return storage.get('version_welcome_shown') !== '@@SENSE_REVISION';
  }),
      _useState2 = _slicedToArray(_useState, 2),
      showWelcome = _useState2[0],
      setShowWelcomePanel = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showingHistory = _useState4[0],
      setShowHistory = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showSettings = _useState6[0],
      setShowSettings = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showHelp = _useState8[0],
      setShowHelp = _useState8[1];

  var renderConsoleHistory = function renderConsoleHistory() {
    return editorsReady ? _react.default.createElement(_console_history.ConsoleHistory, {
      close: function close() {
        return setShowHistory(false);
      }
    }) : null;
  };

  return _react.default.createElement("div", {
    id: "consoleRoot"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    className: "consoleContainer",
    gutterSize: "none",
    direction: "column",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    className: "euiScreenReaderOnly"
  }, _react.default.createElement("h1", null, _i18n.i18n.translate('console.pageHeading', {
    defaultMessage: 'Console'
  }))), _react.default.createElement(_components.TopNavMenu, {
    items: (0, _get_top_nav.getTopNavConfig)({
      onClickHistory: function onClickHistory() {
        return setShowHistory(!showingHistory);
      },
      onClickSettings: function onClickSettings() {
        return setShowSettings(true);
      },
      onClickHelp: function onClickHelp() {
        return setShowHelp(!showHelp);
      }
    })
  })), showingHistory ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, renderConsoleHistory()) : null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_editor.Editor, null))), showWelcome ? _react.default.createElement(_components.WelcomePanel, {
    onDismiss: function onDismiss() {
      storage.set('version_welcome_shown', '@@SENSE_REVISION');
      setShowWelcomePanel(false);
    }
  }) : null, showSettings ? _react.default.createElement(_settings.Settings, {
    onClose: function onClose() {
      return setShowSettings(false);
    }
  }) : null, showHelp ? _react.default.createElement(_components.HelpPanel, {
    onClose: function onClose() {
      return setShowHelp(false);
    }
  }) : null);
}