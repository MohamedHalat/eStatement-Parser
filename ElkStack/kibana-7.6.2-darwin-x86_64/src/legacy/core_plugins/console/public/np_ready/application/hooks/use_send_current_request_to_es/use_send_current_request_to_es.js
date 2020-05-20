"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSendCurrentRequestToES = void 0;

var _i18n = require("@kbn/i18n");

var _react = require("react");

var _editor_registry = require("../../contexts/editor_context/editor_registry");

var _contexts = require("../../contexts");

var _send_request_to_es = require("./send_request_to_es");

var _track = require("./track");

var _mappings = _interopRequireDefault(require("../../../lib/mappings/mappings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// @ts-ignore
var useSendCurrentRequestToES = function useSendCurrentRequestToES() {
  var _useServicesContext = (0, _contexts.useServicesContext)(),
      _useServicesContext$s = _useServicesContext.services,
      history = _useServicesContext$s.history,
      settings = _useServicesContext$s.settings,
      notifications = _useServicesContext$s.notifications,
      trackUiMetric = _useServicesContext$s.trackUiMetric;

  var dispatch = (0, _contexts.useRequestActionContext)();
  return (0, _react.useCallback)(function _callee() {
    var editor, requests, results, _settings$toJSON, polling;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch({
              type: 'sendRequest',
              payload: undefined
            });
            _context.prev = 1;
            editor = _editor_registry.instance.getInputEditor();
            _context.next = 5;
            return regeneratorRuntime.awrap(editor.getRequestsInRange());

          case 5:
            requests = _context.sent;

            if (requests.length) {
              _context.next = 9;
              break;
            }

            dispatch({
              type: 'requestFail',
              payload: {
                value: 'No requests in range',
                contentType: 'text/plain'
              }
            });
            return _context.abrupt("return");

          case 9:
            // Fire and forget
            setTimeout(function () {
              return (0, _track.track)(requests, editor, trackUiMetric);
            }, 0);
            _context.next = 12;
            return regeneratorRuntime.awrap((0, _send_request_to_es.sendRequestToES)({
              requests: requests
            }));

          case 12:
            results = _context.sent;
            results.forEach(function (_ref) {
              var _ref$request = _ref.request,
                  path = _ref$request.path,
                  method = _ref$request.method,
                  data = _ref$request.data;
              history.addToHistory(path, method, data);
            });
            _settings$toJSON = settings.toJSON(), polling = _settings$toJSON.polling;

            if (polling) {
              // If the user has submitted a request against ES, something in the fields, indices, aliases,
              // or templates may have changed, so we'll need to update this data. Assume that if
              // the user disables polling they're trying to optimize performance or otherwise
              // preserve resources, so they won't want this request sent either.
              _mappings.default.retrieveAutoCompleteInfo();
            }

            dispatch({
              type: 'requestSuccess',
              payload: {
                data: results
              }
            });
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](1);

            if (_context.t0.contentType) {
              dispatch({
                type: 'requestFail',
                payload: _context.t0
              });
            } else {
              notifications.toasts.addError(_context.t0, {
                title: _i18n.i18n.translate('console.unknownRequestErrorTitle', {
                  defaultMessage: 'Unknown Request Error'
                })
              });
            }

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 19]]);
  }, [dispatch, settings, history, notifications, trackUiMetric]);
};

exports.useSendCurrentRequestToES = useSendCurrentRequestToES;