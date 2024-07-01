const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const app = express()
const path = require('path')
const port = 3000

//static files
app.use(express.static(path.join(__dirname,'public')))

//HTTP logger
app.use(morgan('combined'))
console.log('PATH: '+path.join(__dirname,'resources/views'));

// Template engine 
app.engine('hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine','hbs')
app.set('views', path.join(__dirname,'resources/views'))

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/news', (req, res) => {
  res.render('news');
})
// 127.0.0.1
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})