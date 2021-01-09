const fetch = require("node-fetch");
const express = require("express");
const auth = require("../middleware/auth");

const validateRouter = new express.Router();

validateRouter.get("/validate/:realm/:charName", auth, async (req, res) => {
  if (!req.query.region) return res.json({ "error": "missing region" });
  const region = req.query.region;

  // if (!req.query.challenge) return res.json({"error":"missing challenge"});
  // const challenge = req.query.challenge;

  const headers = {
    Authorization: `Bearer ${req.user.token}`,
  };

  let url = `https://${region}.api.blizzard.com/`;
  url += `profile/wow/character/${req.params.realm}/${req.params.charName}/achievements/statistics`;
  url += `?:region=${region}&namespace=profile-us&locale=en_US`;

  const response = await fetch(url, { headers });
  const data = await response.json();
  console.log(data);
});

module.exports = validateRouter;
