const axios = require('axios')

const APP_ID = process.env.FACEBOOK_APP_ID
const APP_SECRET = process.env.FACEBOOK_APP_SECRET
const REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URL

exports.auth = async (req, res) => {
    const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
    res.redirect(url);
}

exports.callback = async (req, res) => {
    const { code } = req.query;

    try {
        const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);

        const { access_token } = data;

        const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);

        res.send(data)
    } catch (error) {
        console.error('Error:', error.response.data.error);
    }
}