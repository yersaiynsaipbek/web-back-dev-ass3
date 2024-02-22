const authorService = require('../services/authorService');
const HttpStatus = require('http-status');


exports.getAllAuthor = async (req, res) => {
    try {
        const nameParam = req.query.name;
        const limitParam = req.query.limit || 10;
        const pageParam = parseInt(req.query.page) || 1;

        const startIndex = (pageParam - 1) * limitParam;
        const endIndex = pageParam * limitParam;

        const authors = await authorService.getAllAuthors(nameParam, limitParam, startIndex, endIndex);

        const response = {
            totalAuthors: authors.length,
            authors: authors,
            currentPage: pageParam,
            totalPages: Math.ceil(authors.length / limitParam)
        };

        res
            .status(HttpStatus.OK)
            .json(response);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.getAllAuthorsBook = async (req, res) => {
    try {
        const authorId = req.params.id;
        const authorsBook = await authorService.getAllAuthorsBook(authorId)

        res
            .status(HttpStatus.OK)
            .json(authorsBook);} catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.addAuthor = async (req, res) => {
    try {
        const author = req.body;
        const message = authorService.addAuthor(author);

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.updateAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const author = req.body;
        const message = authorService.updateAuthorById(authorId, author);

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const message =  authorService.deleteAuthorById(authorId);

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}