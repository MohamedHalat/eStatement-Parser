##!/usr/bin/env bash
echo " -------------------------------------------------------------  "
printf "\e[32m Updating db from file \e[m\n"
node financeTable-master/index.js &
wait

echo " -------------------------------------------------------------  "
printf "\e[32m Starting Elasticsearch \e[m\n"
./elasticsearch-7.6.2/bin/elasticsearch --silent &

sleep 15

echo " -------------------------------------------------------------  "
printf "\e[32m Starting LogStash for Credit \e[m\n"
./logstash-7.6.2/bin/logstash -f /logstash-7.6.2/bin/finance-credit.conf --log.level=info&

sleep 20

printf "\e[32m Starting LogStash for Debit \e[m\n"
./logstash-7.6.2/bin/logstash -f /logstash-7.6.2/bin/finance-debit.conf --log.level=info&

sleep 20

echo " -------------------------------------------------------------  "
printf "\e[32m Starting Pubsub \e[m\n"
./pubsubbeat-master/pubsubbeat -c pubsubbeat-master/pubsubbeat.yml -e -d "*" --v &

sleep 5

echo " -------------------------------------------------------------  "
printf "\e[32m Starting Kibana \e[m\n"
./kibana-7.6.2-darwin-x86_64/bin/kibana -q
