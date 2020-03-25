const express = require('express')
const ClientRouter = express.Router()

const { getFinaluser } = require('../db/client')

ClientRouter.get('/finalusers/searchBy?', async (req, res, next) => {
    try {
        const reqEmail = req.query.email
        console.log('====================================');
        console.log(reqEmail);
        console.log('====================================');
        
        if (reqEmail != null) {
            const { finaluser } = await getFinaluser(reqEmail)            
            res.status(200).send(JSON.stringify(finaluser, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

module.exports = { ClientRouter }