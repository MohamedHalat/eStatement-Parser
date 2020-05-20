"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverIndexPattern = DiscoverIndexPattern;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _change_indexpattern = require("./change_indexpattern");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Component allows you to select an index pattern in discovers side bar
 */
function DiscoverIndexPattern(_ref) {
  var indexPatternList = _ref.indexPatternList,
      selectedIndexPattern = _ref.selectedIndexPattern,
      setIndexPattern = _ref.setIndexPattern;
  var options = (indexPatternList || []).map(function (entity) {
    return {
      id: entity.id,
      title: entity.attributes.title
    };
  });

  var _ref2 = selectedIndexPattern || {},
      selectedId = _ref2.id,
      attributes = _ref2.attributes;

  var _useState = (0, _react.useState)({
    id: selectedId,
    title: (attributes === null || attributes === void 0 ? void 0 : attributes.title) || ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  if (!selectedId) {
    return null;
  }

  return _react.default.createElement("div", {
    className: "indexPattern__container"
  }, _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_change_indexpattern.ChangeIndexPattern, {
    trigger: {
      label: selected.title,
      title: selected.title,
      'data-test-subj': 'indexPattern-switch-link',
      className: 'indexPattern__triggerButton'
    },
    indexPatternId: selected.id,
    indexPatternRefs: options,
    onChangeIndexPattern: function onChangeIndexPattern(id) {
      var indexPattern = options.find(function (pattern) {
        return pattern.id === id;
      });

      if (indexPattern) {
        setIndexPattern(id);
        setSelected(indexPattern);
      }
    }
  })));
}