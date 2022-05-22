// Calendar 기능 api

var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '201635967',
  database: 'Petlendar'
});

router.post('/list', function(req, res){
    const sql = 'select * from CalendarData';

    connection.query(sql, (err, result)=>{
        if(err) throw err;

        res.status(200).send(result);
    })
});
  
module.exports = router;