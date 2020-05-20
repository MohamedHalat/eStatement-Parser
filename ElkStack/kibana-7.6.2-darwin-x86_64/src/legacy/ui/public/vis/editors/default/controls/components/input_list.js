"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputList = InputList;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

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

var validateValue = function validateValue(inputValue, config) {
  var result = {
    model: inputValue || '',
    isInvalid: false
  };

  if (!inputValue) {
    result.isInvalid = false;
    return result;
  }

  try {
    var _InputObject = config.validateClass;
    result.model = new _InputObject(inputValue).toString();
    result.isInvalid = false;
    return result;
  } catch (e) {
    result.isInvalid = true;
    return result;
  }
};

function InputList(_ref) {
  var config = _ref.config,
      list = _ref.list,
      onChange = _ref.onChange,
      setValidity = _ref.setValidity;

  var _useState = (0, _react.useState)(function () {
    return list.map(function (item) {
      return _objectSpread({
        id: generateId()
      }, config.getModelValue(item));
    });
  }),
      _useState2 = _slicedToArray(_useState, 2),
      models = _useState2[0],
      setModels = _useState2[1];

  var hasInvalidValues = models.some(config.hasInvalidValuesFn);

  var updateValues = function updateValues(modelList) {
    setModels(modelList);
    onChange(modelList.map(config.onChangeFn));
  };

  var onChangeValue = function onChangeValue(index, value, modelName) {
    var _validateValue = validateValue(value, config),
        model = _validateValue.model,
        isInvalid = _validateValue.isInvalid;

    updateValues(models.map(function (range, arrayIndex) {
      return arrayIndex === index ? _objectSpread({}, range, _defineProperty({}, modelName, {
        value: value,
        model: model,
        isInvalid: isInvalid
      })) : range;
    }));
  };

  var onDelete = function onDelete(id) {
    return updateValues(models.filter(function (model) {
      return model.id !== id;
    }));
  };

  var onAdd = function onAdd() {
    return updateValues([].concat(_toConsumableArray(models), [_objectSpread({
      id: generateId()
    }, config.getModelValue())]));
  };

  (0, _react.useEffect)(function () {
    // resposible for setting up an initial value when there is no default value
    if (!list.length) {
      updateValues([_objectSpread({
        id: generateId()
      }, config.defaultValue)]);
    }
  }, []);
  (0, _react.useEffect)(function () {
    setValidity(!hasInvalidValues);
  }, [hasInvalidValues]);
  (0, _react.useEffect)(function () {
    // responsible for discarding changes
    if (list.length !== models.length || list.some(function (item, index) {
      // make model to be the same shape as stored value
      var model = (0, _lodash.mapValues)((0, _lodash.pick)(models[index], config.modelNames), 'model'); // we need to skip empty values since they are not stored in saved object

      return !(0, _lodash.isEqual)(item, (0, _lodash.omit)(model, _lodash.isEmpty));
    })) {
      setModels(list.map(function (item) {
        return _objectSpread({
          id: generateId()
        }, config.getModelValue(item));
      }));
    }
  }, [list]);
  return _react.default.createElement(_react.default.Fragment, null, models.map(function (item, index) {
    return _react.default.createElement(_react.Fragment, {
      key: item.id
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "xs",
      alignItems: "center",
      responsive: false
    }, config.renderInputRow(item, index, onChangeValue), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      "aria-label": config.getRemoveBtnAriaLabel(item),
      title: config.getRemoveBtnAriaLabel(item),
      disabled: models.length === 1,
      color: "danger",
      iconType: "trash",
      onClick: function onClick() {
        return onDelete(item.id);
      }
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "xs"
    }));
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "plusInCircleFilled",
    onClick: onAdd,
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.ipRanges.addRangeButtonLabel",
    defaultMessage: "Add range"
  }))));
}