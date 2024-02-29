const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

exports.comparePasswords = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};