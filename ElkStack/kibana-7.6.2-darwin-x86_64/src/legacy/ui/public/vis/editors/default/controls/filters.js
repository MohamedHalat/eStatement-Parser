"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiltersParamEditor = FiltersParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _chrome = _interopRequireDefault(require("../../../../chrome"));

var _filter = require("./filter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var generateId = (0, _eui.htmlIdGenerator)();

var config = _chrome.default.getUiSettingsClient();

function FiltersParamEditor(_ref) {
  var agg = _ref.agg,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? [] : _ref$value,
      setValue = _ref.setValue;

  var _useState = (0, _react.useState)(function () {
    return value.map(function (filter) {
      return _objectSpread({}, filter, {
        id: generateId()
      });
    });
  }),
      _useState2 = _slicedToArray(_useState, 2),
      filters = _useState2[0],
      setFilters = _useState2[1];

  (0, _react.useEffect)(function () {
    // set parsed values into model after initialization
    setValue(filters.map(function (filter) {
      return (0, _lodash.omit)(_objectSpread({}, filter, {
        input: filter.input
      }), 'id');
    }));
  }, []);
  (0, _react.useEffect)(function () {
    // responsible for discarding changes
    if (value.length !== filters.length || value.some(function (filter, index) {
      return !(0, _lodash.isEqual)(filter, (0, _lodash.omit)(filters[index], 'id'));
    })) {
      setFilters(value.map(function (filter) {
        return _objectSpread({}, filter, {
          id: generateId()
        });
      }));
    }
  }, [value]);

  var updateFilters = function updateFilters(updatedFilters) {
    // do not set internal id parameter into saved object
    setValue(updatedFilters.map(function (filter) {
      return (0, _lodash.omit)(filter, 'id');
    }));
    setFilters(updatedFilters);
  };

  var onAddFilter = function onAddFilter() {
    return updateFilters([].concat(_toConsumableArray(filters), [{
      input: {
        query: '',
        language: config.get('search:queryLanguage')
      },
      label: '',
      id: generateId()
    }]));
  };

  var onRemoveFilter = function onRemoveFilter(id) {
    return updateFilters(filters.filter(function (filter) {
      return filter.id !== id;
    }));
  };

  var onChangeValue = function onChangeValue(id, query, label) {
    return updateFilters(filters.map(function (filter) {
      return filter.id === id ? _objectSpread({}, filter, {
        input: query,
        label: label
      }) : filter;
    }));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), filters.map(function (_ref2, arrayIndex) {
    var input = _ref2.input,
        label = _ref2.label,
        id = _ref2.id;
    return _react.default.createElement(_filter.FilterRow, {
      key: id,
      id: id,
      arrayIndex: arrayIndex,
      customLabel: label,
      value: input,
      autoFocus: arrayIndex === filters.length - 1,
      disableRemove: arrayIndex === 0 && filters.length === 1,
      dataTestSubj: "visEditorFilterInput_".concat(agg.id, "_").concat(arrayIndex),
      agg: agg,
      onChangeValue: onChangeValue,
      onRemoveFilter: onRemoveFilter
    });
  }), _react.default.createElement(_eui.EuiButton, {
    iconType: "plusInCircle",
    fill: true,
    fullWidth: true,
    onClick: onAddFilter,
    size: "s",
    "data-test-subj": "visEditorAddFilterButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.filters.addFilterButtonLabel",
    defaultMessage: "Add filter"
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
}