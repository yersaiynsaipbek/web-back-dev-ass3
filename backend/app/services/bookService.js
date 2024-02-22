const bookValidate = require('../validate/bookValidate');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllBooks = async (priceParam, priceOption, limitParam, startIndex, endIndex) => {
    try {
        return prisma.books.findMany({
            take: limitParam,
            skip: startIndex,
            orderBy: {
                price: priceOption || 'asc'
            }
        });
    } catch (error) {
        throw new Error(`Error in getAllBooks: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
};

exports.addBook = async (bookBody) => {
    try {
        // const bookValidation = bookValidate.validate(bookBody);
        //
        // if (!bookValidation.valid) {
        //     return bookValidation.message;
        // }

        bookBody.publishYear += "T00:00:00Z";

        return prisma.books.create({
            data: {
                title: bookBody.title,
                publish_year: bookBody.publishYear,
                page_count: bookBody.pageCount,
                price: bookBody.price,
            },
        });
    } catch (error) {
        throw new Error(`Error in addBooks: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}


exports.updateBookById = async (bookId, updatedBook) => {
    try {
        updatedBook.publishYear += "T00:00:00Z"
        return prisma.books.update({
            where: {
                book_id: parseInt(bookId)
            },
            data: {
                title: updatedBook.title,
                publish_year: updatedBook.publishYear,
                page_count: updatedBook.pageCount,
                price: updatedBook.price,
            },
        })
    } catch (error) {
        throw new Error(`Error in updateBookById: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

exports.deleteBookById = async (bookId) => {
    try {
        return prisma.books.delete({
            where: {
                book_id: parseInt(bookId)
            }
        })
    } catch (error) {
        throw new Error(`Error in deleteBookById: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}