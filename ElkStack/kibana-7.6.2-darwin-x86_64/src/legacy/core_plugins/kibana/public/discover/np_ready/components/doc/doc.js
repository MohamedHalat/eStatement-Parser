"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Doc = Doc;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _doc_viewer = require("../doc_viewer/doc_viewer");

var _use_es_doc_search = require("./use_es_doc_search");

var _kibana_services = require("../../../kibana_services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Doc(props) {
  var _useEsDocSearch = (0, _use_es_doc_search.useEsDocSearch)(props),
      _useEsDocSearch2 = _slicedToArray(_useEsDocSearch, 3),
      reqState = _useEsDocSearch2[0],
      hit = _useEsDocSearch2[1],
      indexPattern = _useEsDocSearch2[2];

  return _react.default.createElement(_eui.EuiPageContent, null, reqState === _use_es_doc_search.ElasticRequestState.NotFoundIndexPattern && _react.default.createElement(_eui.EuiCallOut, {
    color: "danger",
    "data-test-subj": "doc-msg-notFoundIndexPattern",
    iconType: "alert",
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.doc.failedToLocateIndexPattern",
      defaultMessage: "No index pattern matches ID {indexPatternId}",
      values: {
        indexPatternId: props.indexPatternId
      }
    })
  }), reqState === _use_es_doc_search.ElasticRequestState.NotFound && _react.default.createElement(_eui.EuiCallOut, {
    color: "danger",
    "data-test-subj": "doc-msg-notFound",
    iconType: "alert",
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.doc.failedToLocateDocumentDescription",
      defaultMessage: "Cannot find document"
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.doc.couldNotFindDocumentsDescription",
    defaultMessage: "No documents match that ID."
  })), reqState === _use_es_doc_search.ElasticRequestState.Error && _react.default.createElement(_eui.EuiCallOut, {
    color: "danger",
    "data-test-subj": "doc-msg-error",
    iconType: "alert",
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.doc.failedToExecuteQueryDescription",
      defaultMessage: "Cannot run search"
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.doc.somethingWentWrongDescription",
    defaultMessage: "{indexName} is missing.",
    values: {
      indexName: props.index
    }
  }), ' ', _react.default.createElement(_eui.EuiLink, {
    href: "https://www.elastic.co/guide/en/elasticsearch/reference/".concat((0, _kibana_services.getServices)().metadata.branch, "/indices-exists.html"),
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.doc.somethingWentWrongDescriptionAddon",
    defaultMessage: "Please ensure the index exists."
  }))), reqState === _use_es_doc_search.ElasticRequestState.Loading && _react.default.createElement(_eui.EuiCallOut, {
    "data-test-subj": "doc-msg-loading"
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  }), ' ', _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.doc.loadingDescription",
    defaultMessage: "Loading\u2026"
  })), reqState === _use_es_doc_search.ElasticRequestState.Found && hit !== null && indexPattern && _react.default.createElement("div", {
    "data-test-subj": "doc-hit"
  }, _react.default.createElement(_doc_viewer.DocViewer, {
    hit: hit,
    indexPattern: indexPattern
  })));
}