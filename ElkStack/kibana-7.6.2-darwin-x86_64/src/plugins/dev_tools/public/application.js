"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = renderApp;

var _react = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _reactRouterDom = require("react-router-dom");

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function DevToolsWrapper(_ref) {
  var devTools = _ref.devTools,
      activeDevTool = _ref.activeDevTool,
      appMountContext = _ref.appMountContext,
      updateRoute = _ref.updateRoute;
  var mountedTool = (0, React.useRef)(null);
  (0, React.useEffect)(function () {
    return function () {
      if (mountedTool.current) {
        mountedTool.current.unmountHandler();
      }
    };
  }, []);
  return React.createElement("main", {
    className: "devApp"
  }, React.createElement(_eui.EuiTabs, null, devTools.map(function (currentDevTool) {
    return React.createElement(_eui.EuiToolTip, {
      content: currentDevTool.tooltipContent,
      key: currentDevTool.id
    }, React.createElement(_eui.EuiTab, {
      disabled: currentDevTool.disabled,
      isSelected: currentDevTool === activeDevTool,
      onClick: function onClick() {
        if (!currentDevTool.disabled) {
          updateRoute("/dev_tools/".concat(currentDevTool.id));
        }
      }
    }, currentDevTool.title));
  })), React.createElement("div", {
    className: "devApp__container",
    role: "tabpanel",
    "data-test-subj": activeDevTool.id,
    ref: function _callee(element) {
      var params, unmountHandler;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(element && (mountedTool.current === null || mountedTool.current.devTool !== activeDevTool || mountedTool.current.mountpoint !== element))) {
                _context.next = 14;
                break;
              }

              if (mountedTool.current) {
                mountedTool.current.unmountHandler();
              }

              params = {
                element: element,
                appBasePath: '',
                onAppLeave: function onAppLeave() {
                  return undefined;
                }
              };

              if (!isAppMountDeprecated(activeDevTool.mount)) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(activeDevTool.mount(appMountContext, params));

            case 6:
              _context.t0 = _context.sent;
              _context.next = 12;
              break;

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(activeDevTool.mount(params));

            case 11:
              _context.t0 = _context.sent;

            case 12:
              unmountHandler = _context.t0;
              mountedTool.current = {
                devTool: activeDevTool,
                mountpoint: element,
                unmountHandler: unmountHandler
              };

            case 14:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }));
}

function redirectOnMissingCapabilities(appMountContext) {
  if (!appMountContext.core.application.capabilities.dev_tools.show) {
    window.location.hash = '/home';
    return true;
  }

  return false;
}

function setBadge(appMountContext) {
  if (appMountContext.core.application.capabilities.dev_tools.save) {
    return;
  }

  appMountContext.core.chrome.setBadge({
    text: _i18n.i18n.translate('devTools.badge.readOnly.text', {
      defaultMessage: 'Read only'
    }),
    tooltip: _i18n.i18n.translate('devTools.badge.readOnly.tooltip', {
      defaultMessage: 'Unable to save'
    }),
    iconType: 'glasses'
  });
}

function setBreadcrumbs(appMountContext) {
  appMountContext.core.chrome.setBreadcrumbs([{
    text: _i18n.i18n.translate('devTools.k7BreadcrumbsDevToolsLabel', {
      defaultMessage: 'Dev Tools'
    }),
    href: '#/dev_tools'
  }]);
}

function renderApp(element, appMountContext, basePath, devTools) {
  if (redirectOnMissingCapabilities(appMountContext)) {
    return function () {};
  }

  setBadge(appMountContext);
  setBreadcrumbs(appMountContext);

  _reactDom.default.render(React.createElement(_react.I18nProvider, null, React.createElement(_reactRouterDom.HashRouter, null, React.createElement(_reactRouterDom.Switch, null, devTools.map(function (devTool) {
    return React.createElement(_reactRouterDom.Route, {
      key: devTool.id,
      path: "/dev_tools/".concat(devTool.id),
      exact: !devTool.enableRouting,
      render: function render(props) {
        return React.createElement(DevToolsWrapper, {
          updateRoute: props.history.push,
          activeDevTool: devTool,
          devTools: devTools,
          appMountContext: appMountContext
        });
      }
    });
  }), React.createElement(_reactRouterDom.Route, {
    path: "/dev_tools"
  }, React.createElement(_reactRouterDom.Redirect, {
    to: "/dev_tools/".concat(devTools[0].id)
  }))))), element);

  return function () {
    return _reactDom.default.unmountComponentAtNode(element);
  };
}

function isAppMountDeprecated(mount) {
  // Mount functions with two arguments are assumed to expect deprecated `context` object.
  return mount.length === 2;
}