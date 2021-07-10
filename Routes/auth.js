const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    res.send('Get loggedIn User')
})

router.post('/', (req,res) => {
    res.send('Loggin a User')
})

module.exports = router;