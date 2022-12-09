import * as dotenv from 'dotenv'
dotenv.config()

const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    port: process.env.PORT,
    database: process.env.DB,
    max: 25,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 10000
})

module.exports = pool