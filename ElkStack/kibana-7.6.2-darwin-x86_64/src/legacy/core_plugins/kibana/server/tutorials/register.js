"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTutorials = registerTutorials;

var _system_logs = require("./system_logs");

var _system_metrics = require("./system_metrics");

var _apache_logs = require("./apache_logs");

var _apache_metrics = require("./apache_metrics");

var _elasticsearch_logs = require("./elasticsearch_logs");

var _iis_logs = require("./iis_logs");

var _kafka_logs = require("./kafka_logs");

var _logstash_logs = require("./logstash_logs");

var _nginx_logs = require("./nginx_logs");

var _nginx_metrics = require("./nginx_metrics");

var _mysql_logs = require("./mysql_logs");

var _mysql_metrics = require("./mysql_metrics");

var _mongodb_metrics = require("./mongodb_metrics");

var _osquery_logs = require("./osquery_logs");

var _php_fpm_metrics = require("./php_fpm_metrics");

var _postgresql_metrics = require("./postgresql_metrics");

var _postgresql_logs = require("./postgresql_logs");

var _rabbitmq_metrics = require("./rabbitmq_metrics");

var _redis_logs = require("./redis_logs");

var _redis_metrics = require("./redis_metrics");

var _suricata_logs = require("./suricata_logs");

var _docker_metrics = require("./docker_metrics");

var _kubernetes_metrics = require("./kubernetes_metrics");

var _uwsgi_metrics = require("./uwsgi_metrics");

var _netflow = require("./netflow");

var _traefik_logs = require("./traefik_logs");

var _apm = require("./apm");

var _ceph_metrics = require("./ceph_metrics");

var _aerospike_metrics = require("./aerospike_metrics");

var _couchbase_metrics = require("./couchbase_metrics");

var _dropwizard_metrics = require("./dropwizard_metrics");

var _elasticsearch_metrics = require("./elasticsearch_metrics");

var _etcd_metrics = require("./etcd_metrics");

var _haproxy_metrics = require("./haproxy_metrics");

var _kafka_metrics = require("./kafka_metrics");

var _kibana_metrics = require("./kibana_metrics");

var _memcached_metrics = require("./memcached_metrics");

var _munin_metrics = require("./munin_metrics");

var _vsphere_metrics = require("./vsphere_metrics");

var _windows_metrics = require("./windows_metrics");

var _windows_event_logs = require("./windows_event_logs");

var _golang_metrics = require("./golang_metrics");

var _logstash_metrics = require("./logstash_metrics");

var _prometheus_metrics = require("./prometheus_metrics");

var _zookeeper_metrics = require("./zookeeper_metrics");

var _uptime_monitors = require("./uptime_monitors");

var _cloudwatch_logs = require("./cloudwatch_logs");

var _aws_metrics = require("./aws_metrics");

var _mssql_metrics = require("./mssql_metrics");

var _zeek_logs = require("./zeek_logs");

var _nats_logs = require("./nats_logs");

var _coredns_metrics = require("./coredns_metrics");

var _coredns_logs = require("./coredns_logs");

var _auditbeat = require("./auditbeat");

var _iptables_logs = require("./iptables_logs");

var _cisco_logs = require("./cisco_logs");

var _envoyproxy_logs = require("./envoyproxy_logs");

var _couchdb_metrics = require("./couchdb_metrics");

var _ems = require("./ems");

var _consul_metrics = require("./consul_metrics");

var _traefik_metrics = require("./traefik_metrics");

var _aws_logs = require("./aws_logs");

var _activemq_logs = require("./activemq_logs");

var _activemq_metrics = require("./activemq_metrics");

var _ibmmq_logs = require("./ibmmq_logs");

var _stan_metrics = require("./stan_metrics");

var _envoyproxy_metrics = require("./envoyproxy_metrics");

var _cockroachdb_metrics = require("./cockroachdb_metrics");

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
function registerTutorials(server) {
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_system_logs.systemLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_system_metrics.systemMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_apache_logs.apacheLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_apache_metrics.apacheMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_elasticsearch_logs.elasticsearchLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_iis_logs.iisLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_kafka_logs.kafkaLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_logstash_logs.logstashLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_nginx_logs.nginxLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_nginx_metrics.nginxMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_mysql_logs.mysqlLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_mysql_metrics.mysqlMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_mongodb_metrics.mongodbMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_osquery_logs.osqueryLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_php_fpm_metrics.phpfpmMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_postgresql_metrics.postgresqlMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_postgresql_logs.postgresqlLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_rabbitmq_metrics.rabbitmqMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_redis_logs.redisLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_redis_metrics.redisMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_suricata_logs.suricataLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_docker_metrics.dockerMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_kubernetes_metrics.kubernetesMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_uwsgi_metrics.uwsgiMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_netflow.netflowSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_traefik_logs.traefikLogsSpecProvider);
  server.registerTutorial(_apm.apmSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_ceph_metrics.cephMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_aerospike_metrics.aerospikeMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_couchbase_metrics.couchbaseMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_dropwizard_metrics.dropwizardMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_elasticsearch_metrics.elasticsearchMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_etcd_metrics.etcdMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_haproxy_metrics.haproxyMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_kafka_metrics.kafkaMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_kibana_metrics.kibanaMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_memcached_metrics.memcachedMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_munin_metrics.muninMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_vsphere_metrics.vSphereMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_windows_metrics.windowsMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_windows_event_logs.windowsEventLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_golang_metrics.golangMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_logstash_metrics.logstashMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_prometheus_metrics.prometheusMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_zookeeper_metrics.zookeeperMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_uptime_monitors.uptimeMonitorsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_cloudwatch_logs.cloudwatchLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_aws_metrics.awsMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_mssql_metrics.mssqlMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_nats_logs.natsLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_zeek_logs.zeekLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_coredns_metrics.corednsMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_coredns_logs.corednsLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_auditbeat.auditbeatSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_iptables_logs.iptablesLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_cisco_logs.ciscoLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_envoyproxy_logs.envoyproxyLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_couchdb_metrics.couchdbMetricsSpecProvider);
  server.registerTutorial(_ems.emsBoundariesSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_consul_metrics.consulMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_traefik_metrics.traefikMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_aws_logs.awsLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_activemq_logs.activemqLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_activemq_metrics.activemqMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_ibmmq_logs.ibmmqLogsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_stan_metrics.stanMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_envoyproxy_metrics.envoyproxyMetricsSpecProvider);
  server.newPlatform.setup.plugins.home.tutorials.registerTutorial(_cockroachdb_metrics.cockroachdbMetricsSpecProvider);
}