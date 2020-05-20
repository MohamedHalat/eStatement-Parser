"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.ExpressionRenderHandler = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _services = require("./services");

var _render_error_handler = require("./render_error_handler");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpressionRenderHandler = function ExpressionRenderHandler(element) {
  var _this = this;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      onRenderError = _ref.onRenderError;

  _classCallCheck(this, ExpressionRenderHandler);

  _defineProperty(this, "render$", void 0);

  _defineProperty(this, "update$", void 0);

  _defineProperty(this, "events$", void 0);

  _defineProperty(this, "element", void 0);

  _defineProperty(this, "destroyFn", void 0);

  _defineProperty(this, "renderCount", 0);

  _defineProperty(this, "renderSubject", void 0);

  _defineProperty(this, "eventsSubject", void 0);

  _defineProperty(this, "updateSubject", void 0);

  _defineProperty(this, "handlers", void 0);

  _defineProperty(this, "onRenderError", void 0);

  _defineProperty(this, "render", function _callee(data) {
    var extraHandlers,
        _args = arguments;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            extraHandlers = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

            if (!(!data || _typeof(data) !== 'object')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", _this.handleRenderError(new Error('invalid data provided to the expression renderer')));

          case 3:
            if (!(data.type !== 'render' || !data.as)) {
              _context.next = 9;
              break;
            }

            if (!(data.type === 'error')) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", _this.handleRenderError(data.error));

          case 8:
            return _context.abrupt("return", _this.handleRenderError(new Error('invalid data provided to the expression renderer')));

          case 9:
            if ((0, _services.getRenderersRegistry)().get(data.as)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", _this.handleRenderError(new Error("invalid renderer id '".concat(data.as, "'"))));

          case 11:
            _context.prev = 11;
            _context.next = 14;
            return regeneratorRuntime.awrap((0, _services.getRenderersRegistry)().get(data.as).render(_this.element, data.value, _objectSpread({}, _this.handlers, {}, extraHandlers)));

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](11);
            return _context.abrupt("return", _this.handleRenderError(_context.t0));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[11, 16]]);
  });

  _defineProperty(this, "destroy", function () {
    _this.renderSubject.complete();

    _this.eventsSubject.complete();

    _this.updateSubject.complete();

    if (_this.destroyFn) {
      _this.destroyFn();
    }
  });

  _defineProperty(this, "getElement", function () {
    return _this.element;
  });

  _defineProperty(this, "handleRenderError", function (error) {
    _this.onRenderError(_this.element, error, _this.handlers);
  });

  this.element = element;
  this.eventsSubject = new Rx.Subject();
  this.events$ = this.eventsSubject.asObservable();
  this.onRenderError = onRenderError || _render_error_handler.renderErrorHandler;
  this.renderSubject = new Rx.BehaviorSubject(null);
  this.render$ = this.renderSubject.asObservable().pipe((0, _operators.filter)(function (_) {
    return _ !== null;
  }));
  this.updateSubject = new Rx.Subject();
  this.update$ = this.updateSubject.asObservable();
  this.handlers = {
    onDestroy: function onDestroy(fn) {
      _this.destroyFn = fn;
    },
    done: function done() {
      _this.renderCount++;

      _this.renderSubject.next(_this.renderCount);
    },
    reload: function reload() {
      _this.updateSubject.next(null);
    },
    update: function update(params) {
      _this.updateSubject.next(params);
    },
    event: function event(data) {
      _this.eventsSubject.next(data);
    }
  };
};

exports.ExpressionRenderHandler = ExpressionRenderHandler;

function render(element, data, options) {
  var handler = new ExpressionRenderHandler(element, options);
  handler.render(data);
  return handler;
}