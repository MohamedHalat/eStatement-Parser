"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryGeohashBounds = queryGeohashBounds;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _notify = require("ui/notify");

var _timefilter = require("ui/timefilter");

var _courier = require("../../../courier");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Coordinate map visualization needs to be able to query for the latest geohash
 * bounds when a user clicks the "fit to data" map icon, which requires knowing
 * about global filters & queries. This logic has been extracted here so we can
 * keep `searchSource` out of the vis, but ultimately we need to design a
 * long-term solution for situations like this.
 *
 * TODO: Remove this as a part of elastic/kibana#30593
 */
function queryGeohashBounds(vis, params) {
  var agg, searchSource, filters, query, esResp;
  return regeneratorRuntime.async(function queryGeohashBounds$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          agg = vis.getAggConfig().aggs.find(function (a) {
            return (0, _lodash.get)(a, 'type.dslName') === 'geohash_grid';
          });

          if (!agg) {
            _context.next = 19;
            break;
          }

          searchSource = params.searchSource ? params.searchSource.createChild() : new _courier.SearchSource();
          searchSource.setField('size', 0);
          searchSource.setField('aggs', function () {
            var geoBoundsAgg = vis.getAggConfig().createAggConfig({
              type: 'geo_bounds',
              enabled: true,
              params: {
                field: agg.getField()
              },
              schema: 'metric'
            }, {
              addToAggConfigs: false
            });
            return {
              '1': geoBoundsAgg.toDsl()
            };
          });
          filters = params.filters, query = params.query;

          if (filters) {
            searchSource.setField('filter', function () {
              var activeFilters = _toConsumableArray(filters);

              var indexPattern = agg.getIndexPattern();
              var useTimeFilter = !!indexPattern.timeFieldName;

              if (useTimeFilter) {
                var filter = _timefilter.timefilter.createFilter(indexPattern);

                if (filter) activeFilters.push(filter);
              }

              return activeFilters;
            });
          }

          if (query) {
            searchSource.setField('query', query);
          }

          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(searchSource.fetch());

        case 11:
          esResp = _context.sent;
          return _context.abrupt("return", (0, _lodash.get)(esResp, 'aggregations.1.bounds'));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](8);

          _notify.toastNotifications.addDanger({
            title: _i18n.i18n.translate('common.ui.visualize.queryGeohashBounds.unableToGetBoundErrorTitle', {
              defaultMessage: 'Unable to get bounds'
            }),
            text: "".concat(_context.t0.message)
          });

          return _context.abrupt("return");

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 15]]);
}