const express =  require('express');
const app = express();
const bodyparser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const PORT = process.env.PORT || 3450;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(morgan("tiny"));
app.use(express.json({limit : '30MB'}));

app.get('/', (req, res) => {
    res.render('myview')
})

app.post('/newupload', (req, res) => {
    let image64 = req.body ["uploadedimage"];
    let buffer = Buffer.from(image64, "base64");
    fs.writeFileSync("imagendescargada.png", buffer);

})

app.listen(PORT, () =>{
    console.log('LISTENING TO PORT 3450');
    console.log('ENDPOINTS: \n/\n/uploadimage');
});