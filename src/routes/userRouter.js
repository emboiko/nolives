const fetch = require("node-fetch");
const express = require("express");
const auth = require("../middleware/auth");

const userRouter = new express.Router();

userRouter.get("/user/profile", auth, async (req, res) => {
  const region = req.query.region || "us";

  // This comes in from blizzard's oauth flow, auth() enforces that we
  // certainly have this (valid) token.
  const headers = { Authorization: `Bearer ${req.user.token}` };

  // Get a summary of the user's profile, including their accounts,
  // as well as the characters associated with those accounts. 
  let url = `https://${region}.api.blizzard.com/profile/user/wow`;
  url += `?:region=${region}&namespace=profile-us&locale=en_US`;

  const response = await fetch(url, { headers });

  // If Blizzard wasn't happy with the request, or the toon just hasn't
  // been logged in since changes to the API. 
  if (!response.ok) return res.json({ "error": "invalid response" });

  // Probably not needed, but if you wanted to do something with this object,
  // this is a good place to do it, rather than in the browser if it can be avoided.
  const data = await response.json();

  // And feed the profile back to the front end as JSON:
  res.json(data);
});

userRouter.post("/user/register", auth, async (req, res) => {
  const region = req.query.region || "us";
  const headers = { Authorization: `Bearer ${req.user.token}` };

  // First and foremost, have they died:
  let url = `https://${region}.api.blizzard.com/profile/user/wow/protected-character/`;
  url += `${req.query.realmId}-${req.query.characterId}`;
  url += `?:region=${region}&namespace=profile-us&locale=en_US`;

  let response = await fetch(url, { headers });
  if (!response.ok) return res.json({ "error": "invalid response" });
  let data = await response.json();

  const deaths = data.protected_stats.total_number_deaths;
  if (deaths !== 0) return res.json({ "error": "Total deaths !== 0" });

  // This looks like it's *currently equipped*, though fields might not 
  // be populated in the json until they're non-zero. Hopefully that's wrong. 
  url = `https://${region}.api.blizzard.com/profile/wow/character/`;
  url += `${req.query.realmName.toLowerCase()}/${req.query.characterName.toLowerCase()}`;
  url += `/equipment`;
  url += `?:region=${region}&namespace=profile-us&locale=en_US`;

  response = await fetch(url, { headers });
  if (!response.ok) return res.json({ "error": "invalid response" });
  data = await response.json();

  console.log(data);

  // At this point, I need to reactivate my sub.
  // Blizzard returns a 403 if the character hasn't been logged in
  // since changes have been made to their API/backend.
  // We'd still need to take a look at talents, consumables, among other things
  // Plus, most of this logic belongs in a class or function, as it's going to be
  // extremely similar code for the update route.

  res.json({ "placeholder": "placeholder" });
});

module.exports = userRouter;
