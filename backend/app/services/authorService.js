const authorValidate = require("../validate/authorValidate");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllAuthors = async (nameParam, limitParam, startIndex, endIndex) => {
    try {
        let query = {};

        if (nameParam) {
            query = { where: { name: nameParam } };
        }

        return await prisma.authors.findMany({
            ...query,
            take: endIndex - startIndex,
            skip: startIndex,
        });
    } catch (error) {
        throw new Error(`Error in getAllAuthors: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
};

exports.getAllAuthorsBook = async (authorId) => {
    try {
        return prisma.authors.findMany({
            where: {
                author_id: parseInt(authorId)
            },
            include: {
                author_book: {
                    include: {
                        book: true
                    }
                },
            },
        })
    } catch (error) {
        throw new Error(`Error in getAllAuthors: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

exports.addAuthor = async (authorBody) => {
    try {
        const authorValid = authorValidate.validate(authorBody);

        if (!authorValid.valid) {
            return authorValid.message;
        }

        authorBody.birthday += "T00:00:00Z"
        return prisma.authors.create({
            data: authorBody,
        });
    } catch (error) {
        throw new Error(`Error in addAuthor: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

exports.updateAuthorById = async (authorId, updatedAuthor) => {
    try {
        updatedAuthor.birthday += "T00:00:00Z"
        return prisma.authors.update({
            where: {
                author_id: parseInt(authorId)
            },
            data: updatedAuthor
        })
    } catch (error) {
        throw new Error(`Error in updateAuthorById: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

exports.deleteAuthorById = async (authorId) => {
    try {
        return prisma.authors.delete({
            where: {
                author_id: parseInt(authorId)
            }
        })
    } catch (error) {
        throw new Error(`Error in deleteAuthorById: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}