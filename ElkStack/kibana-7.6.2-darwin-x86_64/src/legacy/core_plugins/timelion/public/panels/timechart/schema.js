"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timechartFn = timechartFn;

require("./flot");

var _lodash = _interopRequireDefault(require("lodash"));

var _jquery = _interopRequireDefault(require("jquery"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _timefilter = require("ui/timefilter");

var _observe_resize = _interopRequireDefault(require("../../lib/observe_resize"));

var _lib = require("../../../common/lib");

var _tick_formatters = require("../../services/tick_formatters");

var _xaxis_formatter = require("./xaxis_formatter");

var _tick_generator = require("./tick_generator");

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
var DEBOUNCE_DELAY = 50;

function timechartFn(dependencies) {
  var $rootScope = dependencies.$rootScope,
      $compile = dependencies.$compile,
      uiSettings = dependencies.uiSettings;
  return function () {
    return {
      help: 'Draw a timeseries chart',
      render: function render($scope, $elem) {
        var template = '<div class="chart-top-title"></div><div class="chart-canvas"></div>';
        var formatters = (0, _tick_formatters.tickFormatters)();
        var getxAxisFormatter = (0, _xaxis_formatter.xaxisFormatterProvider)(uiSettings);
        var generateTicks = (0, _tick_generator.generateTicksProvider)(); // TODO: I wonder if we should supply our own moment that sets this every time?
        // could just use angular's injection to provide a moment service?

        _momentTimezone.default.tz.setDefault(uiSettings.get('dateFormat:tz'));

        var render = $scope.seriesList.render || {};
        $scope.chart = $scope.seriesList.list;
        $scope.interval = $scope.interval;
        $scope.search = $scope.search || _lodash.default.noop;
        var legendValueNumbers;
        var legendCaption;

        var debouncedSetLegendNumbers = _lodash.default.debounce(setLegendNumbers, DEBOUNCE_DELAY, {
          maxWait: DEBOUNCE_DELAY,
          leading: true,
          trailing: false
        }); // ensure legend is the same height with or without a caption so legend items do not move around


        var emptyCaption = '<br>';
        var defaultOptions = {
          xaxis: {
            mode: 'time',
            tickLength: 5,
            timezone: 'browser'
          },
          selection: {
            mode: 'x',
            color: '#ccc'
          },
          crosshair: {
            mode: 'x',
            color: '#C66',
            lineWidth: 2
          },
          grid: {
            show: render.grid,
            borderWidth: 0,
            borderColor: null,
            margin: 10,
            hoverable: true,
            autoHighlight: false
          },
          legend: {
            backgroundColor: 'rgb(255,255,255,0)',
            position: 'nw',
            labelBoxBorderColor: 'rgb(255,255,255,0)',
            labelFormatter: function labelFormatter(label, series) {
              var wrapperSpan = document.createElement('span');
              var labelSpan = document.createElement('span');
              var numberSpan = document.createElement('span');
              wrapperSpan.setAttribute('class', 'ngLegendValue');
              wrapperSpan.setAttribute('kbn-accessible-click', '');
              wrapperSpan.setAttribute('ng-click', "toggleSeries(".concat(series._id, ")"));
              wrapperSpan.setAttribute('ng-focus', "focusSeries(".concat(series._id, ")"));
              wrapperSpan.setAttribute('ng-mouseover', "highlightSeries(".concat(series._id, ")"));
              labelSpan.setAttribute('ng-non-bindable', '');
              labelSpan.appendChild(document.createTextNode(label));
              numberSpan.setAttribute('class', 'ngLegendValueNumber');
              wrapperSpan.appendChild(labelSpan);
              wrapperSpan.appendChild(numberSpan);
              return wrapperSpan.outerHTML;
            }
          },
          colors: ['#01A4A4', '#C66', '#D0D102', '#616161', '#00A1CB', '#32742C', '#F18D05', '#113F8C', '#61AE24', '#D70060']
        };
        var originalColorMap = new Map();
        $scope.chart.forEach(function (series, seriesIndex) {
          if (!series.color) {
            var colorIndex = seriesIndex % defaultOptions.colors.length;
            series.color = defaultOptions.colors[colorIndex];
          }

          originalColorMap.set(series, series.color);
        });
        var highlightedSeries;
        var focusedSeries;

        function unhighlightSeries() {
          if (highlightedSeries === null) {
            return;
          }

          highlightedSeries = null;
          focusedSeries = null;
          $scope.chart.forEach(function (series) {
            series.color = originalColorMap.get(series); // reset the colors
          });
          drawPlot($scope.chart);
        }

        $scope.highlightSeries = _lodash.default.debounce(function (id) {
          if (highlightedSeries === id) {
            return;
          }

          highlightedSeries = id;
          $scope.chart.forEach(function (series, seriesIndex) {
            if (seriesIndex !== id) {
              series.color = 'rgba(128,128,128,0.1)'; // mark as grey
            } else {
              series.color = originalColorMap.get(series); // color it like it was
            }
          });
          drawPlot($scope.chart);
        }, DEBOUNCE_DELAY);

        $scope.focusSeries = function (id) {
          focusedSeries = id;
          $scope.highlightSeries(id);
        };

        $scope.toggleSeries = function (id) {
          var series = $scope.chart[id];
          series._hide = !series._hide;
          drawPlot($scope.chart);
        };

        var cancelResize = (0, _observe_resize.default)($elem, function () {
          drawPlot($scope.chart);
        });
        $scope.$on('$destroy', function () {
          cancelResize();
          $elem.off('plothover');
          $elem.off('plotselected');
          $elem.off('mouseleave');
        });
        $elem.on('plothover', function (event, pos, item) {
          $rootScope.$broadcast('timelionPlotHover', event, pos, item);
        });
        $elem.on('plotselected', function (event, ranges) {
          _timefilter.timefilter.setTime({
            from: (0, _momentTimezone.default)(ranges.xaxis.from),
            to: (0, _momentTimezone.default)(ranges.xaxis.to)
          });
        });
        $elem.on('mouseleave', function () {
          $rootScope.$broadcast('timelionPlotLeave');
        });
        $scope.$on('timelionPlotHover', function (angularEvent, flotEvent, pos) {
          if (!$scope.plot) return;
          $scope.plot.setCrosshair(pos);
          debouncedSetLegendNumbers(pos);
        });
        $scope.$on('timelionPlotLeave', function () {
          if (!$scope.plot) return;
          $scope.plot.clearCrosshair();
          clearLegendNumbers();
        }); // Shamelessly borrowed from the flotCrosshairs example

        function setLegendNumbers(pos) {
          unhighlightSeries();
          var plot = $scope.plot;
          var axes = plot.getAxes();

          if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max) {
            return;
          }

          var i;
          var dataset = plot.getData();

          if (legendCaption) {
            legendCaption.text((0, _momentTimezone.default)(pos.x).format(_lodash.default.get(dataset, '[0]._global.legend.timeFormat', _lib.DEFAULT_TIME_FORMAT)));
          }

          var _loop = function _loop() {
            var series = dataset[i];
            var useNearestPoint = series.lines.show && !series.lines.steps;

            var precision = _lodash.default.get(series, '_meta.precision', 2);

            if (series._hide) return "continue";
            var currentPoint = series.data.find(function (point, index) {
              if (index + 1 === series.data.length) {
                return true;
              }

              if (useNearestPoint) {
                return pos.x - point[0] < series.data[index + 1][0] - pos.x;
              } else {
                return pos.x < series.data[index + 1][0];
              }
            });
            var y = currentPoint[1];

            if (y != null) {
              var label = y.toFixed(precision);

              if (series.yaxis.tickFormatter) {
                label = series.yaxis.tickFormatter(label, series.yaxis);
              }

              legendValueNumbers.eq(i).text("(".concat(label, ")"));
            } else {
              legendValueNumbers.eq(i).empty();
            }
          };

          for (i = 0; i < dataset.length; ++i) {
            var _ret = _loop();

            if (_ret === "continue") continue;
          }
        }

        function clearLegendNumbers() {
          if (legendCaption) {
            legendCaption.html(emptyCaption);
          }

          _lodash.default.each(legendValueNumbers, function (num) {
            (0, _jquery.default)(num).empty();
          });
        }

        var legendScope = $scope.$new();

        function drawPlot(plotConfig) {
          if (!(0, _jquery.default)('.chart-canvas', $elem).length) $elem.html(template);
          var canvasElem = (0, _jquery.default)('.chart-canvas', $elem); // we can't use `$.plot` to draw the chart when the height or width is 0
          // so, we'll need another event to trigger drawPlot to actually draw it

          if (canvasElem.height() === 0 || canvasElem.width() === 0) {
            return;
          }

          var title = (0, _lodash.default)(plotConfig).map('_title').compact().last();
          (0, _jquery.default)('.chart-top-title', $elem).text(title == null ? '' : title);

          var options = _lodash.default.cloneDeep(defaultOptions); // Get the X-axis tick format


          var time = _timefilter.timefilter.getBounds();

          var interval = (0, _lib.calculateInterval)(time.min.valueOf(), time.max.valueOf(), uiSettings.get('timelion:target_buckets') || 200, $scope.interval, uiSettings.get('timelion:min_interval') || '1ms');
          var format = getxAxisFormatter(interval); // Use moment to format ticks so we get timezone correction

          options.xaxis.tickFormatter = function (val) {
            return (0, _momentTimezone.default)(val).format(format);
          }; // Calculate how many ticks can fit on the axis


          var tickLetterWidth = 7;
          var tickPadding = 45;
          options.xaxis.ticks = Math.floor($elem.width() / (format.length * tickLetterWidth + tickPadding));

          var series = _lodash.default.map(plotConfig, function (serie, index) {
            serie = _lodash.default.cloneDeep(_lodash.default.defaults(serie, {
              shadowSize: 0,
              lines: {
                lineWidth: 3
              }
            }));
            serie._id = index;

            if (serie.color) {
              var span = document.createElement('span');
              span.style.color = serie.color;
              serie.color = span.style.color;
            }

            if (serie._hide) {
              serie.data = [];
              serie.stack = false; // serie.color = "#ddd";

              serie.label = '(hidden) ' + serie.label;
            }

            if (serie._global) {
              _lodash.default.merge(options, serie._global, function (objVal, srcVal) {
                // This is kind of gross, it means that you can't replace a global value with a null
                // best you can do is an empty string. Deal with it.
                if (objVal == null) return srcVal;
                if (srcVal == null) return objVal;
              });
            }

            return serie;
          });

          if (options.yaxes) {
            options.yaxes.forEach(function (yaxis) {
              if (yaxis && yaxis.units) {
                yaxis.tickFormatter = formatters[yaxis.units.type];
                var byteModes = ['bytes', 'bytes/s'];

                if (byteModes.includes(yaxis.units.type)) {
                  yaxis.tickGenerator = generateTicks;
                }
              }
            });
          } // @ts-ignore


          $scope.plot = _jquery.default.plot(canvasElem, _lodash.default.compact(series), options);

          if ($scope.plot) {
            $scope.$emit('timelionChartRendered');
          }

          legendScope.$destroy();
          legendScope = $scope.$new(); // Used to toggle the series, and for displaying values on hover

          legendValueNumbers = canvasElem.find('.ngLegendValueNumber');

          _lodash.default.each(canvasElem.find('.ngLegendValue'), function (elem) {
            $compile(elem)(legendScope);
          });

          if (_lodash.default.get($scope.plot.getData(), '[0]._global.legend.showTime', true)) {
            legendCaption = (0, _jquery.default)('<caption class="timChart__legendCaption"></caption>');
            legendCaption.html(emptyCaption);
            canvasElem.find('div.legend table').append(legendCaption); // legend has been re-created. Apply focus on legend element when previously set

            if (focusedSeries || focusedSeries === 0) {
              var $legendLabels = canvasElem.find('div.legend table .legendLabel>span');
              $legendLabels.get(focusedSeries).focus();
            }
          }
        }

        $scope.$watch('chart', drawPlot);
      }
    };
  };
}