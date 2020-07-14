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
    //might change to set to not allow duplicates
    likes : {
        type : Array
    },

    //array of comment ID's which are replies
    replies : {
        type : Array
    },
    isReply : {
        type : Boolean,
        required : true
    },
    replyTo : {
        type : JSON
    }
}); 

module.exports = mongoose.model('Comments', CommentsSchema);