"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsfeedPublicPlugin = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _newsfeed_header_nav_button = require("./components/newsfeed_header_nav_button");

var _api = require("./lib/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NewsfeedPublicPlugin =
/*#__PURE__*/
function () {
  function NewsfeedPublicPlugin(initializerContext) {
    _classCallCheck(this, NewsfeedPublicPlugin);

    _defineProperty(this, "kibanaVersion", void 0);

    _defineProperty(this, "stop$", new Rx.ReplaySubject(1));

    this.kibanaVersion = initializerContext.env.packageInfo.version;
  }

  _createClass(NewsfeedPublicPlugin, [{
    key: "setup",
    value: function setup(core) {
      return {};
    }
  }, {
    key: "start",
    value: function start(core) {
      var _this = this;

      var api$ = this.fetchNewsfeed(core);
      core.chrome.navControls.registerRight({
        order: 1000,
        mount: function mount(target) {
          return _this.mount(api$, target);
        }
      });
      return {};
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stop$.next();
    }
  }, {
    key: "fetchNewsfeed",
    value: function fetchNewsfeed(core) {
      var http = core.http,
          injectedMetadata = core.injectedMetadata;
      var config = injectedMetadata.getInjectedVar('newsfeed');
      return (0, _api.getApi)(http, config, this.kibanaVersion).pipe((0, _operators.takeUntil)(this.stop$), // stop the interval when stop method is called
      (0, _operators.catchError)(function () {
        return Rx.of(null);
      }) // do not throw error
      );
    }
  }, {
    key: "mount",
    value: function mount(api$, targetDomElement) {
      _reactDom.default.render(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_newsfeed_header_nav_button.NewsfeedNavButton, {
        apiFetchResult: api$
      })), targetDomElement);

      return function () {
        return _reactDom.default.unmountComponentAtNode(targetDomElement);
      };
    }
  }]);

  return NewsfeedPublicPlugin;
}();

exports.NewsfeedPublicPlugin = NewsfeedPublicPlugin;