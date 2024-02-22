const authorService = require('../services/authorService');
const HttpStatus = require('http-status');
const logger = require('../utils/logger/logger');
const authorValidation = require('../validate/authorValidate')

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

        await logger.info(req, "Success!")

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

        await logger.info(req, "Success!")
        res
            .status(HttpStatus.OK)
            .json(authorsBook);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.addAuthor = async (req, res) => {
    try {
        const author = req.body;

        const validResult = authorValidation.validate(author)
        if (!validResult.valid) {
            await logger.info(req, validResult.message)
            res
                .status(HttpStatus.BAD_REQUEST)
                .json(validResult.message);

            return
        }

        const message = authorService.addAuthor(author);
        await logger.info(req, "Success!")

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
        if (authorId === ":id") {
            const errorMessage = "Author ID is required!"
            await logger.info(req, errorMessage)
            res
                .status(HttpStatus.BAD_REQUEST)
                .json(errorMessage);

            return
        }

        const author = req.body;
        const validResult = authorValidation.validate(author)
        if (!validResult.valid) {
            await logger.info(req, validResult.message)
            res
                .status(HttpStatus.OK)
                .json(validResult.message);

            return
        }

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