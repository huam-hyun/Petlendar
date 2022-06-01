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

router.post('/regist', function(req, res){
    const user = {
        'ID' : req.body.ID,
        'PW': req.body.PW,
        'UserName': req.body.Name
    };
    const query = connection.query('insert into User set ?', user, function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        res.status(200).send('success');
    });
});

router.post('/list', function(req, res){
  const ID = req.body.ID
  connection.query('select * from User', function(err, result){
    if(err){
      throw err;
    }
    res.status(200).send(result);
  })
})

module.exports = router;