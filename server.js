if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const autorRouter = require('./routes/autores')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db =  mongoose.connection
db.on('error', error =>console.error(error))
db.once('open', () => console.log("Conectado com o bd!"))


app.use('/', indexRouter)
app.use('/autores', autorRouter)

app.listen(process.env.PORT || 3000)

// oh7htquGB2va5FXs
// mongodb+srv://user:oh7htquGB2va5FXs@cluster0.j4sss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority