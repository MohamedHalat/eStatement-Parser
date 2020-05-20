"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppLeaveActionType = exports.AppNavLinkStatus = exports.AppStatus = void 0;

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

/** @public */

/**
 * Accessibility status of an application.
 *
 * @public
 */
var AppStatus;
/**
 * Status of the application's navLink.
 *
 * @public
 */

exports.AppStatus = AppStatus;

(function (AppStatus) {
  AppStatus[AppStatus["accessible"] = 0] = "accessible";
  AppStatus[AppStatus["inaccessible"] = 1] = "inaccessible";
})(AppStatus || (exports.AppStatus = AppStatus = {}));

var AppNavLinkStatus;
/**
 * Defines the list of fields that can be updated via an {@link AppUpdater}.
 * @public
 */

exports.AppNavLinkStatus = AppNavLinkStatus;

(function (AppNavLinkStatus) {
  AppNavLinkStatus[AppNavLinkStatus["default"] = 0] = "default";
  AppNavLinkStatus[AppNavLinkStatus["visible"] = 1] = "visible";
  AppNavLinkStatus[AppNavLinkStatus["disabled"] = 2] = "disabled";
  AppNavLinkStatus[AppNavLinkStatus["hidden"] = 3] = "hidden";
})(AppNavLinkStatus || (exports.AppNavLinkStatus = AppNavLinkStatus = {}));

/**
 * Possible type of actions on application leave.
 *
 * @public
 */
var AppLeaveActionType;
/**
 * Action to return from a {@link AppLeaveHandler} to execute the default
 * behaviour when leaving the application.
 *
 * See {@link AppLeaveActionFactory}
 *
 * @public
 */

exports.AppLeaveActionType = AppLeaveActionType;

(function (AppLeaveActionType) {
  AppLeaveActionType["confirm"] = "confirm";
  AppLeaveActionType["default"] = "default";
})(AppLeaveActionType || (exports.AppLeaveActionType = AppLeaveActionType = {}));