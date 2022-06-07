const express = require('express')
const router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '201635967',
    database: 'Petlendar'
});

router.get('/data', (req, res)=>{
    const query = 'select * from Pet where MasterID=?'
    const master = req.body.ID
    connection.query(query, master, (err, result)=>{
        if(err) throw err;

        res.status(200).send(result)
    })
})

router.post('/data', (req, res)=>{
    const query = 'insert into Pet(MasterID, PetName, Sex, PetType) values (?)'
    connection.query(query, [req.body], (err, result)=>{
        if(err) throw err;

        res.status(200).send(result)
    })
})

module.exports = router;