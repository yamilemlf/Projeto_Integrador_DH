const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);

const users = [
    {
        login: "fabio@petshop.com.br",
        password: "123"
    },
    {
        login: "yamile@petshop.com.br",
        password: "123"
    },
    {
        login: "carlos@petshop.com.br",
        password: "123"
    },
    {
        login: "igor@petshop.com.br",
        password: "123"
    }
];

/* function authenticateUser(login, password) {
    const user = users.find(function (user) {
      return user.login === login && user.password === password;
    });
  
    return user;
  }*/

async function authenticateUser(email){
    const response = await db.query("SELECT * FROM login where email = :email", {
        type: Sequelize.QueryTypes.SELECT, 
        replacements:{
            email
        }
    })

    console.log('resposta do banco ', response)

    return response[0];
}


  
  module.exports = {
    authenticateUser: authenticateUser,
  };