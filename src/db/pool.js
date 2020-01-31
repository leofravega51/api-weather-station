require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const finaluserConnectionString = `postgresql://${process.env.DB_FINALUSER}:${process.env.DB_FINALUSER_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const finaluserPool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : finaluserConnectionString,
  ssl: isProduction,
})

const clientConnectionString = `postgresql://${process.env.DB_CLIENT}:${process.env.DB_CLIENT_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const clientPool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : clientConnectionString,
  ssl: isProduction,
})

module.exports = { finaluserPool, clientPool }