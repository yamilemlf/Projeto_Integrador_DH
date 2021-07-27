const model = require("../models/auth");
const bcrypt = require("bcrypt");

const loginController = {
  get: (req, res) => {
    console.log(req.query)
    let usercreate = false
    if(req.query.usercreate){
      usercreate=true
    }
    res.render("login", {userinexist: false, usercreate: usercreate, errorPassword: false});
  },

  post: async (req, res) =>{
    const {email, password} = req.body
    const user = await model.authenticateUser(email)

    if (!user){
      res.render('login', {userinexist: true, usercreate: false, errorPassword: false})
    } 
    const comparePassword = bcrypt.compareSync(password, user.password);
    
    if (!comparePassword) {
      res.render("login", {userinexist: false, usercreate: false, errorPassword: true});
    } else {
      //INSERIR informações de session
        req.session.user = {
        userid: user.id,
        email: user.email,
    }

    res.redirect("products");
  
}
}
}

  /*
  post: (req, res) => {
    const credentials = req.body;
    const user = model.authenticateUser(
      credentials.login,
      credentials.password
    );
    if (user === undefined) {
      res.render("login", {
        invalidCredentials: true,
      });
    } else {
      req.session.user = user;
      res.redirect("products");
    }
  },
};*/

module.exports = loginController;
