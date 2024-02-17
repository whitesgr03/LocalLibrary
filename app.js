const log = require("debug")("localLibrary:mongoose");

require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	limit: 20,
});

const app = express();

app.use(limiter);
app.use(compression());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			"script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
		},
	})
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

const uri = process.env.MONGODB_URI || null;

const main = async () => {
	try {
		log("Start connecting");
		await mongoose.connect(uri);
		log("Connecting successfully");
	} catch (err) {
		log("Should be connected?");
		console.error(err);
	}
};

main();

module.exports = app;
