const { createClient } = require('redis')
let client;

async function init() {
    client = createClient()
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
}

exports.saveKeyWithTTL = async (username, recoveryCode) => {
    if (!client) {
        await init();
    }

    await client.set(username, recoveryCode);
    await client.expire(username, 120); // TTL in seconds
}

exports.removeKey = async(username) => {
    if (!client) {
        await init();
    }

    await client.del(username);
}

exports.getValueByKey = async (username) => {
    if (!client) {
        await init();
    }

    return await client.get(username);
};