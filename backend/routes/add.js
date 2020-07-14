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
        replyTo : request.body.replyTo,
        _id : request.body._id
    });
    console.log(comment);
    }
    else {
    comment = new Comments({
        comment : request.body.comment,
        url : request.body.url,
        user : request.body.user,
        isReply : request.body.isReply,
        _id : request.body._id
    });
    console.log(comment);
    }

    try{
    const savedComment = await comment.save();
    response.json(savedComment);
    }catch(err){
        response.json({message : err});
    }
}

router.patch('/reply/:commentID/:replyID', async (req, res) => {
    const commentToUpdate = await Comments.findById(req.params.commentID);
    var newReplies = commentToUpdate.replies;
    newReplies.push(req.params.replyID);
    Comments.update({_id : req.params.commentID}, {$set : {replies : newReplies}})
        .exec()
        .then(result => {
            res.json(result);
        })
})

module.exports = router;