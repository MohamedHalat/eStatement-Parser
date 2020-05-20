"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizeEmbeddableFactory = void 0;

require("uiExports/contextMenuActions");

require("uiExports/devTools");

require("uiExports/docViews");

require("uiExports/embeddableActions");

require("uiExports/fieldFormatEditors");

require("uiExports/fieldFormats");

require("uiExports/indexManagement");

require("uiExports/inspectorViews");

require("uiExports/savedObjectTypes");

require("uiExports/search");

require("uiExports/shareContextMenuExtensions");

require("uiExports/visTypes");

require("uiExports/visualize");

var _i18n = require("@kbn/i18n");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _new_platform = require("ui/new_platform");

var _public = require("../../../../../plugins/embeddable/public");

var _legacy = require("../../../visualizations/public/np_ready/public/legacy");

var _visualize2 = require("../visualize");

var _disabled_lab_embeddable = require("./disabled_lab_embeddable");

var _get_index_pattern = require("./get_index_pattern");

var _visualize_embeddable = require("./visualize_embeddable");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VisualizeEmbeddableFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(VisualizeEmbeddableFactory, _EmbeddableFactory);

  _createClass(VisualizeEmbeddableFactory, null, [{
    key: "createVisualizeEmbeddableFactory",
    value: function createVisualizeEmbeddableFactory() {
      return regeneratorRuntime.async(function createVisualizeEmbeddableFactory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new VisualizeEmbeddableFactory(_legacy.start.types));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  function VisualizeEmbeddableFactory(visTypes) {
    var _this;

    _classCallCheck(this, VisualizeEmbeddableFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisualizeEmbeddableFactory).call(this, {
      savedObjectMetaData: {
        name: _i18n.i18n.translate('kbn.visualize.savedObjectName', {
          defaultMessage: 'Visualization'
        }),
        includeFields: ['visState'],
        type: 'visualization',
        getIconForSavedObject: function getIconForSavedObject(savedObject) {
          if (!visTypes) {
            return 'visualizeApp';
          }

          return visTypes.get(JSON.parse(savedObject.attributes.visState).type).icon || 'visualizeApp';
        },
        getTooltipForSavedObject: function getTooltipForSavedObject(savedObject) {
          if (!visTypes) {
            return '';
          }

          return "".concat(savedObject.attributes.title, " (").concat(visTypes.get(JSON.parse(savedObject.attributes.visState).type).title, ")");
        },
        showSavedObject: function showSavedObject(savedObject) {
          if (!visTypes) {
            return false;
          }

          var typeName = JSON.parse(savedObject.attributes.visState).type;
          var visType = visTypes.get(typeName);

          if (!visType) {
            return false;
          }

          if (_new_platform.npStart.core.uiSettings.get('visualize:enableLabs')) {
            return true;
          }

          return visType.stage !== 'experimental';
        }
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "type", _constants.VISUALIZE_EMBEDDABLE_TYPE);

    _defineProperty(_assertThisInitialized(_this), "visTypes", void 0);

    _this.visTypes = visTypes;
    return _this;
  }

  _createClass(VisualizeEmbeddableFactory, [{
    key: "isEditable",
    value: function isEditable() {
      return _new_platform.npStart.core.application.capabilities.visualize.save;
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('kbn.embeddable.visualizations.displayName', {
        defaultMessage: 'visualization'
      });
    }
  }, {
    key: "createFromObject",
    value: function createFromObject(savedObject, input, parent) {
      var $injector, config, savedVisualizations, visId, editUrl, isLabsEnabled, indexPattern, indexPatterns;
      return regeneratorRuntime.async(function createFromObject$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_chrome.default.dangerouslyGetActiveInjector());

            case 2:
              $injector = _context2.sent;
              config = $injector.get('config');
              savedVisualizations = $injector.get('savedVisualizations');
              _context2.prev = 5;
              visId = savedObject.id;
              editUrl = visId ? _new_platform.npStart.core.http.basePath.prepend("/app/kibana".concat(savedVisualizations.urlFor(visId))) : '';
              isLabsEnabled = config.get('visualize:enableLabs');

              if (!(!isLabsEnabled && savedObject.vis.type.stage === 'experimental')) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", new _disabled_lab_embeddable.DisabledLabEmbeddable(savedObject.title, input));

            case 11:
              _context2.next = 13;
              return regeneratorRuntime.awrap((0, _get_index_pattern.getIndexPattern)(savedObject));

            case 13:
              indexPattern = _context2.sent;
              indexPatterns = indexPattern ? [indexPattern] : [];
              return _context2.abrupt("return", new _visualize_embeddable.VisualizeEmbeddable(_new_platform.npStart.plugins.data.query.timefilter.timefilter, {
                savedVisualization: savedObject,
                indexPatterns: indexPatterns,
                editUrl: editUrl,
                editable: this.isEditable(),
                appState: input.appState,
                uiState: input.uiState
              }, input, parent));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](5);
              console.error(_context2.t0); // eslint-disable-line no-console

              return _context2.abrupt("return", new _public.ErrorEmbeddable(_context2.t0, input, parent));

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[5, 18]]);
    }
  }, {
    key: "createFromSavedObject",
    value: function createFromSavedObject(savedObjectId, input, parent) {
      var $injector, savedVisualizations, _visId, savedObject;

      return regeneratorRuntime.async(function createFromSavedObject$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_chrome.default.dangerouslyGetActiveInjector());

            case 2:
              $injector = _context3.sent;
              savedVisualizations = $injector.get('savedVisualizations');
              _context3.prev = 4;
              _visId = savedObjectId;
              _context3.next = 8;
              return regeneratorRuntime.awrap(savedVisualizations.get(_visId));

            case 8:
              savedObject = _context3.sent;
              return _context3.abrupt("return", this.createFromObject(savedObject, input, parent));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](4);
              console.error(_context3.t0); // eslint-disable-line no-console

              return _context3.abrupt("return", new _public.ErrorEmbeddable(_context3.t0, input, parent));

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[4, 12]]);
    }
  }, {
    key: "create",
    value: function create() {
      return regeneratorRuntime.async(function create$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // TODO: This is a bit of a hack to preserve the original functionality. Ideally we will clean this up
              // to allow for in place creation of visualizations without having to navigate away to a new URL.
              if (this.visTypes) {
                (0, _visualize2.showNewVisModal)(this.visTypes, {
                  editorParams: ['addToDashboard']
                }, _new_platform.npStart.core.http.basePath.prepend, _new_platform.npStart.core.uiSettings, _new_platform.npStart.core.savedObjects, _new_platform.npSetup.plugins.usageCollection);
              }

              return _context4.abrupt("return", undefined);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return VisualizeEmbeddableFactory;
}(_public.EmbeddableFactory);

exports.VisualizeEmbeddableFactory = VisualizeEmbeddableFactory;