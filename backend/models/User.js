const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    googleID : {
        type : String, 
        required : true
    },
    //password : {
     //   type : String,
    //    required : true,
    //    max : 1024,
     //   min : 6
    //},
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User', userSchema);