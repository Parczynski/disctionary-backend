import { MongoClient } from 'mongodb'

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DB}`

export const DB = new MongoClient( url )