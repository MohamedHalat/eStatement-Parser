"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProxyRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

var url = _interopRequireWildcard(require("url"));

var _boom = _interopRequireDefault(require("boom"));

var _lodash = require("lodash");

var _request = require("./request");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
function toURL(base, path) {
  const urlResult = new url.URL(`${(0, _lodash.trimRight)(base, '/')}/${(0, _lodash.trimLeft)(path, '/')}`); // Appending pretty here to have Elasticsearch do the JSON formatting, as doing
  // in JS can lead to data loss (7.0 will get munged into 7, thus losing indication of
  // measurement precision)

  if (!urlResult.searchParams.get('pretty')) {
    urlResult.searchParams.append('pretty', 'true');
  }

  return urlResult;
}

function getProxyHeaders(req) {
  const headers = Object.create(null); // Scope this proto-unsafe functionality to where it is being used.

  function extendCommaList(obj, property, value) {
    obj[property] = (obj[property] ? obj[property] + ',' : '') + value;
  }

  if (req.info.remotePort && req.info.remoteAddress) {
    // see https://git.io/vytQ7
    extendCommaList(headers, 'x-forwarded-for', req.info.remoteAddress);
    extendCommaList(headers, 'x-forwarded-port', req.info.remotePort);
    extendCommaList(headers, 'x-forwarded-proto', req.server.info.protocol);
    extendCommaList(headers, 'x-forwarded-host', req.info.host);
  }

  const contentType = req.headers['content-type'];

  if (contentType) {
    headers['content-type'] = contentType;
  }

  return headers;
}

const createProxyRoute = ({
  hosts,
  pathFilters = [/.*/],
  getConfigForReq = () => ({})
}) => ({
  path: '/api/console/proxy',
  method: 'POST',
  config: {
    tags: ['access:console'],
    payload: {
      output: 'stream',
      parse: false
    },
    validate: {
      payload: true,
      query: _joi.default.object().keys({
        method: _joi.default.string().valid('HEAD', 'GET', 'POST', 'PUT', 'DELETE').insensitive().required(),
        path: _joi.default.string().required()
      }).unknown(true)
    },
    pre: [function filterPath(req) {
      const {
        path
      } = req.query;

      if (pathFilters.some(re => re.test(path))) {
        return null;
      }

      const err = _boom.default.forbidden();

      err.output.payload = `Error connecting to '${path}':\n\nUnable to send requests to that path.`;
      err.output.headers['content-type'] = 'text/plain';
      throw err;
    }],
    handler: async (req, h) => {
      const {
        payload,
        query
      } = req;
      const {
        path,
        method
      } = query;
      let esIncomingMessage;

      for (let idx = 0; idx < hosts.length; ++idx) {
        const host = hosts[idx];

        try {
          const uri = toURL(host, path); // Because this can technically be provided by a settings-defined proxy config, we need to
          // preserve these property names to maintain BWC.

          const {
            timeout,
            agent,
            headers,
            rejectUnauthorized
          } = getConfigForReq(req, uri.toString());
          const requestHeaders = { ...headers,
            ...getProxyHeaders(req)
          };
          esIncomingMessage = await (0, _request.sendRequest)({
            method,
            headers: requestHeaders,
            uri,
            timeout,
            payload,
            rejectUnauthorized,
            agent
          });
          break;
        } catch (e) {
          if (e.code !== 'ECONNREFUSED') {
            throw _boom.default.boomify(e);
          }

          if (idx === hosts.length - 1) {
            throw _boom.default.badGateway('Could not reach any configured nodes.');
          } // Otherwise, try the next host...

        }
      }

      const {
        statusCode,
        statusMessage,
        headers: {
          warning
        }
      } = esIncomingMessage;

      if (method.toUpperCase() !== 'HEAD') {
        return h.response(esIncomingMessage).code(statusCode).header('warning', warning);
      } else {
        return h.response(`${statusCode} - ${statusMessage}`).code(statusCode).type('text/plain').header('warning', warning);
      }
    }
  }
});

exports.createProxyRoute = createProxyRoute;