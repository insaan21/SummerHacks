//route to get comments

const express = require('express');
const router = express.Router();
const cors = require('cors');
const Comments = require('../models/Comments');
router.use(cors())

//gets all comments
router.get('/all', cors(), getAllComments);

async function getAllComments(request, response){
    try{
        const allComments = await Comments.find();
        response.json(allComments);
    }catch(err){
        response.json({message : err});
    }
}


//get specific comment
router.get('/:commentID', cors(), getSpecificComment);

async function getSpecificComment(request, response){
    try{
        const comment = await Comments.findById(request.params.commentID);
        response.json(comment);
    }catch(err){
        response.json({message : err});
    }
}

router.get('/allReplies/:commentID', async (req, res) => {
    const comment = await Comments.findById(req.params.commentID);
    var replies = comment.replies;
    var allReplies = [];
    for(var reply of replies){
       var replyComment = await Comments.findById(reply);
       allReplies.push(replyComment); 
    }
    res.send(allReplies);
});
module.exports = router;