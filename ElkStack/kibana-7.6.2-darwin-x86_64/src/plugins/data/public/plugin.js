"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataPublicPlugin = void 0;

var _public = require("../../kibana_utils/public");

var _autocomplete_provider = require("./autocomplete_provider");

var _suggestions_provider = require("./suggestions_provider");

var _search_service = require("./search/search_service");

var _field_formats_provider = require("./field_formats_provider");

var _query = require("./query");

var _index_pattern_select = require("./ui/index_pattern_select");

var _index_patterns = require("./index_patterns");

var _services = require("./services");

var _actions = require("./actions");

var _public2 = require("../../embeddable/public");

var _create_search_bar = require("./ui/search_bar/create_search_bar");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DataPublicPlugin =
/*#__PURE__*/
function () {
  function DataPublicPlugin(initializerContext) {
    _classCallCheck(this, DataPublicPlugin);

    _defineProperty(this, "autocomplete", new _autocomplete_provider.AutocompleteProviderRegister());

    _defineProperty(this, "searchService", void 0);

    _defineProperty(this, "fieldFormatsService", void 0);

    _defineProperty(this, "queryService", void 0);

    _defineProperty(this, "storage", void 0);

    this.searchService = new _search_service.SearchService(initializerContext);
    this.queryService = new _query.QueryService();
    this.fieldFormatsService = new _field_formats_provider.FieldFormatsService();
    this.storage = new _public.Storage(window.localStorage);
  }

  _createClass(DataPublicPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var uiActions = _ref.uiActions;
      var queryService = this.queryService.setup({
        uiSettings: core.uiSettings,
        storage: this.storage
      });
      uiActions.registerAction((0, _actions.createFilterAction)(queryService.filterManager, queryService.timefilter.timefilter));
      return {
        autocomplete: this.autocomplete,
        search: this.searchService.setup(core),
        fieldFormats: this.fieldFormatsService.setup(core),
        query: queryService
      };
    }
  }, {
    key: "start",
    value: function start(core, _ref2) {
      var uiActions = _ref2.uiActions;
      var uiSettings = core.uiSettings,
          http = core.http,
          notifications = core.notifications,
          savedObjects = core.savedObjects,
          overlays = core.overlays;
      var fieldFormats = this.fieldFormatsService.start();
      (0, _services.setHttp)(http);
      (0, _services.setNotifications)(notifications);
      (0, _services.setFieldFormats)(fieldFormats);
      (0, _services.setOverlays)(overlays);
      var indexPatternsService = new _index_patterns.IndexPatterns(uiSettings, savedObjects.client, http);
      (0, _services.setIndexPatterns)(indexPatternsService);
      var queryService = this.queryService.start(core.savedObjects);
      (0, _services.setQueryService)(queryService);
      uiActions.attachAction(_public2.APPLY_FILTER_TRIGGER, _actions.GLOBAL_APPLY_FILTER_ACTION);
      var dataServices = {
        autocomplete: this.autocomplete,
        getSuggestions: (0, _suggestions_provider.getSuggestionsProvider)(core.uiSettings, core.http),
        search: this.searchService.start(core),
        fieldFormats: fieldFormats,
        query: queryService,
        indexPatterns: indexPatternsService
      };
      var SearchBar = (0, _create_search_bar.createSearchBar)({
        core: core,
        data: dataServices,
        storage: this.storage
      });
      return _objectSpread({}, dataServices, {
        ui: {
          IndexPatternSelect: (0, _index_pattern_select.createIndexPatternSelect)(core.savedObjects.client),
          SearchBar: SearchBar
        }
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.autocomplete.clearProviders();
    }
  }]);

  return DataPublicPlugin;
}();

exports.DataPublicPlugin = DataPublicPlugin;