const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const resetpasswordRouter = require("./routes/resetpassword");
const productsRouter = require("./routes/products");
const registerRouter = require("./routes/register");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "myApp", // Uma chave segura, podendendo ser qualquer string, para uma maior segurança procure algo como um UUID;
    resave: true, // Opção que diz para o servidor, que a sessão deve ser renovada a cada acesso;
    saveUninitialized: true, // Força uma sessão que não está inicializada para que seja salva na store;
  })
);

app.use(methodOverride("_method"));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/resetpassword", resetpasswordRouter);
app.use("/products", productsRouter);
app.use("/register", registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
