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

router.get('/data', function(req, res){
    const sql = 'select * from CalendarData';

    connection.query(sql, (err, result)=>{
        if(err) throw err;

        res.status(200).send(result);
    })
});

router.post('/data', function(req, res){
    const sql = 'insert into CalendarData(WriteDate, Content, MasterID, PetID) values ?'
    let values = [...req.body];
    console.log(values);

    connection.query(sql, [values], (err, result)=>{
        if(err) throw err;

        res.status(200).send('추가 완료');
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