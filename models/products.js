const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);

async function getProducts() {
    const result = await db.query("select * from products;", { type: Sequelize.QueryTypes.SELECT });
    return result;
  }

async function getProductById(productId) {
    const result = await db.query("select * from products where id = :id", {
      type: Sequelize.QueryTypes.SELECT,
      replacements: {
        id: productId
      }
    });
  
    return result[0];
}

async function getProductByType(product) {
  const result = await db.query("select * from products where type = :type", {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {
      type: product
    }
  });

  return result;
}

async function insertProduct(product) {
    await db.query("insert into products (name, price, description, type) values (:name, :price, :description, :type)", {
      replacements: {
        name: product.name,
        price: product.price,
        description: product.description,
        type: product.type
      }
    })
  }


  async function updateProduct(product) {
    await db.query("update products set name = :name, price = :price, description = :description, type = :type where id = :id", {
      replacements: {
        name: product.name,
        price: product.price,
        description: product.description,
        type: product.type,
        id: product.id
      }
    })
  }

  async function removeProduct(productId) {
    await db.query("delete from products where id = :id", {
      replacements: {
        id: productId
      }
    })
  }



  module.exports = {
    getProducts: getProducts,
    getProductById: getProductById,
    getProductByType: getProductByType,
    insertProduct: insertProduct,
    updateProduct: updateProduct,
    removeProduct: removeProduct
  };