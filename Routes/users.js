const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
    res.send('Registering a User')
})

module.exports = router;