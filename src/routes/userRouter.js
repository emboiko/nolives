const fetch = require("node-fetch");
const express = require("express");
const auth = require("../middleware/auth");

const userRouter = new express.Router();

userRouter.get("/user/profile", auth, async (req, res) => {
  const region = req.query.region || "us";

  const headers = {
    Authorization: `Bearer ${req.user.token}`,
  };

  let url = `https://${region}.api.blizzard.com/profile/user/wow`;
  url += `?:region=${region}&namespace=profile-us&locale=en_US`;

  const response = await fetch(url, { headers });
  const data = await response.json();
  res.json(data);
});

userRouter.post("/user/register", auth, async (req, res) => {
  const region = req.query.region || "us";

  const headers = {
    Authorization: `Bearer ${req.user.token}`,
  };

  let url = `https://${region}.api.blizzard.com/profile/user/wow/protected-character/`;
  url += `${req.query.realmId}-${req.query.characterId}`;
  url += `?:region=${region}&namespace=profile-us&locale=en_US`;


  const response = await fetch(url, { headers });
  const data = await response.json();

  const deaths = data.protected_stats.total_number_deaths;
  if (deaths !== 0) return res.json({ "error": "Total deaths !== 0" });



  res.json({ "placeholder": "placeholder" });
});

module.exports = userRouter;
