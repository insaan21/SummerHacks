//route with all friend functionality

const express = require('express');
const router = express.Router();
const cors = require('cors');
const Comments = require('../models/Comments');
const User = require('../models/User');
router.use(cors());

//adds user ID of person sending request to the friendRequests array of the person they sent the request to
router.patch('/sendFriendRequest/:requestedUserID', async (req,res) => {
    const currentUser  = req.user;
    const userRequested = await User.findById(req.params.requestedUserID);
    const userFriends = currentUser.friends;
    var friendRequests = userRequested.friendRequests;

    //duplicate and error testing(should probably do this with a try catch later)
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
            res.json(result);
        })
    } 
});

//removes friends from both users friends arrays
//rfID == ID of friend to be removed
router.patch('/removeFriend/:rfID', async(req, res) => {
    var currentUser = req.user;
    var currentUserFriends = currentUser.friends;

    //manual error catching
    if(!currentUserFriends.includes(req.params.rfID)){
        res.send('Cannot remove something that is not there');
    }
    const rfIndex = currentUserFriends.indexOf(req.params.rfID);
    currentUserFriends.splice(rfIndex, 1);
    User.update({_id : req.user._id}, {$set : {friends : currentUserFriends}})
        .exec()
        .then(result => {
            res.json(result);
        })
    const removedUser = await User.findById(req.params.rfID);
    var removedUserFriends = removedUser.friends;
    const removeIndex = removedUserFriends.indexOf(req.user._id);
    removedUserFriends.splice(removeIndex, 1); 
    User.update({_id : req.params.rfID}, {$set : {friends : removedUserFriends}})
    .exec()
    .then(result => {
        res.json(result);
    })
});

//removes the userID of the friend Request accepted from the friendRequests array and adds each others userIDs to each other's friends array
router.patch('/acceptFriendRequest/:acceptID', async(req, res) => {
    var currentUser = req.user;
    var currentUserFriends = currentUser.friends;
    var currentUserFriendRequests = currentUser.friendRequests;


    //duplicate and error testing
    if(!currentUserFriendRequests.includes(req.params.acceptID)){
        res.send('Cannot accept friend request that is not there');
    }
    if(currentUserFriends.includes(req.params.acceptID)){
        res.send('Already friend');
    }


    const acceptIndex = currentUserFriendRequests.indexOf(req.params.acceptID);
    currentUserFriendRequests.splice(acceptIndex, 1);
    currentUserFriends.push(req.params.acceptID);
    User.update({_id : req.user._id}, {$set : {friends : currentUserFriends, friendRequests : currentUserFriendRequests}})
        .exec()
        .then(result => {
            res.json(result);
        })
    const acceptedUser = await User.findById(req.params.acceptID);
    var acceptedUserFriends = acceptedUser.friends;
    acceptedUserFriends.push(req.user._id);
    User.update({_id : req.params.acceptID}, {$set : {friends : acceptedUserFriends}})
        .exec()
        .then(result => {
            res.json(result);
        })
});

router.patch('/denyFriendRequest/:acceptID', async(req, res) => {
    var currentUser = req.user;
    var currentUserFriends = currentUser.friends;
    var currentUserFriendRequests = currentUser.friendRequests;


    //duplicate and error testing
    if(!currentUserFriendRequests.includes(req.params.acceptID)){
        res.send('Cannot deny friend request that is not there');
    }

    const denyIndex = currentUserFriendRequests.indexOf(req.params.acceptID);
    currentUserFriendRequests.splice(denyIndex, 1);
    User.update({_id : req.user._id}, {$set : {friendRequests : currentUserFriendRequests}})
        .exec()
        .then(result => {
            res.json(result);
        })
});


router.get('/getFriends', async(req, res) => {
    var currentUser = req.user;
    var currentUserFriendIDs = currentUser.friends;
    var currentUserFriends = [];
    
    for(friends of currentUserFriendIDs){
        var user = await User.findOne({_id : friends});
        currentUserFriends.push(user);
    }
    res.render('friends' , {friends : currentUserFriends});
});

router.get('/getFriendRequests', async(req, res) => {
    var currentUser = req.user;
    var currentUserFriendRequestIDs = currentUser.friendRequests;
    var currentUserFriendRequests = [];
    
    for(friends of currentUserFriendRequestIDs){
        var user = await User.findOne({_id : friends});
        currentUserFriendRequests.push(user);
    }

    res.render('friendRequests' , {friends : currentUserFriendRequests});
});

module.exports = router;