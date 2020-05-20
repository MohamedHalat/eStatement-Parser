"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionLoading = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SectionLoading = function SectionLoading(_ref) {
  var inline = _ref.inline,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["inline", "children"]);

  if (inline) {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "flexStart",
      alignItems: "center",
      gutterSize: "s"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "m"
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiText, rest, _react.default.createElement(_eui.EuiTextColor, {
      color: "subdued"
    }, children))));
  }

  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "xl"
    }),
    body: _react.default.createElement(_eui.EuiText, {
      color: "subdued"
    }, children),
    "data-test-subj": "sectionLoading"
  });
};

exports.SectionLoading = SectionLoading;