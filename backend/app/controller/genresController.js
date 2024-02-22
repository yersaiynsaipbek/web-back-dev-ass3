const genreService = require('../services/genreService');
const HttpStatus = require('http-status');

exports.getAllGenre = async (req, res) => {
    try {
        const genres = await genreService.getAllGenre();

        res
            .status(HttpStatus.OK)
            .json(genres);

    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.getAllGenresBook = async (req, res) => {
    try {
        const genreId = req.params.id;
        const genresBook = await genreService.getAllGenresBook(genreId);

        res
            .status(HttpStatus.OK)
            .json(genresBook);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.addGenre = async (req, res) => {
    try {
        const genre = req.body;
        const message = await genreService.addGenre(genre);

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.updateGenre = async (req, res) => {
    try {
        const genreId = req.params.id;
        const updateGenre = req.body;

        const message = await genreService.updateGenreById(genreId, updateGenre)

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.deleteGenre = async (req, res) => {
    try {
        const genreId = req.params.id;

        const message = await genreService.deleteGenreById(genreId);

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

