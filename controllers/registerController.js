const registerModel = require("../models/register")


const bcrypt = require("bcrypt");

function get(req, res){
    res.render ("register", {userexist: false})
};

async function post(req, res){
    const {email, password} = req.body
    const user = await registerModel.registerGet(email);
    console.log('retorno do user', user)

    if (user){
        res.render('register', {userexist: true})
    }else{
        const encryptPassword = bcrypt.hashSync(password, 12);

        registerModel.insertLogin({email, password: encryptPassword});
        
        res.redirect('login?usercreate=true');
    }

    
}

module.exports = {
    get: get,
    post: post
}