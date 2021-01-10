// if you need a public only route, just export a reversed version of auth();

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(process.env.URL);
  }
}

module.exports = auth;
