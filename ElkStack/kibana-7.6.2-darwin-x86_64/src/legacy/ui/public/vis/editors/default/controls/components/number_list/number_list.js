"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberList = NumberList;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _number_row = require("./number_row");

var _utils = require("./utils");

var _agg_utils = require("../../agg_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function NumberList(_ref) {
  var labelledbyId = _ref.labelledbyId,
      numberArray = _ref.numberArray,
      range = _ref.range,
      showValidation = _ref.showValidation,
      unitName = _ref.unitName,
      _ref$validateAscendin = _ref.validateAscendingOrder,
      validateAscendingOrder = _ref$validateAscendin === void 0 ? true : _ref$validateAscendin,
      onChange = _ref.onChange,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity;
  var numberRange = (0, _react.useMemo)(function () {
    return (0, _utils.getRange)(range);
  }, [range]);

  var _useState = (0, _react.useState)((0, _utils.getInitModelList)(numberArray)),
      _useState2 = _slicedToArray(_useState, 2),
      models = _useState2[0],
      setModels = _useState2[1];

  var _useState3 = (0, _react.useState)(_utils.EMPTY_STRING),
      _useState4 = _slicedToArray(_useState3, 2),
      ascendingError = _useState4[0],
      setAscendingError = _useState4[1]; // set up validity for each model


  (0, _react.useEffect)(function () {
    var id;

    if (validateAscendingOrder) {
      var _validateOrder = (0, _utils.validateOrder)(numberArray),
          isValidOrder = _validateOrder.isValidOrder,
          modelIndex = _validateOrder.modelIndex;

      id = isValidOrder ? undefined : modelIndex;
      setAscendingError(isValidOrder ? _utils.EMPTY_STRING : _i18n.i18n.translate('common.ui.aggTypes.numberList.invalidAscOrderErrorMessage', {
        defaultMessage: 'The values should be in ascending order.'
      }));
    }

    setModels(function (state) {
      return (0, _utils.getUpdatedModels)(numberArray, state, numberRange, id);
    });
  }, [numberArray, numberRange, validateAscendingOrder]); // responsible for setting up an initial value ([0]) when there is no default value

  (0, _react.useEffect)(function () {
    if (!numberArray.length) {
      onChange([models[0].value]);
    }
  }, []);
  var isValid = !(0, _utils.hasInvalidValues)(models);
  (0, _agg_utils.useValidation)(setValidity, isValid);
  var onUpdate = (0, _react.useCallback)(function (modelList) {
    setModels(modelList);
    onChange(modelList.map(function (_ref2) {
      var value = _ref2.value;
      return value === _utils.EMPTY_STRING ? undefined : value;
    }));
  }, [onChange]);
  var onChangeValue = (0, _react.useCallback)(function (_ref3) {
    var id = _ref3.id,
        value = _ref3.value;
    var parsedValue = (0, _utils.parse)(value);
    onUpdate(models.map(function (model) {
      if (model.id === id) {
        var _validateValue = (0, _utils.validateValue)(parsedValue, numberRange),
            isInvalid = _validateValue.isInvalid,
            error = _validateValue.error;

        return {
          id: id,
          value: parsedValue,
          isInvalid: isInvalid,
          error: error
        };
      }

      return model;
    }));
  }, [numberRange, models, onUpdate]); // Add an item to the end of the list

  var onAdd = (0, _react.useCallback)(function () {
    var newArray = [].concat(_toConsumableArray(models), [(0, _utils.getNextModel)(models, numberRange)]);
    onUpdate(newArray);
  }, [models, numberRange, onUpdate]);
  var onDelete = (0, _react.useCallback)(function (id) {
    var newArray = models.filter(function (model) {
      return model.id !== id;
    });
    onUpdate(newArray);
  }, [models, onUpdate]);
  return _react.default.createElement(_react.default.Fragment, null, models.map(function (model, arrayIndex) {
    return _react.default.createElement(_react.Fragment, {
      key: model.id
    }, _react.default.createElement(_number_row.NumberRow, {
      isInvalid: showValidation ? model.isInvalid : false,
      disableDelete: models.length === 1,
      model: model,
      labelledbyId: labelledbyId,
      range: numberRange,
      onDelete: onDelete,
      onChange: onChangeValue,
      onBlur: setTouched,
      autoFocus: models.length !== 1 && arrayIndex === models.length - 1
    }), showValidation && model.isInvalid && model.error && _react.default.createElement(_eui.EuiFormErrorText, null, model.error), models.length - 1 !== arrayIndex && _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  }), showValidation && ascendingError && _react.default.createElement(_eui.EuiFormErrorText, null, ascendingError), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "plusInCircleFilled",
    onClick: onAdd,
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.numberList.addUnitButtonLabel",
    defaultMessage: "Add {unitName}",
    values: {
      unitName: unitName
    }
  }))));
}