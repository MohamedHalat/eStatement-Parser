"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Embeddable = void 0;

var _lodash = require("lodash");

var Rx = _interopRequireWildcard(require("rxjs"));

var _types = require("../types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPanelTitle(input, output) {
  return input.hidePanelTitles ? '' : input.title === undefined ? output.defaultTitle : input.title;
}

var Embeddable =
/*#__PURE__*/
function () {
  // Listener to parent changes, if this embeddable exists in a parent, in order
  // to update input when the parent changes.
  // TODO: Rename to destroyed.
  function Embeddable(input, output, parent) {
    var _this = this;

    _classCallCheck(this, Embeddable);

    _defineProperty(this, "parent", void 0);

    _defineProperty(this, "isContainer", false);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "output", void 0);

    _defineProperty(this, "input", void 0);

    _defineProperty(this, "input$", void 0);

    _defineProperty(this, "output$", void 0);

    _defineProperty(this, "parentSubscription", void 0);

    _defineProperty(this, "destoyed", false);

    this.id = input.id;
    this.output = _objectSpread({
      title: getPanelTitle(input, output)
    }, output);
    this.input = _objectSpread({
      viewMode: _types.ViewMode.EDIT
    }, input);
    this.parent = parent;
    this.input$ = new Rx.BehaviorSubject(this.input);
    this.output$ = new Rx.BehaviorSubject(this.output);

    if (parent) {
      this.parentSubscription = Rx.merge(parent.getInput$(), parent.getOutput$()).subscribe(function () {
        // Make sure this panel hasn't been removed immediately after it was added, but before it finished loading.
        if (!parent.getInput().panels[_this.id]) return;
        var newInput = parent.getInputForChild(_this.id);

        _this.onResetInput(newInput);
      });
    }
  }

  _createClass(Embeddable, [{
    key: "getIsContainer",
    value: function getIsContainer() {
      return this.isContainer === true;
    }
    /**
     * Reload will be called when there is a request to refresh the data or view, even if the
     * input data did not change.
     */

  }, {
    key: "getInput$",
    value: function getInput$() {
      return this.input$.asObservable();
    }
  }, {
    key: "getOutput$",
    value: function getOutput$() {
      return this.output$.asObservable();
    }
  }, {
    key: "getOutput",
    value: function getOutput() {
      return this.output;
    }
  }, {
    key: "getInput",
    value: function getInput() {
      return this.input;
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.output.title;
    }
    /**
     * Returns the top most parent embeddable, or itself if this embeddable
     * is not within a parent.
     */

  }, {
    key: "getRoot",
    value: function getRoot() {
      var root = this;

      while (root.parent) {
        root = root.parent;
      }

      return root;
    }
  }, {
    key: "updateInput",
    value: function updateInput(changes) {
      if (this.destoyed) {
        throw new Error('Embeddable has been destroyed');
      }

      if (this.parent) {
        // Ensures state changes flow from container downward.
        this.parent.updateInputForChild(this.id, changes);
      } else {
        this.onInputChanged(changes);
      }
    }
  }, {
    key: "render",
    value: function render(domNode) {
      if (this.destoyed) {
        throw new Error('Embeddable has been destroyed');
      }

      return;
    }
    /**
     * An embeddable can return inspector adapters if it want the inspector to be
     * available via the context menu of that panel.
     * @return Inspector adapters that will be used to open an inspector for.
     */

  }, {
    key: "getInspectorAdapters",
    value: function getInspectorAdapters() {
      return undefined;
    }
    /**
     * Called when this embeddable is no longer used, this should be the place for
     * implementors to add any additional clean up tasks, like unmounting and unsubscribing.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.destoyed = true;

      if (this.parentSubscription) {
        this.parentSubscription.unsubscribe();
      }

      return;
    }
  }, {
    key: "updateOutput",
    value: function updateOutput(outputChanges) {
      var newOutput = _objectSpread({}, this.output, {}, outputChanges);

      if (!(0, _lodash.isEqual)(this.output, newOutput)) {
        this.output = newOutput;
        this.output$.next(this.output);
      }
    }
  }, {
    key: "onResetInput",
    value: function onResetInput(newInput) {
      if (!(0, _lodash.isEqual)(this.input, newInput)) {
        if (this.input.lastReloadRequestTime !== newInput.lastReloadRequestTime) {
          this.reload();
        }

        this.input = newInput;
        this.input$.next(newInput);
        this.updateOutput({
          title: getPanelTitle(this.input, this.output)
        });
      }
    }
  }, {
    key: "onInputChanged",
    value: function onInputChanged(changes) {
      var newInput = (0, _lodash.cloneDeep)(_objectSpread({}, this.input, {}, changes));
      this.onResetInput(newInput);
    }
  }]);

  return Embeddable;
}();

exports.Embeddable = Embeddable;