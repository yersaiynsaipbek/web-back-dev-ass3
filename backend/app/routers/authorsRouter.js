const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorsController');

router.get('/', authorController.getAllAuthor);
router.get('/:id/books', authorController.getAllAuthorsBook)
router.post('/add', authorController.addAuthor);
router.put('/:id/update', authorController.updateAuthor);
router.delete('/:id/delete', authorController.deleteAuthor);

module.exports = router;