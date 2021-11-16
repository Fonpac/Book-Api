import knex, { Knex } from 'knex'

const mysql: Knex = knex({
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWD,
        database: process.env.MYSQL_DB
    }
} as Knex.Config)

export default mysql
