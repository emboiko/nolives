const express = require("express");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const passport = require("passport");
const BnetStrategy = require("passport-bnet").Strategy;



const helmet = require("helmet");
const userRouter = require("./routes/userRouter");

require("./db/connect");

/////////////////////////////////////////////////////

let url;
if (process.env.NODE_ENV === "production") {
  url = "nolives.herokuapp.com";
} else {
  url = "localhost:3000";
}

passport.use(new BnetStrategy({
  clientID: process.env.BNET_ID,
  clientSecret: process.env.BNET_SECRET,
  callbackURL: `https://${url}/auth/bnet/callback`,
  scope: "wow.profile sc2.profile",
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

const app = express();

app.use(cookieParser());
app.use(session({
  secret: "blizzard",
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());
app.use(userRouter);



app.get("/", (req, res) => {
  if (req.isAuthenticated()) {

    const output = "<h1>Express OAuth Test</h1>" + req.user.id + "<br>";
    if (req.user.battletag) output += req.user.battletag + "<br>";
    output += "<a href='/logout'>Logout</a>";

    res.send(output);
  } else {
    res.send("<h1>Express OAuth Test</h1>" +
      "<a href='/auth/bnet'>Login with Bnet</a>");
  }
});

app.get("/auth/bnet", passport.authenticate("bnet"));

app.get(
  "/auth/bnet/callback",
  passport.authenticate("bnet", { failureRedirect: "/" }),
  (req, res) => res.redirect("/")
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));