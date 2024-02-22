const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`WhatsApp Bot running on http://localhost:${PORT}`)
})

// WHATSAPP BOT
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

app.post('/info', async (req, res) => {
    try {
        const info = req.body;

        const users = await prisma.notification_followers.findMany();

        users.forEach(user => {
            client.sendMessage(user.chatId, `We have added a new book! Called: ${info.title}`);
        });

        res.status(200).json();
    } catch (error) {
        console.error('Error retrieving user IDs:', error);
        res.status(500).json({ error: 'Internal server error.' });
    } finally {
        await prisma.$disconnect()
    }
});

app.post('/user/subscribe', async (req, res) => {
    try {
        const info = req.body;

        await prisma.notification_followers.create({
            data: info
        })

        res.status(200).json();
    } catch (error) {
        console.error('Error retrieving user IDs:', error);
        res.status(500).json({ error: 'Internal server error.' });
    } finally {
        await prisma.$disconnect()
    }
})