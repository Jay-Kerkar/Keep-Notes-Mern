const jwt = require('jsonwebtoken')

// JWT_SECRET_KEY For Authentication Of A User Visting Again To The Site - This Is A Confidential Key 
const JWT_SECRET_KEY = "SNACKSPACE"

const user_details = (req, res, next) => {
    // Verifying The JWT Authentication Token 
    const authentication_token = req.header('authentication_token')

    if (!authentication_token) {
        res.status(401).send({ error: "Please Authenticate Using A Valid Authentication Token" })
    }

    // Fetch The User Id From The JWT Authentication Token 
    try {
        const data = jwt.verify(authentication_token, JWT_SECRET_KEY)
        req.user = data.user
        next()
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
}

module.exports = user_details