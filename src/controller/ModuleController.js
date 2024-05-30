const { MercadoPagoConfig, Payment } = require("mercadopago");

const handleLogin = async(req, res) => {
    const token = req.cookies.access_token

    if (!token) {
        return res.render("login", { success: null })
    }

    return res.redirect("/")
}

const handleLogout = async(req, res) => {
    res.clearCookie("access_token")
    return res.redirect("/login")
}

const validateToken = async(req, res, token) => {
    let status = false
    const client = new MercadoPagoConfig({ accessToken: `${token}` })
    const payment = new Payment(client)

    await payment.create({ body: {
        transaction_amount: 0.10,
        description: "Validação de access token | Payment Module",
        payment_method_id: "pix",
        payer: {
            email: "payment@module.com"
        }
    } }).then((res) => {
        status = true
    }).catch(err => {
        status = false
    })

    return status
}

const setToken = async(req, res) => {
    const token = req.body.accesstoken

    if (!token) {
        return res.redirect("/login", { success: false })
    }
    
    const isValidToken = await validateToken(req, res, token)
    
    if (isValidToken) {
        res.cookie("access_token", `${token}`)
        return res.redirect("/")
    } else {
        return res.render("login", { success: false })
    }
}

const home = async (req, res) => {
    const token = req.cookies.access_token

    if (!token) {
        return res.redirect("/login")
    }

    return res.render("home", { success: true, token })
}

module.exports = {
    handleLogin,
    handleLogout,
    setToken,
    home,
}