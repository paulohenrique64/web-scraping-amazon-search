const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);

require("dotenv").config();

// const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = process.env.PORT;
const routes = require('./src/routes/routes');

// app.use(cookieParser());
app.set('json spaces', 2); // format json res
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( cors({credentials: true, methods: 'GET, POST, OPTIONS, DELETE'}));
app.use("/", routes);
app.use((req, res) => {return res.status(404).redirect('/')});

server.listen(port, () => {
    console.log(`Server running on link http://localhost:${port}`);
});