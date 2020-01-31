const express = require('express')
const WeatherRouter =  express.Router()

const { getWeatherdataBetweenDates,
        getWeatherdataByStationId,
        getWeatherdataByPlace,
        getWeatherdataByGeolocation,
        getWeatherdataByZipcode
    } = require('../db/finaluser')

const { getClientAsociatedWith,
        saveInQueryHistory
    } = require('../db/client')


// Router for get data by latitude, longitude and between dates
WeatherRouter.get('/weather/measurements?', async (req, res, next) => {
    try {
        const reqLatitude = req.query.latitude
        const reqLongitude = req.query.longitude
        const reqStartDate = req.query.startDate
        const reqEndDate = req.query.endDate
        if (reqLatitude != null && reqLongitude != null && reqStartDate != null && reqEndDate != null) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)
            const saved = await saveInQueryHistory(client)
            const measurements = await getWeatherdataBetweenDates(reqLatitude, reqLongitude, reqStartDate, reqEndDate)

            res.status(200).send(JSON.stringify(measurements, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by id station
WeatherRouter.get('/weather?', async (req, res, next) => {
    try {
        const reqIdStation = req.query.idStation

        if (reqIdStation != null) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const measurement = await getWeatherdataByStationId(reqIdStation)

            res.status(200).send(JSON.stringify(measurement, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by place
WeatherRouter.get('/weather?', async (req, res, next) => {
    try {
        const reqRegion = req.query.region
        const reqCity = req.query.city

        if (reqRegion != null || reqCity != null) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const measurements = await getWeatherdataByPlace(reqRegion.toUpperCase(), reqCity.toUpperCase())

            res.status(200).send(JSON.stringify(measurements, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by geolocation
WeatherRouter.get('/weather?', async (req, res, next) => {
    try {
        const reqLatitude = req.query.latitude
        const reqLongitude = req.query.longitude

        if (reqLatitude != null || reqLongitude != null) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const measurement = await getWeatherdataByGeolocation(reqLatitude, reqLongitude)

            res.status(200).send(JSON.stringify(measurement, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by zipcode
WeatherRouter.get('/weather?', async (req, res, next) => {
    try {
        const reqZipcode = req.query.zipcode

        if (reqZipcode != null) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const measurements = await getWeatherdataByZipcode(reqZipcode)

            res.status(200).send(JSON.stringify(measurements, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

module.exports = { WeatherRouter }