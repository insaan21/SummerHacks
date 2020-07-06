const express = require('express');
const router = express.Router();
const cors = require('cors');
const Comments = require('../models/Comments');
const User = require('../models/User');
router.use(cors());

router.patch('/addLike/:commentID/:userID', async (req,res) => {
    const comment = await Comments.findById(req.params.commentID);
    //const user = await User.findById(req.params.userID);
    const newLikes = comment.likes;
    if(newLikes.includes(req.params.userID)){
        res.send('already liked');
    }
    else{
    newLikes.push(req.params.userID);
    Comments.update({_id : req.params.commentID}, {$set : {likes : newLikes}})
        .exec()
        .then(result => {
            console.log(result);
            res.json(result);
        })
    } 
});

router.get('/userLiked/:commentID/:userID', async(req, res) => {
   const comment = await Comments.findById(req.params.commentID);
   const likes = comment.likes;
   var userLiked = false;
   for(var id of likes){
       console.log(id);
        if(id == req.params.userID){
            userLiked = true;
            break;
        }
   } 
   res.send(userLiked);
});

module.exports = router;