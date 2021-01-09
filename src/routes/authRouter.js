const express = require("express");
const passport = require("passport");

const authRouter = new express.Router();

authRouter.get("/auth/bnet", passport.authenticate("bnet"));

authRouter.get(
  "/auth/bnet/callback",
  passport.authenticate("bnet", { failureRedirect: process.env.URL }),
  (req, res) => res.redirect(process.env.URL)
);

authRouter.get("/auth/me", (req, res) => {
  if (req.user) res.json(req.user);
  else res.json({ user: null });
});

authRouter.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.URL);
});

module.exports = authRouter;
