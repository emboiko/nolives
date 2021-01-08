const fs = require('fs');
const path = require("path");
const https = require("https");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const passport = require("passport");
const BnetStrategy = require("passport-bnet").Strategy;
const authRouter = require("./routes/authRouter");
require("./db/connect");

const PORT = process.env.PORT || 5000;
let url;
if (process.env.NODE_ENV === "production") url = "nolives.herokuapp.com";
else url = `localhost:${PORT}`;

passport.use(new BnetStrategy({
  clientID: process.env.BNET_ID,
  clientSecret: process.env.BNET_SECRET,
  callbackURL: `https://${url}/auth/bnet/callback`,
  scope: "wow.profile",
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

const app = express();
app.use(cookieParser());
app.use(session({ secret: "blizzard", saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(cors());
app.use(authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
} else {
  https.createServer({
    key: fs.readFileSync("./config/server.key"),
    cert: fs.readFileSync("./config/server.cert")
  }, app).listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
