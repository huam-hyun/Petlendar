// Calendar 기능 api

var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '201635967',
  database: 'Petlendar',
  multipleStatements: true
});

router.get('/data', function(req, res){
    const sql = 'select * from CalendarData where MasterID=?';
    const id = req.query[0]

    connection.query(sql, [id], (err, result)=>{
        if(err) throw err;

        res.status(200).send(result);
    })
});

router.post('/data', function(req, res){
    console.log(req.body)
    const sql = 'insert into CalendarData(WriteDate, Content, MasterID, PetName) values ?;'
    const addData = req.body

    connection.query(sql, [addData], (err, result)=>{
        if(err) throw err;

        res.status(200).send(result)
    })
});

router.delete('/data', function(req, res){ 
    const sql = 'delete from CalendarData where CalendarNo in (?)';
    let values = [...req.body];
    console.log(values);

    connection.query(sql, [values], (err, result)=>{
        if(err) throw err;

        res.status(200).send('삭제 완료');
    })
});

module.exports = router;