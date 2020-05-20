"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocLinksService = void 0;

var _utils = require("../../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @internal */
var DocLinksService =
/*#__PURE__*/
function () {
  function DocLinksService() {
    _classCallCheck(this, DocLinksService);
  }

  _createClass(DocLinksService, [{
    key: "start",
    value: function start(_ref) {
      var injectedMetadata = _ref.injectedMetadata;
      var DOC_LINK_VERSION = injectedMetadata.getKibanaBranch();
      var ELASTIC_WEBSITE_URL = 'https://www.elastic.co/';
      var ELASTICSEARCH_DOCS = "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/");
      return (0, _utils.deepFreeze)({
        DOC_LINK_VERSION: DOC_LINK_VERSION,
        ELASTIC_WEBSITE_URL: ELASTIC_WEBSITE_URL,
        links: {
          filebeat: {
            base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION),
            installation: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/filebeat-installation.html"),
            configuration: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/filebeat-configuration.html"),
            elasticsearchOutput: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/elasticsearch-output.html"),
            startup: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/filebeat-starting.html"),
            exportedFields: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/exported-fields.html")
          },
          auditbeat: {
            base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/auditbeat/").concat(DOC_LINK_VERSION)
          },
          metricbeat: {
            base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/metricbeat/").concat(DOC_LINK_VERSION)
          },
          heartbeat: {
            base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/heartbeat/").concat(DOC_LINK_VERSION)
          },
          logstash: {
            base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/logstash/").concat(DOC_LINK_VERSION)
          },
          functionbeat: {
            base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/functionbeat/").concat(DOC_LINK_VERSION)
          },
          winlogbeat: {
            base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/winlogbeat/").concat(DOC_LINK_VERSION)
          },
          aggs: {
            date_histogram: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-datehistogram-aggregation.html"),
            date_range: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-daterange-aggregation.html"),
            filter: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-filter-aggregation.html"),
            filters: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-filters-aggregation.html"),
            geohash_grid: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-geohashgrid-aggregation.html"),
            histogram: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-histogram-aggregation.html"),
            ip_range: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-iprange-aggregation.html"),
            range: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-range-aggregation.html"),
            significant_terms: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-significantterms-aggregation.html"),
            terms: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-bucket-terms-aggregation.html"),
            avg: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-avg-aggregation.html"),
            avg_bucket: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-pipeline-avg-bucket-aggregation.html"),
            max_bucket: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-pipeline-max-bucket-aggregation.html"),
            min_bucket: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-pipeline-min-bucket-aggregation.html"),
            sum_bucket: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-pipeline-sum-bucket-aggregation.html"),
            cardinality: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-cardinality-aggregation.html"),
            count: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-valuecount-aggregation.html"),
            cumulative_sum: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-sum-aggregation.html"),
            derivative: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-pipeline-derivative-aggregation.html"),
            geo_bounds: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-geobounds-aggregation.html"),
            geo_centroid: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-geocentroid-aggregation.html"),
            max: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-max-aggregation.html"),
            median: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-percentile-aggregation.html"),
            min: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-min-aggregation.html"),
            moving_avg: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-pipeline-movavg-aggregation.html"),
            percentile_ranks: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-percentile-rank-aggregation.html"),
            serial_diff: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-pipeline-serialdiff-aggregation.html"),
            std_dev: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-extendedstats-aggregation.html"),
            sum: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-sum-aggregation.html"),
            top_hits: "".concat(ELASTICSEARCH_DOCS, "search-aggregations-metrics-top-hits-aggregation.html")
          },
          scriptedFields: {
            scriptFields: "".concat(ELASTICSEARCH_DOCS, "search-request-script-fields.html"),
            scriptAggs: "".concat(ELASTICSEARCH_DOCS, "search-aggregations.html#_values_source"),
            painless: "".concat(ELASTICSEARCH_DOCS, "modules-scripting-painless.html"),
            painlessApi: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/painless/").concat(DOC_LINK_VERSION, "/painless-api-reference.html"),
            painlessSyntax: "".concat(ELASTICSEARCH_DOCS, "modules-scripting-painless-syntax.html"),
            luceneExpressions: "".concat(ELASTICSEARCH_DOCS, "modules-scripting-expression.html")
          },
          indexPatterns: {
            loadingData: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/tutorial-load-dataset.html"),
            introduction: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/index-patterns.html")
          },
          kibana: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/index.html"),
          siem: {
            guide: "".concat(ELASTIC_WEBSITE_URL, "guide/en/siem/guide/").concat(DOC_LINK_VERSION, "/index.html"),
            gettingStarted: "".concat(ELASTIC_WEBSITE_URL, "guide/en/siem/guide/").concat(DOC_LINK_VERSION, "/install-siem.html")
          },
          query: {
            luceneQuerySyntax: "".concat(ELASTICSEARCH_DOCS, "query-dsl-query-string-query.html#query-string-syntax"),
            queryDsl: "".concat(ELASTICSEARCH_DOCS, "query-dsl.html"),
            kueryQuerySyntax: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/kuery-query.html")
          },
          date: {
            dateMath: "".concat(ELASTICSEARCH_DOCS, "common-options.html#date-math")
          },
          management: {
            kibanaSearchSettings: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/advanced-options.html#kibana-search-settings")
          }
        }
      });
    }
  }]);

  return DocLinksService;
}();
/** @public */


exports.DocLinksService = DocLinksService;