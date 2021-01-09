//todo
const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(process.env.URL);
  }
}

module.exports = auth;
