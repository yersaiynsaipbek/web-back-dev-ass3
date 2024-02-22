const { createClient } = require('redis');
const crypto = require('crypto');

const client = createClient({url: 'redis://127.0.0.1:6379'});

const initDb = async () => {
    await client.connect()
    client.on('error', err => console.log('Redis Client Error', err));
    client.on('connect', () => console.log('Connected to Redis'));
}

const addLog = async (ip, message, url, level, callback) => {
    const uuid = crypto.randomUUID();
    const createdAt = new Date().toLocaleDateString();
    const data = {
        uuid,
        ip,
        message,
        url,
        level,
        createdAt
    };

    console.log(data)

    const key = `log:${uuid}`;
    await client.hSet(key, data, (err) => {
        if (err) {
            console.error('Error adding log:', err);
            callback(err); // Call the callback with error
        } else {
            console.log('Log added successfully');
            callback(null); // Call the callback without error
        }
    });
};

module.exports = {
    initDb,
    addLog
}
