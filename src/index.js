"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const path = require('path');

const port = 3000;

//archivos estaticos(buscar el archivo html)
app.use(express.static(path.join(__dirname, 'public')));


const url =
  "mongodb+srv://crud-db:W06qfCOX6fRofZqZ@cluster0.kpp1aja.mongodb.net/?retryWrites=true&w=majority";
/* configuracion para evitar fallos de connecion */
mongoose.Promise = global.Promise;

var noteRoutes = require('./routes/note');

//cargar body parser
app.use(bodyParser.urlencoded({ extended: false}));

//cualquier tipo de peticion lo convertimos a json
app.use(bodyParser.json());

//acticar el cors para permitir peticion ajax y http desde el front
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//cargar los archivos de ruta de la app
app.use('/api', noteRoutes); 


mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("concion exitosa a la db");
  app.listen(port, () => {
    console.log("corriendo en el puerto " + port);
  });
});

/* W06qfCOX6fRofZqZ   contraseña de base de dato crud-db */

/* https://www.youtube.com/watch?v=b2Pz1XrFi_o&list=PLaAArOkY8Er9u3vUYjfP4xwJnbynNbRQx&index=9 */

/* https://github.com/CodenautaJorge/fullstack-notas/blob/main/src/index.js proyecto */

/* https://www.youtube.com/watch?v=9V6PZcl30MQ&list=PLaAArOkY8Er9u3vUYjfP4xwJnbynNbRQx&index=11 */