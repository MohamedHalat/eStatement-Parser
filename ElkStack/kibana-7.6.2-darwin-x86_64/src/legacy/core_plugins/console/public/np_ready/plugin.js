"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleUIPlugin = void 0;

var _reactDom = require("react-dom");

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConsoleUIPlugin =
/*#__PURE__*/
function () {
  // @ts-ignore
  function ConsoleUIPlugin(ctx) {
    _classCallCheck(this, ConsoleUIPlugin);

    this.ctx = ctx;
  }

  _createClass(ConsoleUIPlugin, [{
    key: "setup",
    value: function setup(_ref, pluginSet) {
      var notifications, _pluginSet$__LEGACY, I18nContext, elasticsearchUrl, category, dev_tools, home;

      return regeneratorRuntime.async(function setup$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              notifications = _ref.notifications;
              _pluginSet$__LEGACY = pluginSet.__LEGACY, I18nContext = _pluginSet$__LEGACY.I18nContext, elasticsearchUrl = _pluginSet$__LEGACY.elasticsearchUrl, category = _pluginSet$__LEGACY.category, dev_tools = pluginSet.dev_tools, home = pluginSet.home;
              home.featureCatalogue.register({
                id: 'console',
                title: _i18n.i18n.translate('console.devToolsTitle', {
                  defaultMessage: 'Console'
                }),
                description: _i18n.i18n.translate('console.devToolsDescription', {
                  defaultMessage: 'Skip cURL and use this JSON interface to work with your data directly.'
                }),
                icon: 'consoleApp',
                path: '/app/kibana#/dev_tools/console',
                showOnHomePage: true,
                category: category
              });
              dev_tools.register({
                id: 'console',
                order: 1,
                title: _i18n.i18n.translate('console.consoleDisplayName', {
                  defaultMessage: 'Console'
                }),
                enableRouting: false,
                mount: function mount(ctx, _ref2) {
                  var element, _ref3, boot;

                  return regeneratorRuntime.async(function mount$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          element = _ref2.element;
                          _context.next = 3;
                          return regeneratorRuntime.awrap(import('./application'));

                        case 3:
                          _ref3 = _context.sent;
                          boot = _ref3.boot;
                          (0, _reactDom.render)(boot({
                            docLinkVersion: ctx.core.docLinks.DOC_LINK_VERSION,
                            I18nContext: I18nContext,
                            notifications: notifications,
                            elasticsearchUrl: elasticsearchUrl
                          }), element);
                          return _context.abrupt("return", function () {
                            (0, _reactDom.unmountComponentAtNode)(element);
                          });

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  });
                }
              });

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start(core) {
      return regeneratorRuntime.async(function start$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return ConsoleUIPlugin;
}();

exports.ConsoleUIPlugin = ConsoleUIPlugin;