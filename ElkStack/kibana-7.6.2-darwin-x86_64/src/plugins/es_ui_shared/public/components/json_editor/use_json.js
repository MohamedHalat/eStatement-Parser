"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useJson = void 0;

var _react = require("react");

var _i18n = require("@kbn/i18n");

var _string = require("../../../static/validators/string");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var stringifyJson = function stringifyJson(json) {
  return Object.keys(json).length ? JSON.stringify(json, null, 2) : '{\n\n}';
};

var useJson = function useJson(_ref) {
  var _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? {} : _ref$defaultValue,
      onUpdate = _ref.onUpdate,
      _ref$isControlled = _ref.isControlled,
      isControlled = _ref$isControlled === void 0 ? false : _ref$isControlled;
  var didMount = (0, _react.useRef)(false);

  var _useState = (0, _react.useState)(stringifyJson(defaultValue)),
      _useState2 = _slicedToArray(_useState, 2),
      content = _useState2[0],
      setContent = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var validate = function validate() {
    // We allow empty string as it will be converted to "{}""
    var isValid = content.trim() === '' ? true : (0, _string.isJSON)(content);

    if (!isValid) {
      setError(_i18n.i18n.translate('esUi.validation.string.invalidJSONError', {
        defaultMessage: 'Invalid JSON'
      }));
    } else {
      setError(null);
    }

    return isValid;
  };

  var formatContent = function formatContent() {
    var isValid = validate();
    var data = isValid && content.trim() !== '' ? JSON.parse(content) : {};
    return data;
  };

  (0, _react.useEffect)(function () {
    if (didMount.current) {
      var isValid = isControlled ? undefined : validate();
      onUpdate({
        data: {
          raw: content,
          format: formatContent
        },
        validate: validate,
        isValid: isValid
      });
    } else {
      didMount.current = true;
    }
  }, [content]);
  return {
    content: content,
    setContent: setContent,
    error: error
  };
};

exports.useJson = useJson;