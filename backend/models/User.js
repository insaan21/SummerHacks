const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },

    //only used for google oAuth(everything else uses the mongoDB ID)
    googleID : {
        type : String
    },
    email : {
        type : String
    },
    //password : {
     //   type : String,
    //    required : true,
    //    max : 1024,
     //   min : 6
    //},

    //profile pic
    thumbnail : {
        type : String,
    },
    password : {
        type: String,
        max: 1024,
        min : 6
    },
    //might change to make it less specific
    date : {
        type : Date,
        default : Date.now
    },
    //might change to set to resolve duplicate issues 
    friends : {
        type : Array
    },
    friendRequests : {
        type : Array
    }
   
    
    
});

module.exports = mongoose.model('User', userSchema);