"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldFromFilter = getFieldFromFilter;
exports.getOperatorFromFilter = getOperatorFromFilter;
exports.getFilterableFields = getFilterableFields;
exports.getOperatorOptions = getOperatorOptions;
exports.validateParams = validateParams;
exports.isFilterValid = isFilterValid;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _public = require("../../../../../../kibana_utils/public");

var _filter_operators = require("./filter_operators");

var _ = require("../../../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getFieldFromFilter(filter, indexPattern) {
  return indexPattern.fields.find(function (field) {
    return field.name === filter.meta.key;
  });
}

function getOperatorFromFilter(filter) {
  return _filter_operators.FILTER_OPERATORS.find(function (operator) {
    return filter.meta.type === operator.type && filter.meta.negate === operator.negate;
  });
}

function getFilterableFields(indexPattern) {
  return indexPattern.fields.filter(_.isFilterable);
}

function getOperatorOptions(field) {
  return _filter_operators.FILTER_OPERATORS.filter(function (operator) {
    return !operator.fieldTypes || operator.fieldTypes.includes(field.type);
  });
}

function validateParams(params, type) {
  switch (type) {
    case 'date':
      var moment = typeof params === 'string' ? _datemath.default.parse(params) : null;
      return Boolean(typeof params === 'string' && moment && moment.isValid());

    case 'ip':
      try {
        return Boolean(new _public.Ipv4Address(params));
      } catch (e) {
        return false;
      }

    default:
      return true;
  }
}

function isFilterValid(indexPattern, field, operator, params) {
  if (!indexPattern || !field || !operator) {
    return false;
  }

  switch (operator.type) {
    case 'phrase':
      return validateParams(params, field.type);

    case 'phrases':
      if (!Array.isArray(params) || !params.length) {
        return false;
      }

      return params.every(function (phrase) {
        return validateParams(phrase, field.type);
      });

    case 'range':
      if (_typeof(params) !== 'object') {
        return false;
      }

      return validateParams(params.from, field.type) || validateParams(params.to, field.type);

    case 'exists':
      return true;

    default:
      throw new Error("Unknown operator type: ".concat(operator.type));
  }
}