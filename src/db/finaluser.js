const { finaluserPool } = require('../db/pool')

/**
 * 
 * @param {Date} startDate 
 * @param {Date} endDate
 * @param {Integer} amount
 * @returns Devuelve un objeto { stations: value } donde value es una lista
 *          de estaciones que se hayan creado en el intervalo
 *          de fechas [endDate; startDate] o un error.
 * 
 */
const getStationdataBetweenDates = async (startDate, endDate, amount) => {
    try {
        const query = 'SELECT * FROM getStationdataBetweenDates($1, $2, $3) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [startDate, endDate, amount]
        const response = await finaluserPool.query(query, values)
    
        return { stations: response.rows }
    } catch(err){
        throw err
    }
    
}


/**
 * 
 * @param {String} idStation
 * @returns Devuelve un objeto { station: value } donde value es la estacion
 *          que tiene como identificador el recibido como parametro.
 * 
 */
const getStationdataById = async (idStation) => {
    try {
        const query = 'SELECT * FROM getStationdataById($1) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [idStation]
        const response = await finaluserPool.query(query, values)
    
        return { station: response.rows[0] }
    } catch(err) {
        throw err
    }
    
}


/**
 * 
 * @param {String} region 
 * @param {String} city 
 * @param {Integer} amount
 * @returns Devuelve un objeto { stations: value } donde value es una lista 
 *          de estaciones ubicadas en la region y ciudad recibidas
 *          como parametro.
 * 
 */
const getStationdataByPlace = async (region, city, amount) => {
    try {
        const query = 'SELECT * FROM getStationdataByPlace($1, $2, $3) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [region, city, amount]
        const response = await finaluserPool.query(query, values)
        
        return { station: response.rows[0] }
    } catch(err) {
        throw err
    }
    
}


/**
 * 
 * @param {Double Presision} latitude 
 * @param {Double Presision} longitude 
 * @returns Devuelve laestacion ubicada en la latitud y longitud recibidas como parametro.
 * 
 */
const getStationdataByGeolocation = async (latitude, longitude) => {
    try {
        const query = 'SELECT * FROM getStationdataByGeolocation($1, $2) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [latitude, longitude]
        const response = await finaluserPool.query(query, values)
        
        return { station: response.rows[0] }
    } catch(err) {
        throw err
    }
    
}


/**
 * 
 * @param {String} zipcode 
 * @param {Integer} amount 
 * @returns Devuelve un ubjeto { stations: value } donde value es una lista
 *          de estaciones ubicadas en la region con el codigo de area recibido como parametro.
 * 
 */
const getStationdataByZipcode = async (zipcode, amount) => {
    try {
        const query = 'SELECT * FROM getStationdataByZipcode($1, $2) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [zipcode, amount]
        const response = await finaluserPool.query(query, values)
        
        return { stations: response.rows }
    } catch(err) {
        throw err
    }
}

/**
 * 
 * @param {Double Presision} latitude 
 * @param {Double Presision} longitude 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns Devuelve un objeto { measurement: value } donde value es una lista de mediciones 
 *          relevadas en la latitude y longitude especificadas y en el intervalo de 
 *          fechas [endDate; startDate] o un error.
 * 
 */
const getWeatherdataBetweenDates = async (latitude, longitude, startDate, endDate) => {
    try {
        const query = 'SELECT * FROM getWeatherdataBetweenDates($1, $2, $3, $4);'
        const values = [latitude, longitude, startDate, endDate]
        const response = await finaluserPool.query(query, values)
    
        return { measurements: response.rows }
    } catch(err){
        throw err
    }
    
}


/**
 * 
 * @param {String} idStation
 * @returns Devuelve un objeto { measurement: value } donde value es la ultima medicion 
 *          realizada por la estacion especificada.
 * 
 */
const getWeatherdataByStationId = async (idStation) => {
    try {
        const query = 'SELECT * FROM getWeatherdataByStationId($1);'
        const values = [idStation]
        const response = await finaluserPool.query(query, values)
    
        return { measurement: response.rows[0] }
    } catch(err) {
        throw err
    }
    
}


/**
 * 
 * @param {String} region 
 * @param {String} city 
 * @returns Devuelve un objeto { measurement: value } donde value es la ultima medicion 
 *          realizada en la region especificada.
 * 
 */
const getWeatherdataByPlace = async (region, city) => {
    try {
        const query = 'SELECT * FROM getWeatherdataByPlace($1, $2);'
        const values = [region, city]
        const response = await finaluserPool.query(query, values)
        
        return { measurement: response.rows[0] }
    } catch(err) {
        throw err
    }
    
}


/**
 * 
 * @param {Double Presision} latitude 
 * @param {Double Presision} longitude 
 * @returns Devuelve un objeto { measurement: value } donde value es la ultima medicion 
 *          realizada en la geolocalizacion especificada.
 * 
 */
const getWeatherdataByGeolocation = async (latitude, longitude) => {
    try {
        const query = 'SELECT * FROM getWeatherdataByGeolocation($1, $2);'
        const values = [latitude, longitude]
        const response = await finaluserPool.query(query, values)
        
        return { measurement: response.rows[0] }
    } catch(err) {
        throw err
    }
    
}


/**
 * 
 * @param {String} zipcode 
 * @returns Devuelve un objeto { measurement: value } donde value es la ultima medicion 
 *          realizada en la region en el codigo de area especificado.
 * 
 */
const getWeatherdataByZipcode = async (zipcode) => {
    try {
        const query = 'SELECT * FROM getWeatherdataByZipcode($1);'
        const values = [zipcode]
        const response = await finaluserPool.query(query, values)
        
        return { measurement: response.rows[0] }
    } catch(err) {
        throw err
    }
}

module.exports = {
    getStationdataBetweenDates,
    getStationdataById,
    getStationdataByPlace,
    getStationdataByGeolocation,
    getStationdataByZipcode,
    getWeatherdataBetweenDates,
    getWeatherdataByStationId,
    getWeatherdataByPlace,
    getWeatherdataByGeolocation,
    getWeatherdataByZipcode
}