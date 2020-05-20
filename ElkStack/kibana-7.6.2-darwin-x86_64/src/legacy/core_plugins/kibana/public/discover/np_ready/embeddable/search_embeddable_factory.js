"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchEmbeddableFactory = void 0;

var _i18n = require("@kbn/i18n");

var _kibana_services = require("../../kibana_services");

var _public = require("../../../../../../../plugins/embeddable/public");

var _search_embeddable = require("./search_embeddable");

var _constants = require("./constants");

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

var SearchEmbeddableFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(SearchEmbeddableFactory, _EmbeddableFactory);

  function SearchEmbeddableFactory(executeTriggerActions, getInjector, isEditable) {
    var _this;

    _classCallCheck(this, SearchEmbeddableFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchEmbeddableFactory).call(this, {
      savedObjectMetaData: {
        name: _i18n.i18n.translate('kbn.discover.savedSearch.savedObjectName', {
          defaultMessage: 'Saved search'
        }),
        type: 'search',
        getIconForSavedObject: function getIconForSavedObject() {
          return 'search';
        }
      }
    }));
    _this.executeTriggerActions = executeTriggerActions;

    _defineProperty(_assertThisInitialized(_this), "type", _constants.SEARCH_EMBEDDABLE_TYPE);

    _defineProperty(_assertThisInitialized(_this), "$injector", void 0);

    _defineProperty(_assertThisInitialized(_this), "getInjector", void 0);

    _defineProperty(_assertThisInitialized(_this), "isEditable", void 0);

    _this.$injector = null;
    _this.getInjector = getInjector;
    _this.isEditable = isEditable;
    return _this;
  }

  _createClass(SearchEmbeddableFactory, [{
    key: "canCreateNew",
    value: function canCreateNew() {
      return false;
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('kbn.embeddable.search.displayName', {
        defaultMessage: 'search'
      });
    }
  }, {
    key: "createFromSavedObject",
    value: function createFromSavedObject(savedObjectId, input, parent) {
      var $injector, $compile, $rootScope, filterManager, url, editUrl, savedObject, indexPattern;
      return regeneratorRuntime.async(function createFromSavedObject$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.$injector) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(this.getInjector());

            case 3:
              this.$injector = _context.sent;

            case 4:
              $injector = this.$injector;
              $compile = $injector.get('$compile');
              $rootScope = $injector.get('$rootScope');
              filterManager = (0, _kibana_services.getServices)().filterManager;
              _context.next = 10;
              return regeneratorRuntime.awrap((0, _kibana_services.getServices)().getSavedSearchUrlById(savedObjectId));

            case 10:
              url = _context.sent;
              editUrl = (0, _kibana_services.getServices)().addBasePath("/app/kibana".concat(url));
              _context.prev = 12;
              _context.next = 15;
              return regeneratorRuntime.awrap((0, _kibana_services.getServices)().getSavedSearchById(savedObjectId));

            case 15:
              savedObject = _context.sent;
              indexPattern = savedObject.searchSource.getField('index');
              return _context.abrupt("return", new _search_embeddable.SearchEmbeddable({
                savedSearch: savedObject,
                $rootScope: $rootScope,
                $compile: $compile,
                editUrl: editUrl,
                filterManager: filterManager,
                editable: (0, _kibana_services.getServices)().capabilities.discover.save,
                indexPatterns: indexPattern ? [indexPattern] : []
              }, input, this.executeTriggerActions, parent));

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](12);
              console.error(_context.t0); // eslint-disable-line no-console

              return _context.abrupt("return", new _public.ErrorEmbeddable(_context.t0, input, parent));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[12, 20]]);
    }
  }, {
    key: "create",
    value: function create(input) {
      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new _public.ErrorEmbeddable('Saved searches can only be created from a saved object', input));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return SearchEmbeddableFactory;
}(_public.EmbeddableFactory);

exports.SearchEmbeddableFactory = SearchEmbeddableFactory;