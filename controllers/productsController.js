const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);
const productsModel = require("../models/products");

const productsController = {
  products: [
    {
      id: 1,
      name: "Ração Premium",
      price: 100,
      type: "alimentação",
      descricao: "descricao",
    },
    {
      id: 2,
      name: "Bola",
      price: 4,
      type: "brinquedos",
      descricao: "descricao",
    },
  ],

  types: [
    {
      id: "alimentação",
      label: "Alimentação",
      description: "Os alimentos com as melhores condições nutricionais para seu(s) pet(s). Saiba o que temos para lhe oferecer.",
      image:
        "https://www.dogvibe.com.br/wp-content/wpmowebp/wp-content/uploads/2018/05/pet_food.webp",
    },
    {
      id: "brinquedos",
      label: "Brinquedos",
      description: "Variados tipos de brinquedos para o seu pet divertir-se.",
      image:
        "https://a-static.mlcdn.com.br/1500x1500/mordedor-brinquedos-para-cachorro-kit-vinil-pet-caes-pet-toys/yellowimport/1019p/f8d8811758ff7856667f4f0fa8d15d52.jpg",
    },
    {
      id: "higiene",
      label: "Higiene",
      description: "Fazer a higiene do animal é mais que a hora do banho, aqui você encontra uma linha completa de produtos.",
      image:
        "https://i0.statig.com.br/bancodeimagens/en/ye/gv/enyegv55iiuhfna21rvpshydi.jpg",
    },
    {
      id: "outros",
      label: "Outros",
      description: "Cama, coleiras e diversos acessórios para facilitar a sua vida e do seu pet, você encontra aqui.",
      image:
        "https://static.riachuelo.com.br/RCHLO/13900366001/portrait/07b4fc3983f953c4774c0258eaad3c259a6c65e8.jpg?imwidth=700",
    },
  ],

  get: async (req, res) => {
    const productsData = await productsModel.getProducts();
    const types = productsController.types;
    res.render("products", { products: productsData, types: types });
  },
  
  getByTypes: async (req, res) => {
    const productType = req.params.id;
    console.log(productType)
    const products = await productsModel.getProductByType(productType);
    const types = productsController.types;
    console.log(products)

    res.render("products/types", { products: products, types: types, productsType: productType });
  },

  edit: async (req, res) => {
    const productId = req.params.id;
    const product = await productsModel.getProductById(productId);
    const types = productsController.types;
    res.render("products/edit", { product: product, types: types });
  },

  post: async (req, res, next) => {
    const product = req.body;
    await productsModel.insertProduct(product);
    res.redirect("/products");
  },

  delete: async (req, res) => {
    const productId = req.params.id;
    await productsModel.removeProduct(productId);
    res.redirect("/products");
  },

  put: async (req, res) => {
    const product = req.body;
    await productsModel.updateProduct(product);
    res.redirect("/products");
  },
};

module.exports = productsController;
