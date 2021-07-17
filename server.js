const express = require('express');
const app = express();
const con = require('./config/db');

con(); 
app.use(express.json({extended:false}))

// Define Routes
app.use('/api/users', require('./Routes/users'));
app.use('/api/contacts', require('./Routes/contacts'));
app.use('/api/auth', require('./Routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server ON in ${PORT}`)
})