const mongoose = require('mongoose')

const CommentsSchema = mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    comment : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    url : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Comments', CommentsSchema);