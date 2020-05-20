# Finances DB

This project is to setup a database that I could then use to monitor my finances by using Kibana

## Setup
- Currently this project only works with BMO as that is the bank I use
- Put all of you eStatements into the eStatement folder with Credits and Debits going into their own folder
- Use npm to install all the dependencies in index.js
- Were working off a *database called finance and assuming there's a table for credit and debit*
- Update the database info in index.js, ElkStack/logstash-7.6.2/bin/ finance-credit.conf and finance-debit.conf
- Fill out the required info from /ElkStack/pubsubbeat-master/pubsubbeat.yml Only if you want to test with logs. You can just comment out pubsubbeat from the start.sh otherwise

## Using
- To start, run ``` sh start.sh``` from the root directory
- To stop, run ``` sh stop.sh``` from the root directory. (note: its not pretty, it just stops services with elasticsearch or kibana in the name)

- You can find elasticsearch running at localhost:9200/\_cat/indices?v&pretty with a list of indices. There you should see finance.credit and finance.debit
- Kibana is running at localhost:5601/app/kibana. There are a few dashboards set up already but experiment creating your own. The tool has a lot of power ([Little Intro to Kibana](https://www.elastic.co/guide/en/kibana/current/introduction.html))
