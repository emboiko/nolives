const express = require("express");

const authRouter = new express.Router();

authRouter.get("/auth/bnet", passport.authenticate("bnet"));

authRouter.get(
  "/auth/bnet/callback",
  passport.authenticate("bnet", { failureRedirect: "/" }),
  (req, res) => res.redirect("/")
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRouter;
