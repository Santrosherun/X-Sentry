const express =  require('express');
const app = express();

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('myview'));

app.get('/showimage', (req, res) => {

});

app.post('/uploadimage', upload.single('file'), (req, res) =>{
    res.send("file uploaded");  
})

console.log('listening...')
app.listen(3000);