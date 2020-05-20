"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderAggParamEditor = OrderAggParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _ = require("..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function OrderAggParamEditor(_ref) {
  var agg = _ref.agg,
      value = _ref.value,
      metricAggs = _ref.metricAggs,
      state = _ref.state,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity,
      setTouched = _ref.setTouched,
      subAggParams = _ref.subAggParams;
  (0, _react.useEffect)(function () {
    if (metricAggs) {
      var orderBy = agg.params.orderBy; // we aren't creating a custom aggConfig

      if (!orderBy || orderBy !== 'custom') {
        setValue(undefined);
      } else if (value) {
        setValue(value);
      } else {
        var paramDef = agg.type.paramByName('orderAgg');

        if (paramDef) {
          setValue(paramDef.makeAgg(agg));
        }
      }
    }
  }, [agg.params.orderBy, metricAggs]);

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      innerState = _useState2[0],
      setInnerState = _useState2[1];

  if (!agg.params.orderAgg) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_.DefaultEditorAggParams, {
    agg: value,
    groupName: "metrics",
    className: "visEditorAgg__subAgg",
    formIsTouched: subAggParams.formIsTouched,
    indexPattern: agg.getIndexPattern(),
    metricAggs: metricAggs,
    state: state,
    onAggParamsChange: function onAggParamsChange() {
      // to force update when sub-agg params are changed
      setInnerState(!innerState);
      subAggParams.onAggParamsChange.apply(subAggParams, arguments);
    },
    onAggTypeChange: subAggParams.onAggTypeChange,
    setValidity: setValidity,
    setTouched: setTouched
  }));
}