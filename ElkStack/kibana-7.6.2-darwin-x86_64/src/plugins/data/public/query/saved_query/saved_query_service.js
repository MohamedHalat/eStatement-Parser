"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedQueryService = void 0;

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
var createSavedQueryService = function createSavedQueryService(savedObjectsClient) {
  var saveQuery = function saveQuery(attributes) {
    var _ref,
        _ref$overwrite,
        overwrite,
        query,
        queryObject,
        rawQueryResponse,
        _args = arguments;

    return regeneratorRuntime.async(function saveQuery$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref$overwrite = _ref.overwrite, overwrite = _ref$overwrite === void 0 ? false : _ref$overwrite;

            if (attributes.title.length) {
              _context.next = 3;
              break;
            }

            throw new Error('Cannot create saved query without a title');

          case 3:
            query = {
              query: typeof attributes.query.query === 'string' ? attributes.query.query : JSON.stringify(attributes.query.query),
              language: attributes.query.language
            };
            queryObject = {
              title: attributes.title.trim(),
              // trim whitespace before save as an extra precaution against circumventing the front end
              description: attributes.description,
              query: query
            };

            if (attributes.filters) {
              queryObject.filters = attributes.filters;
            }

            if (attributes.timefilter) {
              queryObject.timefilter = attributes.timefilter;
            }

            if (overwrite) {
              _context.next = 13;
              break;
            }

            _context.next = 10;
            return regeneratorRuntime.awrap(savedObjectsClient.create('query', queryObject, {
              id: attributes.title
            }));

          case 10:
            rawQueryResponse = _context.sent;
            _context.next = 16;
            break;

          case 13:
            _context.next = 15;
            return regeneratorRuntime.awrap(savedObjectsClient.create('query', queryObject, {
              id: attributes.title,
              overwrite: true
            }));

          case 15:
            rawQueryResponse = _context.sent;

          case 16:
            if (!rawQueryResponse.error) {
              _context.next = 18;
              break;
            }

            throw new Error(rawQueryResponse.error.message);

          case 18:
            return _context.abrupt("return", parseSavedQueryObject(rawQueryResponse));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    });
  }; // we have to tell the saved objects client how many to fetch, otherwise it defaults to fetching 20 per page


  var getAllSavedQueries = function getAllSavedQueries() {
    var count, response;
    return regeneratorRuntime.async(function getAllSavedQueries$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(getSavedQueryCount());

          case 2:
            count = _context2.sent;
            _context2.next = 5;
            return regeneratorRuntime.awrap(savedObjectsClient.find({
              type: 'query',
              perPage: count,
              page: 1
            }));

          case 5:
            response = _context2.sent;
            return _context2.abrupt("return", response.savedObjects.map(function (savedObject) {
              return parseSavedQueryObject(savedObject);
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  }; // findSavedQueries will do a 'match_all' if no search string is passed in


  var findSavedQueries = function findSavedQueries() {
    var searchText,
        perPage,
        activePage,
        response,
        _args3 = arguments;
    return regeneratorRuntime.async(function findSavedQueries$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            searchText = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : '';
            perPage = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 50;
            activePage = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 1;
            _context3.next = 5;
            return regeneratorRuntime.awrap(savedObjectsClient.find({
              type: 'query',
              search: searchText,
              searchFields: ['title^5', 'description'],
              sortField: '_score',
              perPage: perPage,
              page: activePage
            }));

          case 5:
            response = _context3.sent;
            return _context3.abrupt("return", response.savedObjects.map(function (savedObject) {
              return parseSavedQueryObject(savedObject);
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  };

  var getSavedQuery = function getSavedQuery(id) {
    var response;
    return regeneratorRuntime.async(function getSavedQuery$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(savedObjectsClient.get('query', id));

          case 2:
            response = _context4.sent;
            return _context4.abrupt("return", parseSavedQueryObject(response));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  };

  var deleteSavedQuery = function deleteSavedQuery(id) {
    return regeneratorRuntime.async(function deleteSavedQuery$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(savedObjectsClient.delete('query', id));

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    });
  };

  var parseSavedQueryObject = function parseSavedQueryObject(savedQuery) {
    var queryString;

    try {
      queryString = JSON.parse(savedQuery.attributes.query.query);
    } catch (error) {
      queryString = savedQuery.attributes.query.query;
    }

    var savedQueryItems = {
      title: savedQuery.attributes.title || '',
      description: savedQuery.attributes.description || '',
      query: {
        query: queryString,
        language: savedQuery.attributes.query.language
      }
    };

    if (savedQuery.attributes.filters) {
      savedQueryItems.filters = savedQuery.attributes.filters;
    }

    if (savedQuery.attributes.timefilter) {
      savedQueryItems.timefilter = savedQuery.attributes.timefilter;
    }

    return {
      id: savedQuery.id,
      attributes: savedQueryItems
    };
  };

  var getSavedQueryCount = function getSavedQueryCount() {
    var response;
    return regeneratorRuntime.async(function getSavedQueryCount$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(savedObjectsClient.find({
              type: 'query',
              perPage: 0,
              page: 1
            }));

          case 2:
            response = _context6.sent;
            return _context6.abrupt("return", response.total);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    });
  };

  return {
    saveQuery: saveQuery,
    getAllSavedQueries: getAllSavedQueries,
    findSavedQueries: findSavedQueries,
    getSavedQuery: getSavedQuery,
    deleteSavedQuery: deleteSavedQuery,
    getSavedQueryCount: getSavedQueryCount
  };
};

exports.createSavedQueryService = createSavedQueryService;