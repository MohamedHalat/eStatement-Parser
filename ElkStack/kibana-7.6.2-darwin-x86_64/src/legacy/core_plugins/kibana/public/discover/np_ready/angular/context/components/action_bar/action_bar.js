"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionBar = ActionBar;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _action_bar_warning = require("./action_bar_warning");

var _constants = require("../../query_parameters/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ActionBar(_ref) {
  var defaultStepSize = _ref.defaultStepSize,
      docCount = _ref.docCount,
      docCountAvailable = _ref.docCountAvailable,
      isDisabled = _ref.isDisabled,
      isLoading = _ref.isLoading,
      onChangeCount = _ref.onChangeCount,
      type = _ref.type;
  var showWarning = !isDisabled && !isLoading && docCountAvailable < docCount;
  var isSuccessor = type === 'successors';

  var _useState = (0, _react.useState)(docCount),
      _useState2 = _slicedToArray(_useState, 2),
      newDocCount = _useState2[0],
      setNewDocCount = _useState2[1];

  var isValid = function isValid(value) {
    return value >= _constants.MIN_CONTEXT_SIZE && value <= _constants.MAX_CONTEXT_SIZE;
  };

  var onSubmit = function onSubmit(ev) {
    ev.preventDefault();

    if (newDocCount !== docCount && isValid(newDocCount)) {
      onChangeCount(newDocCount);
    }
  };

  return _react.default.createElement("form", {
    onSubmit: onSubmit
  }, isSuccessor && _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), isSuccessor && showWarning && _react.default.createElement(_action_bar_warning.ActionBarWarning, {
    docCount: docCountAvailable,
    type: type
  }), isSuccessor && showWarning && _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "row",
    gutterSize: "s",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "".concat(type, "LoadMoreButton"),
    iconType: isSuccessor ? 'arrowDown' : 'arrowUp',
    isDisabled: isDisabled,
    isLoading: isLoading,
    onClick: function onClick() {
      var value = newDocCount + defaultStepSize;

      if (isValid(value)) {
        setNewDocCount(value);
        onChangeCount(value);
      }
    },
    flush: "right"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.context.loadButtonLabel",
    defaultMessage: "Load"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiFieldNumber, {
    "aria-label": isSuccessor ? _i18n.i18n.translate('kbn.context.olderDocumentsAriaLabel', {
      defaultMessage: 'Number of older documents'
    }) : _i18n.i18n.translate('kbn.context.newerDocumentsAriaLabel', {
      defaultMessage: 'Number of newer documents'
    }),
    className: "cxtSizePicker",
    "data-test-subj": "".concat(type, "CountPicker"),
    disabled: isDisabled,
    min: _constants.MIN_CONTEXT_SIZE,
    max: _constants.MAX_CONTEXT_SIZE,
    onChange: function onChange(ev) {
      setNewDocCount(ev.target.valueAsNumber);
    },
    onBlur: function onBlur() {
      if (newDocCount !== docCount && isValid(newDocCount)) {
        onChangeCount(newDocCount);
      }
    },
    type: "number",
    value: newDocCount >= 0 ? newDocCount : ''
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    displayOnly: true
  }, isSuccessor ? _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.context.olderDocumentsDescription",
    defaultMessage: "older documents"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.context.newerDocumentsDescription",
    defaultMessage: "newer documents"
  })))), !isSuccessor && showWarning && _react.default.createElement(_action_bar_warning.ActionBarWarning, {
    docCount: docCountAvailable,
    type: type
  }), !isSuccessor && _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }));
}