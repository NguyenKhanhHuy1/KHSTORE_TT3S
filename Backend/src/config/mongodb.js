/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */



import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null

//khoi tao 1 doi tuong mongoClientInstance de connect mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
//ket noi toi database
export const CONNECT_DB = async () => {
    //goi ket noi vs uri da khai bao
    await mongoClientInstance.connect()
    //ket noi thanh cong thi lay db theo ten va gan vao bien
    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
    if (!trelloDatabaseInstance) throw new Error('Must connect to db')
    return trelloDatabaseInstance
}

//Dong ket noi toi DB
export const CLOSE_DB = async () => {
    await mongoClientInstance.close()
}