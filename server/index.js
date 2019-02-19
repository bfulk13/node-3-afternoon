const express = require('express')
require('dotenv').config()
const {json} = require('body-parser')
const session = require('express-session')
const app = express()
const {SESSION_SECRET, SERVER_PORT} = process.env

//MIDDLEWARE
const checkForSession = require('./middlewares/checkForSession')

//CONTROLLERS
const auth_controller = require('./controllers/auth_controller')
const swag_controller = require('./controllers/swag_controller')
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')


app.use(json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 3
    }
}))

app.use(checkForSession)

// SWAG
app.get(`/api/swag`, swag_controller.read);

// AUTH
app.get(`/api/user`, auth_controller.getUser);
app.post(`/api/login`, auth_controller.login);
app.post(`/api/register`, auth_controller.register);
app.post(`/api/signout`, auth_controller.signout);

// CART
app.post(`/api/cart`, cart_controller.add)
app.post(`/api/cart/checkout`, cart_controller.checkout)
app.delete(`/api/cart`, cart_controller.delete)

// SEARCH
app.get(`/api/search`, search_controller.search)


const PORT = SERVER_PORT
app.listen(PORT, () => console.log(`Port ${PORT} is live!`))