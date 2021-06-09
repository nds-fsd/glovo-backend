const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors');
app.use(cors())
const bodyParser = require("body-parser");
const { configureSecurity, authRouter } = require('./security/jwtoken');
// const mailer = require('./mailer');
const server = app.listen(process.env.PORT, () => {
	console.log('server is running on port', server.address().port);
});

const appRouter = require('./router');
configureSecurity(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use("/",appRouter);
app.use("/",authRouter);
// app.use("/send-email", mailer);







