"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpServerMock = void 0;

var _lodash = require("lodash");

var _net = require("net");

var _querystring = _interopRequireDefault(require("querystring"));

var _configSchema = require("@kbn/config-schema");

var _router = require("./router");

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
function createKibanaRequestMock({
  path = '/path',
  headers = {
    accept: 'something/html'
  },
  params = {},
  body = {},
  query = {},
  method = 'get',
  socket = new _net.Socket(),
  routeTags
} = {}) {
  const queryString = _querystring.default.stringify(query);

  return _router.KibanaRequest.from(createRawRequestMock({
    headers,
    params,
    query,
    payload: body,
    path,
    method,
    url: {
      path,
      pathname: path,
      query: queryString,
      search: queryString ? `?${queryString}` : queryString
    },
    route: {
      settings: {
        tags: routeTags
      }
    },
    raw: {
      req: {
        socket
      }
    }
  }), {
    params: _configSchema.schema.object({}, {
      allowUnknowns: true
    }),
    body: _configSchema.schema.object({}, {
      allowUnknowns: true
    }),
    query: _configSchema.schema.object({}, {
      allowUnknowns: true
    })
  });
}

function createRawRequestMock(customization = {}) {
  return (0, _lodash.merge)({}, {
    headers: {},
    path: '/',
    route: {
      settings: {}
    },
    url: {
      href: '/'
    },
    raw: {
      req: {
        url: '/'
      }
    }
  }, customization);
}

const createResponseFactoryMock = () => ({
  ok: jest.fn(),
  accepted: jest.fn(),
  noContent: jest.fn(),
  custom: jest.fn(),
  redirected: jest.fn(),
  badRequest: jest.fn(),
  unauthorized: jest.fn(),
  forbidden: jest.fn(),
  notFound: jest.fn(),
  conflict: jest.fn(),
  internalError: jest.fn(),
  customError: jest.fn()
});

const createLifecycleResponseFactoryMock = () => ({
  redirected: jest.fn(),
  badRequest: jest.fn(),
  unauthorized: jest.fn(),
  forbidden: jest.fn(),
  notFound: jest.fn(),
  conflict: jest.fn(),
  internalError: jest.fn(),
  customError: jest.fn()
});

const createToolkitMock = () => {
  return {
    next: jest.fn(),
    rewriteUrl: jest.fn()
  };
};

const httpServerMock = {
  createKibanaRequest: createKibanaRequestMock,
  createRawRequest: createRawRequestMock,
  createResponseFactory: createResponseFactoryMock,
  createLifecycleResponseFactory: createLifecycleResponseFactoryMock,
  createToolkit: createToolkitMock
};
exports.httpServerMock = httpServerMock;