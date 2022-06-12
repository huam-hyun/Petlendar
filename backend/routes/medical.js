// Medical 기능 api

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

router.post('/detail', function(req, res){
    let sql = 'select * from MedicalData where MedicalNo=' + req.body.no;
    connection.query(sql, function(err, result){
        if(err) throw err;

        res.status(200).send(result);
    })
})

router.post('/write', function(req, res){
    const sql = `insert into MedicalData set ?`;
    connection.query(sql, req.body, function(err, result){
        if(err){
            res.send(err)
        }

        res.status(200).send('success');
    })
});

router.post('/update', function(req, res){
    const sql = `update MedicalData set MedicalDate=?, Cause=?, Content=?, Prescription=?, Cost=? where MedicalNo=${req.body.MedicalNo}`;
    const MedicalDate = req.body.MedicalDate;
    const Cause = req.body.Cause;
    const Content = req.body.Content;
    const Prescription = req.body.Prescription;
    const Cost = req.body.Cost;

    connection.query(sql, [MedicalDate, Cause, Content, Prescription, Cost], (err, result)=>{
        if(err) throw err;
        res.status(200).send('수정완료');
    })
})
  
  module.exports = router;