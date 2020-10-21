const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all users
router.get('/usuarios', (req, res) => {
  mysqlConnection.query('SELECT * FROM usuario', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An user
router.get('/usuarios/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM usuario where correo=?', [id],(err, rows, fields) => {
    if(!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  }); 
  });



// DELETE An user
router.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM usuario WHERE correo = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'user deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An user
router.post('/usuarios',(req, res) => {
  const {nombre, apellido,profile,correo,pass} = req.body;
  console.log(nombre,apellido,profile,correo,pass);
  const query = `insert into usuario(nombre,apellido_p,profile,correo,pass) values(?,?,?,?,?);`;
  mysqlConnection.query(query, [nombre,apellido,profile,correo,pass], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'User saved'});
    } else {
      console.log(err);
    }
  });

});



module.exports = router;
