const express = require('express')
const router = express.Router();
const tests = require('../datas/test.json');

router.get('/', (req, res, next) =>{
    res.send(tests)
})

router.post('/', (req, res, next) =>{
    console.log(req.body)
    res.send(tests)
})

module.exports = router;