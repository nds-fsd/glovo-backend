const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors');
app.use(cors())
const bodyParser = require("body-parser");
const server = app.listen(process.env.PORT, () => {
	console.log('server is running on port', server.address().port);
});

const appRouter = require('./router');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use("/",appRouter);







