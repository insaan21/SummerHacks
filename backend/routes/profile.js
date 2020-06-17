const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

const authCheck = (req, res, next) =>{
    console.log(req.user);
    if(!req.user){
        res.send('Not logged in');
    }else{
        next();
    }
};
router.get('/', authCheck, (req, res) =>{
    res.send(req.user.googleID);
});

module.exports = router;