const mongoose = require('mongoose');

console.log("Connection.js");

const connection = async()=>{
    const URL = 'mongodb+srv://TD:tdRupi@123@cluster0.e5ng0.mongodb.net/TD?retryWrites=true&w=majority';
    try{
        await mongoose.connect(URL,{useNewUrlParser: true,useUnifiedTopology: true});
        console.log("Connected!");
    }
    catch(e){
        console.log(e);
    }
}

module.exports = connection;