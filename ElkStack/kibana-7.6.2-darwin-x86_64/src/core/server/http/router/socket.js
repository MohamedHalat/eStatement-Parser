"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaSocket = void 0;

var _tls = require("tls");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class KibanaSocket {
  constructor(socket) {
    this.socket = socket;

    _defineProperty(this, "authorized", void 0);

    _defineProperty(this, "authorizationError", void 0);

    if (this.socket instanceof _tls.TLSSocket) {
      this.authorized = this.socket.authorized;
      this.authorizationError = this.socket.authorizationError;
    }
  }

  getPeerCertificate(detailed) {
    if (this.socket instanceof _tls.TLSSocket) {
      const peerCertificate = this.socket.getPeerCertificate(detailed); // If the peer does not provide a certificate, it returns null (if the socket has been destroyed)
      // or an empty object, so we should check for both these cases.

      if (peerCertificate && Object.keys(peerCertificate).length > 0) return peerCertificate;
    }

    return null;
  }

}

exports.KibanaSocket = KibanaSocket;