"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _rxjs = require("rxjs");

var _embeddables = require("../embeddables");

var _errors = require("../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getKeys = function getKeys(o) {
  return Object.keys(o);
};

var Container =
/*#__PURE__*/
function (_Embeddable) {
  _inherits(Container, _Embeddable);

  function Container(input, output, getFactory, parent) {
    var _this;

    _classCallCheck(this, Container);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this, input, output, parent));
    _this.getFactory = getFactory;

    _defineProperty(_assertThisInitialized(_this), "isContainer", true);

    _defineProperty(_assertThisInitialized(_this), "children", {});

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _this.subscription = _this.getInput$().subscribe(function () {
      return _this.maybeUpdateChildren();
    });
    return _this;
  }

  _createClass(Container, [{
    key: "updateInputForChild",
    value: function updateInputForChild(id, changes) {
      if (!this.input.panels[id]) {
        throw new _errors.PanelNotFoundError();
      }

      var panels = {
        panels: _objectSpread({}, this.input.panels, _defineProperty({}, id, _objectSpread({}, this.input.panels[id], {
          explicitInput: _objectSpread({}, this.input.panels[id].explicitInput, {}, changes)
        })))
      };
      this.updateInput(panels);
    }
  }, {
    key: "reload",
    value: function reload() {
      Object.values(this.children).forEach(function (child) {
        return child.reload();
      });
    }
  }, {
    key: "addNewEmbeddable",
    value: function addNewEmbeddable(type, explicitInput) {
      var factory, panelState;
      return regeneratorRuntime.async(function addNewEmbeddable$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              factory = this.getFactory(type);

              if (factory) {
                _context.next = 3;
                break;
              }

              throw new _errors.EmbeddableFactoryNotFoundError(type);

            case 3:
              panelState = this.createNewPanelState(factory, explicitInput);
              return _context.abrupt("return", this.createAndSaveEmbeddable(type, panelState));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "addSavedObjectEmbeddable",
    value: function addSavedObjectEmbeddable(type, savedObjectId) {
      var factory, panelState;
      return regeneratorRuntime.async(function addSavedObjectEmbeddable$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              factory = this.getFactory(type);
              panelState = this.createNewPanelState(factory);
              panelState.savedObjectId = savedObjectId;
              return _context2.abrupt("return", this.createAndSaveEmbeddable(type, panelState));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "removeEmbeddable",
    value: function removeEmbeddable(embeddableId) {
      // Just a shortcut for removing the panel from input state, all internal state will get cleaned up naturally
      // by the listener.
      var panels = _objectSpread({}, this.input.panels);

      delete panels[embeddableId];
      this.updateInput({
        panels: panels
      });
    }
  }, {
    key: "getChildIds",
    value: function getChildIds() {
      return Object.keys(this.children);
    }
  }, {
    key: "getChild",
    value: function getChild(id) {
      return this.children[id];
    }
  }, {
    key: "getInputForChild",
    value: function getInputForChild(embeddableId) {
      var containerInput = this.getInheritedInput(embeddableId);
      var panelState = this.getPanelState(embeddableId);
      var explicitInput = panelState.explicitInput;
      var explicitFiltered = {};
      var keys = getKeys(panelState.explicitInput); // If explicit input for a particular value is undefined, and container has that input defined,
      // we will use the inherited container input. This way children can set a value to undefined in order
      // to default back to inherited input. However, if the particular value is not part of the container, then
      // the caller may be trying to explicitly tell the child to clear out a given value, so in that case, we want
      // to pass it along.

      keys.forEach(function (key) {
        if (explicitInput[key] === undefined && containerInput[key] !== undefined) {
          return;
        }

        explicitFiltered[key] = explicitInput[key];
      });
      return _objectSpread({}, containerInput, {}, explicitFiltered);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(Container.prototype), "destroy", this).call(this);

      Object.values(this.children).forEach(function (child) {
        return child.destroy();
      });
      this.subscription.unsubscribe();
    }
  }, {
    key: "untilEmbeddableLoaded",
    value: function untilEmbeddableLoaded(id) {
      var _this2 = this;

      return regeneratorRuntime.async(function untilEmbeddableLoaded$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.input.panels[id]) {
                _context3.next = 2;
                break;
              }

              throw new _errors.PanelNotFoundError();

            case 2:
              if (!this.output.embeddableLoaded[id]) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", this.children[id]);

            case 4:
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                var subscription = (0, _rxjs.merge)(_this2.getOutput$(), _this2.getInput$()).subscribe(function () {
                  if (_this2.output.embeddableLoaded[id]) {
                    subscription.unsubscribe();
                    resolve(_this2.children[id]);
                  } // If we hit this, the panel was removed before the embeddable finished loading.


                  if (_this2.input.panels[id] === undefined) {
                    subscription.unsubscribe();
                    resolve(undefined);
                  }
                });
              }));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createNewPanelState",
    value: function createNewPanelState(factory) {
      var partial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var embeddableId = partial.id || _uuid.default.v4();

      var explicitInput = this.createNewExplicitEmbeddableInput(embeddableId, factory, partial);
      return {
        type: factory.type,
        explicitInput: _objectSpread({
          id: embeddableId
        }, explicitInput)
      };
    }
  }, {
    key: "getPanelState",
    value: function getPanelState(embeddableId) {
      if (this.input.panels[embeddableId] === undefined) {
        throw new _errors.PanelNotFoundError();
      }

      var panelState = this.input.panels[embeddableId];
      return panelState;
    }
    /**
     * Return state that comes from the container and is passed down to the child. For instance, time range and
     * filters are common inherited input state. Note that any state stored in `this.input.panels[embeddableId].explicitInput`
     * will override inherited input.
     */

  }, {
    key: "createAndSaveEmbeddable",
    value: function createAndSaveEmbeddable(type, panelState) {
      return regeneratorRuntime.async(function createAndSaveEmbeddable$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.updateInput({
                panels: _objectSpread({}, this.input.panels, _defineProperty({}, panelState.explicitInput.id, panelState)),
                isEmptyState: false
              });
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.untilEmbeddableLoaded(panelState.explicitInput.id));

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createNewExplicitEmbeddableInput",
    value: function createNewExplicitEmbeddableInput(id, factory) {
      var partial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var inheritedInput = this.getInheritedInput(id);
      var defaults = factory.getDefaultInput(partial); // Container input overrides defaults.

      var explicitInput = partial;
      getKeys(defaults).forEach(function (key) {
        // @ts-ignore We know this key might not exist on inheritedInput.
        var inheritedValue = inheritedInput[key];

        if (inheritedValue === undefined && explicitInput[key] === undefined) {
          explicitInput[key] = defaults[key];
        }
      });
      return explicitInput;
    }
  }, {
    key: "onPanelRemoved",
    value: function onPanelRemoved(id) {
      // Clean up
      var embeddable = this.getChild(id);

      if (embeddable) {
        embeddable.destroy(); // Remove references.

        delete this.children[id];
      }

      this.updateOutput({
        embeddableLoaded: _objectSpread({}, this.output.embeddableLoaded, _defineProperty({}, id, undefined))
      });
    }
  }, {
    key: "onPanelAdded",
    value: function onPanelAdded(panel) {
      var embeddable, inputForChild, _factory;

      return regeneratorRuntime.async(function onPanelAdded$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.updateOutput({
                embeddableLoaded: _objectSpread({}, this.output.embeddableLoaded, _defineProperty({}, panel.explicitInput.id, false))
              });
              inputForChild = this.getInputForChild(panel.explicitInput.id);
              _context5.prev = 2;
              _factory = this.getFactory(panel.type);

              if (_factory) {
                _context5.next = 6;
                break;
              }

              throw new _errors.EmbeddableFactoryNotFoundError(panel.type);

            case 6:
              if (!panel.savedObjectId) {
                _context5.next = 12;
                break;
              }

              _context5.next = 9;
              return regeneratorRuntime.awrap(_factory.createFromSavedObject(panel.savedObjectId, inputForChild, this));

            case 9:
              _context5.t0 = _context5.sent;
              _context5.next = 15;
              break;

            case 12:
              _context5.next = 14;
              return regeneratorRuntime.awrap(_factory.create(inputForChild, this));

            case 14:
              _context5.t0 = _context5.sent;

            case 15:
              embeddable = _context5.t0;
              _context5.next = 21;
              break;

            case 18:
              _context5.prev = 18;
              _context5.t1 = _context5["catch"](2);
              embeddable = new _embeddables.ErrorEmbeddable(_context5.t1, {
                id: panel.explicitInput.id
              }, this);

            case 21:
              if (!embeddable) {
                _context5.next = 30;
                break;
              }

              if (this.input.panels[panel.explicitInput.id]) {
                _context5.next = 25;
                break;
              }

              embeddable.destroy();
              return _context5.abrupt("return");

            case 25:
              if (embeddable.getOutput().savedObjectId) {
                this.updateInput({
                  panels: _objectSpread({}, this.input.panels, _defineProperty({}, panel.explicitInput.id, _objectSpread({}, this.input.panels[panel.explicitInput.id], {}, embeddable.getOutput().savedObjectId ? {
                    savedObjectId: embeddable.getOutput().savedObjectId
                  } : undefined, {
                    explicitInput: _objectSpread({}, this.input.panels[panel.explicitInput.id].explicitInput)
                  })))
                });
              }

              this.children[embeddable.id] = embeddable;
              this.updateOutput({
                embeddableLoaded: _objectSpread({}, this.output.embeddableLoaded, _defineProperty({}, panel.explicitInput.id, true))
              });
              _context5.next = 31;
              break;

            case 30:
              if (embeddable === undefined) {
                this.removeEmbeddable(panel.explicitInput.id);
              }

            case 31:
              return _context5.abrupt("return", embeddable);

            case 32:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[2, 18]]);
    }
  }, {
    key: "maybeUpdateChildren",
    value: function maybeUpdateChildren() {
      var _this3 = this;

      var allIds = Object.keys(_objectSpread({}, this.input.panels, {}, this.output.embeddableLoaded));
      allIds.forEach(function (id) {
        if (_this3.input.panels[id] !== undefined && _this3.output.embeddableLoaded[id] === undefined) {
          _this3.onPanelAdded(_this3.input.panels[id]);
        } else if (_this3.input.panels[id] === undefined && _this3.output.embeddableLoaded[id] !== undefined) {
          _this3.onPanelRemoved(id);
        }
      });
    }
  }]);

  return Container;
}(_embeddables.Embeddable);

exports.Container = Container;