"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPattern = void 0;

var _lodash = _interopRequireWildcard(require("lodash"));

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../../kibana_utils/public");

var _public2 = require("../../../../kibana_react/public");

var _common = require("../../../common");

var _utils = require("../utils");

var _2 = require("../");

var _fields = require("../fields");

var _fields_fetcher = require("./_fields_fetcher");

var _format_hit = require("./format_hit");

var _flatten_hit = require("./flatten_hit");

var _services = require("../../services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MAX_ATTEMPTS_TO_RESOLVE_CONFLICTS = 3;
var type = 'index-pattern';

var IndexPattern =
/*#__PURE__*/
function () {
  function IndexPattern(id, getConfig, savedObjectsClient, apiClient, patternCache) {
    var _this = this;

    _classCallCheck(this, IndexPattern);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "title", '');

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "fieldFormatMap", void 0);

    _defineProperty(this, "typeMeta", void 0);

    _defineProperty(this, "fields", void 0);

    _defineProperty(this, "timeFieldName", void 0);

    _defineProperty(this, "intervalName", void 0);

    _defineProperty(this, "formatHit", void 0);

    _defineProperty(this, "formatField", void 0);

    _defineProperty(this, "flattenHit", void 0);

    _defineProperty(this, "metaFields", void 0);

    _defineProperty(this, "version", void 0);

    _defineProperty(this, "savedObjectsClient", void 0);

    _defineProperty(this, "patternCache", void 0);

    _defineProperty(this, "getConfig", void 0);

    _defineProperty(this, "sourceFilters", void 0);

    _defineProperty(this, "originalBody", {});

    _defineProperty(this, "fieldsFetcher", void 0);

    _defineProperty(this, "shortDotsEnable", false);

    _defineProperty(this, "mapping", (0, _public.expandShorthand)({
      title: _common.ES_FIELD_TYPES.TEXT,
      timeFieldName: _common.ES_FIELD_TYPES.KEYWORD,
      intervalName: _common.ES_FIELD_TYPES.KEYWORD,
      fields: 'json',
      sourceFilters: 'json',
      fieldFormatMap: {
        type: _common.ES_FIELD_TYPES.TEXT,
        _serialize: function _serialize() {
          var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var serialized = _lodash.default.transform(map, _this.serializeFieldFormatMap);

          return _lodash.default.isEmpty(serialized) ? undefined : JSON.stringify(serialized);
        },
        _deserialize: function _deserialize() {
          var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '{}';
          return _lodash.default.mapValues(JSON.parse(map), function (mapping) {
            return _this.deserializeFieldFormatMap(mapping);
          });
        }
      },
      type: _common.ES_FIELD_TYPES.KEYWORD,
      typeMeta: 'json'
    }));

    this.id = id;
    this.savedObjectsClient = savedObjectsClient;
    this.patternCache = patternCache; // instead of storing config we rather store the getter only as np uiSettingsClient has circular references
    // which cause problems when being consumed from angular

    this.getConfig = getConfig;
    this.shortDotsEnable = this.getConfig('shortDots:enable');
    this.metaFields = this.getConfig('metaFields');
    this.fields = new _fields.FieldList(this, [], this.shortDotsEnable);
    this.fieldsFetcher = (0, _fields_fetcher.createFieldsFetcher)(this, apiClient, this.getConfig('metaFields'));
    this.flattenHit = (0, _flatten_hit.flattenHitWrapper)(this, this.getConfig('metaFields'));
    this.formatHit = (0, _format_hit.formatHitProvider)(this, (0, _services.getFieldFormats)().getDefaultInstance(_common.KBN_FIELD_TYPES.STRING));
    this.formatField = this.formatHit.formatField;
  }

  _createClass(IndexPattern, [{
    key: "serializeFieldFormatMap",
    value: function serializeFieldFormatMap(flat, format, field) {
      if (format && field) {
        flat[field] = format;
      }
    }
  }, {
    key: "deserializeFieldFormatMap",
    value: function deserializeFieldFormatMap(mapping) {
      var FieldFormat = (0, _services.getFieldFormats)().getType(mapping.id);
      return FieldFormat && new FieldFormat(mapping.params, this.getConfig);
    }
  }, {
    key: "initFields",
    value: function initFields(input) {
      var newValue = input || this.fields;
      this.fields = new _fields.FieldList(this, newValue, this.shortDotsEnable);
    }
  }, {
    key: "isFieldRefreshRequired",
    value: function isFieldRefreshRequired() {
      if (!this.fields) {
        return true;
      }

      return this.fields.every(function (field) {
        // See https://github.com/elastic/kibana/pull/8421
        var hasFieldCaps = 'aggregatable' in field && 'searchable' in field; // See https://github.com/elastic/kibana/pull/11969

        var hasDocValuesFlag = 'readFromDocValues' in field;
        return !hasFieldCaps || !hasDocValuesFlag;
      });
    }
  }, {
    key: "indexFields",
    value: function indexFields() {
      var forceFieldRefresh,
          _args = arguments;
      return regeneratorRuntime.async(function indexFields$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              forceFieldRefresh = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

              if (this.id) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              if (!(forceFieldRefresh || this.isFieldRefreshRequired())) {
                _context.next = 6;
                break;
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(this.refreshFields());

            case 6:
              this.initFields();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateFromElasticSearch",
    value: function updateFromElasticSearch(response) {
      var forceFieldRefresh,
          warningTitle,
          warningText,
          editUrlTemplate,
          editUrl,
          _getNotifications,
          toasts,
          _args2 = arguments;

      return regeneratorRuntime.async(function updateFromElasticSearch$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              forceFieldRefresh = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;

              if (response.found) {
                _context2.next = 3;
                break;
              }

              throw new _public.SavedObjectNotFound(type, this.id, '#/management/kibana/index_pattern');

            case 3:
              _lodash.default.forOwn(this.mapping, function (fieldMapping, name) {
                if (!fieldMapping._deserialize || !name) {
                  return;
                }

                response._source[name] = fieldMapping._deserialize(response._source[name]);
              }); // give index pattern all of the values in _source


              _lodash.default.assign(this, response._source);

              if (!this.title && this.id) {
                this.title = this.id;
              }

              if (this.isUnsupportedTimePattern()) {
                warningTitle = _i18n.i18n.translate('data.indexPatterns.warningTitle', {
                  defaultMessage: 'Support for time interval index patterns removed'
                });
                warningText = _i18n.i18n.translate('data.indexPatterns.warningText', {
                  defaultMessage: 'Currently querying all indices matching {index}. {title} should be migrated to a wildcard-based index pattern.',
                  values: {
                    title: this.title,
                    index: this.getIndex()
                  }
                }); // kbnUrl was added to this service in #35262 before it was de-angularized, and merged in a PR
                // directly against the 7.x branch. Index patterns were de-angularized in #39247, and in order
                // to preserve the functionality from #35262 we need to get the injector here just for kbnUrl.
                // This has all been removed as of 8.0.
                // 2019-12-01 The usage of kbnUrl had to be removed due to the transition to NP.
                // It's now temporarily replaced by a simple replace of the single argument used by all URLs.
                // Once kbnUrl is migrated to NP, this can be updated.

                editUrlTemplate = (0, _utils.getRoutes)().edit;
                editUrl = '/app/kibana#' + editUrlTemplate.replace('{{id}}', this.id);
                _getNotifications = (0, _services.getNotifications)(), toasts = _getNotifications.toasts;
                toasts.addWarning({
                  title: warningTitle,
                  text: (0, _public2.toMountPoint)(_react2.default.createElement("div", null, _react2.default.createElement("p", null, warningText), _react2.default.createElement(_eui.EuiFlexGroup, {
                    justifyContent: "flexEnd",
                    gutterSize: "s"
                  }, _react2.default.createElement(_eui.EuiFlexItem, {
                    grow: false
                  }, _react2.default.createElement(_eui.EuiButton, {
                    size: "s",
                    href: (0, _services.getHttp)().basePath.prepend(editUrl)
                  }, _react2.default.createElement(_react.FormattedMessage, {
                    id: "data.indexPatterns.editIndexPattern",
                    defaultMessage: "Edit index pattern"
                  }))))))
                });
              }

              return _context2.abrupt("return", this.indexFields(forceFieldRefresh));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getComputedFields",
    value: function getComputedFields() {
      var scriptFields = {};

      if (!this.fields) {
        return {
          storedFields: ['*'],
          scriptFields: scriptFields,
          docvalueFields: []
        };
      } // Date value returned in "_source" could be in any number of formats
      // Use a docvalue for each date field to ensure standardized formats when working with date fields
      // indexPattern.flattenHit will override "_source" values when the same field is also defined in "fields"


      var docvalueFields = (0, _lodash.reject)(this.fields.getByType('date'), 'scripted').map(function (dateField) {
        return {
          field: dateField.name,
          format: dateField.esTypes && dateField.esTypes.indexOf('date_nanos') !== -1 ? 'strict_date_time' : 'date_time'
        };
      });
      (0, _lodash.each)(this.getScriptedFields(), function (field) {
        scriptFields[field.name] = {
          script: {
            source: field.script,
            lang: field.lang
          }
        };
      });
      return {
        storedFields: ['*'],
        scriptFields: scriptFields,
        docvalueFields: docvalueFields
      };
    }
  }, {
    key: "init",
    value: function init() {
      var forceFieldRefresh,
          savedObject,
          response,
          _args3 = arguments;
      return regeneratorRuntime.async(function init$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              forceFieldRefresh = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;

              if (this.id) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", this);

            case 3:
              _context3.next = 5;
              return regeneratorRuntime.awrap(this.savedObjectsClient.get(type, this.id));

            case 5:
              savedObject = _context3.sent;
              this.version = savedObject._version;
              response = {
                _id: savedObject.id,
                _type: savedObject.type,
                _source: _lodash.default.cloneDeep(savedObject.attributes),
                found: savedObject._version ? true : false
              }; // Do this before we attempt to update from ES since that call can potentially perform a save

              this.originalBody = this.prepBody();
              _context3.next = 11;
              return regeneratorRuntime.awrap(this.updateFromElasticSearch(response, forceFieldRefresh));

            case 11:
              // Do it after to ensure we have the most up to date information
              this.originalBody = this.prepBody();
              return _context3.abrupt("return", this);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "migrate",
    value: function migrate(newTitle) {
      var _this2 = this;

      return this.savedObjectsClient.update(type, this.id, {
        title: newTitle,
        intervalName: null
      }).then(function (_ref) {
        var _ref$attributes = _ref.attributes,
            title = _ref$attributes.title,
            intervalName = _ref$attributes.intervalName;
        _this2.title = title;
        _this2.intervalName = intervalName;
      }).then(function () {
        return _this2;
      });
    } // Get the source filtering configuration for that index.

  }, {
    key: "getSourceFiltering",
    value: function getSourceFiltering() {
      return {
        excludes: this.sourceFilters && this.sourceFilters.map(function (filter) {
          return filter.value;
        }) || []
      };
    }
  }, {
    key: "addScriptedField",
    value: function addScriptedField(name, script) {
      var fieldType,
          lang,
          scriptedFields,
          names,
          _args4 = arguments;
      return regeneratorRuntime.async(function addScriptedField$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              fieldType = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 'string';
              lang = _args4.length > 3 ? _args4[3] : undefined;
              scriptedFields = this.getScriptedFields();
              names = _lodash.default.pluck(scriptedFields, 'name');

              if (!_lodash.default.contains(names, name)) {
                _context4.next = 6;
                break;
              }

              throw new _public.DuplicateField(name);

            case 6:
              this.fields.add(new _fields.Field(this, {
                name: name,
                script: script,
                fieldType: fieldType,
                scripted: true,
                lang: lang,
                aggregatable: true,
                filterable: true,
                searchable: true
              }, false));
              _context4.next = 9;
              return regeneratorRuntime.awrap(this.save());

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "removeScriptedField",
    value: function removeScriptedField(field) {
      this.fields.remove(field);
      return this.save();
    }
  }, {
    key: "popularizeField",
    value: function popularizeField(fieldName) {
      var unit,
          field,
          count,
          _args5 = arguments;
      return regeneratorRuntime.async(function popularizeField$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              unit = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 1;
              field = this.fields.getByName(fieldName);

              if (field) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return");

            case 4:
              count = Math.max((field.count || 0) + unit, 0);

              if (!(field.count === count)) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return");

            case 7:
              field.count = count;
              _context5.next = 10;
              return regeneratorRuntime.awrap(this.save());

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getNonScriptedFields",
    value: function getNonScriptedFields() {
      return _lodash.default.where(this.fields, {
        scripted: false
      });
    }
  }, {
    key: "getScriptedFields",
    value: function getScriptedFields() {
      return _lodash.default.where(this.fields, {
        scripted: true
      });
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      if (!this.isUnsupportedTimePattern()) {
        return this.title;
      } // Take a time-based interval index pattern title (like [foo-]YYYY.MM.DD[-bar]) and turn it
      // into the actual index (like foo-*-bar) by replacing anything not inside square brackets
      // with a *.


      var regex = /\[[^\]]*]/g; // Matches text inside brackets

      var splits = this.title.split(regex); // e.g. ['', 'YYYY.MM.DD', ''] from the above example

      var matches = this.title.match(regex) || []; // e.g. ['[foo-]', '[-bar]'] from the above example

      return splits.map(function (split, i) {
        var match = i >= matches.length ? '' : matches[i].replace(/[\[\]]/g, '');
        return "".concat(split.length ? '*' : '').concat(match);
      }).join('');
    }
  }, {
    key: "isUnsupportedTimePattern",
    value: function isUnsupportedTimePattern() {
      return !!this.intervalName;
    }
  }, {
    key: "isTimeBased",
    value: function isTimeBased() {
      return !!this.timeFieldName && (!this.fields || !!this.getTimeField());
    }
  }, {
    key: "isTimeNanosBased",
    value: function isTimeNanosBased() {
      var timeField = this.getTimeField();
      return timeField && timeField.esTypes && timeField.esTypes.indexOf('date_nanos') !== -1;
    }
  }, {
    key: "isTimeBasedWildcard",
    value: function isTimeBasedWildcard() {
      return this.isTimeBased() && this.isWildcard();
    }
  }, {
    key: "getTimeField",
    value: function getTimeField() {
      if (!this.timeFieldName || !this.fields || !this.fields.getByName) return;
      return this.fields.getByName(this.timeFieldName);
    }
  }, {
    key: "getFieldByName",
    value: function getFieldByName(name) {
      if (!this.fields || !this.fields.getByName) return;
      return this.fields.getByName(name);
    }
  }, {
    key: "isWildcard",
    value: function isWildcard() {
      return _lodash.default.includes(this.title, '*');
    }
  }, {
    key: "prepBody",
    value: function prepBody() {
      var _this3 = this;

      var body = {}; // serialize json fields

      _lodash.default.forOwn(this.mapping, function (fieldMapping, fieldName) {
        if (!fieldName || _this3[fieldName] == null) return;
        body[fieldName] = fieldMapping._serialize ? fieldMapping._serialize(_this3[fieldName]) : _this3[fieldName];
      });

      return body;
    }
  }, {
    key: "create",
    value: function create() {
      var _this4 = this;

      var allowOverride,
          _create,
          potentialDuplicateByTitle,
          _args7 = arguments;

      return regeneratorRuntime.async(function create$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              allowOverride = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : false;

              _create = function _create(duplicateId) {
                var duplicatePattern, body, response;
                return regeneratorRuntime.async(function _create$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!duplicateId) {
                          _context6.next = 4;
                          break;
                        }

                        duplicatePattern = new IndexPattern(duplicateId, _this4.getConfig, _this4.savedObjectsClient, _this4.patternCache, _this4.fieldsFetcher);
                        _context6.next = 4;
                        return regeneratorRuntime.awrap(duplicatePattern.destroy());

                      case 4:
                        body = _this4.prepBody();
                        _context6.next = 7;
                        return regeneratorRuntime.awrap(_this4.savedObjectsClient.create(type, body, {
                          id: _this4.id
                        }));

                      case 7:
                        response = _context6.sent;
                        _this4.id = response.id;
                        return _context6.abrupt("return", response.id);

                      case 10:
                      case "end":
                        return _context6.stop();
                    }
                  }
                });
              };

              _context7.next = 4;
              return regeneratorRuntime.awrap((0, _utils.findByTitle)(this.savedObjectsClient, this.title));

            case 4:
              potentialDuplicateByTitle = _context7.sent;

              if (potentialDuplicateByTitle) {
                _context7.next = 9;
                break;
              }

              _context7.next = 8;
              return regeneratorRuntime.awrap(_create());

            case 8:
              return _context7.abrupt("return", _context7.sent);

            case 9:
              if (allowOverride) {
                _context7.next = 11;
                break;
              }

              return _context7.abrupt("return", false);

            case 11:
              _context7.next = 13;
              return regeneratorRuntime.awrap(_create(potentialDuplicateByTitle.id));

            case 13:
              return _context7.abrupt("return", _context7.sent);

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "save",
    value: function save() {
      var _this5 = this;

      var saveAttempts,
          body,
          originalChangedKeys,
          _args8 = arguments;
      return regeneratorRuntime.async(function save$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              saveAttempts = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : 0;

              if (this.id) {
                _context8.next = 3;
                break;
              }

              return _context8.abrupt("return");

            case 3:
              body = this.prepBody(); // What keys changed since they last pulled the index pattern

              originalChangedKeys = Object.keys(body).filter(function (key) {
                return body[key] !== _this5.originalBody[key];
              });
              return _context8.abrupt("return", this.savedObjectsClient.update(type, this.id, body, {
                version: this.version
              }).then(function (resp) {
                _this5.id = resp.id;
                _this5.version = resp._version;
              }).catch(function (err) {
                if (_lodash.default.get(err, 'res.status') === 409 && saveAttempts++ < MAX_ATTEMPTS_TO_RESOLVE_CONFLICTS) {
                  var samePattern = new IndexPattern(_this5.id, _this5.getConfig, _this5.savedObjectsClient, _this5.patternCache, _this5.fieldsFetcher);
                  return samePattern.init().then(function () {
                    // What keys changed from now and what the server returned
                    var updatedBody = samePattern.prepBody(); // Build a list of changed keys from the server response
                    // and ensure we ignore the key if the server response
                    // is the same as the original response (since that is expected
                    // if we made a change in that key)

                    var serverChangedKeys = Object.keys(updatedBody).filter(function (key) {
                      return updatedBody[key] !== body[key] && _this5.originalBody[key] !== updatedBody[key];
                    });
                    var unresolvedCollision = false;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = originalChangedKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var originalKey = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                          for (var _iterator2 = serverChangedKeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var serverKey = _step2.value;

                            if (originalKey === serverKey) {
                              unresolvedCollision = true;
                              break;
                            }
                          }
                        } catch (err) {
                          _didIteratorError2 = true;
                          _iteratorError2 = err;
                        } finally {
                          try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                              _iterator2.return();
                            }
                          } finally {
                            if (_didIteratorError2) {
                              throw _iteratorError2;
                            }
                          }
                        }
                      }
                    } catch (err) {
                      _didIteratorError = true;
                      _iteratorError = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                          _iterator.return();
                        }
                      } finally {
                        if (_didIteratorError) {
                          throw _iteratorError;
                        }
                      }
                    }

                    if (unresolvedCollision) {
                      var message = _i18n.i18n.translate('data.indexPatterns.unableWriteLabel', {
                        defaultMessage: 'Unable to write index pattern! Refresh the page to get the most up to date changes for this index pattern.'
                      });

                      var _getNotifications2 = (0, _services.getNotifications)(),
                          _toasts = _getNotifications2.toasts;

                      _toasts.addDanger(message);

                      throw err;
                    } // Set the updated response on this object


                    serverChangedKeys.forEach(function (key) {
                      _this5[key] = samePattern[key];
                    });
                    _this5.version = samePattern.version; // Clear cache

                    _this5.patternCache.clear(_this5.id); // Try the save again


                    return _this5.save(saveAttempts);
                  });
                }

                throw err;
              }));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_fetchFields",
    value: function _fetchFields() {
      var fields, scripted, all;
      return regeneratorRuntime.async(function _fetchFields$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.fieldsFetcher.fetch(this));

            case 2:
              fields = _context9.sent;
              scripted = this.getScriptedFields();
              all = fields.concat(scripted);
              _context9.next = 7;
              return regeneratorRuntime.awrap(this.initFields(all));

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "refreshFields",
    value: function refreshFields() {
      var _this6 = this;

      return this._fetchFields().then(function () {
        return _this6.save();
      }).catch(function (err) {
        // https://github.com/elastic/kibana/issues/9224
        // This call will attempt to remap fields from the matching
        // ES index which may not actually exist. In that scenario,
        // we still want to notify the user that there is a problem
        // but we do not want to potentially make any pages unusable
        // so do not rethrow the error here
        var _getNotifications3 = (0, _services.getNotifications)(),
            toasts = _getNotifications3.toasts;

        if (err instanceof _2.indexPatterns.IndexPatternMissingIndices) {
          toasts.addDanger(err.message);
          return [];
        }

        toasts.addError(err, {
          title: _i18n.i18n.translate('data.indexPatterns.fetchFieldErrorTitle', {
            defaultMessage: 'Error fetching fields for index pattern {title} (ID: {id})',
            values: {
              id: _this6.id,
              title: _this6.title
            }
          })
        });
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.id;
    }
  }, {
    key: "toString",
    value: function toString() {
      return '' + this.toJSON();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.patternCache.clear(this.id);

      if (this.id) {
        return this.savedObjectsClient.delete(type, this.id);
      }
    }
  }, {
    key: "routes",
    get: function get() {
      return (0, _utils.getRoutes)();
    }
  }]);

  return IndexPattern;
}();

exports.IndexPattern = IndexPattern;