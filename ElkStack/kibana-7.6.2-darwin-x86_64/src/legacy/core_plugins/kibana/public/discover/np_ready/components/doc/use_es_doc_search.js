"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSearchBody = buildSearchBody;
exports.useEsDocSearch = useEsDocSearch;
exports.ElasticRequestState = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ElasticRequestState;
/**
 * helper function to build a query body for Elasticsearch
 * https://www.elastic.co/guide/en/elasticsearch/reference/current//query-dsl-ids-query.html
 */

exports.ElasticRequestState = ElasticRequestState;

(function (ElasticRequestState) {
  ElasticRequestState[ElasticRequestState["Loading"] = 0] = "Loading";
  ElasticRequestState[ElasticRequestState["NotFound"] = 1] = "NotFound";
  ElasticRequestState[ElasticRequestState["Found"] = 2] = "Found";
  ElasticRequestState[ElasticRequestState["Error"] = 3] = "Error";
  ElasticRequestState[ElasticRequestState["NotFoundIndexPattern"] = 4] = "NotFoundIndexPattern";
})(ElasticRequestState || (exports.ElasticRequestState = ElasticRequestState = {}));

function buildSearchBody(id, indexPattern) {
  var computedFields = indexPattern.getComputedFields();
  return {
    query: {
      ids: {
        values: [id]
      }
    },
    stored_fields: computedFields.storedFields,
    _source: true,
    script_fields: computedFields.scriptFields,
    docvalue_fields: computedFields.docvalueFields
  };
}
/**
 * Custom react hook for querying a single doc in ElasticSearch
 */


function useEsDocSearch(_ref) {
  var esClient = _ref.esClient,
      id = _ref.id,
      index = _ref.index,
      indexPatternId = _ref.indexPatternId,
      indexPatternService = _ref.indexPatternService;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      indexPattern = _useState2[0],
      setIndexPattern = _useState2[1];

  var _useState3 = (0, _react.useState)(ElasticRequestState.Loading),
      _useState4 = _slicedToArray(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      hit = _useState6[0],
      setHit = _useState6[1];

  (0, _react.useEffect)(function () {
    function requestData() {
      var indexPatternEntity, _ref2, hits;

      return regeneratorRuntime.async(function requestData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(indexPatternService.get(indexPatternId));

            case 3:
              indexPatternEntity = _context.sent;
              setIndexPattern(indexPatternEntity);
              _context.next = 7;
              return regeneratorRuntime.awrap(esClient.search({
                index: index,
                body: buildSearchBody(id, indexPatternEntity)
              }));

            case 7:
              _ref2 = _context.sent;
              hits = _ref2.hits;

              if (hits && hits.hits && hits.hits[0]) {
                setStatus(ElasticRequestState.Found);
                setHit(hits.hits[0]);
              } else {
                setStatus(ElasticRequestState.NotFound);
              }

              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);

              if (_context.t0.savedObjectId) {
                setStatus(ElasticRequestState.NotFoundIndexPattern);
              } else if (_context.t0.status === 404) {
                setStatus(ElasticRequestState.NotFound);
              } else {
                setStatus(ElasticRequestState.Error);
              }

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 12]]);
    }

    requestData();
  }, [esClient, id, index, indexPatternId, indexPatternService]);
  return [status, hit, indexPattern];
}