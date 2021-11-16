import mysql from '../libraries/mysql'

export default {
    getAll() {
        return mysql('review')
    },
    byId(id: number) {
        return mysql('review').where({ id }).first()
    },
    new(data: any) {
        return mysql('review').insert(data)
    },
    update(id: number, data: any) {
        return mysql('review').where({ id }).update(data)
    },
    delete(id: number) {
        return mysql('review').where({ id }).del()
    }
}
