//route with user information

const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

//if not logged in 
const authCheck = (req, res, next) =>{
    if(!req.user){
        res.send('Not logged in');
    }else{
        next();
    }
};

router.get('/', authCheck, (req, res) =>{
    res.send(req.user); 
});

module.exports = router;