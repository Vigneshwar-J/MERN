const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.json({
        msg:"Working"
    })
})

// Define Routes
app.use('/api/users', require('./Routes/users'));
app.use('/api/contacts', require('./Routes/contacts'));
app.use('/api/users', require('./Routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server ON in ${PORT}`)
})