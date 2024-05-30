const express = require("express")
const cookieParser = require("cookie-parser")
const { join } = require("path")

const app = express()
const routes = require("./routes/routes.js")

const PORT = 3000
app.set('views', join(__dirname, '../src/views'))
app.use(express.static(join(__dirname, '../src/public')))
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())
app.use(routes)

app.use((req, res) => {
    res.render("notfound")
})

app.listen(PORT, () => {
    console.info(`Running on port ${PORT} (http://localhost:${PORT})`)
})