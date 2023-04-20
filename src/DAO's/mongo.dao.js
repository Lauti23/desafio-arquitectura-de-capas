import mongoose from "mongoose";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js"

export class MongoDAO {
    constructor(config) {
        this.mongoose = mongoose.connect(config.url, {
            useNewUrlParser: true
        })
            .then(() => console.log("BASE DE DATOS CONECTADA"))
            .catch(err => {
                console.log(err)
                process.exit()
            })
        const timestamp = { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }}
        const userSchema = mongoose.Schema(User.schema, timestamp)
        const productSchema = mongoose.Schema(Product.schema, timestamp)
        this.models = {
            [User.collection]: mongoose.model(User.collection, userSchema),
            [Product.collection]: mongoose.model(Product.collection, productSchema)
        }
    }

    get = async (options, entity) => {
        if(!this.models[entity]) throw new Error("Entidad no encontrada");
        let results = await this.models[entity].find(options);
        console.log("RESULTS DE ENTITY MONGO DAO", results);
        return results.map(result => result.toObject())
    }

    getById = async (id, entity)  => {
        if(!this.models[entity]) return new Error("Entidad no encontrada")
        let result = await this.models[entity].findById(id)
        return result.toObject()
    }

    insert = async (document, entity) => {
        if(!this.models[entity]) throw new Error("Entidad no encontrada");
        try {
            let instance = new this.models[entity](document)
            let result = await instance.save();
            return result ? result.toObject() : null
        } catch (error) {
            console.log("Error en insert DAO", error)
        }
    }

    findByUser = async (username, entity) => {
        if(!this.models[entity]) throw new Error("Entidad no encontrada");
        let result = await this.models[entity].findOne(username)
        return result
    }
}