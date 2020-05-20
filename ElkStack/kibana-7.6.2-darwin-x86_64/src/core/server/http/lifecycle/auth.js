"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adoptToHapiAuthFormat = adoptToHapiAuthFormat;
exports.AuthResultType = void 0;

var _router = require("../router");

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
let AuthResultType;
/** @public */

exports.AuthResultType = AuthResultType;

(function (AuthResultType) {
  AuthResultType["authenticated"] = "authenticated";
})(AuthResultType || (exports.AuthResultType = AuthResultType = {}));

const authResult = {
  authenticated(data = {}) {
    return {
      type: AuthResultType.authenticated,
      state: data.state,
      requestHeaders: data.requestHeaders,
      responseHeaders: data.responseHeaders
    };
  },

  isAuthenticated(result) {
    return result && result.type === AuthResultType.authenticated;
  }

};
/**
 * Auth Headers map
 * @public
 */

const toolkit = {
  authenticated: authResult.authenticated
};
/**
 * See {@link AuthToolkit}.
 * @public
 */

/** @public */
function adoptToHapiAuthFormat(fn, log, onSuccess = () => undefined) {
  return async function interceptAuth(request, responseToolkit) {
    const hapiResponseAdapter = new _router.HapiResponseAdapter(responseToolkit);

    try {
      const result = await fn(_router.KibanaRequest.from(request, undefined, false), _router.lifecycleResponseFactory, toolkit);

      if ((0, _router.isKibanaResponse)(result)) {
        return hapiResponseAdapter.handle(result);
      }

      if (authResult.isAuthenticated(result)) {
        onSuccess(request, {
          state: result.state,
          requestHeaders: result.requestHeaders,
          responseHeaders: result.responseHeaders
        });
        return responseToolkit.authenticated({
          credentials: result.state || {}
        });
      }

      throw new Error(`Unexpected result from Authenticate. Expected AuthResult or KibanaResponse, but given: ${result}.`);
    } catch (error) {
      log.error(error);
      return hapiResponseAdapter.toInternalError();
    }
  };
}