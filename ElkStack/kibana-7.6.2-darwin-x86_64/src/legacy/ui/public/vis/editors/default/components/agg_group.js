"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorAggGroup = DefaultEditorAggGroup;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _agg_groups = require("../agg_groups");

var _agg = require("./agg");

var _agg_add = require("./agg_add");

var _agg_group_helper = require("./agg_group_helper");

var _agg_group_state = require("./agg_group_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DefaultEditorAggGroup(_ref) {
  var formIsTouched = _ref.formIsTouched,
      groupName = _ref.groupName,
      lastParentPipelineAggTitle = _ref.lastParentPipelineAggTitle,
      metricAggs = _ref.metricAggs,
      state = _ref.state,
      _ref$schemas = _ref.schemas,
      schemas = _ref$schemas === void 0 ? [] : _ref$schemas,
      addSchema = _ref.addSchema,
      onAggParamsChange = _ref.onAggParamsChange,
      onAggTypeChange = _ref.onAggTypeChange,
      onToggleEnableAgg = _ref.onToggleEnableAgg,
      removeAgg = _ref.removeAgg,
      reorderAggs = _ref.reorderAggs,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity;
  var groupNameLabel = (0, _agg_groups.aggGroupNamesMap)()[groupName]; // e.g. buckets can have no aggs

  var group = state.aggs.aggs.filter(function (agg) {
    return agg.schema.group === groupName;
  }) || [];
  var stats = {
    max: 0,
    count: group.length
  };
  schemas.forEach(function (schema) {
    stats.max += schema.max;
  });

  var _useReducer = (0, _react.useReducer)(_agg_group_state.aggGroupReducer, group, _agg_group_state.initAggsState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      aggsState = _useReducer2[0],
      setAggsState = _useReducer2[1];

  var bucketsError = lastParentPipelineAggTitle && groupName === _agg_groups.AggGroupNames.Buckets && !group.length ? _i18n.i18n.translate('common.ui.aggTypes.buckets.mustHaveBucketErrorMessage', {
    defaultMessage: 'Add a bucket with "Date Histogram" or "Histogram" aggregation.',
    description: 'Date Histogram and Histogram should not be translated'
  }) : undefined;
  var isGroupValid = !bucketsError && Object.values(aggsState).every(function (item) {
    return item.valid;
  });
  var isAllAggsTouched = (0, _agg_group_helper.isInvalidAggsTouched)(aggsState);
  var isMetricAggregationDisabled = (0, _react.useMemo)(function () {
    return groupName === _agg_groups.AggGroupNames.Metrics && (0, _agg_group_helper.getEnabledMetricAggsCount)(group) === 1;
  }, [groupName, group]);
  (0, _react.useEffect)(function () {
    // when isAllAggsTouched is true, it means that all invalid aggs are touched and we will set ngModel's touched to true
    // which indicates that Apply button can be changed to Error button (when all invalid ngModels are touched)
    setTouched(isAllAggsTouched);
  }, [isAllAggsTouched]);
  (0, _react.useEffect)(function () {
    // when not all invalid aggs are touched and formIsTouched becomes true, it means that Apply button was clicked.
    // and in such case we set touched state to true for all aggs
    if (formIsTouched && !isAllAggsTouched) {
      Object.keys(aggsState).map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            aggId = _ref3[0];

        setAggsState({
          type: _agg_group_state.AGGS_ACTION_KEYS.TOUCHED,
          payload: true,
          aggId: aggId
        });
      });
    }
  }, [formIsTouched]);
  (0, _react.useEffect)(function () {
    setValidity(isGroupValid);
  }, [isGroupValid]);

  var onDragEnd = function onDragEnd(_ref4) {
    var source = _ref4.source,
        destination = _ref4.destination;

    if (source && destination) {
      var orderedGroup = Array.from(group);

      var _orderedGroup$splice = orderedGroup.splice(source.index, 1),
          _orderedGroup$splice2 = _slicedToArray(_orderedGroup$splice, 1),
          removed = _orderedGroup$splice2[0];

      orderedGroup.splice(destination.index, 0, removed);
      reorderAggs(orderedGroup);
    }
  };

  var setTouchedHandler = function setTouchedHandler(aggId, touched) {
    setAggsState({
      type: _agg_group_state.AGGS_ACTION_KEYS.TOUCHED,
      payload: touched,
      aggId: aggId
    });
  };

  var setValidityHandler = function setValidityHandler(aggId, valid) {
    setAggsState({
      type: _agg_group_state.AGGS_ACTION_KEYS.VALID,
      payload: valid,
      aggId: aggId
    });
  };

  return _react.default.createElement(_eui.EuiDragDropContext, {
    onDragEnd: onDragEnd
  }, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, groupNameLabel)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), bucketsError && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormErrorText, null, bucketsError), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })), _react.default.createElement(_eui.EuiDroppable, {
    droppableId: "agg_group_dnd_".concat(groupName)
  }, _react.default.createElement(_react.default.Fragment, null, group.map(function (agg, index) {
    return _react.default.createElement(_eui.EuiDraggable, {
      key: agg.id,
      index: index,
      draggableId: "agg_group_dnd_".concat(groupName, "_").concat(agg.id),
      customDragHandle: true
    }, function (provided) {
      return _react.default.createElement(_agg.DefaultEditorAgg, {
        agg: agg,
        aggIndex: index,
        aggIsTooLow: (0, _agg_group_helper.calcAggIsTooLow)(agg, index, group),
        dragHandleProps: provided.dragHandleProps,
        formIsTouched: aggsState[agg.id] ? aggsState[agg.id].touched : false,
        groupName: groupName,
        isDraggable: stats.count > 1,
        isLastBucket: groupName === _agg_groups.AggGroupNames.Buckets && index === group.length - 1,
        isRemovable: (0, _agg_group_helper.isAggRemovable)(agg, group),
        isDisabled: agg.schema.name === 'metric' && isMetricAggregationDisabled,
        lastParentPipelineAggTitle: lastParentPipelineAggTitle,
        metricAggs: metricAggs,
        state: state,
        onAggParamsChange: onAggParamsChange,
        onAggTypeChange: onAggTypeChange,
        onToggleEnableAgg: onToggleEnableAgg,
        removeAgg: removeAgg,
        setTouched: function setTouched(isTouched) {
          return setTouchedHandler(agg.id, isTouched);
        },
        setValidity: function setValidity(isValid) {
          return setValidityHandler(agg.id, isValid);
        }
      });
    });
  }))), stats.max > stats.count && _react.default.createElement(_agg_add.DefaultEditorAggAdd, {
    group: group,
    groupName: groupName,
    schemas: schemas,
    stats: stats,
    addSchema: addSchema
  })));
}