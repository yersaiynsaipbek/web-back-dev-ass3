const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const recoveryPasswordStorage = require('../../utils/recoverypassword/storage')
const client = new Client();

// WHATSAPP BOT
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

exports.notificationUsers = async (info) => {
    try {
        const users = await prisma.notification_followers.findMany();

        users.forEach(user => {
            client.sendMessage(user.chatId, `We have added a new book! Called: ${info.title}`);
        });
    } catch (error) {
        console.error('Error retrieving user IDs:', error);
    } finally {
        await prisma.$disconnect()
    }
}

exports.subscribeUser = async (info) => {
    try {
        await prisma.notification_followers.create({
            data: info
        })
    } catch (error) {
        console.error('Error retrieving user IDs:', error);
    } finally {
        await prisma.$disconnect()
    }
}

exports.recoveryPassword = async (username) => {
    try {
        const userData = await prisma.users.findFirst({
            where: {
                username: username
            }
        })

        if (userData === null) {
            return "User not found"
        }

        const generatedRecoveryPassword = generateRandomValue()

        await recoveryPasswordStorage.saveKeyWithTTL(username, generatedRecoveryPassword)
        await client.sendMessage(`${userData.phone_number}@c.us`, `[ VALID FOR ONLY 2 MINUTES! ] Recovery password: ${generatedRecoveryPassword}`);
    } catch (error) {
        console.error('Error retrieving user IDs:', error);
    } finally {
        await prisma.$disconnect()
    }
}

function generateRandomValue() {
    let randomNumber = Math.floor(Math.random() * 10000);
    return randomNumber.toString().padStart(4, '0');
}