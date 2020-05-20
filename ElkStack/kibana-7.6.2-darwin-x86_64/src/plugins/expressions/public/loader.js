"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loader = exports.ExpressionLoader = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _execute = require("./execute");

var _render = require("./render");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpressionLoader =
/*#__PURE__*/
function () {
  function ExpressionLoader(element, _expression, _params) {
    var _this = this;

    _classCallCheck(this, ExpressionLoader);

    _defineProperty(this, "data$", void 0);

    _defineProperty(this, "update$", void 0);

    _defineProperty(this, "render$", void 0);

    _defineProperty(this, "events$", void 0);

    _defineProperty(this, "loading$", void 0);

    _defineProperty(this, "dataHandler", void 0);

    _defineProperty(this, "renderHandler", void 0);

    _defineProperty(this, "dataSubject", void 0);

    _defineProperty(this, "loadingSubject", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "params", {});

    _defineProperty(this, "loadData", function _callee(expression, params) {
      var prevDataHandler, data;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.dataHandler && _this.dataHandler.isPending) {
                _this.dataHandler.cancel();
              }

              _this.setParams(params);

              _this.dataHandler = new _execute.ExpressionDataHandler(expression, params);
              if (!params.inspectorAdapters) params.inspectorAdapters = _this.dataHandler.inspect();
              prevDataHandler = _this.dataHandler;
              _context.next = 7;
              return regeneratorRuntime.awrap(prevDataHandler.getData());

            case 7:
              data = _context.sent;

              if (!(_this.dataHandler !== prevDataHandler)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return");

            case 10:
              _this.dataSubject.next(data);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    this.dataSubject = new _rxjs.Subject();
    this.data$ = this.dataSubject.asObservable();
    this.loadingSubject = new _rxjs.BehaviorSubject(false); // loading is a "hot" observable,
    // as loading$ could emit straight away in the constructor
    // and we want to notify subscribers about it, but all subscriptions will happen later

    this.loading$ = this.loadingSubject.asObservable().pipe((0, _operators.filter)(function (_) {
      return _ === true;
    }), (0, _operators.map)(function () {
      return void 0;
    }));
    this.renderHandler = new _render.ExpressionRenderHandler(element, {
      onRenderError: _params && _params.onRenderError
    });
    this.render$ = this.renderHandler.render$;
    this.update$ = this.renderHandler.update$;
    this.events$ = this.renderHandler.events$;
    this.update$.subscribe(function (_ref) {
      var newExpression = _ref.newExpression,
          newParams = _ref.newParams;

      _this.update(newExpression, newParams);
    });
    this.data$.subscribe(function (data) {
      _this.render(data);
    });
    this.render$.subscribe(function () {
      _this.loadingSubject.next(false);
    });
    this.setParams(_params);

    if (_expression) {
      this.loadingSubject.next(true);
      this.loadData(_expression, this.params);
    }
  }

  _createClass(ExpressionLoader, [{
    key: "destroy",
    value: function destroy() {
      this.dataSubject.complete();
      this.loadingSubject.complete();
      this.renderHandler.destroy();

      if (this.dataHandler) {
        this.dataHandler.cancel();
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this.dataHandler) {
        this.dataHandler.cancel();
      }
    }
  }, {
    key: "getExpression",
    value: function getExpression() {
      if (this.dataHandler) {
        return this.dataHandler.getExpression();
      }
    }
  }, {
    key: "getAst",
    value: function getAst() {
      if (this.dataHandler) {
        return this.dataHandler.getAst();
      }
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.renderHandler.getElement();
    }
  }, {
    key: "openInspector",
    value: function openInspector(title) {
      var inspector = this.inspect();

      if (inspector) {
        return (0, _services.getInspector)().open(inspector, {
          title: title
        });
      }
    }
  }, {
    key: "inspect",
    value: function inspect() {
      if (this.dataHandler) {
        return this.dataHandler.inspect();
      }
    }
  }, {
    key: "update",
    value: function update(expression, params) {
      this.setParams(params);
      this.loadingSubject.next(true);

      if (expression) {
        this.loadData(expression, this.params);
      } else if (this.data) {
        this.render(this.data);
      }
    }
  }, {
    key: "render",
    value: function render(data) {
      this.renderHandler.render(data, this.params.extraHandlers);
    }
  }, {
    key: "setParams",
    value: function setParams(params) {
      if (!params || !Object.keys(params).length) {
        return;
      }

      if (params.searchContext) {
        this.params.searchContext = _.defaults({}, params.searchContext, this.params.searchContext || {});
      }

      if (params.extraHandlers && this.params) {
        this.params.extraHandlers = params.extraHandlers;
      }
    }
  }]);

  return ExpressionLoader;
}();

exports.ExpressionLoader = ExpressionLoader;

var loader = function loader(element, expression, params) {
  return new ExpressionLoader(element, expression, params);
};

exports.loader = loader;