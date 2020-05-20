"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatKey = formatKey;
exports.formatValueByKey = formatValueByKey;
exports.ShardFailureDescription = ShardFailureDescription;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _get_flattened_object = require("../../../../../../../legacy/utils/get_flattened_object");

var _shard_failure_description_header = require("./shard_failure_description_header");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Provides pretty formatting of a given key string
 * e.g. formats "this_key.is_nice" to "This key is nice"
 * @param key
 */
function formatKey(key) {
  var nameCapitalized = key.charAt(0).toUpperCase() + key.slice(1);
  return nameCapitalized.replace(/[\._]/g, ' ');
}
/**
 * Adds a EuiCodeBlock to values of  `script` and `script_stack` key
 * Values of other keys are handled a strings
 * @param value
 * @param key
 */


function formatValueByKey(value, key) {
  if (key === 'script' || key === 'script_stack') {
    var valueScript = Array.isArray(value) ? value.join('\n') : String(value);
    return _react.default.createElement(_eui.EuiCodeBlock, {
      language: "java",
      paddingSize: "s",
      isCopyable: true
    }, valueScript);
  } else {
    return String(value);
  }
}

function ShardFailureDescription(props) {
  var flattendReason = (0, _get_flattened_object.getFlattenedObject)(props.reason);
  var listItems = Object.entries(flattendReason).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return {
      title: formatKey(key),
      description: formatValueByKey(value, key)
    };
  });
  return _react.default.createElement("div", null, _react.default.createElement(_shard_failure_description_header.ShardFailureDescriptionHeader, props), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiDescriptionList, {
    listItems: listItems,
    type: "column",
    compressed: true,
    className: "shardFailureModal__desc",
    titleProps: {
      className: 'shardFailureModal__descTitle'
    },
    descriptionProps: {
      className: 'shardFailureModal__descValue'
    }
  }));
}