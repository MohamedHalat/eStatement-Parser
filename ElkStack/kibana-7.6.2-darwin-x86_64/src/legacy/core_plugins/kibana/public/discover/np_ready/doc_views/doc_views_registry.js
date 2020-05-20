"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocViewsRegistry = void 0;

var _doc_views_helpers = require("./doc_views_helpers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DocViewsRegistry =
/*#__PURE__*/
function () {
  function DocViewsRegistry(legacyChrome) {
    _classCallCheck(this, DocViewsRegistry);

    this.legacyChrome = legacyChrome;

    _defineProperty(this, "docViews", []);
  }
  /**
   * Extends and adds the given doc view to the registry array
   */


  _createClass(DocViewsRegistry, [{
    key: "addDocView",
    value: function addDocView(docViewRaw) {
      var docView = typeof docViewRaw === 'function' ? docViewRaw() : docViewRaw;

      if (docView.directive) {
        // convert angular directive to render function for backwards compatibility
        docView.render = (0, _doc_views_helpers.convertDirectiveToRenderFn)(docView.directive, this.legacyChrome);
      }

      if (typeof docView.shouldShow !== 'function') {
        docView.shouldShow = function () {
          return true;
        };
      }

      this.docViews.push(docView);
    }
    /**
     * Returns a sorted array of doc_views for rendering tabs
     */

  }, {
    key: "getDocViewsSorted",
    value: function getDocViewsSorted(hit) {
      return this.docViews.filter(function (docView) {
        return docView.shouldShow(hit);
      }).sort(function (a, b) {
        return Number(a.order) > Number(b.order) ? 1 : -1;
      });
    }
  }]);

  return DocViewsRegistry;
}();

exports.DocViewsRegistry = DocViewsRegistry;