const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (user == null) {
      return done(null, false, { message: "No user with That email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password is incorrect " });
      }
    } catch (e) {
      console.log(e);
      return done(e);
    }
  };
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => {
    return done(null, user.email);
  });
  passport.deserializeUser(async (email, done) => {
    const user = await getUserByEmail(email);
    return done(null, user);
  });
}

module.exports = initialize;
