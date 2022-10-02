"use strict";


const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");
const user = require("./user2.ctrl");

router.get("/", ctrl.output.index);
router.get("/index_p", user.output.index_p);
router.get("/list", ctrl.output.list);
router.get("/signup", ctrl.output.signup);
router.get("/signup_p", ctrl.output.signup_p);

router.post("/", ctrl.process.index);
router.post("/index_p", user.process.login);


router.post("/signup", ctrl.process.signup);
router.post("/signup_p", user.process.signup_p);

module.exports = router;