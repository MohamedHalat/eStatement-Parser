const pdf = require('pdf-parse');
const path = require('path');
const fs = require('fs');
const db = require('mysql-promise')();

db.configure({
  "host": 'localhost',
  'port': '3306',
  "user": 'user',
  'password': 'password',
  "database": "database"
});

var numberOfQueries = {"credit": 0, "debit": 0};
var currentQuery = {"credit": 0, "debit": 0};
var folder = {"credit": 0, "debit": 0};
db.query(`truncate finance.debit;`).spread(function (ID) {
  console.log("EMPTY TABLE DEBIT");
});
db.query(`truncate finance.credit;`).spread(function (ID) {
  console.log("EMPTY TABLE CREDIT");
});

read("debit");
read("credit");

function read(tableName) {
  console.log("INSERTING INTO", tableName);
  var directoryPath = path.join(__dirname, 'eStatements-' + tableName);
  fs.readdir(directoryPath, function (err, files) {
    if (err) return console.log('Unable to scan directory: ' + err);
    files.forEach(function (value) {
      if (value.indexOf(".pdf") > -1) {
        var file = directoryPath + "/" + value;
        compileFile(file, tableName);
      }
    });

  })
}


function compileFile(file, tableName) {
  let dataBuffer = fs.readFileSync(file);

  pdf(dataBuffer, { pagerender: render_page }).then(function (data) {
    var allText = data.text.toString();
    if (tableName == "credit") {
      parseFile(allText.split("\n"), (file.substring(file.length - 14, file.indexOf("."))), tableName);
    }
    else{
      allText = allText.substring(allText.indexOf("Opening balance") - 7, allText.substring(allText.indexOf("Closing totals") + "Closing totals".length).indexOf("\n") + allText.indexOf("Closing totals") + "Closing totals".length)
      parseFile(allText.split("\n"), (file.substring(file.length - 14, file.indexOf("."))), tableName);
    }
  });
}


function render_page(pageData) {
  let render_options = {
    normalizeWhitespace: false,
    disableCombineTextItems: false
  }

  return pageData.getTextContent(render_options)
  .then(function (textContent) {
    let lastY, text = '';
    for (let item of textContent.items) {
      if (lastY == item.transform[5] || !lastY) {
        text += " " + item.str;
      }
      else {
        text += '\n' + item.str;
      }
      lastY = item.transform[5];
    }
    // console.log(text)
    return text;
  });
}

function getAmount(file, i, transaction) {
  var line = file[i].split(" ");
  var amount = Math.abs(parseFloat(line[line.length - 1].toString().replace(/,/g, ""))) || null;
  if (line[line.length - 1].toString().indexOf(".") > -1 && amount) {
    for (var n = 0; n < line.length - 2; n++) transaction += line[n] + " ";
    return { amount: amount, transaction: transaction };
  }

  for (var n = 0; n < line.length; n++) transaction += line[n] + " ";
  i++;
  if (!file[i]) return null;
  return getAmount(file, i, transaction)
}


function parseFile(file, startDate, tableName) {
  var prev = 0;
  var dateBuffer = true;
  var startDate = new Date(startDate);
  
  for (var i = 0; i < file.length; i++) {
    if (file[i] == undefined) continue;
    var line = file[i].split(" ");
    if (line.length < 8 || line.includes("Page") || line[0] && ["Here's", "Amounts", "Date", "Primary", "Banking", ].includes(line[0]) || line[2] == "Closing") continue;

    if (line[2] == "Opening") {
      prev = Math.abs(parseFloat(line[line.length - 1].toString().replace(/,/g, "")));
      continue;
    }
    
    var date = new Date(line[0] + " " + line[1]);
    if (!date.getDate()) continue;
    date.setFullYear(startDate.getFullYear());
    if (date.getMonth() == startDate.getMonth()) dateBuffer = false;
    if (date.getMonth() > startDate.getMonth() && dateBuffer) date.setFullYear((startDate.getFullYear() - 1));
    
    var type = "";
    var transaction = "";
    if (tableName == "credit"){
      var amount = -1 * parseFloat(line[line.length - 1]);
      line = line.filter(Boolean)
      transaction = line.myJoin(" ", 4, line.length - 4)
      if (transaction.includes("TRSF FROM/DE ACCT/CPT")) amount = Math.abs(amount);
    }
    else{
      var { amount, transaction } = getAmount(file, i, "");
      amount = amount - prev;
      prev = getAmount(file, i, transaction).amount;
      type = line[2] + " " + line[3];
      if(["Online Bill", "Debit Card", "Pre-Authorized Payment"].includes(type)) type += " "+ line[4];
      if(["Pre-Authorized Payment No"].includes(type)) type += " "+ line[5];
      transaction = transaction.substring(6).trim().replace(type, "").trim();
    }
    //console.log(transaction, file[i])
    push(date, type, Math.round((amount + Number.EPSILON) * 100) / 100, transaction.split('\'').join('"').substring(0, 100) , tableName);
  }
  // console.log({ subtotal: subtotal.toFixed(2), total: total.toFixed(2) })
}

Array.prototype.myJoin = function(seperator,start,end){
    if(!start) start = 0;
    if(!end) end = this.length - 1;
    end++;
    return this.slice(start,end).join(seperator);
};

function push(date, type, amount, transaction, tableName) {
  if (tableName == "credit") {
    type = "";
  }
  if(amount.toString() == "NaN"){
    console.error("Amount Must Be A Valid Number!", {date: date, type: type, amount: amount, transaction: transaction, table: tableName})
  }

  numberOfQueries[tableName]++;
  //console.log(`INSERT INTO finance.${tableName} (account_Type, type, date, transaction, amount) VALUES ('${tableName}', '${type}', date('${date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}'), '${transaction}', '${amount}');`);
  db.query(`INSERT INTO finance.${tableName} (account_Type, type, date, transaction, amount) VALUES ('${tableName}', '${type}', date('${date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}'), '${transaction}', '${amount}');`).spread(function (ID) {
    currentQuery[tableName]++;
    if(currentQuery[tableName] == numberOfQueries[tableName]) createCategory(tableName)
  });

}

/**
  * Runs through the DB and applies an MYSQL that adds a category 
  * based on keywords in transactions.
  *
  */
function createCategory(tableName){
  console.log("INSERTING CATEFORY INTO", tableName );
  // Categorizer is a MySQL string
  //eg: 'set category = "GAS AND PARKING" where transaction like "%PARKING%"; set...'
  var queries = categorizer; 

  var num = {"credit": 0, "debit": 0};
  var ran ={"credit": 0, "debit": 0};
  for (var i = 0; i < queries.split(";").length; i++) {
    var query = queries.split(";")[i].trim() + ";";
    if(query == ";") query = `select * from ${tableName};`
    num[tableName]++;
    db.query(query).spread(function (ID) {
      ran[tableName]++;
      if(ran[tableName] == num[tableName]) folder[tableName]++;
      if(JSON.stringify(ran) == JSON.stringify(num) && folder["credit"] > 0 && folder["debit"] > 0){
        db.end();
        console.log("COMPLETED CATEGORY SCRIPT")
      }
    });
  }

}
