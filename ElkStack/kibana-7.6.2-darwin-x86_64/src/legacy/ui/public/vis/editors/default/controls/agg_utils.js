"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeMakeLabel = safeMakeLabel;
exports.isCompatibleAggregation = isCompatibleAggregation;
exports.useAvailableOptions = useAvailableOptions;
exports.useFallbackMetric = useFallbackMetric;
exports.useValidation = useValidation;
exports.CUSTOM_METRIC = void 0;

var _react = require("react");

var _i18n = require("@kbn/i18n");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var DEFAULT_METRIC = 'custom';
var CUSTOM_METRIC = {
  text: _i18n.i18n.translate('common.ui.aggTypes.customMetricLabel', {
    defaultMessage: 'Custom metric'
  }),
  value: DEFAULT_METRIC
};
exports.CUSTOM_METRIC = CUSTOM_METRIC;

function useCompatibleAggCallback(aggFilter) {
  return (0, _react.useCallback)(isCompatibleAggregation(aggFilter), [aggFilter]);
}
/**
 * the effect is used to set up a default metric aggregation in case,
 * when previously selected metric has been removed
 */


function useFallbackMetric(setValue, aggFilter, metricAggs, value, fallbackValue) {
  var isCompatibleAgg = useCompatibleAggCallback(aggFilter);
  (0, _react.useEffect)(function () {
    if (metricAggs && value && value !== DEFAULT_METRIC) {
      // ensure that metric is set to a valid agg
      var respAgg = metricAggs.filter(isCompatibleAgg).find(function (aggregation) {
        return aggregation.id === value;
      });

      if (!respAgg && value !== fallbackValue) {
        setValue(fallbackValue);
      }
    }
  }, [setValue, isCompatibleAgg, metricAggs, value, fallbackValue]);
}
/**
 * this makes an array of available options in appropriate format for EuiSelect,
 * calculates if an option is disabled
 */


function useAvailableOptions(aggFilter) {
  var metricAggs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaultOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var isCompatibleAgg = useCompatibleAggCallback(aggFilter);
  var options = (0, _react.useMemo)(function () {
    return [].concat(_toConsumableArray(metricAggs.map(function (respAgg) {
      return {
        text: _i18n.i18n.translate('common.ui.aggTypes.definiteMetricLabel', {
          defaultMessage: 'Metric: {metric}',
          values: {
            metric: safeMakeLabel(respAgg)
          }
        }),
        value: respAgg.id,
        disabled: !isCompatibleAgg(respAgg)
      };
    })), [CUSTOM_METRIC], _toConsumableArray(defaultOptions));
  }, [metricAggs, defaultOptions, isCompatibleAgg]);
  return options;
}
/**
 * the effect is used to set up the editor form validity
 * and reset it if a param has been removed
 */


function useValidation(setValidity, isValid) {
  (0, _react.useEffect)(function () {
    setValidity(isValid);
    return function () {
      return setValidity(true);
    };
  }, [isValid]);
}

function safeMakeLabel(agg) {
  try {
    return agg.makeLabel();
  } catch (e) {
    return _i18n.i18n.translate('common.ui.aggTypes.aggNotValidLabel', {
      defaultMessage: '- agg not valid -'
    });
  }
}

function isCompatibleAggregation(aggFilter) {
  return function (agg) {
    return !aggFilter.includes("!".concat(agg.type.name));
  };
}