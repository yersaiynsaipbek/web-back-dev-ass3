const genreValidate = require('../validate/genreValidate')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllGenre = async () => {
    try {
        return prisma.genres.findMany()
    } catch (error) {
        throw new Error(`Error in getAllGenres: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
}

exports.getAllGenresBook = async (genreId) => {
    try {
        return prisma.genres.findMany({
            where: {
                genre_id: parseInt(genreId)
            },
            include: {
                book_genre: {
                    include: {
                        book: true,
                    }
                }
            },
        })
    } catch (error) {
        throw new Error(`Error in getAllAuthors: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

exports.addGenre = async (genreBody) => {
    try {
        return prisma.genres.create({
            data: {
                genre_name: genreBody.name
            }
        })
    } catch (error) {
        throw new Error(`Error in addGenre: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
}

exports.updateGenreById = async (genreId, updateGenre) => {
    try {
        return prisma.genres.update({
            where: {
                genre_id: parseInt(genreId)
            },
            data: {
                genre_name: updateGenre.name
            }
        })
    } catch (error) {
        throw new Error(`Error in updateGenreByID: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
}

exports.deleteGenreById = async (genreId) => {
    try {
        return prisma.genres.delete({
            where: {
                genre_id: parseInt(genreId)
            }
        })
    } catch (error) {
        throw new Error(`Error in deleteGenreById: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
}