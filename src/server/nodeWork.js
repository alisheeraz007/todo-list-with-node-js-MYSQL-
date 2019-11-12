const express = require('express')
const app = express()
const port = 3001

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "PLvRLOsvK4",
    password: "TjrNAzLRUr",
    database: "PLvRLOsvK4"
});

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'remotemysql.com',
    user: 'PLvRLOsvK4',
    password: 'TjrNAzLRUr',
    database: 'PLvRLOsvK4'
});

app.use(function (req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); }); var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM customers", function (err, rows) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(rows));
        });
    });
})

app.post('/saveData', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO customers (name, address) VALUES ?";
        var values = [
            [req.body.name, req.body.address]
        ];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
        });
    });
    res.send("save");
})

app.post('/delete', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    console.log(req.body.id)
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        var sql = `DELETE FROM customers WHERE id = ${req.body.id}`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            // console.log("Number of records deleted: " + result.affectedRows);
        });
    });
    res.send("save");
})

app.post('/update', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    console.log(req.body)
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        con.query(`UPDATE customers SET ? WHERE id = ${req.body.id}`,
            { address: req.body.address, name: req.body.name })
    });
    res.send("save");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))