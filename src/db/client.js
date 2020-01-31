const { clientPool } = require('../db/pool')

/**
 * 
 * @param {String} currentApikey
 * @function Verifica que la apikey recibida como parametro existe en la BBDD.
 * @returns Devuelve un objeto { apikey: value } o levanta un Error.
 * 
 */
const verifyApikey = async (currentApikey) => {
    try {
        const query = `SELECT apikey.id_apikey FROM apikey WHERE apikey.id_apikey=$1`
        const values = [currentApikey]
        const response = await clientPool.query(query, values)

        if (!response.rows[0]) {
            const err = new Error('Apikey not valid.')
            err.status = 404
            throw err
        }
        
        return { apikey: response.rows[0].id_apikey }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} currentApikey 
 * @returns Devuelve un objeto { client: value } donde value es el id del cliente o levanta un Error.
 * 
 */
const getClientAsociatedWith = async (currentApikey) => {
    try {
        const { apikey }  = await verifyApikey(currentApikey)
        
        const query = `SELECT apikey.id_client FROM apikey WHERE apikey.id_apikey=$1`
        const values = [apikey]
        const response = await clientPool.query(query, values)

        if (!response.rows[0]) {
            const err = new Error('Client not found.')
            err.status = 404
            throw err
        }
        
        return { client: response.rows[0].id_client }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} currentClient 
 * @returns Devuelve un true si se guardo correctamente en el historial de consultas o levanta un Error.
 * 
 */
const saveInQueryHistory = async (currentClient) => {
    try{
        const query = 'SELECT saveInQueryHistory($1)'
        const values = [currentClient]
        const response = await clientPool.query(query, values)

        if (!response.rows[0]) {
            const err = new Error('It was not possible to save in the query history.')
            err.status = 404
            throw err
        }
        
        return true
    } catch (err) {
        throw err
    }
}

module.exports = { 
    getClientAsociatedWith,
    saveInQueryHistory
}