const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongodbURL');

const connectionDB = async () =>{
    try {
       await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex:true, useFindAndModify:false, useUnifiedTopology:true });
       console.log("DB Connected Successfully")
    } catch(err) {
        console.log(err)
    }
}

module.exports = connectionDB;