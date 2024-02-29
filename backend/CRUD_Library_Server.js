const dotenv = require('dotenv');
dotenv.config();

// Init dependencies
const whatsappBot = require('./app/bot/whatsapp/botserver')

const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const redisDb = require('./app/utils/redis/redis')
redisDb.initDb()
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
app.use(express.json());
app.use(fileUpload());
const PORT = 3000;

const authorRoutes = require('./app/routers/authorsRouter');
const bookRoutes = require('./app/routers/booksRouter');
const genreRoutes = require('./app/routers/genresRouter');
const fileRoutes = require('./app/routers/fileRouter');
const authRouter = require('./app/routers/authRouter');
const oAuth2Router = require('./app/routers/oAuth2Router')

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/genres', genreRoutes);
app.use('/file', fileRoutes);
app.use('/auth', authRouter);
app.use('/oauth2', oAuth2Router);

const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml');
const swaggerFile = yaml.load(fs.readFileSync('./swagger/swagger-config.yaml', 'utf8'));
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})