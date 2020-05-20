echo "\033[1;31m Stopping Elasticsearch \033[0m"
lsof -P | grep ':9200' | awk '{print $2}' | xargs kill -9 &
wait
echo "\033[1;31m Stopping Kibana \033[0m"
lsof -P | grep ':5601' | awk '{print $2}' | xargs kill -9