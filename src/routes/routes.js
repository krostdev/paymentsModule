const routes = require('express').Router()
const PaymentModule = require('../controller/ModuleController')

routes.get("/login", PaymentModule.handleLogin)
routes.get("/", PaymentModule.home)

routes.post("/logout", PaymentModule.handleLogout)
routes.post("/setToken", PaymentModule.setToken)
module.exports = routes