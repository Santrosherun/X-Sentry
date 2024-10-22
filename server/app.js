const { SerialPort } = require('serialport');
const prompt = require("prompt-sync")({ sigint: true });
const express =  require('express');
const app = express();
const bodyparser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const { STATUS_CODES } = require('http');
const PORT = process.env.PORT || 3455;

const port = new SerialPort({ path: 'COM4', baudRate: 9600 });
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('css'));
app.use(morgan("tiny"));
app.use(express.json({limit : '30MB'}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('indexpug')
})

app.post('/newupload', (req, res) => {
    let image64 = req.body ["uploadedimage"];
    let buffer = Buffer.from(image64, "base64");
    fs.writeFileSync("imagendescargada.png", buffer);

})

app.post('/auth', (req, res) => {
    let msg1 = req.body.key1
    let msg2 = req.body.key2
    console.log(msg1+' '+msg2)
    res.send(200)

})

app.get('/shoot', (req, res) =>{
    //Lamamos el serialConnection.
    startMovement()
    console.log(readData())
    console.log('shooting...')
    res.redirect('/')
})

app.listen(PORT, () =>{
    console.log('LISTENING TO PORT 3455');
    console.log('ENDPOINTS: \n/\n/uploadimage');
});


// PONER PUERTO SERIAL CORRECTO

let startMovement = () => {
    port.write('empezarrecorrido', function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('Mensaje enviado: empezarrecorrido');
    });
};

// Manejo de errores del puerto
port.on('error', function(err) {
    console.log('Error de puerto serial: ', err.message);
});

// Leer los datos que vienen del puerto serial (opcional, si el Arduino envía datos)
let readData = () =>{
  port.on('data', function(data) {
      return data.toString();
  });
}


