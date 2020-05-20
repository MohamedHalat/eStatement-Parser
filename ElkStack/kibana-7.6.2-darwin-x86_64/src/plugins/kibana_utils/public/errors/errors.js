"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidJSONProperty = exports.SavedObjectNotFound = exports.DuplicateField = exports.KbnError = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

/* eslint-disable max-classes-per-file */
// abstract error class
var KbnError =
/*#__PURE__*/
function (_Error) {
  _inherits(KbnError, _Error);

  function KbnError(message) {
    var _this;

    _classCallCheck(this, KbnError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(KbnError).call(this, message));
    Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof KbnError ? this.constructor : void 0).prototype);
    return _this;
  }

  return KbnError;
}(_wrapNativeSuper(Error));
/**
 * when a mapping already exists for a field the user is attempting to add
 * @param {String} name - the field name
 */


exports.KbnError = KbnError;

var DuplicateField =
/*#__PURE__*/
function (_KbnError) {
  _inherits(DuplicateField, _KbnError);

  function DuplicateField(name) {
    _classCallCheck(this, DuplicateField);

    return _possibleConstructorReturn(this, _getPrototypeOf(DuplicateField).call(this, "The field \"".concat(name, "\" already exists in this mapping")));
  }

  return DuplicateField;
}(KbnError);
/**
 * A saved object was not found
 */


exports.DuplicateField = DuplicateField;

var SavedObjectNotFound =
/*#__PURE__*/
function (_KbnError2) {
  _inherits(SavedObjectNotFound, _KbnError2);

  function SavedObjectNotFound(type, id, link) {
    var _this2;

    _classCallCheck(this, SavedObjectNotFound);

    var idMsg = id ? " (id: ".concat(id, ")") : '';
    var message = "Could not locate that ".concat(type).concat(idMsg);

    if (link) {
      message += ", [click here to re-create it](".concat(link, ")");
    }

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SavedObjectNotFound).call(this, message));

    _defineProperty(_assertThisInitialized(_this2), "savedObjectType", void 0);

    _defineProperty(_assertThisInitialized(_this2), "savedObjectId", void 0);

    _this2.savedObjectType = type;
    _this2.savedObjectId = id;
    return _this2;
  }

  return SavedObjectNotFound;
}(KbnError);
/**
 * This error is for scenarios where a saved object is detected that has invalid JSON properties.
 * There was a scenario where we were importing objects with double-encoded JSON, and the system
 * was silently failing. This error is now thrown in those scenarios.
 */


exports.SavedObjectNotFound = SavedObjectNotFound;

var InvalidJSONProperty =
/*#__PURE__*/
function (_KbnError3) {
  _inherits(InvalidJSONProperty, _KbnError3);

  function InvalidJSONProperty(message) {
    _classCallCheck(this, InvalidJSONProperty);

    return _possibleConstructorReturn(this, _getPrototypeOf(InvalidJSONProperty).call(this, message));
  }

  return InvalidJSONProperty;
}(KbnError);

exports.InvalidJSONProperty = InvalidJSONProperty;