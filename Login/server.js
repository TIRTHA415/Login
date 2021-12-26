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
const users = require("./model/schema");

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

const getUserByEmail = async (email) => {
  try {
    const user = await users
      .findOne({ email: email }, async (err, user) => {
        console.log("server: " + email);
        if (err) console.log("Error: " + err);
        else return user;
      })
      .clone();
    return user;
  } catch (e) {
    console.log("Login error " + e.message);
  }
};

const initialize = require("./passportCon");
initialize(passport, (email) => getUserByEmail(email));

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
  console.log("home");
  res.render("index.ejs");
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

    // users.name = req.body.name;
    // users.email = req.body.email;
    // users.password = hashedPassword;

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
