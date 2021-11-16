import mysql from '../libraries/mysql'

export default {
    byId(id: number) {
        return mysql('comment').where({ id }).first()
    },
    new(data: any) {
        return mysql('comment').insert(data)
    },
    update(id: number, data: any) {
        return mysql('comment').where({ id }).update(data)
    },
    delete(id: number) {
        return mysql('comment').where({ id }).del()
    }
}
