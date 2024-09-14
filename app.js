const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports
const { notFoundHandler, errorHandler } = require('./middleware/common/error.handler');
const loginRouter  = require("./router/login.router");
const usersRouter = require("./router/users.router");
const inboxRouter = require("./router/inbox.router");

const app = express();
dotenv.config();

// database connections
mongoose.connect(process.env.MONGO_CONNECTON_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
 .then(() => console.log("Database connection successful..!!!"))
 .catch(err => console.log(err));

 // request parser
 app.use(express.json());
 app.use(express.urlencoded({ extended: true}));

//set view engine
app.set("view engine", "ejs");


//set static folders
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// not-found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);
app.listen(process.env.PORT, () =>{
    console.log(`app listing to the port ${process.env.PORT}`)
})

