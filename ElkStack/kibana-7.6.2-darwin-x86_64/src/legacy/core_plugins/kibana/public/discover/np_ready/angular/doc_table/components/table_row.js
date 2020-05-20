"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTableRowDirective = createTableRowDirective;

var _lodash = _interopRequireDefault(require("lodash"));

var _jquery = _interopRequireDefault(require("jquery"));

var _risonNode = _interopRequireDefault(require("rison-node"));

require("../../doc_viewer");

var _no_white_space = require("../../../../../../common/utils/no_white_space");

var _open = _interopRequireDefault(require("./table_row/open.html"));

var _details = _interopRequireDefault(require("./table_row/details.html"));

var _public = require("../../../../../../../../../plugins/kibana_utils/public");

var _cell = _interopRequireDefault(require("../components/table_row/cell.html"));

var _truncate_by_height = _interopRequireDefault(require("../components/table_row/truncate_by_height.html"));

var _public2 = require("../../../../../../../../../plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// @ts-ignore
// @ts-ignore
// guesstimate at the minimum number of chars wide cells in the table should be
var MIN_LINE_LENGTH = 20;

function createTableRowDirective($compile, $httpParamSerializer, kbnUrl, config) {
  var cellTemplate = _lodash.default.template((0, _no_white_space.noWhiteSpace)(_cell.default));

  var truncateByHeightTemplate = _lodash.default.template((0, _no_white_space.noWhiteSpace)(_truncate_by_height.default));

  return {
    restrict: 'A',
    scope: {
      columns: '=',
      filter: '=',
      filters: '=?',
      indexPattern: '=',
      row: '=kbnTableRow',
      onAddColumn: '=?',
      onRemoveColumn: '=?'
    },
    link: function link($scope, $el) {
      $el.after('<tr data-test-subj="docTableDetailsRow" class="kbnDocTableDetails__row">');
      $el.empty(); // when we compile the details, we use this $scope

      var $detailsScope; // when we compile the toggle button in the summary, we use this $scope

      var $toggleScope; // toggle display of the rows details, a full list of the fields from each row

      $scope.toggleRow = function () {
        var $detailsTr = $el.next();
        $scope.open = !$scope.open; ///
        // add/remove $details children
        ///

        $detailsTr.toggle($scope.open);

        if (!$scope.open) {
          // close the child scope if it exists
          $detailsScope.$destroy(); // no need to go any further

          return;
        } else {
          $detailsScope = $scope.$new();
        } // empty the details and rebuild it


        $detailsTr.html(_details.default);
        $detailsScope.row = $scope.row;
        $detailsScope.hit = $scope.row;
        $detailsScope.uriEncodedId = encodeURIComponent($detailsScope.hit._id);
        $compile($detailsTr)($detailsScope);
      };

      $scope.$watchMulti(['indexPattern.timeFieldName', 'row.highlight', '[]columns'], function () {
        createSummaryRow($scope.row);
      });

      $scope.inlineFilter = function inlineFilter($event, type) {
        var column = (0, _jquery.default)($event.target).data().column;
        var field = $scope.indexPattern.fields.getByName(column);
        $scope.filter(field, $scope.flattenedRow[column], type);
      };

      $scope.getContextAppHref = function () {
        var path = kbnUrl.eval('#/discover/context/{{ indexPattern }}/{{ anchorId }}', {
          anchorId: $scope.row._id,
          indexPattern: $scope.indexPattern.id
        });
        var hash = $httpParamSerializer({
          _a: _risonNode.default.encode({
            columns: $scope.columns,
            filters: ($scope.filters || []).map(_public2.esFilters.disableFilter)
          })
        });
        return "".concat(path, "?").concat(hash);
      }; // create a tr element that lists the value for each *column*


      function createSummaryRow(row) {
        var indexPattern = $scope.indexPattern;
        $scope.flattenedRow = indexPattern.flattenHit(row); // We just create a string here because its faster.

        var newHtmls = [_open.default];
        var mapping = indexPattern.fields.getByName;
        var hideTimeColumn = config.get('doc_table:hideTimeColumn');

        if (indexPattern.timeFieldName && !hideTimeColumn) {
          newHtmls.push(cellTemplate({
            timefield: true,
            formatted: _displayField(row, indexPattern.timeFieldName),
            filterable: mapping(indexPattern.timeFieldName).filterable && _lodash.default.isFunction($scope.filter),
            column: indexPattern.timeFieldName
          }));
        }

        $scope.columns.forEach(function (column) {
          var isFilterable = $scope.flattenedRow[column] !== undefined && mapping(column) && mapping(column).filterable && _lodash.default.isFunction($scope.filter);

          newHtmls.push(cellTemplate({
            timefield: false,
            sourcefield: column === '_source',
            formatted: _displayField(row, column, true),
            filterable: isFilterable,
            column: column
          }));
        });
        var $cells = $el.children();
        newHtmls.forEach(function (html, i) {
          var $cell = $cells.eq(i);
          if ($cell.data('discover:html') === html) return;

          var reuse = _lodash.default.find($cells.slice(i + 1), function (cell) {
            return _jquery.default.data(cell, 'discover:html') === html;
          });

          var $target = reuse ? (0, _jquery.default)(reuse).detach() : (0, _jquery.default)(html);
          $target.data('discover:html', html);
          var $before = $cells.eq(i - 1);

          if ($before.length) {
            $before.after($target);
          } else {
            $el.append($target);
          } // rebuild cells since we modified the children


          $cells = $el.children();

          if (!reuse) {
            $toggleScope = $scope.$new();
            $compile($target)($toggleScope);
          }
        });

        if ($scope.open) {
          $detailsScope.row = row;
        } // trim off cells that were not used rest of the cells


        $cells.filter(':gt(' + (newHtmls.length - 1) + ')').remove();
        (0, _public.dispatchRenderComplete)($el[0]);
      }
      /**
       * Fill an element with the value of a field
       */


      function _displayField(row, fieldName) {
        var truncate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var indexPattern = $scope.indexPattern;
        var text = indexPattern.formatField(row, fieldName);

        if (truncate && text.length > MIN_LINE_LENGTH) {
          return truncateByHeightTemplate({
            body: text
          });
        }

        return text;
      }
    }
  };
}