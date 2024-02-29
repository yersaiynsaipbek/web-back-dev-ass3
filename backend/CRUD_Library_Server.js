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

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/genres', genreRoutes);
app.use('/file', fileRoutes);
app.use('/auth', authRouter);

const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml');
const swaggerFile = yaml.load(fs.readFileSync('./swagger/swagger-config.yaml', 'utf8'));
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})