const express = require('express');
const passport = require('passport');
const router = express.Router();
const cors = require('cors');
router.use(cors())


router.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/auth/google');
})
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    //successful login
    res.redirect('/profile');
  });

  module.exports = router;