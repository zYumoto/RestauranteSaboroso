var conn = require('./../inc/db')
var express = require('express');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts')
var menus = require('./../inc/menus');
var router = express.Router();
var emails = require('./../inc/emails')

/* GET home page. */
router.get("/", function (req, res, next) {
  menus.getMenus().then(results => {
    res.render("index", {
      title: "Restaurante Saboroso!",
      menus: results,
      isHome: true,
    });
  });
});

// rota para pagina contato
router.get('/contacts', function (req, res, next) {
  contacts.render(req, res)
});

// rota para enviar o formulario contato 
router.post('/contacts', function (req, res, next) {

  if (!req.body.name)
    contacts.render(req, res, 'Digite o nome')

  else if (!req.body.email)
    contacts.render(req, res, 'Digite o email')

  else if (!req.body.message)
    contacts.render(req, res, 'Digite a menssagem')

  else {

    contacts.save(req.body).then(results => {

      req.body = {};
      contacts.render(req, res, null, 'Contato enviado com sucesso');

    }).catch(err => {
      contacts.render(req, res, err.message);
    })
  }
});

// rota para pagina menus
router.get('/menus', function (req, res, next) {
  menus.getMenus().then(results => {
    res.render('menus', {
      title: 'Menu - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results

    });
  })
});

// rota para pagina reservar
router.get("/reservations", function (req, res, next) {
  reservations.render(req, res);
});

// rota para enviar a reserva para DB
router.post('/reservations', function (req, res, next) {

  if (!req.body)
    reservations.render(req, res, 'Digite o nome');

  else if (!req.body.email)
    reservations.render(req, res, 'Digite o email');

  else if (!req.body.people)
    reservations.render(req, res, 'Digite a quantidade de pessoas');

  else if (!req.body.date)
    reservations.render(req, res, 'Selecione a data');

  else if (!req.body.time)
    reservations.render(req, res, 'Selecione o horario');

  else {

    reservations.save(req.body).then(results => {

      req.body = {};
      reservations.render(req, res, null, 'Reserva realizada com sucesso')

    }).catch(err => {

      reservations.render(req, res, err.message);
    })
  }

});

// rota para paginas servicoes
router.get("/services", function (req, res, next) {
  res.render("services", {
    title: "Serviços - Restaurante Saboroso!",
    background: "images/img_bg_1.jpg",
    h1: "É um prazer poder servir!",
  });
});

router.post("/subscribe", function (req, res, next) {
  emails.save(req).then(results => {

    res.send(results);

  }).catch(err => {

    res.send(err)

  })

})

module.exports = router;
