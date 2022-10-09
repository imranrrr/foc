import knex from 'knex'
import knexfile from '../knexfile.js'
const environment = process.env.ENVIRONMENT || 'development'

export default knex(knexfile[environment])