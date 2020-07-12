//adding comments

const express = require('express');
const router = express.Router();
const cors = require('cors');
const Comments = require('../models/Comments');
router.use(cors());

//add a comment
router.post('/', cors(), addComment);

async function addComment(request, response){
    var comment;
    if(request.body.isReply){
    comment = new Comments({
        comment : request.body.comment,
        url : request.body.url,
        user : request.body.user,
        isReply : request.body.isReply,
        replyTo : request.body.replyTo
    });
    }
    else {
    comment = new Comments({
        comment : request.body.comment,
        url : request.body.url,
        user : request.body.user
    });
    }

    try{
    const savedComment = await comment.save();
    response.json(savedComment);
    }catch(err){
        response.json({message : err});
    }
}

module.exports = router;