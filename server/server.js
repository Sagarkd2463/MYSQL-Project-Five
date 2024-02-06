const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'r$$100200',
    database:'signup',
});

db.connect((err) => {
    if(err){
        console.log(err.stack);
    }else {
        console.log("Database Connection Successful...");
    }
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.email,
        req.body.password,
    ];

    db.query(sql, [values], (err, data) => {
        if(err){
            res.send({status: false, message: err.stack});
        } else {
            res.send({status: true, message: data});
        }
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
   
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            res.send({status: false, message: err.stack});
        } else {
            if(data.length > 0){
                res.send({status: "success", message: data});
            } else {
                res.send({status: "fail", message: 'Your record does not exists!'});
            }
        }
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});

