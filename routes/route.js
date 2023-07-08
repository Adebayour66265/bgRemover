const express = require("express");

const db = require("../data/database");
const bcrypt = require("bcryptjs");

const router = express.Router();

// router.get("/", function (req, res) {
//   console.log("........nnnn");
//   res.render("home");
// });

// router.get("/b", function (req, res) {
//   console.log("........nnnn");
//   res.render("new-post");
// });

// router.post('/login', async function (req, res, next) {

//     res.redirect('/newpost');
// });

// router.get('/login', function (req, res) {

//     res.render('login', { inputData: sessionInputData });
// });

module.exports = router;
