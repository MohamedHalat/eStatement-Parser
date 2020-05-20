"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRealRequest = isRealRequest;
exports.ensureRawRequest = exports.KibanaRequest = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _utils = require("../../../utils");

var _socket = require("./socket");

var _validator = require("./validator");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const requestSymbol = Symbol('request');
/**
 * Route options: If 'GET' or 'OPTIONS' method, body options won't be returned.
 * @public
 */

// eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * Kibana specific abstraction for an incoming request.
 * @public
 */
class KibanaRequest {
  /**
   * Factory for creating requests. Validates the request before creating an
   * instance of a KibanaRequest.
   * @internal
   */
  static from(req, routeSchemas = {}, withoutSecretHeaders = true) {
    const routeValidator = _validator.RouteValidator.from(routeSchemas);

    const requestParts = KibanaRequest.validate(req, routeValidator);
    return new KibanaRequest(req, requestParts.params, requestParts.query, requestParts.body, withoutSecretHeaders);
  }
  /**
   * Validates the different parts of a request based on the schemas defined for
   * the route. Builds up the actual params, query and body object that will be
   * received in the route handler.
   * @internal
   */


  static validate(req, routeValidator) {
    const params = routeValidator.getParams(req.params, 'request params');
    const query = routeValidator.getQuery(req.query, 'request query');
    const body = routeValidator.getBody(req.payload, 'request body');
    return {
      query,
      params,
      body
    };
  }
  /** a WHATWG URL standard object. */


  constructor(request, params, query, body, withoutSecretHeaders) {
    this.params = params;
    this.query = query;
    this.body = body;
    this.withoutSecretHeaders = withoutSecretHeaders;

    _defineProperty(this, "url", void 0);

    _defineProperty(this, "route", void 0);

    _defineProperty(this, "headers", void 0);

    _defineProperty(this, "socket", void 0);

    _defineProperty(this, "events", void 0);

    _defineProperty(this, requestSymbol, void 0);

    this.url = request.url;
    this.headers = (0, _utils.deepFreeze)({ ...request.headers
    }); // prevent Symbol exposure via Object.getOwnPropertySymbols()

    Object.defineProperty(this, requestSymbol, {
      value: request,
      enumerable: false
    });
    this.route = (0, _utils.deepFreeze)(this.getRouteInfo(request));
    this.socket = new _socket.KibanaSocket(request.raw.req.socket);
    this.events = this.getEvents(request);
  }

  getEvents(request) {
    const finish$ = (0, _rxjs.merge)((0, _rxjs.fromEvent)(request.raw.req, 'end'), // all data consumed
    (0, _rxjs.fromEvent)(request.raw.req, 'close') // connection was closed
    ).pipe((0, _operators.shareReplay)(1), (0, _operators.first)());
    return {
      aborted$: (0, _rxjs.fromEvent)(request.raw.req, 'aborted').pipe((0, _operators.first)(), (0, _operators.takeUntil)(finish$))
    };
  }

  getRouteInfo(request) {
    const method = request.method;
    const {
      parse,
      maxBytes,
      allow,
      output
    } = request.route.settings.payload || {};
    const options = {
      authRequired: request.route.settings.auth !== false,
      tags: request.route.settings.tags || [],
      body: ['get', 'options'].includes(method) ? undefined : {
        parse,
        maxBytes,
        accepts: allow,
        output: output // We do not support all the HAPI-supported outputs and TS complains

      }
    }; // TS does not understand this is OK so I'm enforced to do this enforced casting

    return {
      path: request.path,
      method,
      options
    };
  }

}
/**
 * Returns underlying Hapi Request
 * @internal
 */


exports.KibanaRequest = KibanaRequest;

const ensureRawRequest = request => isKibanaRequest(request) ? request[requestSymbol] : request;

exports.ensureRawRequest = ensureRawRequest;

function isKibanaRequest(request) {
  return request instanceof KibanaRequest;
}

function isRequest(request) {
  try {
    return request.raw.req && typeof request.raw.req === 'object';
  } catch {
    return false;
  }
}
/**
 * Checks if an incoming request either KibanaRequest or Legacy.Request
 * @internal
 */


function isRealRequest(request) {
  return isKibanaRequest(request) || isRequest(request);
}