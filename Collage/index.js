//se hace:
//npm install jquery
//npm install bootstrap
//npm install express-handlebars
//npm install
//npm init  enter enter enter enter... yes   o  npm init -y
//npm install express
//npm install express-fileupload

//debe ir dentro de la carpeta public la carpeta imgs (tambien irian css eventualmente) y el resto como node_modules y .json afuera
//para correrlo hay que estar posicionado en la carpeta public (si ya estas en collage escribe en terminal cd public) y luego node index.js
//luego ir al browser y escribir localhost:3000

//si se quiere salir de terminal: ctrl + c    y luego para levantar el server nuevamente e ir probando cambios: node index.js

const express = require("express");
const expressFileUpload = require("express-fileupload");     //integración en nuestro servidor con Express. ncluirlo como middleware y definir su objeto de configuración. con esto y con app.use
const app = express();
const fs = require("fs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, () => 
console.log("Tu app escuchando en puerto 3000"));


app.use(express.static("public"));

//middleware:
app.use( expressFileUpload({          
    limits: { fileSize: 5000000 }, //es decir 5MB
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
  })
  );


  app.get("/", (req, res) => {    //cuando entre al localhost me va a llevar ahi

    res.sendFile(__dirname + "/formulario.html")
})

//atajo para ver en navegador y solo escribir localhost:3000/collage
app.get("/collage", (req, res) => {
  res.sendFile(__dirname + "/collage.html")
})

  /* Crear una ruta POST /imagen que reciba y almacene una imagen en una carpeta
pública del servidor: */

  app.post("/imagen", (req, res) => {
    const { target_file } = req.files;   //target_file  porque es <input type="file" name="target_file" />  en el formulario.html
    let {name} = target_file; //name porque es name en target_file cuando se ve el console.log //let porque quiero que cambie. no usar const porque no es una constante
    console.log(req.files);
    const { posicion } = req.body;     //posicion porque es <input class="form-control" type="number" name="posicion" />  linea 27 en el formulario.html
    name=`imagen-${posicion}.jpg` //para renombrar el nombre de la imagen , su name
    target_file.mv(`${__dirname}/public/imgs/${name}`, (err) => {  //.jpg linea 70 collage.html
        //if (err) throw err;
      res.sendFile(__dirname + "/collage.html")
   // res.send("Archivo cargado con éxito");
    });
    });


/* Crear una ruta GET /deleteImg/:nombre que reciba como parámetro el nombre de
una imagen y la elimine de la carpeta en donde están siendo alojadas las imágenes */

app.get("/deleteImg/:nombre", (req, res) => {    //deleteImg linea 4 en collage.html
     
    const {nombre} = req.params; //NombreImagen ocomo quiera ponerle
    //const NombreImagen = req.params.NombreImagen;
    fs.unlink(`${__dirname}/public/imgs/${nombre}`, (err) => {
        //if (err) throw err;
        res.send(`Imagen ${nombre} fue eliminada con éxito, `);
    });
});


