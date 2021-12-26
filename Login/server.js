if (process.env.Node_ENV !== "production") {
  require("dotenv").config();
} //for loading env variables in process.env

const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("./DB/connection");
const users = require("./DB/model/schema");
const loggedIn = require("./middlewares/loggedIn");
const getUserByEmail = require("./utils/getUserByEmail");

const initializeLocal = require("./passportCon");
initializeLocal(passport, (email) => getUserByEmail(email));

app.set("view-engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", loggedIn, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.create(
      { name: req.body.name, email: req.body.email, password: hashedPassword },
      (err, newUser) => {
        console.log(newUser);
      }
    );

    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users);
});

app.listen(3000);
