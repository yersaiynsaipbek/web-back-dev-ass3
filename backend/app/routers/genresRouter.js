const express = require('express');
const router = express.Router();
const genreController = require('../controller/genresController');

router.get('/', genreController.getAllGenre);
router.get('/:id/books', genreController.getAllGenresBook);
router.post('/add', genreController.addGenre);
router.put('/:id/update', genreController.updateGenre);
router.delete('/:id/delete', genreController.deleteGenre);

module.exports = router;