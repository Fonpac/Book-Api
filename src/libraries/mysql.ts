import knex, { Knex } from 'knex'

const mysql: Knex = knex({
    client: 'mysql',
    connection: {
        host: 'db',
        user: 'user',
        password: 'password',
        database: 'library'
    }
} as Knex.Config)

export default mysql
