"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openContextMenu = openContextMenu;
exports.ContextMenuSession = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _events = require("events");

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var activeSession = null;
var CONTAINER_ID = 'contextMenu-container';
var initialized = false;

function getOrCreateContainerElement() {
  var container = document.getElementById(CONTAINER_ID);
  var y = getMouseY() + document.body.scrollTop;

  if (!container) {
    container = document.createElement('div');
    container.style.left = getMouseX() + 'px';
    container.style.top = y + 'px';
    container.style.position = 'absolute';
    container.style.zIndex = '999';
    container.id = CONTAINER_ID;
    document.body.appendChild(container);
  } else {
    container.style.left = getMouseX() + 'px';
    container.style.top = y + 'px';
  }

  return container;
}

var x = 0;
var y = 0;

function initialize() {
  if (!initialized) {
    document.addEventListener('mousemove', onMouseUpdate, false);
    document.addEventListener('mouseenter', onMouseUpdate, false);
    initialized = true;
  }
}

function onMouseUpdate(e) {
  x = e.pageX;
  y = e.pageY;
}

function getMouseX() {
  return x;
}

function getMouseY() {
  return y;
}

initialize();
/**
 * A FlyoutSession describes the session of one opened flyout panel. It offers
 * methods to close the flyout panel again. If you open a flyout panel you should make
 * sure you call {@link ContextMenuSession#close} when it should be closed.
 * Since a flyout could also be closed without calling this method (e.g. because
 * the user closes it), you must listen to the "closed" event on this instance.
 * It will be emitted whenever the flyout will be closed and you should throw
 * away your reference to this instance whenever you receive that event.
 * @extends EventEmitter
 */

var ContextMenuSession =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(ContextMenuSession, _EventEmitter);

  function ContextMenuSession() {
    _classCallCheck(this, ContextMenuSession);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContextMenuSession).apply(this, arguments));
  }

  _createClass(ContextMenuSession, [{
    key: "bindToAngularScope",

    /**
     * Binds the current flyout session to an Angular scope, meaning this flyout
     * session will be closed as soon as the Angular scope gets destroyed.
     * @param {object} scope - An angular scope object to bind to.
     */
    value: function bindToAngularScope(scope) {
      var _this = this;

      var removeWatch = scope.$on('$destroy', function () {
        return _this.close();
      });
      this.on('closed', function () {
        return removeWatch();
      });
    }
    /**
     * Closes the opened flyout as long as it's still the open one.
     * If this is not the active session anymore, this method won't do anything.
     * If this session was still active and a flyout was closed, the 'closed'
     * event will be emitted on this FlyoutSession instance.
     */

  }, {
    key: "close",
    value: function close() {
      if (activeSession === this) {
        var container = document.getElementById(CONTAINER_ID);

        if (container) {
          _reactDom.default.unmountComponentAtNode(container);

          this.emit('closed');
        }
      }
    }
  }]);

  return ContextMenuSession;
}(_events.EventEmitter);
/**
 * Opens a flyout panel with the given component inside. You can use
 * {@link ContextMenuSession#close} on the return value to close the flyout.
 *
 * @param flyoutChildren - Mounts the children inside a fly out panel
 * @return {FlyoutSession} The session instance for the opened flyout panel.
 */


exports.ContextMenuSession = ContextMenuSession;

function openContextMenu(panels) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // If there is an active inspector session close it before opening a new one.
  if (activeSession) {
    activeSession.close();
  }

  var container = getOrCreateContainerElement();
  var session = activeSession = new ContextMenuSession();

  var onClose = function onClose() {
    if (props.onClose) {
      props.onClose();
    }

    session.close();
  };

  _reactDom.default.render(_react.default.createElement(_eui.EuiPopover, {
    className: "embPanel__optionsMenuPopover",
    button: container,
    isOpen: true,
    closePopover: onClose,
    panelPaddingSize: "none",
    anchorPosition: "downRight",
    withTitle: true
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: "mainMenu",
    panels: panels
  })), container);

  return session;
}