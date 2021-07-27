const logoutController = {
  logout: (req, res) => {
    req.session.destroy();
    res.render("logout");
  },
};

module.exports = logoutController;
