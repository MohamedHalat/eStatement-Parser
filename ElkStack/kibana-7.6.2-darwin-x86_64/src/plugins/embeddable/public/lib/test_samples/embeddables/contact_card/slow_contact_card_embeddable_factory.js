"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlowContactCardEmbeddableFactory = void 0;

var _ = require("../../..");

var _contact_card_embeddable = require("./contact_card_embeddable");

var _contact_card_embeddable_factory = require("./contact_card_embeddable_factory");

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

var SlowContactCardEmbeddableFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(SlowContactCardEmbeddableFactory, _EmbeddableFactory);

  function SlowContactCardEmbeddableFactory(options) {
    var _this;

    _classCallCheck(this, SlowContactCardEmbeddableFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SlowContactCardEmbeddableFactory).call(this));
    _this.options = options;

    _defineProperty(_assertThisInitialized(_this), "loadTickCount", 0);

    _defineProperty(_assertThisInitialized(_this), "type", _contact_card_embeddable_factory.CONTACT_CARD_EMBEDDABLE);

    if (options.loadTickCount) {
      _this.loadTickCount = options.loadTickCount;
    }

    return _this;
  }

  _createClass(SlowContactCardEmbeddableFactory, [{
    key: "isEditable",
    value: function isEditable() {
      return true;
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return 'slow to load contact card';
    }
  }, {
    key: "create",
    value: function create(initialInput, parent) {
      var i;
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = 0;

            case 1:
              if (!(i < this.loadTickCount)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return regeneratorRuntime.awrap(Promise.resolve());

            case 4:
              i++;
              _context.next = 1;
              break;

            case 7:
              return _context.abrupt("return", new _contact_card_embeddable.ContactCardEmbeddable(initialInput, {
                execAction: this.options.execAction
              }, parent));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return SlowContactCardEmbeddableFactory;
}(_.EmbeddableFactory);

exports.SlowContactCardEmbeddableFactory = SlowContactCardEmbeddableFactory;