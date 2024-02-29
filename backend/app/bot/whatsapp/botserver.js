const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const {info} = require("../../utils/logger/logger");
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