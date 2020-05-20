"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArgValueSuggestions = getArgValueSuggestions;

var _lodash = require("lodash");

var _plugin_services = require("./plugin_services");

var _public = require("../../../../../../src/plugins/data/public");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function getArgValueSuggestions() {
  var indexPatterns = (0, _plugin_services.getIndexPatterns)();
  var savedObjectsClient = (0, _plugin_services.getSavedObjectsClient)();

  function getIndexPattern(functionArgs) {
    var indexPatternArg, indexPatternTitle, _ref2, savedObjects, indexPatternSavedObject;

    return regeneratorRuntime.async(function getIndexPattern$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            indexPatternArg = functionArgs.find(function (_ref) {
              var name = _ref.name;
              return name === 'index';
            });

            if (indexPatternArg) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            indexPatternTitle = (0, _lodash.get)(indexPatternArg, 'value.text');
            _context.next = 6;
            return regeneratorRuntime.awrap(savedObjectsClient.find({
              type: 'index-pattern',
              fields: ['title'],
              search: "\"".concat(indexPatternTitle, "\""),
              searchFields: ['title'],
              perPage: 10
            }));

          case 6:
            _ref2 = _context.sent;
            savedObjects = _ref2.savedObjects;
            indexPatternSavedObject = savedObjects.find(function (_ref3) {
              var attributes = _ref3.attributes;
              return attributes.title === indexPatternTitle;
            });

            if (indexPatternSavedObject) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            _context.next = 13;
            return regeneratorRuntime.awrap(indexPatterns.get(indexPatternSavedObject.id));

          case 13:
            return _context.abrupt("return", _context.sent);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function containsFieldName(partial, field) {
    if (!partial) {
      return true;
    }

    return field.name.includes(partial);
  } // Argument value suggestion handlers requiring custom client side code
  // Could not put with function definition since functions are defined on server


  var customHandlers = {
    es: {
      index: function index(partial) {
        var search, resp;
        return regeneratorRuntime.async(function index$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                search = partial ? "".concat(partial, "*") : '*';
                _context2.next = 3;
                return regeneratorRuntime.awrap(savedObjectsClient.find({
                  type: 'index-pattern',
                  fields: ['title', 'type'],
                  search: "".concat(search),
                  searchFields: ['title'],
                  perPage: 25
                }));

              case 3:
                resp = _context2.sent;
                return _context2.abrupt("return", resp.savedObjects.filter(function (savedObject) {
                  return !savedObject.get('type');
                }).map(function (savedObject) {
                  return {
                    name: savedObject.attributes.title
                  };
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        });
      },
      metric: function metric(partial, functionArgs) {
        var indexPattern, valueSplit;
        return regeneratorRuntime.async(function metric$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!partial || !partial.includes(':'))) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", [{
                  name: 'avg:'
                }, {
                  name: 'cardinality:'
                }, {
                  name: 'count'
                }, {
                  name: 'max:'
                }, {
                  name: 'min:'
                }, {
                  name: 'percentiles:'
                }, {
                  name: 'sum:'
                }]);

              case 2:
                _context3.next = 4;
                return regeneratorRuntime.awrap(getIndexPattern(functionArgs));

              case 4:
                indexPattern = _context3.sent;

                if (indexPattern) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", []);

              case 7:
                valueSplit = partial.split(':');
                return _context3.abrupt("return", indexPattern.fields.filter(function (field) {
                  return field.aggregatable && 'number' === field.type && containsFieldName(valueSplit[1], field) && !(0, _public.isNestedField)(field);
                }).map(function (field) {
                  return {
                    name: "".concat(valueSplit[0], ":").concat(field.name),
                    help: field.type
                  };
                }));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        });
      },
      split: function split(partial, functionArgs) {
        var indexPattern;
        return regeneratorRuntime.async(function split$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(getIndexPattern(functionArgs));

              case 2:
                indexPattern = _context4.sent;

                if (indexPattern) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", []);

              case 5:
                return _context4.abrupt("return", indexPattern.fields.filter(function (field) {
                  return field.aggregatable && ['number', 'boolean', 'date', 'ip', 'string'].includes(field.type) && containsFieldName(partial, field) && !(0, _public.isNestedField)(field);
                }).map(function (field) {
                  return {
                    name: field.name,
                    help: field.type
                  };
                }));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        });
      },
      timefield: function timefield(partial, functionArgs) {
        var indexPattern;
        return regeneratorRuntime.async(function timefield$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(getIndexPattern(functionArgs));

              case 2:
                indexPattern = _context5.sent;

                if (indexPattern) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", []);

              case 5:
                return _context5.abrupt("return", indexPattern.fields.filter(function (field) {
                  return 'date' === field.type && containsFieldName(partial, field) && !(0, _public.isNestedField)(field);
                }).map(function (field) {
                  return {
                    name: field.name
                  };
                }));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        });
      }
    }
  };
  return {
    /**
     * @param {string} functionName - user provided function name containing argument
     * @param {string} argName - user provided argument name
     * @return {boolean} true when dynamic suggestion handler provided for function argument
     */
    hasDynamicSuggestionsForArgument: function hasDynamicSuggestionsForArgument(functionName, argName) {
      return customHandlers[functionName] && customHandlers[functionName][argName];
    },

    /**
     * @param {string} functionName - user provided function name containing argument
     * @param {string} argName - user provided argument name
     * @param {object} functionArgs - user provided function arguments parsed ahead of current argument
     * @param {string} partial - user provided argument value
     * @return {array} array of dynamic suggestions matching partial
     */
    getDynamicSuggestionsForArgument: function getDynamicSuggestionsForArgument(functionName, argName, functionArgs) {
      var partialInput,
          _args6 = arguments;
      return regeneratorRuntime.async(function getDynamicSuggestionsForArgument$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              partialInput = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : '';
              _context6.next = 3;
              return regeneratorRuntime.awrap(customHandlers[functionName][argName](partialInput, functionArgs));

            case 3:
              return _context6.abrupt("return", _context6.sent);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      });
    },

    /**
     * @param {string} partial - user provided argument value
     * @param {array} staticSuggestions - argument value suggestions
     * @return {array} array of static suggestions matching partial
     */
    getStaticSuggestionsForInput: function getStaticSuggestionsForInput() {
      var partialInput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var staticSuggestions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (partialInput) {
        return staticSuggestions.filter(function (suggestion) {
          return suggestion.name.includes(partialInput);
        });
      }

      return staticSuggestions;
    }
  };
}