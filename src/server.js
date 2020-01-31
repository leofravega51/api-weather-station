const createError = require('http-errors');
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const { StationRouter } = require('./routes/stationRouter')
const { WeatherRouter } = require('./routes/weatherRouter')
const appVersion = process.env.npm_package_version

const app = express()

app.use(favicon(path.join(__dirname, './weather.ico')))
app.use(express.urlencoded({extended: false}))

// this middleware will be executed for every request to the appss
app.use((req, res, next) => {
    res.contentType('application/json');
    next();
});

app.use(`/${appVersion}`, StationRouter)
app.use(`/${appVersion}`, WeatherRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}    

    // render the error page
    res.status(err.status || 500)
    res.send(JSON.stringify({status: err.status, message: err.message}))
});


module.exports = app