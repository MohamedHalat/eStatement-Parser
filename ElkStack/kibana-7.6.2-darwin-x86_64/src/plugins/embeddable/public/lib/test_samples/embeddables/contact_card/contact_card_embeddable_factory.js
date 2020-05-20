"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactCardEmbeddableFactory = exports.CONTACT_CARD_EMBEDDABLE = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../kibana_react/public");

var _embeddables = require("../../../embeddables");

var _contact_card_embeddable = require("./contact_card_embeddable");

var _contact_card_initializer = require("./contact_card_initializer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CONTACT_CARD_EMBEDDABLE = 'CONTACT_CARD_EMBEDDABLE';
exports.CONTACT_CARD_EMBEDDABLE = CONTACT_CARD_EMBEDDABLE;

var ContactCardEmbeddableFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(ContactCardEmbeddableFactory, _EmbeddableFactory);

  function ContactCardEmbeddableFactory(options, execTrigger, overlays) {
    var _this;

    _classCallCheck(this, ContactCardEmbeddableFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContactCardEmbeddableFactory).call(this, options));
    _this.execTrigger = execTrigger;
    _this.overlays = overlays;

    _defineProperty(_assertThisInitialized(_this), "type", CONTACT_CARD_EMBEDDABLE);

    return _this;
  }

  _createClass(ContactCardEmbeddableFactory, [{
    key: "isEditable",
    value: function isEditable() {
      return true;
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.samples.contactCard.displayName', {
        defaultMessage: 'contact card'
      });
    }
  }, {
    key: "getExplicitInput",
    value: function getExplicitInput() {
      var _this2 = this;

      return new Promise(function (resolve) {
        var modalSession = _this2.overlays.openModal((0, _public.toMountPoint)(_react.default.createElement(_contact_card_initializer.ContactCardInitializer, {
          onCancel: function onCancel() {
            modalSession.close();
            resolve(undefined);
          },
          onCreate: function onCreate(input) {
            modalSession.close();
            resolve(input);
          }
        })), {
          'data-test-subj': 'createContactCardEmbeddable'
        });
      });
    }
  }, {
    key: "create",
    value: function create(initialInput, parent) {
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new _contact_card_embeddable.ContactCardEmbeddable(initialInput, {
                execAction: this.execTrigger
              }, parent));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ContactCardEmbeddableFactory;
}(_embeddables.EmbeddableFactory);

exports.ContactCardEmbeddableFactory = ContactCardEmbeddableFactory;