import knex, { Knex } from 'knex'

const mysql: Knex = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 5000,
        user: 'user',
        password: 'password',
        database: 'id17871797_library'
    }
} as Knex.Config)

export default mysql
