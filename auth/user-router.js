const router = require('express').Router();

const Users = require("./auth-model");

router.get("/", (req,res) => {
    Users.findUser()
    .then(users => {
        res.json(users);
    })
    .catch(error => res.send(error))
});

module.exports = router;