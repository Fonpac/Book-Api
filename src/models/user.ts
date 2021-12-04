import mysql from '../libraries/mysql'

export default {
    getAll() {
        return mysql('user')
    },
    new(data: any) {
        return mysql('user').insert(data)
    },
    byId(id: number) {
        return mysql('user').where({ id: id }).first()
    },
    async byEmail(email: string) {
        return mysql('user').where({ email: email }).first()
    }
}
