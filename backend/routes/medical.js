// Medical 기능 api
// api 수정해야함

var express = require('express');
const req = require('express/lib/request');
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
    const id = req.query[0];
    const sql = `select * from MedicalData where MasterID=? order by MedicalDate`;
    connection.query(sql, [id], function(err, result){
      if(err){
        console.error(err);
        throw err;
      }
      res.status(200).send(result);
    });
});

router.post('/data', function(req, res){
    const sql = `insert into MedicalData set ?`;
    connection.query(sql, req.body, function(err, result){
        if(err){
            throw err;
        }

        res.status(200).send('success');
    })
});

router.put('/data', function(req, res){
    const sql = `update MedicalData set ? where MedicalNo=${req.body.MedicalNo}`;

    connection.query(sql, [req.body], (err, result)=>{
        if(err) throw err;
        res.status(200).send('수정완료');
    })
})
  
  module.exports = router;