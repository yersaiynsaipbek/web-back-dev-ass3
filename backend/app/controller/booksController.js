const bookService = require('../services/bookService');
const HttpStatus = require('http-status');
const axios = require("axios");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwtTokenService = require('../utils/jwt/jwt')

exports.getAllBooks = async (req, res) => {
    try {
        const priceParam = req.query.price;
        const priceOption = req.query.option;
        const limitParam = parseInt(req.query.limit) || 10;
        const pageParam = parseInt(req.query.page) || 1;

        const startIndex = (pageParam - 1) * limitParam;
        const endIndex = pageParam * limitParam;

        const books = await bookService.getAllBooks(priceParam, priceOption, limitParam, startIndex, endIndex);

        const response = {
            totalBooks: books.length,
            books: books,
            currentPage: pageParam,
            totalPages: Math.ceil(books.length / limitParam)
        };

        res
            .status(HttpStatus.OK)
            .json(response);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

exports.addBook = async (req, res) => {
    try {
        // Getting jwt token from cookie
        const jwtToken = req.cookies['jwt-token']
        let extractedUsernameFromCookie = await jwtTokenService.getUsernameFromToken(jwtToken);

        const currentUserData = await prisma.users.findFirst({
            where: {
                username: extractedUsernameFromCookie
            }
        })

        if (currentUserData.role_name !== "ADMIN" || currentUserData.role_name !== "MANAGER") {
            res.status(HttpStatus.FORBIDDEN).json({message: "You don't have access the method!"})
        }

        const book = req.body;
        const message = await bookService.addBook(book);

        axios.post('http://localhost:3001/info', book)
            .then(
                () => console.log("SENT TO THE TELEGRAM BOT SERVER!"))
            .catch(error => {
                console.error('Error sending request:', error);}
            );

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
};

exports.updateBook = async (req, res) => {
    try {
        // Getting jwt token from cookie
        const jwtToken = req.cookies['jwt-token']
        let extractedUsernameFromCookie = await jwtTokenService.getUsernameFromToken(jwtToken);

        const currentUserData = await prisma.users.findFirst({
            where: {
                username: extractedUsernameFromCookie
            }
        })

        if (currentUserData.role_name !== "MANAGER" || currentUserData.role_name !== "ADMIN") {
            res.status(HttpStatus.FORBIDDEN).json({message: "You don't have access the method!"})
        }

        const bookId = req.params.id;
        const updateBook = req.body;

        const message = bookService.updateBookById(bookId, updateBook);

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const message = bookService.deleteBookById(bookId);

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
};
