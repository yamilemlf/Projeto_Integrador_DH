const resetPasswordController = {
  get: (req, res) => {
    res.render("resetpassword");
  },

  post: (req, res) => {
    res.send("Email enviando");
  },
};

module.exports = resetPasswordController;
