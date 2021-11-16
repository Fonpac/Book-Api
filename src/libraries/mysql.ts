import knex, { Knex } from 'knex'

const mysql: Knex = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'id17871797_library'
    }
} as Knex.Config)

export default mysql
