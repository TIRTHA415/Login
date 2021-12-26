const mongoose = require('mongoose');
require('../DB/connection.js');

const Users = new mongoose.Schema({
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