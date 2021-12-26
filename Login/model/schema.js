const mongoose = require('mongoose');
const connection = require('./model/connection.js');

const Users = mongoose.schema({
    name :{ 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    password : { 
        type: String,
        required: true
    }
});

module.exports = mongoose.model("users",Users);