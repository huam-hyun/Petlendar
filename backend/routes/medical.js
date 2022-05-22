// Medical 기능 api

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
    // const ID = req.body.ID;
    const sql = `select * from MedicalData`;
    const query = connection.query(sql, function(err, result){
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
  
  module.exports = router;