const { clientPool } = require('../db/pool')
const { finaluserPool } = require('../db/pool')

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

// getClientAsociatedWith("72dbf28a-ab97-4858-8d30-58993dfee824").then(res => console.log(res)).catch(err => console.log(err))

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

const getFinaluser = async (email) => {
    try{
        const query = 'SELECT * from finaluser where finaluser.email=$1'
        const values = [email.toLowerCase()]
        const response = await finaluserPool.query(query, values)

        if (!response.rows[0]) {
            const err = new Error('It was not possible to save in the query history.')
            err.status = 404
            throw err
        }
        
        return { finaluser : response.rows[0] }
    } catch (err) {
        throw err
    }
}

module.exports = { 
    getClientAsociatedWith,
    saveInQueryHistory,
    getFinaluser
}