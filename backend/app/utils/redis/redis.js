import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

let client;

const initDb = () => {
    client = createClient();
    client.on('error', err => console.log('Redis Client Error', err));
    client.on('connect', () => console.log('Connected to Redis'));
}

const addLog = (ip, message, url, level) => {
    if (client === null || client === undefined) {
        initDb();
    }

    const uuid = uuidv4();
    const createdAt = new Date().toLocaleDateString();
    const data = {
        ip,
        message,
        url,
        level,
        createdAt
    };

    const key = `log:${uuid}`;
    client.hSet(key, data, (err) => {
        if (err) {
            console.error('Error adding log:', err);
        } else {
            console.log('Log added successfully');
        }
    });
};

module.exports = {
    initDb,
    addLog
}