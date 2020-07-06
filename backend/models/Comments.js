const mongoose = require('mongoose');
const User = require('./User');

const CommentsSchema = mongoose.Schema({
    comment : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    user : {
        type : JSON,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    likes : {
        type : Array
    }
});

module.exports = mongoose.model('Comments', CommentsSchema);