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

router.post('/data', function(req, res){
    const user = {
        'ID' : req.body.ID,
        'PW': req.body.PW,
        'UserName': req.body.Name
    };

    const query = 'insert into User set ?'
    connection.query(query , user, function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        res.status(200).send('success');
    });
});

router.post('/login', function(req, res){
  const ID = req.body.ID
  const PW = req.body.PW
  const query = 'select ID, UserName from User where ID=? AND PW=?'

  connection.query(query, [ID, PW], (err, result)=>{
    if(err) throw err;

    res.status(200).send(result)
  })
})

router.get('/list', function(req, res){
  const query = 'select * from User'
  connection.query(query, function(err, result){
    if(err){
      throw err;
    }
    res.status(200).send(result);
  })
})

module.exports = router;