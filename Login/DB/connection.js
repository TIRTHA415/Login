const mongoose = require('mongoose');

console.log("Connection.js");
const URL = 'mongodb+srv://TD:tdRupi@123@cluster0.e5ng0.mongodb.net/TD?retryWrites=true&w=majority';
mongoose.connect(URL , {
    useNewUrlParser: true,
    useUinifiedTopology : true ,
    useCreateIndex:true,

}).then(()=>{
    console.log('connected')
}).catch((e)=>{
    console.log('no connection')
})

