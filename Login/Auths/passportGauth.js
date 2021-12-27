const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const users = require("../DB/model/schema");
const userExists = require("../utils/checkEmail")
const user = require("../utils/getUserByEmail")

// GOOGLE_CLIENT_ID = "440302309342-0ot731haae5brms6q3bcdm4bqrmmbhnl.apps.googleusercontent.com";
// GOOGLE_CLIENT_SECRET = "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";



passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_AUTH_REDIRECT_URIS,
            passReqToCallback: true,
        },
        async function (request, accessToken, refreshToken, profile, done) {
            if (await userExists(profile.email)) {
                // console.log("Email already exists IF")
                if (await user(profile.email).google_id == null) users.updateOne({ email: profile.email }, { google_id: profile.id }, function (err, res) {
                    // console.log("google id doesnt exist");
                    if (err) console.error(err);
                    // else
                    //     console.log("google id updated", profile.name);
                });
                // else console.log("google id exists", profile.name.givenName);
                return done(null, profile);
            }
            else users.create({ name: profile.name.givenName, email: profile.email, google_id: profile.id }, function (err, user) {
                if (err) return console.log(err);
                else return done(null, user);
            })
        }
    )
);
