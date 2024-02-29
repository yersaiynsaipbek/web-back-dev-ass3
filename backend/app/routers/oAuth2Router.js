const express = require("express");
const router = express.Router();
const oAuth2Controller = require('../controller/oAuth2Controller')

router.get("/auth", oAuth2Controller.auth);
router.get("/callback", oAuth2Controller.callback);

module.exports = router;