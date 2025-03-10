const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello, World!');
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});