"use strict";

var _kibana_services = require("../../kibana_services");

var _breadcrumbs = require("../helpers/breadcrumbs");

var _doc = _interopRequireDefault(require("./doc.html"));

var _doc2 = require("../components/doc/doc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _getServices = (0, _kibana_services.getServices)(),
    timefilter = _getServices.timefilter;

var app = (0, _kibana_services.getAngularModule)();
app.directive('discoverDoc', function (reactDirective) {
  return reactDirective((0, _kibana_services.wrapInI18nContext)(_doc2.Doc), [['id', {
    watchDepth: 'value'
  }], ['index', {
    watchDepth: 'value'
  }], ['indexPatternId', {
    watchDepth: 'reference'
  }], ['indexPatternService', {
    watchDepth: 'reference'
  }], ['esClient', {
    watchDepth: 'reference'
  }]], {
    restrict: 'E'
  });
});
app.config(function ($routeProvider) {
  $routeProvider.when('/discover/doc/:indexPattern/:index/:type', {
    redirectTo: '/discover/doc/:indexPattern/:index'
  }) // the new route, es 7 deprecated types, es 8 removed them
  .when('/discover/doc/:indexPattern/:index', {
    controller: function controller($scope, $route, es) {
      timefilter.disableAutoRefreshSelector();
      timefilter.disableTimeRangeSelector();
      $scope.esClient = es;
      $scope.id = $route.current.params.id;
      $scope.index = $route.current.params.index;
      $scope.indexPatternId = $route.current.params.indexPattern;
      $scope.indexPatternService = (0, _kibana_services.getServices)().indexPatterns;
    },
    template: _doc.default,
    k7Breadcrumbs: function k7Breadcrumbs($route) {
      return [].concat(_toConsumableArray((0, _breadcrumbs.getRootBreadcrumbs)()), [{
        text: "".concat($route.current.params.index, "#").concat($route.current.params.id)
      }]);
    }
  });
});