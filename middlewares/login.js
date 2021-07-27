//1. middleware manda mensagem para a rota
//2. a rota tem que mandar a mensagem que ela receber para dentro do template

function auth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  return next();
}

module.exports = {
  auth: auth,
};
