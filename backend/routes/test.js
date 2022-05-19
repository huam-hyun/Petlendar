const express = require('express')
const router = express.Router();
const tests = require('../datas/test.json');

router.get('/', (req, res, next) =>{
    res.send(tests)
})

router.get('/:id', (req, res, next) =>{
    let id = parseInt(req.params.id, 10)
    let data = tests.filter((test) => {return test.id === id})

    res.send(data);
});

module.exports = router;