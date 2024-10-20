const express =  require('express');
const app = express();
const bodyparser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const { STATUS_CODES } = require('http');
const PORT = process.env.PORT || 3455;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(morgan("tiny"));
app.use(express.json({limit : '30MB'}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('myview')
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

app.listen(PORT, () =>{
    console.log('LISTENING TO PORT 3455');
    console.log('ENDPOINTS: \n/\n/uploadimage');
});