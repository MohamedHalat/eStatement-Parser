let pdf = require('pdf-parse');
let path = require('path');
let fs = require('fs');
let db = require('mysql-promise')();

db.configure({
    "host": 'localhost',
    'port': '3306',
    "user": 'user',
    'password': 'password',
    "database": "database"
});

const directoryPath = path.join(__dirname, 'eStatements');
var numberOfQueries = 0;
var currentQuery = 0;

fs.readdir(directoryPath, function (err, files) {
    if (err)
        return console.log('Unable to scan directory: ' + err);


    files.forEach(function (value) {
        if (value.indexOf(".pdf") > -1) {
            var file = directoryPath + "/" + value;
            compileFile(file);
            // console.log(value);
        }
    });
});

function compileFile(file) {

    let dataBuffer = fs.readFileSync(file);

    pdf(dataBuffer, { pagerender: render_page }).then(function (data) {
        var allText = data.text.toString();

        allText = allText.substring(allText.indexOf("Opening balance") - 7, allText.substring(allText.indexOf("Closing totals") + "Closing totals".length).indexOf("\n") + allText.indexOf("Closing totals") + "Closing totals".length)
        parseFile(allText.split("\n"), (file.substring(file.length - 14, file.indexOf("."))));
        // console.log("file:" + file + "\n\n\n")
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


function parseFile(file, startDate) {
    var prev = 0;
    var dateBuffer = true;
    // var subtotal = 0;

    var startDate = new Date(startDate);
    for (var i = 0; i < file.length; i++) {
        if (file[i] == undefined) continue;
        var line = file[i].split(" ");
        if (line.toString().length < 1 || line.includes("Page") || line[0] && ["Here's", "Amounts", "Date", "Primary"].includes(line[0]) || line[2] == "Closing") continue;

        if (line[2] == "Opening") {
            prev = Math.abs(parseFloat(line[line.length - 1].toString().replace(/,/g, "")));
            continue;
        }
        // console.log(line[0] + " " + line[1] + " " + year);
        var date = new Date(line[0] + " " + line[1]);
        if (!date.getDate()) continue;
        date.setFullYear(startDate.getFullYear());
        if (date.getMonth() == startDate.getMonth()) dateBuffer = false;
        if (date.getMonth() > startDate.getMonth() && dateBuffer) date.setFullYear((startDate.getFullYear() - 1));


        var { amount, transaction } = getAmount(file, i, "");
        transaction = transaction.substring(6).trim();

        amount = amount - prev;

        prev = getAmount(file, i, transaction).amount;
        // subtotal += amount
        // total += amount;
        // transactions.values.push({ "date": date, "transaction": transaction, "amount": amount })
        numberOfQueries++;
        push(date, amount, transaction);
    }
    // console.log({ subtotal: subtotal.toFixed(2), total: total.toFixed(2) })
}

function push(date, amount, transaction) {
    db.query(`INSERT INTO database.table (Account_Type, Date, Transaction, Amount)VALUES ('Debit', date('${date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}'), '${transaction}', '${amount}');`).spread(function (ID) {
        console.log('Result', ID);
        currentQuery++;
        if (currentQuery == numberOfQueries) db.end();
    });

}