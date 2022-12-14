const express = require("express");
const router = express.Router();
const passport = require("passport"); 
const validateTweetInput = require("../../validation/tweet");
const Tweet = require("../../models/Tweet")


router.get("/test", (req, res) => {
    res.json({ msg: "This is a tweet route" })
});

router.get("/", (req, res) => {
    Tweet.find().sort({
        date: -1
    }).then(tweets => res.json(tweets)).catch(err => res.status(400).json(err));
});

router.post("/", passport.authenticate("jwt", {
    session: false
    }), (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    };

    const newTweet = new Tweet({
        user: req.user.id,
        text: req.body.text
    });

    newTweet.save().then(tweet => res.json(tweet));
});

module.exports = router;