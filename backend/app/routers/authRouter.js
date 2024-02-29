const express = require("express");
const router = express.Router();
const authController = require('../controller/authController')

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/recovery", authController.sendRecoveryCodeToWhatsapp);
router.post("/recovery-by-code", authController.recoveryPasswordByCode);

module.exports = router;