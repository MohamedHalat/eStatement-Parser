"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTACT_USER_TRIGGER = exports.ContactCardEmbeddable = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _embeddables = require("../../../embeddables");

var _contact_card_embeddable_factory = require("./contact_card_embeddable_factory");

var _contact_card = require("./contact_card");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function getFullName(input) {
  var nameTitle = input.nameTitle,
      firstName = input.firstName,
      lastName = input.lastName;
  var nameParts = [nameTitle, firstName, lastName].filter(function (name) {
    return name !== undefined;
  });
  return nameParts.join(' ');
}

var ContactCardEmbeddable =
/*#__PURE__*/
function (_Embeddable) {
  _inherits(ContactCardEmbeddable, _Embeddable);

  function ContactCardEmbeddable(initialInput, options, parent) {
    var _this;

    _classCallCheck(this, ContactCardEmbeddable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContactCardEmbeddable).call(this, initialInput, {
      fullName: getFullName(initialInput),
      originalLastName: initialInput.lastName,
      defaultTitle: "Hello ".concat(getFullName(initialInput))
    }, parent));
    _this.options = options;

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "node", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", _contact_card_embeddable_factory.CONTACT_CARD_EMBEDDABLE);

    _this.subscription = _this.getInput$().subscribe(function () {
      var fullName = getFullName(_this.input);

      _this.updateOutput({
        fullName: fullName,
        defaultTitle: "Hello ".concat(fullName)
      });
    });
    return _this;
  }

  _createClass(ContactCardEmbeddable, [{
    key: "render",
    value: function render(node) {
      this.node = node;

      _reactDom.default.render(_react.default.createElement(_contact_card.ContactCardEmbeddableComponent, {
        embeddable: this,
        execTrigger: this.options.execAction
      }), node);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(ContactCardEmbeddable.prototype), "destroy", this).call(this);

      this.subscription.unsubscribe();

      if (this.node) {
        _reactDom.default.unmountComponentAtNode(this.node);
      }
    }
  }, {
    key: "reload",
    value: function reload() {}
  }]);

  return ContactCardEmbeddable;
}(_embeddables.Embeddable);

exports.ContactCardEmbeddable = ContactCardEmbeddable;
var CONTACT_USER_TRIGGER = 'CONTACT_USER_TRIGGER';
exports.CONTACT_USER_TRIGGER = CONTACT_USER_TRIGGER;