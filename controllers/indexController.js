const productsController = require("../controllers/productsController");

const indexController = {
  get: (req, res) => {
    res.render("index", {
      types: productsController.types,
    });
  },

  post: (req, res) => {
    res.redirect("login");
  },
};

module.exports = indexController;
