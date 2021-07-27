const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);

async function registerGet(email){
    const response = await db.query("SELECT * FROM login where email = :email", {
        type: Sequelize.QueryTypes.SELECT, 
        replacements:{
            email
        }
    })

    console.log('resposta do banco ', response)

    return response[0];
}


async function insertLogin(login){
    await db.query("insert into login (email, password) values (:email, :password)", {
        replacements: {
            email: login.email,
            password: login.password
        }
    })
}

module.exports = {
    insertLogin: insertLogin,
    registerGet: registerGet
}