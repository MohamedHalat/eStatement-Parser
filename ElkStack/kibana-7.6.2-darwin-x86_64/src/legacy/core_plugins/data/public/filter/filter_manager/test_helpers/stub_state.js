"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StubState = void 0;

var _sinon = _interopRequireDefault(require("sinon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StubState =
/*#__PURE__*/
function () {
  function StubState() {
    _classCallCheck(this, StubState);

    _defineProperty(this, "filters", void 0);

    _defineProperty(this, "save", void 0);

    this.save = _sinon.default.stub();
    this.filters = [];
  }

  _createClass(StubState, [{
    key: "getQueryParamName",
    value: function getQueryParamName() {
      return '_a';
    }
  }, {
    key: "translateHashToRison",
    value: function translateHashToRison(stateHashOrRison) {
      return '';
    }
  }]);

  return StubState;
}();

exports.StubState = StubState;