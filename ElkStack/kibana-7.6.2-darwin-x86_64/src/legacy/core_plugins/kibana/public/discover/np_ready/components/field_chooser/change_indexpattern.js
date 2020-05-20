"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeIndexPattern = ChangeIndexPattern;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// TODO: refactor to shared component with ../../../../../../../../x-pack/legacy/plugins/lens/public/indexpattern_plugin/change_indexpattern
function ChangeIndexPattern(_ref) {
  var indexPatternRefs = _ref.indexPatternRefs,
      indexPatternId = _ref.indexPatternId,
      onChangeIndexPattern = _ref.onChangeIndexPattern,
      trigger = _ref.trigger,
      selectableProps = _ref.selectableProps;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setPopoverIsOpen = _useState2[1];

  var createTrigger = function createTrigger() {
    var label = trigger.label,
        title = trigger.title,
        rest = _objectWithoutProperties(trigger, ["label", "title"]);

    return _react.default.createElement(_eui.EuiButtonEmpty, _extends({
      className: "eui-textTruncate",
      flush: "left",
      color: "text",
      iconSide: "right",
      iconType: "arrowDown",
      title: title,
      onClick: function onClick() {
        return setPopoverIsOpen(!isPopoverOpen);
      }
    }, rest), label);
  };

  return _react.default.createElement(_eui.EuiPopover, {
    button: createTrigger(),
    isOpen: isPopoverOpen,
    closePopover: function closePopover() {
      return setPopoverIsOpen(false);
    },
    className: "eui-textTruncate",
    anchorClassName: "eui-textTruncate",
    display: "block",
    panelPaddingSize: "s",
    ownFocus: true
  }, _react.default.createElement("div", {
    style: {
      width: 320
    }
  }, _react.default.createElement(_eui.EuiPopoverTitle, null, _i18n.i18n.translate('kbn.discover.fieldChooser.indexPattern.changeIndexPatternTitle', {
    defaultMessage: 'Change index pattern'
  })), _react.default.createElement(_eui.EuiSelectable, _extends({
    "data-test-subj": "indexPattern-switcher"
  }, selectableProps, {
    searchable: true,
    singleSelection: "always",
    options: indexPatternRefs.map(function (_ref2) {
      var title = _ref2.title,
          id = _ref2.id;
      return {
        label: title,
        key: id,
        value: id,
        checked: id === indexPatternId ? 'on' : undefined
      };
    }),
    onChange: function onChange(choices) {
      var choice = choices.find(function (_ref3) {
        var checked = _ref3.checked;
        return checked;
      });
      onChangeIndexPattern(choice.value);
      setPopoverIsOpen(false);
    },
    searchProps: _objectSpread({
      compressed: true
    }, selectableProps ? selectableProps.searchProps : undefined)
  }), function (list, search) {
    return _react.default.createElement(_react.default.Fragment, null, search, list);
  })));
}