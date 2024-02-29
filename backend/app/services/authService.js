const hashing = require('../utils/bcrypt/password-hasher');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const whatsappBot = require('../bot/whatsapp/botserver')
const recoveryPasswordStorage = require('../utils/recoverypassword/storage')

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
                phone_number: ""
            }
        });
        return true;
    } catch (error) {
        console.error("Error creating user:", error);
        return false;
    }
};

exports.sendRecoveryCodeByWhatsapp = async (username) => {
    return await whatsappBot.recoveryPassword(username)
}

exports.recoveryPasswordByRecoveryCode = async (username, recoveryCode, password) => {
    try {
        const recoveryCodeFromStorage = await recoveryPasswordStorage.getValueByKey(username)
        if (recoveryCode !== recoveryCodeFromStorage) {
            return "Recovery code is incorrect!"
        }

        const hashedPassword = await hashing.hashPassword(password)
        await prisma.users.update({
            where: {
                username: username
            },
            data: {
                password: hashedPassword
            }
        })
        await recoveryPasswordStorage.removeKey(username)

        return "Password changed successfully!"
    } catch (error) {
        console.error("Unable to recover the password. Error: ", error)
        return "Unable to recover the password. Error: " + error
    }
}