const express = require('express');
const router = express.Router();
const fileController = require('../controller/fileController');

router.get('/', fileController.sendExcelFile);
router.post('/add', fileController.readExcelFile);

module.exports = router;