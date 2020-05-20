"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggTypeReducer = aggTypeReducer;
exports.aggParamsReducer = aggParamsReducer;
exports.initAggParamsState = initAggParamsState;
exports.AGG_PARAMS_ACTION_KEYS = exports.AGG_TYPE_ACTION_KEYS = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var AGG_TYPE_ACTION_KEYS;
exports.AGG_TYPE_ACTION_KEYS = AGG_TYPE_ACTION_KEYS;

(function (AGG_TYPE_ACTION_KEYS) {
  AGG_TYPE_ACTION_KEYS["TOUCHED"] = "aggTypeTouched";
  AGG_TYPE_ACTION_KEYS["VALID"] = "aggTypeValid";
})(AGG_TYPE_ACTION_KEYS || (exports.AGG_TYPE_ACTION_KEYS = AGG_TYPE_ACTION_KEYS = {}));

function aggTypeReducer(state, action) {
  switch (action.type) {
    case AGG_TYPE_ACTION_KEYS.TOUCHED:
      return _objectSpread({}, state, {
        touched: action.payload
      });

    case AGG_TYPE_ACTION_KEYS.VALID:
      return _objectSpread({}, state, {
        valid: action.payload
      });

    default:
      throw new Error();
  }
}

var AGG_PARAMS_ACTION_KEYS;
exports.AGG_PARAMS_ACTION_KEYS = AGG_PARAMS_ACTION_KEYS;

(function (AGG_PARAMS_ACTION_KEYS) {
  AGG_PARAMS_ACTION_KEYS["TOUCHED"] = "aggParamsTouched";
  AGG_PARAMS_ACTION_KEYS["VALID"] = "aggParamsValid";
  AGG_PARAMS_ACTION_KEYS["RESET"] = "aggParamsReset";
})(AGG_PARAMS_ACTION_KEYS || (exports.AGG_PARAMS_ACTION_KEYS = AGG_PARAMS_ACTION_KEYS = {}));

function aggParamsReducer(state, _ref) {
  var type = _ref.type,
      _ref$paramName = _ref.paramName,
      paramName = _ref$paramName === void 0 ? '' : _ref$paramName,
      payload = _ref.payload;
  var targetParam = state[paramName] || {
    valid: true,
    touched: false
  };

  switch (type) {
    case AGG_PARAMS_ACTION_KEYS.TOUCHED:
      return _objectSpread({}, state, _defineProperty({}, paramName, _objectSpread({}, targetParam, {
        touched: payload
      })));

    case AGG_PARAMS_ACTION_KEYS.VALID:
      return _objectSpread({}, state, _defineProperty({}, paramName, _objectSpread({}, targetParam, {
        valid: payload
      })));

    case AGG_PARAMS_ACTION_KEYS.RESET:
      return {};

    default:
      throw new Error();
  }
}

function initAggParamsState(params) {
  var state = params.reduce(function (stateObj, param) {
    stateObj[param.aggParam.name] = {
      valid: true,
      touched: false
    };
    return stateObj;
  }, {});
  return state;
}