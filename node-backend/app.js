require("dotenv").config(); // allow .env file for environment configs

const http = require("http"); 
const express = require("express"); // express framework 
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const port = process.env.PORT;
const routes = require('./src/routes/routes'); // server running port

app.set('json spaces', 2); // format the router response json with 2 espaces of identation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( cors({credentials: true, methods: 'GET, POST, OPTIONS, DELETE'}));
app.use("/", routes); // use all endpoints declared in /src/routes/routes.js
app.use((req, res) => {return res.status(404).redirect('/')}); // in the request, if no route above is selected, the server redirects to the '/' endpoint

server.listen(port, () => {
    console.log(`Server running on link http://localhost:${port}`);
});