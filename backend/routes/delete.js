const express = require('express');
const router = express.Router();
const cors = require('cors');
const Comments = require('../models/Comments');
router.use(cors())

//deletes a comment
router.delete('/:commentID', cors(), deleteComment);

async function deleteComment(request, response){
    try {
        const deletedComment = await Comments.remove({_id : request.params.commentID});
        response.json(deletedComment);
    } catch (error) {
        response.json(error);    
    }
}

module.exports = router;