const hashing = require('../utils/bcrypt/password-hasher');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.authenticate = async (username, password) => {
    const userData = await prisma.users.findFirst({
        where: {
            username: username
        }
    });

    if (!userData) {
        return false;
    }

    return await hashing.comparePasswords(password, userData.password);
};

exports.authorization = async (username, password) => {
    const hashedRequestPassword = await hashing.hashPassword(password);
    const userRole = "USER";

    try {
        await prisma.users.create({
            data: {
                username: username,
                password: hashedRequestPassword,
                role_name: userRole,
                vk_id: ""
            }
        });
        return true;
    } catch (error) {
        console.error("Error creating user:", error);
        return false;
    }
};