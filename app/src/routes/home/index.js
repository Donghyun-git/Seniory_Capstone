"use stricet";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.index);
router.get("/list", ctrl.output.list);
router.post("/", ctrl.process.index);

module.exports = router;