const express = require('express');
const router = express.Router();
const cors = require('cors');
const Comments = require('../models/Comments');
const User = require('../models/User');
router.use(cors());

router.patch('/sendFriendRequest', async (req,res) => {
    const currentUser  = await User.findById(req.body.currentUserID);
    const userRequested = await User.findById(req.body.requestedUserID);
    const userFriends = currentUser.friends;
    var friendRequests = userRequested.friendRequests;
    if(userFriends.includes(userRequested._id)){
        res.send('already friends');
    }
    else if(friendRequests.includes(currentUser._id)){
        res.send('already requested to be friends');
    }
    else{
    friendRequests.push(currentUser._id);
    User.update({_id : userRequested._id}, {$set : {friendRequests : friendRequests}})
        .exec()
        .then(result => {
            console.log(result);
            res.json(result);
        })
    } 
});

router.patch('/removeFriend', async(req, res) => {
    var currentUser = await User.findById(req.body.currentUserID);
    var currentUserFriends = currentUser.friends;
    if(!currentUserFriends.includes(req.body.rfID)){
        res.send('Cannot remove something that is not there');
    }
    const rfIndex = currentUserFriends.indexOf(req.body.rfID);
    currentUserFriends.splice(rfIndex, 1);
    User.update({_id : req.body.currentUserID}, {$set : {friends : currentUserFriends}})
        .exec()
        .then(result => {
            //console.log(result);
            res.json(result);
        })
    const removedUser = await User.findById(req.body.rfID);
    var removedUserFriends = removedUser.friends;
    const removeIndex = removedUserFriends.indexOf(req.body.currentUserID);
    removedUserFriends.splice(removeIndex, 1); 
    User.update({_id : req.body.rfID}, {$set : {friends : removedUserFriends}})
    .exec()
    .then(result => {
        //console.log(result);
        res.json(result);
    })
});

router.patch('/acceptFriendRequest', async(req, res) => {
    var currentUser = await User.findById(req.body.currentUserID);
    var currentUserFriends = currentUser.friends;
    var currentUserFriendRequests = currentUser.friendRequests;
    if(!currentUserFriendRequests.includes(req.body.acceptID)){
        res.send('Cannot accept friend request that is not there');
    }
    if(currentUserFriends.includes(req.body.acceptID)){
        res.send('Already friend');
    }
    const acceptIndex = currentUserFriendRequests.indexOf(req.body.acceptID);
    currentUserFriendRequests.splice(acceptIndex, 1);
    currentUserFriends.push(req.body.acceptID);
    User.update({_id : req.body.currentUserID}, {$set : {friends : currentUserFriends, friendRequests : currentUserFriendRequests}})
        .exec()
        .then(result => {
            console.log(result);
            res.json(result);
        })
    const acceptedUser = await User.findById(req.body.acceptID);
    var acceptedUserFriends = acceptedUser.friends;
    acceptedUserFriends.push(req.body.currentUserID);
    User.update({_id : req.body.acceptID}, {$set : {friends : acceptedUserFriends}})
        .exec()
        .then(result => {
            console.log(result);
            res.json(result);
        })
});

module.exports = router;