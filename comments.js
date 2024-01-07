// Create web server
// 1. npm init
// 2. npm install express
// 3. npm install body-parser
// 4. npm install ejs
// 5. npm install -g nodemon
// 6. npm install mongoose
// 7. npm install express-session
// 8. npm install passport
// 9. npm install passport-local
// 10. npm install passport-local-mongoose
// 11. npm install method-override
// 12. npm install connect-flash
// 13. npm install moment
// 14. npm install multer
// 15. npm install dotenv
// 16. npm install bcrypt
// 17. npm install connect-mongo

// load modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// load models
const User = require("./models/user");
const Comment = require("./models/comment");
const Reply = require("./models/reply");
const Post = require("./models/post");

// load routes
const indexRoutes = require("./routes/index");
const commentRoutes = require("./routes/comments");
const postRoutes = require("./routes/posts");
const replyRoutes = require("./routes/replies");

// load dotenv
dotenv.config();

// connect to database
mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

// configure express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(
	session({
		secret: "This is the secret",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		cookie: { maxAge: 180 * 60 * 1000 }
	})
);
app