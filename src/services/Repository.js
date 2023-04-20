export class Repository {
    constructor(dao, collection) {
        this.dao = dao
        this.collection = collection
    }

    get = async (params) => {
        return this.dao.get(params, this.collection)
    }

    save = async (data) => {
        return await this.dao.insert(data, this.collection)
    }

    getById = async (id) => {
        return await this.dao.getById(id, this.collection)
    }

    getByUser = async (username) => {
        return await this.dao.findByUser(username, this.collection)
    }
}