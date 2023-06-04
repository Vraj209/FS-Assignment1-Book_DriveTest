const express = require('express')
const bodyParser = require('body-parser')
const app = express();

// Set middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))


app.get('/', (req, res) =>{
    res.render('Dashboard')
})

app.get('/login', (req, res) =>{
    res.render('Login')
})

app.get('/G2',(req, res)=>{
    res.render('G2')
})

app.get('/G',(req, res)=>{
    res.render('G')
})


// listen to 3000 port
app.listen(3000, () => {
    console.log('server is running')
});





